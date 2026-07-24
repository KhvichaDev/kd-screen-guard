/**
 * Main Orchestrator Engine for kd-screen-guard library.
 * Coordinates authentication state, Startup locking & LocalStorage persistence, WebAuthn Biometrics, Web Worker crypto processing, Intruder Snapshot photo capture, PBKDF2 salted key derivation, SPA history security alerts, and system sleep mode timestamp resets.
 */

import { kd_ScreenGuardOptions, kd_LockState, kd_TamperDetails, kd_SecurityAlertDetails } from '../types';
import { kd_sha256, kd_pbkdf2 } from './kd_crypto';
import { kd_workerCrypto } from './kd_worker_crypto';
import { kd_AutoLockTracker } from './kd_auto_lock';
import { kd_TamperGuard } from '../guard/kd_tamper_guard';
import { kd_AlarmSystem } from '../guard/kd_alarm_system';
import { kd_IntruderCamera } from '../guard/kd_intruder_camera';
import { kd_WebAuthnManager } from '../guard/kd_webauthn';
import { kd_LockUI } from '../ui/kd_lock_ui';

const LOCK_STORAGE_KEY = 'kd_screen_guard_is_locked';
const FAILED_ATTEMPTS_STORAGE_KEY = 'kd_screen_guard_failed_attempts';
const LOCKOUT_UNTIL_STORAGE_KEY = 'kd_screen_guard_lockout_until';
const LOCKOUT_COUNT_STORAGE_KEY = 'kd_screen_guard_lockout_count';


export class kd_LockEngine {
    private kd_options: kd_ScreenGuardOptions;
    private kd_passwordHash: string = '';
    private kd_isLocked: boolean = false;
    private kd_tamperCount: number = 0;
    private kd_actionCount: number = 0;
    private kd_failedAttemptsCount: number = 0;
    private kd_lockoutCount: number = 0;
    private kd_lockoutUntilTimestamp: number = 0;
    private kd_lockoutTimerId: ReturnType<typeof setInterval> | null = null;
    private kd_lastAlertTimestamp: number = 0;
    private kd_autoLockTracker: kd_AutoLockTracker | null = null;
    private kd_tamperGuard: kd_TamperGuard | null = null;
    private kd_alarmSystem: kd_AlarmSystem | null = null;
    private kd_ui: kd_LockUI | null = null;
    private kd_attachedButtons: HTMLButtonElement[] = [];
    private kd_historySecurityHandler: (() => void) | null = null;
    private kd_lastIntruderSnapshot: { dataUrl: string; reason: string; timestamp: number } | null = null;

    constructor(options: kd_ScreenGuardOptions = {}) {
        this.kd_options = { ...options };
    }

    public get kd_isLockedState(): boolean {
        return this.kd_isLocked;
    }

    public async kd_init(): Promise<void> {
        if (this.kd_autoLockTracker) {
            this.kd_autoLockTracker.kd_destroy();
            this.kd_autoLockTracker = null;
        }
        if (this.kd_tamperGuard) {
            this.kd_tamperGuard.kd_stopMonitoring();
            this.kd_tamperGuard = null;
        }
        if (this.kd_alarmSystem) {
            this.kd_alarmSystem.kd_stopAlarm();
            this.kd_alarmSystem = null;
        }

        if (this.kd_options.passwordHash) {
            this.kd_passwordHash = this.kd_options.passwordHash;
        } else if (this.kd_options.password) {
            this.kd_passwordHash = await this.kd_hashText(this.kd_options.password);
            delete this.kd_options.password;
        }

        this.kd_alarmSystem = new kd_AlarmSystem(
            this.kd_options.enableSpeechAlarm ?? (this.kd_options.enableAudioAlarm ?? false),
            this.kd_options.speechMessage || 'Security Alert! System Locked!',
            this.kd_options.enableAudioAlarm ?? false,
            this.kd_options.alarmSoundUrl
        );

        this.kd_tamperGuard = new kd_TamperGuard((details: kd_TamperDetails) => {
            this.kd_handleTamperEvent(details);
        });

        this.kd_ui = new kd_LockUI(
            this.kd_options,
            (pass: string) => this.kd_verifyAndUnlock(pass),
            (ans: string) => this.kd_verifyRecoveryAnswer(ans),
            (newPass: string) => this.kd_resetPasswordAndUnlock(newPass),
            () => this.kd_verifyWebAuthn(),
            () => {
                if (this.kd_options.securityTriggerInteraction !== false) {
                    this.kd_sendSecurityAlert('User interaction detected on lock screen.', false);
                }
            }
        );

        this.kd_autoLockTracker = new kd_AutoLockTracker(
            this.kd_options.autoLockMinutes || 0,
            () => this.kd_lock(),
            () => this.kd_unlock(true),
            (newHash: string) => {
                this.kd_passwordHash = newHash;
                this.kd_options.passwordHash = newHash;
            },
            this.kd_options.channelName
        );

        if (this.kd_options.autoLockMinutes && this.kd_options.autoLockMinutes > 0) {
            this.kd_autoLockTracker.kd_start();
        }


        this.kd_restoreSessionLockState();

        if (this.kd_options.lockOnStartup && !this.kd_isLocked) {
            this.kd_lock();
        }

        if (this.kd_isLocked) {
            if (this.kd_autoLockTracker) {
                this.kd_autoLockTracker.kd_setLockedState(true);
            }
            if (this.kd_ui) {
                this.kd_ui.kd_renderOverlay();
            }
            this.kd_setupHistorySecurityListeners();
        }
    }

    public kd_lock(): void {
        if (this.kd_isLocked) return;
        this.kd_isLocked = true;
        this.kd_lastIntruderSnapshot = null;

        if (this.kd_autoLockTracker) {
            this.kd_autoLockTracker.kd_setLockedState(true);
            this.kd_autoLockTracker.kd_resetActivityTimestamp();
        }

        this.kd_setSessionLockState(true);

        if (this.kd_ui) {
            this.kd_ui.kd_renderOverlay();
        }

        if (this.kd_options.antiTamper !== false && this.kd_tamperGuard) {
            this.kd_tamperGuard.kd_startMonitoring();
        }

        this.kd_setupHistorySecurityListeners();

        this.kd_notifyStateChange();

        if (this.kd_options.onLock) {
            this.kd_options.onLock();
        }
    }

    public kd_unlock(isSilent: boolean = false): void {
        if (!this.kd_isLocked) return;
        this.kd_isLocked = false;
        this.kd_actionCount = 0;
        this.kd_failedAttemptsCount = 0;
        this.kd_lockoutCount = 0;
        this.kd_lockoutUntilTimestamp = 0;

        if (this.kd_lockoutTimerId) {
            clearInterval(this.kd_lockoutTimerId);
            this.kd_lockoutTimerId = null;
        }

        if (this.kd_autoLockTracker) {
            this.kd_autoLockTracker.kd_setLockedState(false);
            this.kd_autoLockTracker.kd_resetActivityTimestamp();
            if (!isSilent) {
                this.kd_autoLockTracker.kd_notifyUnlockEvent();
            }
        }

        this.kd_setSessionLockState(false);

        if (this.kd_tamperGuard) {
            this.kd_tamperGuard.kd_stopMonitoring();
        }

        if (this.kd_alarmSystem) {
            this.kd_alarmSystem.kd_stopAlarm();
        }

        if (this.kd_ui) {
            this.kd_ui.kd_removeOverlay();
        }

        this.kd_removeHistorySecurityListeners();

        if (this.kd_lastIntruderSnapshot) {
            const snapshot = this.kd_lastIntruderSnapshot;
            this.kd_lastIntruderSnapshot = null;
            setTimeout(() => {
                kd_LockUI.kd_showIntruderReviewModal(snapshot.dataUrl, snapshot.reason, snapshot.timestamp);
            }, 300);
        }

        this.kd_notifyStateChange();

        if (this.kd_options.onUnlock) {
            this.kd_options.onUnlock();
        }
    }

    public async kd_updateOptions(newOptions: Partial<kd_ScreenGuardOptions>): Promise<void> {
        this.kd_options = { ...this.kd_options, ...newOptions };

        if (newOptions.password) {
            this.kd_passwordHash = await this.kd_hashText(newOptions.password);
            delete this.kd_options.password;
        } else if (newOptions.passwordHash) {
            this.kd_passwordHash = newOptions.passwordHash;
        }

        if (newOptions.autoLockMinutes !== undefined && this.kd_autoLockTracker) {
            this.kd_autoLockTracker.kd_updateConfig(newOptions.autoLockMinutes);
        }

        if (this.kd_alarmSystem) {
            this.kd_alarmSystem.kd_stopAlarm();
            this.kd_alarmSystem = new kd_AlarmSystem(
                this.kd_options.enableSpeechAlarm ?? (this.kd_options.enableAudioAlarm ?? false),
                this.kd_options.speechMessage || 'Security Alert! System Locked!',
                this.kd_options.enableAudioAlarm ?? false,
                this.kd_options.alarmSoundUrl
            );
            if (this.kd_isLocked) {
                this.kd_alarmSystem.kd_triggerAlarm();
            }
        }

        if (this.kd_isLocked && this.kd_ui) {
            const currentViewId = this.kd_ui.kd_currentActiveViewId;
            this.kd_ui = new kd_LockUI(
                this.kd_options,
                (pass: string) => this.kd_verifyAndUnlock(pass),
                (ans: string) => this.kd_verifyRecoveryAnswer(ans),
                (newPass: string) => this.kd_resetPasswordAndUnlock(newPass),
                () => this.kd_verifyWebAuthn(),
                () => {
                    if (this.kd_options.securityTriggerInteraction !== false) {
                        this.kd_sendSecurityAlert('User interaction detected on lock screen.', false);
                    }
                }
            );
            this.kd_ui.kd_renderOverlay(currentViewId);
        }
    }

    public kd_getState(): kd_LockState {
        return {
            isLocked: this.kd_isLocked,
            lastActivity: Date.now(),
            tamperCount: this.kd_tamperCount
        };
    }

    public async kd_verifyAndUnlock(enteredPassword: string): Promise<boolean> {
        if (this.kd_isLockoutActive()) {
            return false;
        }

        if (!this.kd_passwordHash || !enteredPassword) {
            this.kd_handleFailedAttempt('Empty password attempt or unconfigured password hash.');
            return false;
        }

        const hash = await this.kd_hashText(enteredPassword);
        if (hash === this.kd_passwordHash) {
            this.kd_unlock();
            return true;
        }

        this.kd_handleFailedAttempt('Incorrect password entered.');
        return false;
    }

    public async kd_verifyWebAuthn(): Promise<boolean> {
        if (this.kd_isLockoutActive()) {
            return false;
        }

        const success = await kd_WebAuthnManager.kd_authenticateBiometrics(this.kd_options.webAuthnCredentialId);
        if (success) {
            this.kd_unlock();
            return true;
        }

        this.kd_handleFailedAttempt('Biometric verification failed.');
        return false;
    }

    public async kd_verifyRecoveryAnswer(enteredAnswer: string): Promise<boolean> {
        if (this.kd_isLockoutActive()) {
            return false;
        }

        if (!this.kd_options.securityAnswerHash || !enteredAnswer || !enteredAnswer.trim()) {
            this.kd_handleFailedAttempt('Empty recovery answer attempt or unconfigured recovery hash.');
            return false;
        }

        const hash = await this.kd_hashText(enteredAnswer.toLowerCase().trim());
        if (hash === this.kd_options.securityAnswerHash) {
            return true;
        }

        this.kd_handleFailedAttempt('Incorrect password recovery answer attempt.');
        return false;
    }

    public async kd_resetPasswordAndUnlock(newPassword: string): Promise<void> {
        if (!newPassword) return;

        const newHash = await this.kd_hashText(newPassword);

        if (this.kd_options.onPasswordReset) {
            await this.kd_options.onPasswordReset(newHash);
        }

        this.kd_passwordHash = newHash;
        this.kd_options.passwordHash = newHash;

        if (this.kd_autoLockTracker) {
            this.kd_autoLockTracker.kd_notifyPasswordResetEvent(newHash);
        }

        this.kd_unlock();
    }

    public kd_createLockButton(): HTMLButtonElement {
        const btn = kd_LockUI.kd_createHeaderLockButtonIcon();
        btn.onclick = (e) => {
            e.stopPropagation();
            this.kd_lock();
        };
        this.kd_attachedButtons.push(btn);
        return btn;
    }

    public kd_attachLockButton(target: string | HTMLElement): HTMLButtonElement | null {
        if (typeof document === 'undefined') return null;

        let el: HTMLElement | null = null;
        if (typeof target === 'string') {
            el = document.querySelector(target);
        } else {
            el = target;
        }

        if (!el) return null;

        const btn = this.kd_createLockButton();
        el.appendChild(btn);
        return btn;
    }

    public kd_destroy(): void {
        this.kd_unlock();
        this.kd_removeHistorySecurityListeners();
        if (this.kd_autoLockTracker) {
            this.kd_autoLockTracker.kd_destroy();
            this.kd_autoLockTracker = null;
        }
        if (this.kd_tamperGuard) {
            this.kd_tamperGuard.kd_stopMonitoring();
            this.kd_tamperGuard = null;
        }
        if (this.kd_alarmSystem) {
            this.kd_alarmSystem.kd_stopAlarm();
            this.kd_alarmSystem = null;
        }
        this.kd_attachedButtons.forEach((btn) => {
            btn.onclick = null;
        });
        this.kd_attachedButtons = [];
        this.kd_ui = null;
        this.kd_lastIntruderSnapshot = null;
    }

    private async kd_hashText(text: string): Promise<string> {
        if (this.kd_options.salt) {
            return await kd_workerCrypto.kd_pbkdf2(text, this.kd_options.salt, this.kd_options.iterations || 100000);
        }
        return await kd_workerCrypto.kd_sha256(text);
    }

    private kd_setupHistorySecurityListeners(): void {
        if (typeof window === 'undefined' || this.kd_historySecurityHandler) return;

        this.kd_historySecurityHandler = () => {
            if (this.kd_isLocked) {
                this.kd_sendSecurityAlert('Browser history navigation detected while locked.', false);
            }
        };

        window.addEventListener('popstate', this.kd_historySecurityHandler);
        window.addEventListener('hashchange', this.kd_historySecurityHandler);
    }

    private kd_removeHistorySecurityListeners(): void {
        if (typeof window === 'undefined' || !this.kd_historySecurityHandler) return;

        window.removeEventListener('popstate', this.kd_historySecurityHandler);
        window.removeEventListener('hashchange', this.kd_historySecurityHandler);
        this.kd_historySecurityHandler = null;
    }

    private async kd_handleFailedAttempt(reason: string): Promise<void> {
        this.kd_failedAttemptsCount++;
        const maxAttempts = this.kd_options.maxFailedAttempts || 5;

        if (this.kd_options.enableIntruderSnapshot) {
            try {
                const photoUrl = await kd_IntruderCamera.kd_captureSnapshot();
                if (photoUrl) {
                    this.kd_lastIntruderSnapshot = {
                        dataUrl: photoUrl,
                        reason: `Unauthorized unlock attempt: ${reason}`,
                        timestamp: Date.now()
                    };
                    if (this.kd_options.onIntruderCaptured) {
                        const alertDetails: kd_SecurityAlertDetails = {
                            reason,
                            timestamp: Date.now(),
                            actionCount: this.kd_actionCount,
                            isLocked: this.kd_isLocked,
                            intruderSnapshotUrl: photoUrl
                        };
                        this.kd_options.onIntruderCaptured(photoUrl, alertDetails);
                    }
                }
            } catch {
                // Ignore photo capture rejection
            }
        }

        if (this.kd_options.enableLockout === false) {
            if (this.kd_ui) {
                this.kd_ui.kd_showError('Incorrect password entered.');
            }
            this.kd_sendSecurityAlert(`Failed authentication attempt: ${reason}`, false);
            return;
        }

        if (this.kd_failedAttemptsCount >= maxAttempts) {
            this.kd_lockoutCount++;
            const baseDuration = this.kd_options.lockoutDurationSeconds || 30;
            let durationSec = baseDuration;

            if (this.kd_options.enableExponentialLockout !== false) {
                if (this.kd_lockoutCount === 1) {
                    durationSec = baseDuration; // 30s
                } else if (this.kd_lockoutCount === 2) {
                    durationSec = Math.max(baseDuration * 2, 60); // 1m
                } else if (this.kd_lockoutCount === 3) {
                    durationSec = Math.max(baseDuration * 10, 300); // 5m
                } else if (this.kd_lockoutCount === 4) {
                    durationSec = Math.max(baseDuration * 30, 900); // 15m
                } else {
                    durationSec = Math.max(baseDuration * 120, 3600); // 1h max
                }
            }

            this.kd_lockoutUntilTimestamp = Date.now() + durationSec * 1000;
            this.kd_saveSecurityState();
            this.kd_startLockoutCountdown();
            this.kd_sendSecurityAlert(`Max failed authentication attempts exceeded (${this.kd_failedAttemptsCount}). Lockout level ${this.kd_lockoutCount} engaged (${durationSec}s).`, true);
        } else {
            this.kd_saveSecurityState();
            const remaining = maxAttempts - this.kd_failedAttemptsCount;
            if (this.kd_ui) {
                if (remaining === 1) {
                    this.kd_ui.kd_showError('Warning: 1 attempt remaining before temporary security lockout.');
                } else {
                    this.kd_ui.kd_showError('Incorrect password.');
                }
            }
            this.kd_sendSecurityAlert(`Failed authentication attempt: ${reason}`, false);
        }
    }


    private kd_handleTamperEvent(details: kd_TamperDetails): void {
        this.kd_tamperCount++;

        // Enforce immediate 5-minute Hard Lockout on storage/DOM tampering
        const baseDuration = Math.max(this.kd_options.lockoutDurationSeconds || 30, 300); // 5 minutes minimum for tampering
        this.kd_lockoutUntilTimestamp = Date.now() + baseDuration * 1000;
        this.kd_saveSecurityState();
        this.kd_startLockoutCountdown();

        if (this.kd_options.enableIntruderSnapshot) {
            kd_IntruderCamera.kd_captureSnapshot().then((photoUrl) => {
                if (photoUrl) {
                    this.kd_lastIntruderSnapshot = {
                        dataUrl: photoUrl,
                        reason: `Anti-Tamper Security Triggered: ${details.reason}`,
                        timestamp: Date.now()
                    };
                    if (this.kd_options.onIntruderCaptured) {
                        const alertDetails: kd_SecurityAlertDetails = {
                            reason: details.reason,
                            timestamp: Date.now(),
                            actionCount: this.kd_actionCount,
                            isLocked: this.kd_isLocked,
                            intruderSnapshotUrl: photoUrl
                        };
                        this.kd_options.onIntruderCaptured(photoUrl, alertDetails);
                    }
                }
            }).catch(() => {});
        }

        if (this.kd_ui) {
            this.kd_ui.kd_renderOverlay();
        }

        this.kd_sendSecurityAlert(`Critical Security Tamper Event Detected: ${details.reason}. 5-minute Hard Lockout engaged.`, true);
    }

    private kd_isLockoutActive(): boolean {
        if (this.kd_lockoutUntilTimestamp > Date.now()) {
            const remainingSec = Math.ceil((this.kd_lockoutUntilTimestamp - Date.now()) / 1000);
            if (this.kd_ui) {
                this.kd_ui.kd_showLockoutError(remainingSec);
            }
            return true;
        }
        if (this.kd_ui) {
            this.kd_ui.kd_clearLockoutError();
        }
        return false;
    }

    private kd_startLockoutCountdown(): void {
        if (this.kd_lockoutTimerId) {
            clearInterval(this.kd_lockoutTimerId);
        }

        this.kd_lockoutTimerId = setInterval(() => {
            if (this.kd_lockoutUntilTimestamp <= Date.now()) {
                clearInterval(this.kd_lockoutTimerId!);
                this.kd_lockoutTimerId = null;
                this.kd_failedAttemptsCount = 0;
                if (this.kd_ui) {
                    this.kd_ui.kd_clearError();
                }
            } else {
                this.kd_isLockoutActive();
            }
        }, 1000);
    }

    private kd_sendSecurityAlert(message: string, isSevere: boolean = false): void {
        const now = Date.now();
        if (now - this.kd_lastAlertTimestamp < 1000 && !isSevere) return;
        this.kd_lastAlertTimestamp = now;

        if (this.kd_alarmSystem) {
            this.kd_alarmSystem.kd_triggerAlarm(isSevere);
        }

        if (this.kd_options.onSecurityAlert) {
            const alertDetails: kd_SecurityAlertDetails = {
                reason: message,
                timestamp: now,
                actionCount: ++this.kd_actionCount,
                isLocked: this.kd_isLocked
            };
            this.kd_options.onSecurityAlert(alertDetails);
        }
    }

    private kd_notifyStateChange(): void {
        if (this.kd_options.onStateChange) {
            this.kd_options.onStateChange(this.kd_getState());
        }
    }

    private kd_setSessionLockState(locked: boolean): void {
        if (typeof window === 'undefined') return;
        const storage = this.kd_options.persistLockState === 'local' ? localStorage : sessionStorage;
        if (locked) {
            storage.setItem(LOCK_STORAGE_KEY, 'true');
        } else {
            storage.removeItem(LOCK_STORAGE_KEY);
            sessionStorage.removeItem(LOCK_STORAGE_KEY);
            localStorage.removeItem(LOCK_STORAGE_KEY);

            sessionStorage.removeItem(FAILED_ATTEMPTS_STORAGE_KEY);
            localStorage.removeItem(FAILED_ATTEMPTS_STORAGE_KEY);

            sessionStorage.removeItem(LOCKOUT_COUNT_STORAGE_KEY);
            localStorage.removeItem(LOCKOUT_COUNT_STORAGE_KEY);

            sessionStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
            localStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
        }
    }

    private kd_saveSecurityState(): void {
        if (typeof window === 'undefined') return;
        const storage = this.kd_options.persistLockState === 'local' ? localStorage : sessionStorage;
        if (this.kd_isLocked) {
            storage.setItem(LOCK_STORAGE_KEY, 'true');
        }

        // Security Rule: Failed attempts and active lockout timers ALWAYS save to localStorage so closing tab/browser can NEVER bypass lockout!
        localStorage.setItem(FAILED_ATTEMPTS_STORAGE_KEY, String(this.kd_failedAttemptsCount));
        localStorage.setItem(LOCKOUT_COUNT_STORAGE_KEY, String(this.kd_lockoutCount));
        if (this.kd_lockoutUntilTimestamp > Date.now()) {
            localStorage.setItem(LOCKOUT_UNTIL_STORAGE_KEY, String(this.kd_lockoutUntilTimestamp));
        } else {
            localStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
        }
    }

    private kd_restoreSessionLockState(): void {
        if (typeof window === 'undefined') return;
        const storage = this.kd_options.persistLockState === 'local' ? localStorage : sessionStorage;

        const savedLocked = storage.getItem(LOCK_STORAGE_KEY) || sessionStorage.getItem(LOCK_STORAGE_KEY) || localStorage.getItem(LOCK_STORAGE_KEY);
        if (savedLocked === 'true') {
            this.kd_isLocked = true;
        }

        const savedFailed = localStorage.getItem(FAILED_ATTEMPTS_STORAGE_KEY) || sessionStorage.getItem(FAILED_ATTEMPTS_STORAGE_KEY);
        if (savedFailed) {
            this.kd_failedAttemptsCount = parseInt(savedFailed, 10) || 0;
        }

        const savedLockoutCount = localStorage.getItem(LOCKOUT_COUNT_STORAGE_KEY) || sessionStorage.getItem(LOCKOUT_COUNT_STORAGE_KEY);
        if (savedLockoutCount) {
            this.kd_lockoutCount = parseInt(savedLockoutCount, 10) || 0;
        }

        // Active security lockout ALWAYS checks localStorage
        const savedUntil = localStorage.getItem(LOCKOUT_UNTIL_STORAGE_KEY) || sessionStorage.getItem(LOCKOUT_UNTIL_STORAGE_KEY);
        if (savedUntil) {
            const untilTs = parseInt(savedUntil, 10) || 0;
            if (untilTs > Date.now()) {
                this.kd_lockoutUntilTimestamp = untilTs;
                this.kd_isLocked = true;
                this.kd_startLockoutCountdown();
            } else {
                localStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
                sessionStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
            }
        }
    }
}
