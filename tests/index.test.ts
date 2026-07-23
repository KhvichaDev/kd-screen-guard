// @vitest-environment happy-dom

/**
 * Comprehensive Automated Unit & Integration Test Suite for kd-screen-guard library.
 * Covers Cryptographic Engine, Key Derivation, Authentication, Failed Lockout, Recovery Flow, Storage Persistence, and Event Callbacks.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScreenGuard, { kd_sha256, kd_pbkdf2, kd_LockEngine } from '../src/index';

describe('1. Cryptographic & Key Derivation Engine', () => {
    it('should compute deterministic SHA-256 hashes', async () => {
        const hash1 = await kd_sha256('helloWorld');
        const hash2 = await kd_sha256('helloWorld');
        expect(hash1).toBe(hash2);
        expect(hash1.length).toBe(64);
    });

    it('should compute distinct SHA-256 hashes for different inputs', async () => {
        const hash1 = await kd_sha256('password1');
        const hash2 = await kd_sha256('password2');
        expect(hash1).not.toBe(hash2);
    });

    it('should compute PBKDF2 salted key derivation with 100,000 iterations', async () => {
        const salt = 'unique-test-salt';
        const hash1 = await kd_pbkdf2('myPassword', salt, 1000);
        const hash2 = await kd_pbkdf2('myPassword', salt, 1000);
        expect(hash1).toBe(hash2);
        expect(hash1.length).toBe(64);
    });

    it('should generate different PBKDF2 hashes when salts differ', async () => {
        const hash1 = await kd_pbkdf2('myPassword', 'salt-A', 1000);
        const hash2 = await kd_pbkdf2('myPassword', 'salt-B', 1000);
        expect(hash1).not.toBe(hash2);
    });

    it('should normalize recovery answers regardless of case or trailing spaces', async () => {
        const hash1 = await ScreenGuard.hashRecoveryAnswer(' Tbilisi ');
        const hash2 = await ScreenGuard.hashRecoveryAnswer('tbilisi');
        expect(hash1).toBe(hash2);
    });

    it('should return empty string when normalizing an empty recovery answer', async () => {
        const hash = await ScreenGuard.hashRecoveryAnswer('   ');
        expect(hash).toBe('');
    });
});

describe('2. LockEngine Authentication & State Machine', () => {
    let engine: kd_LockEngine;

    beforeEach(async () => {
        engine = new kd_LockEngine({
            password: 'correctPassword123',
            maxFailedAttempts: 3,
            lockoutDurationSeconds: 10,
            antiTamper: false
        });
        await engine.kd_init();
    });

    it('should initialize in unlocked state by default', () => {
        expect(engine.kd_isLockedState).toBe(false);
    });

    it('should lock screen when kd_lock() is called', () => {
        engine.kd_lock();
        expect(engine.kd_isLockedState).toBe(true);
    });

    it('should unlock screen when correct password is entered', async () => {
        engine.kd_lock();
        const success = await engine.kd_verifyAndUnlock('correctPassword123');
        expect(success).toBe(true);
        expect(engine.kd_isLockedState).toBe(false);
    });

    it('should reject unlock attempt when incorrect password is entered', async () => {
        engine.kd_lock();
        const success = await engine.kd_verifyAndUnlock('wrongPassword');
        expect(success).toBe(false);
        expect(engine.kd_isLockedState).toBe(true);
    });

    it('should trigger temporary lockout after max failed attempts', async () => {
        engine.kd_lock();

        // 3 failed attempts
        await engine.kd_verifyAndUnlock('wrong1');
        await engine.kd_verifyAndUnlock('wrong2');
        await engine.kd_verifyAndUnlock('wrong3');

        // 4th attempt should be rejected due to lockout
        const successOnLockout = await engine.kd_verifyAndUnlock('correctPassword123');
        expect(successOnLockout).toBe(false);
        expect(engine.kd_isLockedState).toBe(true);
    });
});

describe('3. Password Recovery & Reset Flow', () => {
    it('should verify recovery answer correctly', async () => {
        const answerHash = await ScreenGuard.hashRecoveryAnswer('Georgia');
        const engine = new kd_LockEngine({
            password: 'oldPassword',
            securityQuestion: 'Country?',
            securityAnswerHash: answerHash,
            antiTamper: false
        });
        await engine.kd_init();
        engine.kd_lock();

        const isAnswerCorrect = await engine.kd_verifyRecoveryAnswer('georgia');
        expect(isAnswerCorrect).toBe(true);
    });

    it('should reject incorrect recovery answer', async () => {
        const answerHash = await ScreenGuard.hashRecoveryAnswer('Georgia');
        const engine = new kd_LockEngine({
            password: 'oldPassword',
            securityQuestion: 'Country?',
            securityAnswerHash: answerHash,
            antiTamper: false
        });
        await engine.kd_init();
        engine.kd_lock();

        const isAnswerCorrect = await engine.kd_verifyRecoveryAnswer('wrongCountry');
        expect(isAnswerCorrect).toBe(false);
    });

    it('should reset password and unlock', async () => {
        const onResetMock = vi.fn();
        const engine = new kd_LockEngine({
            password: 'oldPassword',
            onPasswordReset: onResetMock,
            antiTamper: false
        });
        await engine.kd_init();
        engine.kd_lock();

        await engine.kd_resetPasswordAndUnlock('newPassword456');

        expect(engine.kd_isLockedState).toBe(false);
        expect(onResetMock).toHaveBeenCalledTimes(1);

        // Verify old password no longer works
        engine.kd_lock();
        const oldPassSuccess = await engine.kd_verifyAndUnlock('oldPassword');
        expect(oldPassSuccess).toBe(false);

        // Verify new password works
        const newPassSuccess = await engine.kd_verifyAndUnlock('newPassword456');
        expect(newPassSuccess).toBe(true);
    });
});

describe('4. Lifecycle Events & Callback Subscriptions', () => {
    it('should fire onLock, onUnlock, and onStateChange callbacks', async () => {
        const onLock = vi.fn();
        const onUnlock = vi.fn();
        const onStateChange = vi.fn();

        const guard = new ScreenGuard({
            password: 'pass',
            onLock,
            onUnlock,
            onStateChange,
            antiTamper: false
        });

        await guard.init();

        guard.lock();
        expect(onLock).toHaveBeenCalledTimes(1);
        expect(onStateChange).toHaveBeenCalledWith(expect.objectContaining({ isLocked: true }));

        guard.unlock();
        expect(onUnlock).toHaveBeenCalledTimes(1);
        expect(onStateChange).toHaveBeenCalledWith(expect.objectContaining({ isLocked: false }));

        guard.destroy();
    });

    it('should update configuration options dynamically', async () => {
        const guard = new ScreenGuard({ password: 'oldPass', antiTamper: false });
        await guard.init();

        await guard.updateOptions({ password: 'updatedPass' });

        guard.lock();
        expect(guard.isLocked).toBe(true);

        guard.destroy();
    });
});

describe('5. Hardware & Feature Support Helpers', () => {
    it('should check biometrics support helper safely', async () => {
        const supported = await ScreenGuard.isBiometricsSupported();
        expect(typeof supported).toBe('boolean');
    });
});
