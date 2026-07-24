import { Ref } from 'vue';
import { kd_ScreenGuardOptions, ScreenGuard } from '../index.mjs';

/**
 * Official Vue 3 Composable and Plugin for kd-screen-guard.
 * Provides useScreenGuard() composable for Vue 3 with reactive ref state and automatic lifecycle hooks.
 */

interface useVueScreenGuardReturn {
    isLocked: Ref<boolean>;
    lock: () => void;
    unlock: () => void;
    updateOptions: (newOptions: Partial<kd_ScreenGuardOptions>) => Promise<void>;
    guard: ScreenGuard | null;
}
declare function useScreenGuard(options?: kd_ScreenGuardOptions): useVueScreenGuardReturn;

export { useScreenGuard, type useVueScreenGuardReturn };
