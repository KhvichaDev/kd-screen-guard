/**
 * Official Vue 3 Composable and Plugin for kd-screen-guard.
 * Provides useScreenGuard() composable for Vue 3 with reactive ref state and automatic lifecycle hooks.
 */

import { ref, onMounted, onUnmounted, Ref } from 'vue';
import { ScreenGuard } from '../index';
import { kd_ScreenGuardOptions, kd_LockState } from '../types';

export interface useVueScreenGuardReturn {
    isLocked: Ref<boolean>;
    lock: () => void;
    unlock: () => void;
    updateOptions: (newOptions: Partial<kd_ScreenGuardOptions>) => Promise<void>;
    guard: ScreenGuard | null;
}

export function useScreenGuard(options: kd_ScreenGuardOptions = {}): useVueScreenGuardReturn {
    const isLocked = ref<boolean>(false);
    let guardInstance: ScreenGuard | null = null;

    const mergedOptions: kd_ScreenGuardOptions = {
        ...options,
        onStateChange: (state: kd_LockState) => {
            isLocked.value = state.isLocked;
            options.onStateChange?.(state);
        }
    };

    guardInstance = new ScreenGuard(mergedOptions);

    onMounted(async () => {
        if (guardInstance) {
            await guardInstance.init();
            isLocked.value = guardInstance.isLocked;
        }
    });

    onUnmounted(() => {
        if (guardInstance) {
            guardInstance.destroy();
            guardInstance = null;
        }
    });

    const lock = () => {
        guardInstance?.lock();
    };

    const unlock = () => {
        guardInstance?.unlock();
    };

    const updateOptions = async (newOptions: Partial<kd_ScreenGuardOptions>) => {
        if (guardInstance) {
            await guardInstance.updateOptions(newOptions);
        }
    };

    return {
        isLocked,
        lock,
        unlock,
        updateOptions,
        guard: guardInstance
    };
}
