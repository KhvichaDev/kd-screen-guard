import { kd_ScreenGuardOptions, ScreenGuard } from '../index.mjs';

/**
 * Official React Hook for kd-screen-guard.
 * Provides useScreenGuard() for React 16.8+ and React 18+ applications with automatic lifecycle cleanup and state reactivity.
 */

interface useScreenGuardReturn {
    isLocked: boolean;
    lock: () => void;
    unlock: () => void;
    updateOptions: (newOptions: Partial<kd_ScreenGuardOptions>) => Promise<void>;
    guard: ScreenGuard | null;
}
declare function useScreenGuard(options?: kd_ScreenGuardOptions): useScreenGuardReturn;

export { useScreenGuard, type useScreenGuardReturn };
