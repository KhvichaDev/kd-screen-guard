import {
  ScreenGuard
} from "../chunk-EEH3DOHS.mjs";

// src/vue/index.ts
import { ref, watch, onMounted, onUnmounted } from "vue";
function useScreenGuard(options = {}) {
  const isLocked = ref(false);
  let guardInstance = null;
  const mergedOptions = {
    ...options,
    onStateChange: (state) => {
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
  watch(() => options, (newOptions) => {
    if (guardInstance) {
      guardInstance.updateOptions(newOptions);
    }
  }, { deep: true });
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
  const updateOptions = async (newOptions) => {
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
export {
  useScreenGuard
};
