/**
 * UI Renderer for Screen Lock Overlay, Focus Trap, Recovery Views, WebAuthn Biometrics, and Intruder Snapshot Review Modal.
 * Implements W3C Live Region error accessibility, WebAuthn Biometrics button, IME composition Enter key protection, focus trapping, and Intruder photo review.
 */

import { kd_ScreenGuardOptions } from '../types';

const LOCK_HEADER_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;

const EYE_ICON_SVG = `<svg class="kd-eye-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>`;
const EYE_SLASHED_ICON_SVG = `<svg class="kd-eye-icon-slashed" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 1.78 9.93 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></svg>`;

export function kd_escapeHTML(str?: string): string {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export function kd_sanitizeCssClass(str?: string): string {
    if (!str) return '';
    return str.replace(/[^\w\s-]/g, '').trim();
}

export class kd_LockUI {
    private kd_options: kd_ScreenGuardOptions;
    private kd_onUnlockAttempt: (enteredPassword: string) => Promise<boolean>;
    private kd_onRecoveryAttempt?: (enteredAnswer: string) => Promise<boolean>;
    private kd_onResetPassword?: (newPassword: string) => Promise<void>;
    private kd_onWebAuthnAttempt?: () => Promise<boolean>;
    private kd_onBackgroundInteraction?: () => void;
    private kd_focusTrapHandler: ((evt: KeyboardEvent) => void) | null = null;
    private kd_touchMoveHandler: ((evt: TouchEvent) => void) | null = null;
    private kd_visibilitySecurityHandler: (() => void) | null = null;
    private kd_isSubmitting: boolean = false;
    private kd_activeViewId: string = 'kd-view-password';
    private kd_shadowRoot: ShadowRoot | null = null;
    private kd_shadowHost: HTMLElement | null = null;

    constructor(
        options: kd_ScreenGuardOptions,
        onUnlockAttempt: (enteredPassword: string) => Promise<boolean>,
        onRecoveryAttempt?: (enteredAnswer: string) => Promise<boolean>,
        onResetPassword?: (newPassword: string) => Promise<void>,
        onWebAuthnAttempt?: () => Promise<boolean>,
        onBackgroundInteraction?: () => void
    ) {
        this.kd_options = options;
        this.kd_onUnlockAttempt = onUnlockAttempt;
        this.kd_onRecoveryAttempt = onRecoveryAttempt;
        this.kd_onResetPassword = onResetPassword;
        this.kd_onWebAuthnAttempt = onWebAuthnAttempt;
        this.kd_onBackgroundInteraction = onBackgroundInteraction;
    }

    public get kd_currentActiveViewId(): string {
        return this.kd_activeViewId;
    }

    private kd_getOverlayContainer(): HTMLElement | null {
        if (this.kd_shadowRoot) {
            return this.kd_shadowRoot.querySelector('#kd-lock-screen') as HTMLElement | null;
        }
        return document.getElementById('kd-lock-screen');
    }

    private kd_getScopedElement<T extends HTMLElement>(id: string): T | null {
        if (this.kd_shadowRoot) {
            return this.kd_shadowRoot.querySelector(`#${id}`) as T | null;
        }
        return document.getElementById(id) as T | null;
    }

    public kd_renderOverlay(preserveViewId?: string): void {
        if (typeof document === 'undefined') return;

        this.kd_removeOverlay();

        if (preserveViewId) {
            this.kd_activeViewId = preserveViewId;
        }

        const titleText = kd_escapeHTML(this.kd_options.title || 'Application Locked');
        const subtitleText = kd_escapeHTML(this.kd_options.subtitle || 'Please enter your password to continue.');
        const questionText = kd_escapeHTML(this.kd_options.securityQuestion || '');
        const customClass = kd_sanitizeCssClass(this.kd_options.customCssClass || '');

        const isPassActive = this.kd_activeViewId === 'kd-view-password' ? 'active' : '';
        const isRecActive = this.kd_activeViewId === 'kd-view-recovery' ? 'active' : '';
        const isResetActive = this.kd_activeViewId === 'kd-view-reset' ? 'active' : '';

        const webAuthnBtnHTML = this.kd_options.enableWebAuthn
            ? `<button type="button" id="kd-btn-webauthn" class="kd-btn-webauthn"><span>👆 Touch ID / Face ID / Hello</span></button>`
            : '';

        const overlayHTML = `
            <div class="kd-lock-overlay ${customClass}" id="kd-lock-screen" role="dialog" aria-modal="true">
                <div class="kd-lock-panel" tabindex="-1">

                    <!-- View: Password Login -->
                    <div id="kd-view-password" class="kd-view ${isPassActive}">
                        <h2>${titleText}</h2>
                        <p>${subtitleText}</p>
                        <div class="kd-lock-input-container">
                            <input type="password" id="kd-lock-password-input" class="kd-lock-input" placeholder="Password" autocomplete="current-password">
                            <button type="button" class="kd-password-toggle" data-target="kd-lock-password-input" aria-label="Show Password" aria-pressed="false" title="Show Password">
                                ${EYE_ICON_SVG}
                                ${EYE_SLASHED_ICON_SVG}
                            </button>
                        </div>
                        <div class="kd-lock-error" id="kd-password-error" aria-live="polite" role="status"></div>
                        <button type="button" id="kd-unlock-btn" class="kd-lock-button">Unlock</button>
                        ${webAuthnBtnHTML}
                        <button type="button" id="kd-forgot-link" class="kd-lock-forgot-link" ${!this.kd_options.securityQuestion || !this.kd_options.securityAnswerHash ? 'disabled title="No security question is set"' : ''}>Forgot Password?</button>
                    </div>

                    <!-- View: Recovery Question -->
                    <div id="kd-view-recovery" class="kd-view ${isRecActive}">
                        <h2>Password Recovery</h2>
                        <p id="kd-recovery-question-text">${questionText}</p>
                        <div class="kd-lock-input-container">
                            <input type="password" id="kd-recovery-answer-input" class="kd-lock-input" placeholder="Your Answer" autocomplete="off">
                            <button type="button" class="kd-password-toggle" data-target="kd-recovery-answer-input" aria-label="Show Answer" aria-pressed="false" title="Show Answer">
                                ${EYE_ICON_SVG}
                                ${EYE_SLASHED_ICON_SVG}
                            </button>
                        </div>
                        <div class="kd-lock-error" id="kd-recovery-error" aria-live="polite" role="status"></div>
                        <button type="button" id="kd-submit-answer-btn" class="kd-lock-button">Submit Answer</button>
                        <button type="button" id="kd-back-to-login-link" class="kd-lock-forgot-link">Back to Login</button>
                    </div>

                    <!-- View: Reset Password -->
                    <div id="kd-view-reset" class="kd-view ${isResetActive}">
                        <h2>Set New Password</h2>
                        <p>Please enter and confirm your new password.</p>
                        <div class="kd-lock-input-container">
                            <input type="password" id="kd-reset-new-password" class="kd-lock-input" placeholder="New Password" autocomplete="new-password">
                            <button type="button" class="kd-password-toggle" data-target="kd-reset-new-password" aria-label="Show Password" aria-pressed="false" title="Show Password">
                                ${EYE_ICON_SVG}
                                ${EYE_SLASHED_ICON_SVG}
                            </button>
                        </div>
                        <div class="kd-lock-input-container">
                            <input type="password" id="kd-reset-confirm-password" class="kd-lock-input" placeholder="Confirm New Password" autocomplete="new-password">
                            <button type="button" class="kd-password-toggle" data-target="kd-reset-confirm-password" aria-label="Show Password" aria-pressed="false" title="Show Password">
                                ${EYE_ICON_SVG}
                                ${EYE_SLASHED_ICON_SVG}
                            </button>
                        </div>
                        <div class="kd-lock-error" id="kd-reset-error" aria-live="polite" role="status"></div>
                        <button type="button" id="kd-reset-password-btn" class="kd-lock-button">Set New Password & Unlock</button>
                        <button type="button" id="kd-reset-back-to-login-link" class="kd-lock-forgot-link">Back to Login</button>
                    </div>
                </div>
            </div>
        `;

        if (this.kd_options.useShadowDom) {
            this.kd_shadowHost = document.createElement('div');
            this.kd_shadowHost.id = 'kd-lock-screen-host';
            this.kd_shadowHost.style.position = 'fixed';
            this.kd_shadowHost.style.top = '0';
            this.kd_shadowHost.style.left = '0';
            this.kd_shadowHost.style.width = '100%';
            this.kd_shadowHost.style.height = '100%';
            this.kd_shadowHost.style.zIndex = '9999999';

            this.kd_shadowRoot = this.kd_shadowHost.attachShadow({ mode: 'closed' });
            this.kd_shadowRoot.innerHTML = overlayHTML;
            document.body.appendChild(this.kd_shadowHost);
        } else {
            document.body.insertAdjacentHTML('beforeend', overlayHTML);
        }
        document.body.classList.add('kd-body-locked');

        this.kd_setAriaHiddenSiblings(true);
        this.kd_setupFocusTrap();
        this.kd_setupTouchMovePrevention();
        this.kd_setupVisibilitySecurity();
        this.kd_bindEvents();
    }

    public kd_removeOverlay(): void {
        if (typeof document === 'undefined') return;

        this.kd_setAriaHiddenSiblings(false);
        if (this.kd_shadowHost) {
            this.kd_shadowHost.remove();
            this.kd_shadowHost = null;
            this.kd_shadowRoot = null;
        }
        const existing = document.getElementById('kd-lock-screen');
        if (existing) existing.remove();

        document.body.classList.remove('kd-body-locked');

        if (this.kd_focusTrapHandler) {
            window.removeEventListener('keydown', this.kd_focusTrapHandler, true);
            this.kd_focusTrapHandler = null;
        }

        if (this.kd_touchMoveHandler) {
            window.removeEventListener('touchmove', this.kd_touchMoveHandler);
            this.kd_touchMoveHandler = null;
        }

        if (this.kd_visibilitySecurityHandler) {
            document.removeEventListener('visibilitychange', this.kd_visibilitySecurityHandler);
            this.kd_visibilitySecurityHandler = null;
        }

        this.kd_isSubmitting = false;
    }

    public static kd_createHeaderLockButtonIcon(): HTMLButtonElement {
        const btnContainer = document.createElement('button');
        btnContainer.type = 'button';
        btnContainer.title = 'Lock Screen';
        btnContainer.setAttribute('aria-label', 'Lock Screen');
        btnContainer.className = 'kd-header-lock-btn';
        btnContainer.innerHTML = LOCK_HEADER_ICON;
        return btnContainer;
    }

    public static kd_showIntruderReviewModal(dataUrl: string, reason: string, timestamp: number): void {
        if (typeof document === 'undefined' || !dataUrl) return;

        const existingModal = document.getElementById('kd-intruder-modal');
        if (existingModal) existingModal.remove();

        const dateStr = new Date(timestamp).toLocaleString();
        const reasonText = kd_escapeHTML(reason);

        const modalHTML = `
            <div class="kd-intruder-overlay" id="kd-intruder-modal" role="dialog" aria-modal="true">
                <div class="kd-intruder-panel">
                    <div class="kd-intruder-badge">
                        <span>⚠️ Intruder Snapshot Captured</span>
                    </div>
                    <h3>Security Incident Detected</h3>
                    <p>An unauthorized attempt occurred on <strong>${dateStr}</strong>.<br>Reason: <em>${reasonText}</em></p>
                    <div class="kd-intruder-img-container">
                        <img src="${dataUrl}" alt="Intruder Snapshot" class="kd-intruder-img">
                    </div>
                    <div class="kd-intruder-actions">
                        <button type="button" id="kd-btn-download-snapshot" class="kd-btn-download">
                            <span>📥 Download Photo</span>
                        </button>
                        <button type="button" id="kd-btn-dismiss-snapshot" class="kd-btn-dismiss">
                            <span>✖️ Dismiss & Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('kd-intruder-modal');
        if (!modal) return;

        const downloadBtn = modal.querySelector('#kd-btn-download-snapshot');
        const dismissBtn = modal.querySelector('#kd-btn-dismiss-snapshot');

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = `intruder_snapshot_${Date.now()}.jpg`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
        }

        if (dismissBtn) {
            dismissBtn.addEventListener('click', () => {
                modal.remove();
            });
        }
    }

    public kd_showError(msgOrElementId: string, message?: string): void {
        if (typeof document === 'undefined') return;
        if (message !== undefined) {
            const el = this.kd_getScopedElement(msgOrElementId);
            if (el) el.textContent = message;
        } else {
            const el = this.kd_getScopedElement('kd-password-error') || this.kd_getScopedElement('kd-recovery-error') || this.kd_getScopedElement('kd-reset-error');
            if (el) el.textContent = msgOrElementId;
        }
    }

    public kd_clearError(): void {
        this.kd_showError('');
    }

    public kd_showLockoutError(secondsRemaining: number): void {
        this.kd_showError(`Too many failed attempts. Locked out for ${secondsRemaining}s.`);
        const unlockBtn = this.kd_getScopedElement<HTMLButtonElement>('kd-unlock-btn');
        const passInput = this.kd_getScopedElement<HTMLInputElement>('kd-lock-password-input');

        if (unlockBtn) {
            unlockBtn.disabled = true;
            unlockBtn.setAttribute('data-lockout', 'true');
        }
        if (passInput) passInput.disabled = true;
    }

    public kd_clearLockoutError(): void {
        this.kd_showError('');
        const unlockBtn = this.kd_getScopedElement<HTMLButtonElement>('kd-unlock-btn');
        const passInput = this.kd_getScopedElement<HTMLInputElement>('kd-lock-password-input');

        if (unlockBtn) {
            unlockBtn.disabled = false;
            unlockBtn.removeAttribute('data-lockout');
        }
        if (passInput) passInput.disabled = false;
    }

    public kd_destroy(): void {
        this.kd_removeOverlay();
    }

    private kd_setAriaHiddenSiblings(hide: boolean): void {
        if (typeof document === 'undefined') return;
        const children = Array.from(document.body.children);
        children.forEach((child) => {
            if (child.id !== 'kd-lock-screen' && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE') {
                if (hide) {
                    child.setAttribute('aria-hidden', 'true');
                    child.setAttribute('data-kd-aria-hidden', 'true');
                } else if (child.getAttribute('data-kd-aria-hidden') === 'true') {
                    child.removeAttribute('aria-hidden');
                    child.removeAttribute('data-kd-aria-hidden');
                }
            }
        });
    }


    private kd_setupVisibilitySecurity(): void {
        if (typeof document === 'undefined') return;

        this.kd_visibilitySecurityHandler = () => {
            if (document.visibilityState === 'hidden') {
                const overlay = this.kd_getOverlayContainer();
                if (overlay) {
                    overlay.querySelectorAll('input').forEach((input) => {
                        (input as HTMLInputElement).value = '';
                    });
                }
            }
        };

        document.addEventListener('visibilitychange', this.kd_visibilitySecurityHandler);
    }

    private kd_setupTouchMovePrevention(): void {
        const overlay = this.kd_getOverlayContainer();
        if (!overlay) return;

        this.kd_touchMoveHandler = (evt: TouchEvent) => {
            const targetEl = evt.target as HTMLElement;
            if (targetEl && targetEl.closest('.kd-lock-panel')) {
                return;
            }
            if (evt.cancelable) {
                evt.preventDefault();
            }
        };

        overlay.addEventListener('touchmove', this.kd_touchMoveHandler, { passive: false });
    }

    private kd_setupFocusTrap(): void {
        if (this.kd_focusTrapHandler) {
            window.removeEventListener('keydown', this.kd_focusTrapHandler, true);
        }

        this.kd_focusTrapHandler = (evt: KeyboardEvent) => {
            const overlay = this.kd_getOverlayContainer();
            if (!overlay) return;

            if (evt.key === 'Tab') {
                const activeView = overlay.querySelector('.kd-view.active');
                if (!activeView) return;

                const focusables = Array.from(
                    activeView.querySelectorAll<HTMLElement>(
                        'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                    )
                ).filter((el) => el.offsetParent !== null && window.getComputedStyle(el).display !== 'none');

                if (focusables.length === 0) {
                    evt.preventDefault();
                    const panel = overlay.querySelector('.kd-lock-panel') as HTMLElement;
                    if (panel) panel.focus();
                    return;
                }

                const firstEl = focusables[0];
                const lastEl = focusables[focusables.length - 1];

                if (!activeView.contains(document.activeElement)) {
                    evt.preventDefault();
                    firstEl.focus();
                    return;
                }

                if (evt.shiftKey && document.activeElement === firstEl) {
                    evt.preventDefault();
                    lastEl.focus();
                } else if (!evt.shiftKey && document.activeElement === lastEl) {
                    evt.preventDefault();
                    firstEl.focus();
                }
            } else if (evt.key === 'Escape') {
                evt.preventDefault();
                evt.stopPropagation();
            }
        };

        window.addEventListener('keydown', this.kd_focusTrapHandler, true);
    }

    private kd_bindEvents(): void {
        const lockScreen = this.kd_getOverlayContainer();
        if (!lockScreen) return;

        const lockPanel = lockScreen.querySelector('.kd-lock-panel');
        if (lockPanel) {
            lockPanel.addEventListener('mousedown', (e) => {
                e.stopPropagation();
            });
        }

        const activeView = lockScreen.querySelector(`#${this.kd_activeViewId}`);
        const activeInput = activeView ? activeView.querySelector('input') : null;

        const passInput = lockScreen.querySelector('#kd-lock-password-input') as HTMLInputElement;
        const unlockBtn = lockScreen.querySelector('#kd-unlock-btn') as HTMLButtonElement;
        const webAuthnBtn = lockScreen.querySelector('#kd-btn-webauthn') as HTMLButtonElement;
        const forgotLink = lockScreen.querySelector('#kd-forgot-link') as HTMLButtonElement;
        const backLoginLink = lockScreen.querySelector('#kd-back-to-login-link');
        const resetBackLoginLink = lockScreen.querySelector('#kd-reset-back-to-login-link');
        const submitAnswerBtn = lockScreen.querySelector('#kd-submit-answer-btn') as HTMLButtonElement;
        const answerInput = lockScreen.querySelector('#kd-recovery-answer-input') as HTMLInputElement;
        const resetPasswordBtn = lockScreen.querySelector('#kd-reset-password-btn') as HTMLButtonElement;

        if (this.kd_onBackgroundInteraction) {
            lockScreen.addEventListener('mousedown', (e) => {
                if (e.target === lockScreen) {
                    this.kd_onBackgroundInteraction?.();
                }
            });
        }

        if (activeInput) activeInput.focus();

        const handleUnlock = async () => {
            if (this.kd_isSubmitting || !passInput) return;

            this.kd_isSubmitting = true;
            if (unlockBtn) unlockBtn.disabled = true;

            try {
                const val = passInput.value;
                const success = await this.kd_onUnlockAttempt(val);
                if (!success) {
                    passInput.value = '';
                }
            } finally {
                this.kd_isSubmitting = false;
                if (unlockBtn && !unlockBtn.hasAttribute('data-lockout')) unlockBtn.disabled = false;
            }
        };

        if (unlockBtn) unlockBtn.onclick = handleUnlock;
        if (passInput) {
            passInput.onkeydown = (e: KeyboardEvent) => {
                if (e.key === 'Enter' && !e.isComposing) handleUnlock();
            };
        }

        if (webAuthnBtn && this.kd_onWebAuthnAttempt) {
            webAuthnBtn.onclick = async () => {
                if (this.kd_isSubmitting) return;
                this.kd_isSubmitting = true;
                webAuthnBtn.disabled = true;

                try {
                    const success = await this.kd_onWebAuthnAttempt!();
                    if (!success) {
                        this.kd_showError('kd-password-error', 'Biometric verification failed.');
                    }
                } finally {
                    this.kd_isSubmitting = false;
                    webAuthnBtn.disabled = false;
                }
            };
        }

        if (forgotLink && !forgotLink.disabled) {
            forgotLink.onclick = () => this.kd_switchView('kd-view-recovery');
        }

        if (backLoginLink) {
            backLoginLink.onclick = () => this.kd_switchView('kd-view-password');
        }

        if (resetBackLoginLink) {
            resetBackLoginLink.onclick = () => this.kd_switchView('kd-view-password');
        }

        if (submitAnswerBtn && answerInput) {
            const handleAnswer = async () => {
                if (this.kd_isSubmitting) return;
                this.kd_isSubmitting = true;
                if (submitAnswerBtn) submitAnswerBtn.disabled = true;

                try {
                    const val = answerInput.value.toLowerCase().trim();
                    if (this.kd_onRecoveryAttempt) {
                        const success = await this.kd_onRecoveryAttempt(val);
                        if (success) {
                            this.kd_switchView('kd-view-reset');
                        } else {
                            this.kd_showError('kd-recovery-error', 'Incorrect answer.');
                            answerInput.value = '';
                        }
                    }
                } finally {
                    this.kd_isSubmitting = false;
                    if (submitAnswerBtn) submitAnswerBtn.disabled = false;
                }
            };
            submitAnswerBtn.onclick = handleAnswer;
            answerInput.onkeydown = (e: KeyboardEvent) => {
                if (e.key === 'Enter' && !e.isComposing) handleAnswer();
            };
        }

        if (resetPasswordBtn) {
            resetPasswordBtn.onclick = async () => {
                if (this.kd_isSubmitting) return;

                const newPass = (lockScreen.querySelector('#kd-reset-new-password') as HTMLInputElement)?.value;
                const confirmPass = (lockScreen.querySelector('#kd-reset-confirm-password') as HTMLInputElement)?.value;

                if (!newPass || !confirmPass || newPass.trim().length === 0 || confirmPass.trim().length === 0) {
                    return this.kd_showError('kd-reset-error', 'Password cannot be empty or whitespace only.');
                }
                if (newPass !== confirmPass) {
                    return this.kd_showError('kd-reset-error', 'Passwords do not match.');
                }

                this.kd_isSubmitting = true;
                if (resetPasswordBtn) resetPasswordBtn.disabled = true;

                try {
                    if (this.kd_onResetPassword) {
                        await this.kd_onResetPassword(newPass);
                    }
                } catch (err: any) {
                    this.kd_showError('kd-reset-error', err?.message || 'Failed to sync password with server. Please try again.');
                } finally {
                    this.kd_isSubmitting = false;
                    if (resetPasswordBtn) resetPasswordBtn.disabled = false;
                }
            };
        }

        lockScreen.querySelectorAll('.kd-password-toggle').forEach((btn) => {
            (btn as HTMLButtonElement).onclick = (e) => {
                const button = e.currentTarget as HTMLButtonElement;
                const targetId = button.dataset.target;
                if (!targetId) return;
                const input = lockScreen.querySelector(`#${targetId}`) as HTMLInputElement;
                if (!input) return;

                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                button.classList.toggle('show-password', isPassword);

                button.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
                const actionLabel = isPassword ? 'Hide Password' : 'Show Password';
                button.setAttribute('aria-label', actionLabel);
                button.title = actionLabel;
            };
        });
    }

    private kd_switchView(viewId: string): void {
        const overlay = this.kd_getOverlayContainer();
        if (!overlay) return;

        this.kd_activeViewId = viewId;

        overlay.querySelectorAll('.kd-view').forEach((v) => v.classList.remove('active'));
        overlay.querySelectorAll('.kd-lock-error').forEach((e) => (e.textContent = ''));
        overlay.querySelectorAll('input').forEach((input) => {
            (input as HTMLInputElement).value = '';
        });

        const target = overlay.querySelector(`#${viewId}`);
        if (target) {
            target.classList.add('active');
            const input = target.querySelector('input');
            if (input) input.focus();
        }
    }
}

