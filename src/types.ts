/**
 * Core type definitions and configuration options for kd-screen-guard library.
 * Includes Lock Persistence across browser closures, Lock on Startup, WebAuthn Biometrics, Intruder Snapshot, PBKDF2, and structured security details.
 */

export interface kd_SecurityAlertDetails {
    reason: string;
    timestamp: number;
    actionCount: number;
    isLocked: boolean;
    intruderSnapshotUrl?: string;
}

export interface kd_ScreenGuardOptions {
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

export interface kd_TamperDetails {
    timestamp: number;
    reason: string;
}

export interface kd_LockState {
    isLocked: boolean;
    lastActivity: number;
    tamperCount: number;
}
