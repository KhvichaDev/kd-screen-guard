/**
 * Idle activity monitoring and cross-tab auto-lock, unlock, and password reset synchronizer.
 * Supports public timestamp reset methods to eliminate system sleep mode wake auto-lock loops.
 */

const DEFAULT_STORAGE_KEY_PREFIX = 'kd_screen_guard_last_activity';
const DEFAULT_BROADCAST_CHANNEL = 'kd_screen_guard_channel';

export class kd_AutoLockTracker {
    private kd_autoLockMinutes: number;
    private kd_onTimeout: () => void;
    private kd_onUnlockReceived?: () => void;
    private kd_onPasswordResetReceived?: (newHash: string) => void;
    private kd_intervalId: ReturnType<typeof setInterval> | null = null;
    private kd_listenersActive: boolean = false;
    private kd_channel: BroadcastChannel | null = null;
    private kd_boundHandler: () => void;
    private kd_visibilityHandler: () => void;
    private kd_memoryTimestamp: number = Date.now();
    private kd_isLocked: boolean = false;
    private kd_storageKey: string;

    constructor(
        autoLockMinutes: number,
        onTimeout: () => void,
        onUnlockReceived?: () => void,
        onPasswordResetReceived?: (newHash: string) => void,
        channelName: string = DEFAULT_BROADCAST_CHANNEL
    ) {
        this.kd_autoLockMinutes = autoLockMinutes;
        this.kd_onTimeout = onTimeout;
        this.kd_onUnlockReceived = onUnlockReceived;
        this.kd_onPasswordResetReceived = onPasswordResetReceived;
        this.kd_storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}_${channelName || DEFAULT_BROADCAST_CHANNEL}`;
        this.kd_boundHandler = () => this.kd_updateActivityTimestamp();
        this.kd_visibilityHandler = () => {
            if (typeof document !== 'undefined' && document.visibilityState === 'visible' && !this.kd_isLocked) {
                this.kd_checkTimeout();
            }
        };

        if (typeof BroadcastChannel !== 'undefined') {
            try {
                this.kd_channel = new BroadcastChannel(channelName || DEFAULT_BROADCAST_CHANNEL);
                this.kd_channel.onmessage = (event) => {
                    if (event.data) {
                        if (event.data.type === 'LOCK_NOW') {
                            this.kd_onTimeout();
                        } else if (event.data.type === 'UNLOCK_NOW') {
                            this.kd_onUnlockReceived?.();
                        } else if (event.data.type === 'PASSWORD_RESET' && event.data.newHash) {
                            this.kd_onPasswordResetReceived?.(event.data.newHash);
                        }
                    }
                };
            } catch {
                this.kd_channel = null;
            }
        }
    }

    public kd_setLockedState(isLocked: boolean): void {
        this.kd_isLocked = isLocked;
    }

    public kd_start(): void {
        if (this.kd_autoLockMinutes <= 0) return;
        this.kd_setupEventListeners();
        this.kd_resetActivityTimestamp();

        if (this.kd_intervalId) clearInterval(this.kd_intervalId);

        this.kd_intervalId = setInterval(() => {
            if (!this.kd_isLocked) {
                this.kd_checkTimeout();
            }
        }, 2000);
    }

    public kd_stop(): void {
        if (this.kd_intervalId) {
            clearInterval(this.kd_intervalId);
            this.kd_intervalId = null;
        }
        this.kd_removeEventListeners();
    }

    public kd_notifyUnlockEvent(): void {
        if (this.kd_channel) {
            try {
                this.kd_channel.postMessage({ type: 'UNLOCK_NOW' });
            } catch {
                // Ignore channel errors
            }
        }
    }

    public kd_notifyPasswordResetEvent(newHash: string): void {
        if (this.kd_channel) {
            try {
                this.kd_channel.postMessage({ type: 'PASSWORD_RESET', newHash });
            } catch {
                // Ignore channel errors
            }
        }
    }

    public kd_updateConfig(minutes: number): void {
        this.kd_autoLockMinutes = minutes;
        if (minutes > 0) {
            this.kd_start();
        } else {
            this.kd_stop();
        }
    }

    public kd_resetActivityTimestamp(): void {
        const now = Date.now();
        this.kd_memoryTimestamp = now;
        try {
            localStorage.setItem(this.kd_storageKey, now.toString());
        } catch {
            // Fallback to memory
        }
    }

    public kd_destroy(): void {
        this.kd_stop();
        if (this.kd_channel) {
            this.kd_channel.close();
            this.kd_channel = null;
        }
    }

    private kd_checkTimeout(): void {
        if (this.kd_autoLockMinutes <= 0) return;
        const now = Date.now();
        const lastActive = this.kd_getLastActivityTimestamp();
        const elapsed = now - lastActive;
        const threshold = this.kd_autoLockMinutes * 60 * 1000;

        if (!isNaN(elapsed) && elapsed >= threshold) {
            this.kd_notifyLockEvent();
            this.kd_onTimeout();
        }
    }

    private kd_getLastActivityTimestamp(): number {
        try {
            const value = localStorage.getItem(this.kd_storageKey);
            if (!value) return this.kd_memoryTimestamp;

            const parsed = parseInt(value, 10);
            if (isNaN(parsed) || parsed <= 0) {
                localStorage.removeItem(this.kd_storageKey);
                return this.kd_memoryTimestamp;
            }

            return parsed;
        } catch {
            return this.kd_memoryTimestamp;
        }
    }

    private kd_updateActivityTimestamp(): void {
        if (this.kd_isLocked) return;

        const now = Date.now();
        const last = this.kd_getLastActivityTimestamp();
        this.kd_memoryTimestamp = now;

        if (now < last || now - last > 3000) {
            try {
                localStorage.setItem(this.kd_storageKey, now.toString());
            } catch {
                // Fallback to memory
            }
        }
    }

    private kd_setupEventListeners(): void {
        if (this.kd_listenersActive || typeof window === 'undefined') return;

        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        events.forEach((evt) => {
            window.addEventListener(evt, this.kd_boundHandler, { passive: true });
        });

        if (typeof document !== 'undefined') {
            document.addEventListener('visibilitychange', this.kd_visibilityHandler);
        }

        this.kd_listenersActive = true;
    }

    private kd_removeEventListeners(): void {
        if (!this.kd_listenersActive || typeof window === 'undefined') return;

        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        events.forEach((evt) => {
            window.removeEventListener(evt, this.kd_boundHandler);
        });

        if (typeof document !== 'undefined') {
            document.removeEventListener('visibilitychange', this.kd_visibilityHandler);
        }

        this.kd_listenersActive = false;
    }

    private kd_notifyLockEvent(): void {
        if (this.kd_channel) {
            try {
                this.kd_channel.postMessage({ type: 'LOCK_NOW' });
            } catch {
                // Ignore channel errors
            }
        }
    }
}
