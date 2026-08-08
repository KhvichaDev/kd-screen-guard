/**
 * Official React Hook for kd-screen-guard.
 * Provides useScreenGuard() for React 16.8+ and React 18+ applications with automatic lifecycle cleanup and state reactivity.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { ScreenGuard } from '../index';
import { kd_ScreenGuardOptions, kd_LockState } from '../types';

export interface useScreenGuardReturn {
    isLocked: boolean;
    lock: () => void;
    unlock: () => void;
    updateOptions: (newOptions: Partial<kd_ScreenGuardOptions>) => Promise<void>;
    guard: ScreenGuard | null;
}

export function useScreenGuard(options: kd_ScreenGuardOptions = {}): useScreenGuardReturn {
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const guardRef = useRef<ScreenGuard | null>(null);
    const optionsRef = useRef<kd_ScreenGuardOptions>(options);

    optionsRef.current = options;

    useEffect(() => {
        let isMounted = true;

        const mergedOptions: kd_ScreenGuardOptions = {
            ...optionsRef.current,
            onStateChange: (state: kd_LockState) => {
                if (isMounted) {
                    setIsLocked(state.isLocked);
                }
                optionsRef.current.onStateChange?.(state);
            }
        };

        const guard = new ScreenGuard(mergedOptions);
        guardRef.current = guard;

        guard.init().then(() => {
            if (isMounted) {
                setIsLocked(guard.isLocked);
            }
        });

        return () => {
            isMounted = false;
            guard.destroy();
            guardRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (guardRef.current) {
            guardRef.current.updateOptions(options);
        }
    }, [
        options.autoLockMinutes,
        options.lockOnBlur,
        options.enableDomVault,
        options.domVaultTarget,
        options.useShadowDom,
        options.enableWebAuthn,
        options.enableIntruderSnapshot,
        options.enableAudioAlarm,
        options.enableSpeechAlarm,
        options.speechMessage,
        options.lockoutDurationSeconds,
        options.maxFailedAttempts
    ]);

    const lock = useCallback(() => {
        guardRef.current?.lock();
    }, []);

    const unlock = useCallback(() => {
        guardRef.current?.unlock();
    }, []);

    const updateOptions = useCallback(async (newOptions: Partial<kd_ScreenGuardOptions>) => {
        if (guardRef.current) {
            await guardRef.current.updateOptions(newOptions);
        }
    }, []);

    return {
        isLocked,
        lock,
        unlock,
        updateOptions,
        guard: guardRef.current
    };
}
