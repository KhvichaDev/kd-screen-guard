/**
 * Core type definitions and configuration options for kd-screen-guard library.
 * Includes Lock Persistence across browser closures, Lock on Startup, WebAuthn Biometrics, Intruder Snapshot, PBKDF2, and structured security details.
 */
interface kd_SecurityAlertDetails {
    reason: string;
    timestamp: number;
    actionCount: number;
    isLocked: boolean;
    intruderSnapshotUrl?: string;
}
interface kd_ScreenGuardOptions {
    /**
     * Lock screen immediately upon application/browser initialization.
     */
    lockOnStartup?: boolean;
    /**
     * Storage persistence mode for lock state.
     * 'session' = persists across page reloads/refreshes.
     * 'local' = persists across browser closures and computer restarts.
     */
    persistLockState?: 'session' | 'local';
    /**
     * Enable WebAuthn Biometric unlock (Touch ID, Face ID, Windows Hello, YubiKey).
     */
    enableWebAuthn?: boolean;
    /**
     * Optional pre-registered WebAuthn Credential ID string.
     */
    webAuthnCredentialId?: string;
    /**
     * Enable webcam photo snapshot capture during security incidents or failed attempts.
     */
    enableIntruderSnapshot?: boolean;
    /**
     * Optional salt string for PBKDF2 key derivation (Rainbow Table protection).
     */
    salt?: string;
    /**
     * PBKDF2 iteration count. Defaults to 100,000 if salt is provided.
     */
    iterations?: number;
    /**
     * Custom BroadcastChannel name for multi-instance origin isolation.
     */
    channelName?: string;
    /**
     * Initial pre-hashed password SHA-256 or PBKDF2 hex string.
     */
    passwordHash?: string;
    /**
     * Plain text password to hash upon initialization if hash is not directly provided.
     */
    password?: string;
    /**
     * Inactivity threshold in minutes before global auto-lock triggers. Set to 0 to disable.
     */
    autoLockMinutes?: number;
    /**
     * Lock screen immediately when the browser tab or window loses focus.
     */
    lockOnBlur?: boolean;
    /**
     * Enable physical detachment of target DOM content while locked to prevent devtools inspection.
     */
    enableDomVault?: boolean;
    /**
     * Target selector string or HTMLElement to physically detach when DOM Vault is enabled. Defaults to 'main'.
     */
    domVaultTarget?: string | HTMLElement;
    /**
     * Render the lock overlay inside a Closed Shadow DOM boundary to isolate UI styles.
     */
    useShadowDom?: boolean;
    /**
     * Enable MutationObserver self-healing protection to prevent DOM tampering.
     */
    antiTamper?: boolean;
    /**
     * Enable audio alarm when unauthorized interaction or tampering occurs.
     */
    enableAudioAlarm?: boolean;
    /**
     * URL for security alarm sound file.
     */
    alarmSoundUrl?: string;
    /**
     * Enable Text-to-Speech alarm message playback.
     */
    enableSpeechAlarm?: boolean;
    /**
     * Text message for Speech Synthesis alarm.
     */
    speechMessage?: string;
    /**
     * Number of unauthorized actions before security alert is dispatched.
     */
    securityAlertThreshold?: number;
    /**
     * Enable or disable consecutive failed attempt lockout system. Defaults to true.
     */
    enableLockout?: boolean;
    /**
     * Enable progressive exponential backoff lockout duration (30s -> 1m -> 5m -> 15m -> 1h). Defaults to true.
     */
    enableExponentialLockout?: boolean;
    /**
     * Maximum consecutive failed password attempts before temporary lockout. Set to 0 to disable.
     */
    maxFailedAttempts?: number;
    /**
     * Base duration in seconds for temporary lockout when max failed attempts is exceeded.
     */
    lockoutDurationSeconds?: number;
    /**
     * Trigger security alert on page reload attempt while locked.
     */
    securityTriggerReload?: boolean;
    /**
     * Trigger security alert on overlay background interaction while locked.
     */
    securityTriggerInteraction?: boolean;
    /**
     * Optional security question for password recovery flow.
     */
    securityQuestion?: string;
    /**
     * Pre-hashed answer SHA-256 or PBKDF2 string for recovery question.
     */
    securityAnswerHash?: string;
    /**
     * Title displayed on lock panel.
     */
    title?: string;
    /**
     * Subtitle or instruction message displayed on lock panel.
     */
    subtitle?: string;
    /**
     * Custom CSS class injected into lock overlay container.
     */
    customCssClass?: string;
    /**
     * Callback fired when screen is successfully locked.
     */
    onLock?: () => void;
    /**
     * Callback fired when screen is successfully unlocked.
     */
    onUnlock?: () => void;
    /**
     * Callback fired when state transitions (locked/unlocked).
     */
    onStateChange?: (state: kd_LockState) => void;
    /**
     * Callback fired when password is reset in recovery view. Supports async server synchronization.
     */
    onPasswordReset?: (newPasswordHash: string) => Promise<void> | void;
    /**
     * Callback fired when DOM tampering attempt is detected and healed.
     */
    onTamperDetected?: (details: kd_TamperDetails) => void;
    /**
     * Callback fired when security alert condition is met with structured metadata.
     */
    onSecurityAlert?: (details: kd_SecurityAlertDetails) => void;
    /**
     * Callback fired when intruder snapshot photo is captured.
     */
    onIntruderCaptured?: (dataUrl: string, details: kd_SecurityAlertDetails) => void;
    /**
     * Callback fired when WebAuthn biometric credential is registered.
     */
    onWebAuthnRegister?: (credentialId: string) => void;
}
interface kd_TamperDetails {
    timestamp: number;
    reason: string;
}
interface kd_LockState {
    isLocked: boolean;
    lastActivity: number;
    tamperCount: number;
}

/**
 * Web Crypto API Cryptographic Engine with Pure JS Fallbacks.
 * Handles SHA-256 hashing and PBKDF2 100,000 iterations key derivation with ArrayBuffer detachment safety.
 */
declare function kd_sha256(data: string): Promise<string>;
declare function kd_pbkdf2(password: string, salt: string, iterations?: number): Promise<string>;

/**
 * Main Orchestrator Engine for kd-screen-guard library.
 * Coordinates authentication state, Startup locking & LocalStorage persistence, WebAuthn Biometrics, Web Worker crypto processing, Intruder Snapshot photo capture, PBKDF2 salted key derivation, SPA history security alerts, and system sleep mode timestamp resets.
 */

declare class kd_LockEngine {
    private kd_options;
    private kd_passwordHash;
    private kd_isLocked;
    private kd_tamperCount;
    private kd_actionCount;
    private kd_failedAttemptsCount;
    private kd_lockoutCount;
    private kd_lockoutUntilTimestamp;
    private kd_lockoutTimerId;
    private kd_lastAlertTimestamp;
    private kd_autoLockTracker;
    private kd_domVault;
    private kd_tamperGuard;
    private kd_alarmSystem;
    private kd_ui;
    private kd_attachedButtons;
    private kd_historySecurityHandler;
    private kd_lastIntruderSnapshot;
    constructor(options?: kd_ScreenGuardOptions);
    get kd_isLockedState(): boolean;
    kd_init(): Promise<void>;
    kd_lock(): void;
    kd_unlock(isSilent?: boolean): void;
    kd_updateOptions(newOptions: Partial<kd_ScreenGuardOptions>): Promise<void>;
    kd_getState(): kd_LockState;
    private kd_isHashing;
    kd_verifyAndUnlock(enteredPassword: string): Promise<boolean>;
    kd_verifyWebAuthn(): Promise<boolean>;
    kd_verifyRecoveryAnswer(enteredAnswer: string): Promise<boolean>;
    kd_resetPasswordAndUnlock(newPassword: string): Promise<void>;
    kd_createLockButton(): HTMLButtonElement;
    kd_attachLockButton(target: string | HTMLElement): HTMLButtonElement | null;
    kd_destroy(): void;
    private kd_hashText;
    private kd_setupHistorySecurityListeners;
    private kd_removeHistorySecurityListeners;
    private kd_handleFailedAttempt;
    private kd_handleTamperEvent;
    private kd_isLockoutActive;
    private kd_startLockoutCountdown;
    private kd_sendSecurityAlert;
    private kd_notifyStateChange;
    private kd_setSessionLockState;
    private kd_saveSecurityState;
    private kd_restoreSessionLockState;
}

/**
 * DOM Vault Manager for physically detaching sensitive application content during locked state.
 * Prevents DevTools inspection and DOM querying when screen guard is active.
 */
declare class kd_DomVault {
    private kd_target;
    private kd_detachedElement;
    private kd_placeholderNode;
    constructor(target?: string | HTMLElement);
    kd_detach(): boolean;
    kd_restore(): boolean;
    get kd_isDetached(): boolean;
    private kd_findTargetElement;
}

declare class ScreenGuard {
    private kd_engine;
    constructor(options?: kd_ScreenGuardOptions);
    get isLocked(): boolean;
    init(): Promise<void>;
    lock(): void;
    unlock(): void;
    updateOptions(newOptions: Partial<kd_ScreenGuardOptions>): Promise<void>;
    getState(): kd_LockState;
    createLockButton(): HTMLButtonElement;
    attachLockButton(target: string | HTMLElement): HTMLButtonElement | null;
    destroy(): void;
    static registerBiometrics(userDisplayName?: string): Promise<string | null>;
    static isBiometricsSupported(): Promise<boolean>;
    static hashPassword(password: string, salt?: string, iterations?: number): Promise<string>;
    static pbkdf2(password: string, salt: string, iterations?: number): Promise<string>;
    static hashRecoveryAnswer(answer: string, salt?: string, iterations?: number): Promise<string>;
}

export { ScreenGuard, ScreenGuard as default, kd_DomVault, kd_LockEngine, type kd_LockState, type kd_ScreenGuardOptions, type kd_SecurityAlertDetails, type kd_TamperDetails, kd_pbkdf2, kd_sha256 };
