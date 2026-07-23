/**
 * Entry point for kd-screen-guard library.
 * Exports public API, ScreenGuard manager class, WebAuthn Biometrics, Off-main-thread Web Worker, and SHA-256 / PBKDF2 hashing helpers.
 */

import { kd_ScreenGuardOptions } from './types';
import { kd_LockEngine } from './core/kd_lock_engine';
import { kd_sha256, kd_pbkdf2 } from './core/kd_crypto';
import { kd_WebAuthnManager } from './guard/kd_webauthn';

export * from './types';
export { kd_sha256, kd_pbkdf2 } from './core/kd_crypto';
export { kd_LockEngine } from './core/kd_lock_engine';

export class ScreenGuard {
    private kd_engine: kd_LockEngine;

    constructor(options: kd_ScreenGuardOptions = {}) {
        this.kd_engine = new kd_LockEngine(options);
    }

    public get isLocked(): boolean {
        return this.kd_engine.kd_isLockedState;
    }

    public async init(): Promise<void> {
        await this.kd_engine.kd_init();
    }

    public lock(): void {
        this.kd_engine.kd_lock();
    }

    public unlock(): void {
        this.kd_engine.kd_unlock();
    }

    public async updateOptions(newOptions: Partial<kd_ScreenGuardOptions>): Promise<void> {
        await this.kd_engine.kd_updateOptions(newOptions);
    }

    public getState() {
        return this.kd_engine.kd_getState();
    }

    public createLockButton(): HTMLButtonElement {
        return this.kd_engine.kd_createLockButton();
    }

    public attachLockButton(target: string | HTMLElement): HTMLButtonElement | null {
        return this.kd_engine.kd_attachLockButton(target);
    }

    public destroy(): void {
        this.kd_engine.kd_destroy();
    }

    public static async registerBiometrics(userDisplayName: string = 'ScreenGuard User'): Promise<string | null> {
        return await kd_WebAuthnManager.kd_registerBiometrics(userDisplayName);
    }

    public static async isBiometricsSupported(): Promise<boolean> {
        return await kd_WebAuthnManager.kd_isSupported();
    }

    public static async hashPassword(password: string, salt?: string, iterations: number = 100000): Promise<string> {
        if (salt) {
            return await kd_pbkdf2(password, salt, iterations);
        }
        return await kd_sha256(password);
    }

    public static async pbkdf2(password: string, salt: string, iterations: number = 100000): Promise<string> {
        return await kd_pbkdf2(password, salt, iterations);
    }

    public static async hashRecoveryAnswer(answer: string, salt?: string, iterations: number = 100000): Promise<string> {
        if (!answer || !answer.trim()) return '';
        const normalized = answer.toLowerCase().trim();
        if (salt) {
            return await kd_pbkdf2(normalized, salt, iterations);
        }
        return await kd_sha256(normalized);
    }
}

export default ScreenGuard;
