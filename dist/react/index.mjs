import {
  ScreenGuard
} from "../chunk-TGTJHYCA.mjs";

// src/react/index.ts
import { useState, useEffect, useRef, useCallback } from "react";
function useScreenGuard(options = {}) {
  const [isLocked, setIsLocked] = useState(false);
  const guardRef = useRef(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  useEffect(() => {
    let isMounted = true;
    const mergedOptions = {
      ...optionsRef.current,
      onStateChange: (state) => {
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
  const lock = useCallback(() => {
    guardRef.current?.lock();
  }, []);
  const unlock = useCallback(() => {
    guardRef.current?.unlock();
  }, []);
  const updateOptions = useCallback(async (newOptions) => {
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
export {
  useScreenGuard
};
