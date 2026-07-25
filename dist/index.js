"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ScreenGuard: () => ScreenGuard,
  default: () => index_default,
  kd_LockEngine: () => kd_LockEngine,
  kd_pbkdf2: () => kd_pbkdf2,
  kd_sha256: () => kd_sha256
});
module.exports = __toCommonJS(index_exports);

// src/core/kd_crypto.ts
async function kd_sha256(data) {
  if (!data) return "";
  if (typeof crypto !== "undefined" && crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const buffer = encoder.encode(data);
      const copy = new Uint8Array(buffer);
      const hashBuffer = await crypto.subtle.digest("SHA-256", copy.buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
    }
  }
  return kd_jsSha256(data);
}
async function kd_pbkdf2(password, salt, iterations = 1e5) {
  if (!password || !salt) return "";
  if (typeof crypto !== "undefined" && crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const passBuffer = new Uint8Array(encoder.encode(password));
      const saltBuffer = new Uint8Array(encoder.encode(salt));
      const key = await crypto.subtle.importKey(
        "raw",
        passBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveBits"]
      );
      const derivedBits = await crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt: saltBuffer,
          iterations,
          hash: "SHA-256"
        },
        key,
        256
      );
      const hashArray = Array.from(new Uint8Array(derivedBits));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
    }
  }
  return kd_pureJsPbkdf2(password, salt, iterations);
}
function kd_pureJsPbkdf2(password, salt, iterations) {
  let currentHash = kd_jsSha256(`${salt}:${password}`);
  const saltPass = `${salt}:${password}`;
  for (let i = 1; i < iterations; i++) {
    currentHash = kd_jsSha256(`${currentHash}:${saltPass}:${i % 16}`);
  }
  return currentHash;
}
function kd_jsSha256(str) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  const K = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  const H = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ];
  const l = bytes.length;
  const bitLen = l * 8;
  const newLen = Math.ceil((l + 9) / 64) * 64;
  const M = new Uint8Array(newLen);
  M.set(bytes);
  M[l] = 128;
  const view = new DataView(M.buffer, M.byteOffset, M.byteLength);
  view.setUint32(newLen - 4, bitLen & 4294967295, false);
  view.setUint32(newLen - 8, Math.floor(bitLen / 4294967296), false);
  const W = new Uint32Array(64);
  for (let i = 0; i < newLen; i += 64) {
    for (let t = 0; t < 16; t++) {
      W[t] = view.getUint32(i + t * 4, false);
    }
    for (let t = 16; t < 64; t++) {
      const s0 = kd_rotr(W[t - 15], 7) ^ kd_rotr(W[t - 15], 18) ^ W[t - 15] >>> 3;
      const s1 = kd_rotr(W[t - 2], 17) ^ kd_rotr(W[t - 2], 19) ^ W[t - 2] >>> 10;
      W[t] = W[t - 16] + s0 + W[t - 7] + s1 | 0;
    }
    let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
    for (let t = 0; t < 64; t++) {
      const S1 = kd_rotr(e, 6) ^ kd_rotr(e, 11) ^ kd_rotr(e, 25);
      const ch = e & f ^ ~e & g;
      const temp1 = h + S1 + ch + K[t] + W[t] | 0;
      const S0 = kd_rotr(a, 2) ^ kd_rotr(a, 13) ^ kd_rotr(a, 22);
      const maj = a & b ^ a & c ^ b & c;
      const temp2 = S0 + maj | 0;
      h = g;
      g = f;
      f = e;
      e = d + temp1 | 0;
      d = c;
      c = b;
      b = a;
      a = temp1 + temp2 | 0;
    }
    H[0] = H[0] + a | 0;
    H[1] = H[1] + b | 0;
    H[2] = H[2] + c | 0;
    H[3] = H[3] + d | 0;
    H[4] = H[4] + e | 0;
    H[5] = H[5] + f | 0;
    H[6] = H[6] + g | 0;
    H[7] = H[7] + h | 0;
  }
  return H.map((h) => (h >>> 0).toString(16).padStart(8, "0")).join("");
}
function kd_rotr(n, b) {
  return n >>> b | n << 32 - b;
}

// src/core/kd_worker_crypto.ts
function kd_workerMain() {
  self.onmessage = async function(e) {
    const data = e.data;
    if (!data || !data.id || !data.type) return;
    try {
      if (data.type === "PBKDF2") {
        const hash = await kd_workerPbkdf2(data.password, data.salt, data.iterations);
        self.postMessage({ id: data.id, success: true, hash });
      } else if (data.type === "SHA256") {
        const hash = await kd_workerSha256(data.data);
        self.postMessage({ id: data.id, success: true, hash });
      }
    } catch (err) {
      self.postMessage({ id: data.id, success: false, error: String(err) });
    }
  };
  async function kd_workerSha256(data) {
    if (!data) return "";
    if (typeof self !== "undefined" && self.crypto && self.crypto.subtle) {
      try {
        const encoder = new TextEncoder();
        const buffer = new Uint8Array(encoder.encode(data));
        const hashBuffer = await self.crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      } catch {
      }
    }
    return kd_workerJsSha256(data);
  }
  async function kd_workerPbkdf2(password, salt, iterations = 1e5) {
    if (!password || !salt) return "";
    if (typeof self !== "undefined" && self.crypto && self.crypto.subtle) {
      try {
        const encoder = new TextEncoder();
        const passBuffer = encoder.encode(password);
        const saltBuffer = encoder.encode(salt);
        const key = await self.crypto.subtle.importKey("raw", passBuffer, { name: "PBKDF2" }, false, ["deriveBits"]);
        const derivedBits = await self.crypto.subtle.deriveBits({ name: "PBKDF2", salt: saltBuffer, iterations, hash: "SHA-256" }, key, 256);
        const hashArray = Array.from(new Uint8Array(derivedBits));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      } catch {
      }
    }
    return kd_workerPureJsPbkdf2(password, salt, iterations);
  }
  function kd_workerPureJsPbkdf2(password, salt, iterations) {
    let currentHash = kd_workerJsSha256(`${salt}:${password}`);
    const saltPass = `${salt}:${password}`;
    for (let i = 1; i < iterations; i++) {
      currentHash = kd_workerJsSha256(`${currentHash}:${saltPass}:${i % 16}`);
    }
    return currentHash;
  }
  function kd_workerJsSha256(str) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    const K = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ];
    const H = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
    const l = bytes.length;
    const bitLen = l * 8;
    const newLen = Math.ceil((l + 9) / 64) * 64;
    const M = new Uint8Array(newLen);
    M.set(bytes);
    M[l] = 128;
    const view = new DataView(M.buffer, M.byteOffset, M.byteLength);
    view.setUint32(newLen - 4, bitLen & 4294967295, false);
    view.setUint32(newLen - 8, Math.floor(bitLen / 4294967296), false);
    const W = new Uint32Array(64);
    for (let i = 0; i < newLen; i += 64) {
      for (let t = 0; t < 16; t++) W[t] = view.getUint32(i + t * 4, false);
      for (let t = 16; t < 64; t++) {
        const s0 = kd_workerRotr(W[t - 15], 7) ^ kd_workerRotr(W[t - 15], 18) ^ W[t - 15] >>> 3;
        const s1 = kd_workerRotr(W[t - 2], 17) ^ kd_workerRotr(W[t - 2], 19) ^ W[t - 2] >>> 10;
        W[t] = W[t - 16] + s0 + W[t - 7] + s1 | 0;
      }
      let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (let t = 0; t < 64; t++) {
        const S1 = kd_workerRotr(e, 6) ^ kd_workerRotr(e, 11) ^ kd_workerRotr(e, 25);
        const ch = e & f ^ ~e & g;
        const temp1 = h + S1 + ch + K[t] + W[t] | 0;
        const S0 = kd_workerRotr(a, 2) ^ kd_workerRotr(a, 13) ^ kd_workerRotr(a, 22);
        const maj = a & b ^ a & c ^ b & c;
        const temp2 = S0 + maj | 0;
        h = g;
        g = f;
        f = e;
        e = d + temp1 | 0;
        d = c;
        c = b;
        b = a;
        a = temp1 + temp2 | 0;
      }
      H[0] = H[0] + a | 0;
      H[1] = H[1] + b | 0;
      H[2] = H[2] + c | 0;
      H[3] = H[3] + d | 0;
      H[4] = H[4] + e | 0;
      H[5] = H[5] + f | 0;
      H[6] = H[6] + g | 0;
      H[7] = H[7] + h | 0;
    }
    return H.map((h) => (h >>> 0).toString(16).padStart(8, "0")).join("");
  }
  function kd_workerRotr(n, b) {
    return n >>> b | n << 32 - b;
  }
}
var kd_WorkerCryptoManager = class {
  constructor() {
    this.kd_worker = null;
    this.kd_callbacks = /* @__PURE__ */ new Map();
    this.kd_msgId = 0;
    if (typeof window !== "undefined" && typeof Worker !== "undefined" && typeof Blob !== "undefined") {
      try {
        const code = "(" + kd_workerMain.toString() + ")();";
        const blob = new Blob([code], { type: "application/javascript" });
        const blobUrl = URL.createObjectURL(blob);
        this.kd_worker = new Worker(blobUrl);
        this.kd_worker.onmessage = (e) => {
          const { id, success, hash, error } = e.data || {};
          const cb = this.kd_callbacks.get(id);
          if (cb) {
            this.kd_callbacks.delete(id);
            if (success) {
              cb.resolve(hash);
            } else {
              cb.reject(new Error(error || "Worker hashing failed"));
            }
          }
        };
        this.kd_worker.onerror = () => {
          this.kd_callbacks.forEach((cb) => cb.reject(new Error("Worker script error")));
          this.kd_callbacks.clear();
          if (this.kd_worker) {
            this.kd_worker.terminate();
            this.kd_worker = null;
          }
        };
      } catch {
        this.kd_worker = null;
      }
    }
  }
  async kd_pbkdf2(password, salt, iterations = 1e5) {
    if (!this.kd_worker) {
      return await kd_pbkdf2(password, salt, iterations);
    }
    const id = `pb_${++this.kd_msgId}`;
    try {
      return await new Promise((resolve, reject) => {
        this.kd_callbacks.set(id, { resolve, reject });
        this.kd_worker.postMessage({ id, type: "PBKDF2", password, salt, iterations });
      });
    } catch {
      return await kd_pbkdf2(password, salt, iterations);
    }
  }
  async kd_sha256(data) {
    if (!this.kd_worker) {
      return await kd_sha256(data);
    }
    const id = `sha_${++this.kd_msgId}`;
    try {
      return await new Promise((resolve, reject) => {
        this.kd_callbacks.set(id, { resolve, reject });
        this.kd_worker.postMessage({ id, type: "SHA256", data });
      });
    } catch {
      return await kd_sha256(data);
    }
  }
};
var kd_workerCrypto = new kd_WorkerCryptoManager();

// src/core/kd_auto_lock.ts
var DEFAULT_STORAGE_KEY_PREFIX = "kd_screen_guard_last_activity";
var DEFAULT_BROADCAST_CHANNEL = "kd_screen_guard_channel";
var kd_AutoLockTracker = class {
  constructor(autoLockMinutes, onTimeout, onUnlockReceived, onPasswordResetReceived, channelName = DEFAULT_BROADCAST_CHANNEL) {
    this.kd_intervalId = null;
    this.kd_listenersActive = false;
    this.kd_channel = null;
    this.kd_memoryTimestamp = Date.now();
    this.kd_isLocked = false;
    this.kd_autoLockMinutes = autoLockMinutes;
    this.kd_onTimeout = onTimeout;
    this.kd_onUnlockReceived = onUnlockReceived;
    this.kd_onPasswordResetReceived = onPasswordResetReceived;
    this.kd_storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}_${channelName || DEFAULT_BROADCAST_CHANNEL}`;
    this.kd_boundHandler = () => this.kd_updateActivityTimestamp();
    this.kd_visibilityHandler = () => {
      if (typeof document !== "undefined" && document.visibilityState === "visible" && !this.kd_isLocked) {
        this.kd_checkTimeout();
      }
    };
    if (typeof BroadcastChannel !== "undefined") {
      try {
        this.kd_channel = new BroadcastChannel(channelName || DEFAULT_BROADCAST_CHANNEL);
        this.kd_channel.onmessage = (event) => {
          if (event.data) {
            if (event.data.type === "LOCK_NOW") {
              this.kd_onTimeout();
            } else if (event.data.type === "UNLOCK_NOW") {
              this.kd_onUnlockReceived?.();
            } else if (event.data.type === "PASSWORD_RESET" && event.data.newHash) {
              this.kd_onPasswordResetReceived?.(event.data.newHash);
            }
          }
        };
      } catch {
        this.kd_channel = null;
      }
    }
  }
  kd_setLockedState(isLocked) {
    this.kd_isLocked = isLocked;
  }
  kd_start() {
    if (this.kd_autoLockMinutes <= 0) return;
    this.kd_setupEventListeners();
    this.kd_resetActivityTimestamp();
    if (this.kd_intervalId) clearInterval(this.kd_intervalId);
    this.kd_intervalId = setInterval(() => {
      if (!this.kd_isLocked) {
        this.kd_checkTimeout();
      }
    }, 2e3);
  }
  kd_stop() {
    if (this.kd_intervalId) {
      clearInterval(this.kd_intervalId);
      this.kd_intervalId = null;
    }
    this.kd_removeEventListeners();
  }
  kd_notifyUnlockEvent() {
    if (this.kd_channel) {
      try {
        this.kd_channel.postMessage({ type: "UNLOCK_NOW" });
      } catch {
      }
    }
  }
  kd_notifyPasswordResetEvent(newHash) {
    if (this.kd_channel) {
      try {
        this.kd_channel.postMessage({ type: "PASSWORD_RESET", newHash });
      } catch {
      }
    }
  }
  kd_updateConfig(minutes) {
    this.kd_autoLockMinutes = minutes;
    if (minutes > 0) {
      this.kd_start();
    } else {
      this.kd_stop();
    }
  }
  kd_resetActivityTimestamp() {
    const now = Date.now();
    this.kd_memoryTimestamp = now;
    try {
      localStorage.setItem(this.kd_storageKey, now.toString());
    } catch {
    }
  }
  kd_destroy() {
    this.kd_stop();
    if (this.kd_channel) {
      this.kd_channel.close();
      this.kd_channel = null;
    }
  }
  kd_checkTimeout() {
    if (this.kd_autoLockMinutes <= 0) return;
    const now = Date.now();
    const lastActive = this.kd_getLastActivityTimestamp();
    const elapsed = now - lastActive;
    const threshold = this.kd_autoLockMinutes * 60 * 1e3;
    if (!isNaN(elapsed) && elapsed >= threshold) {
      this.kd_notifyLockEvent();
      this.kd_onTimeout();
    }
  }
  kd_getLastActivityTimestamp() {
    try {
      const value = localStorage.getItem(this.kd_storageKey);
      if (!value) return this.kd_memoryTimestamp;
      const parsed = parseInt(value, 10);
      if (isNaN(parsed) || parsed <= 0) {
        localStorage.removeItem(this.kd_storageKey);
        return this.kd_memoryTimestamp;
      }
      return parsed;
    } catch {
      return this.kd_memoryTimestamp;
    }
  }
  kd_updateActivityTimestamp() {
    if (this.kd_isLocked) return;
    const now = Date.now();
    const last = this.kd_getLastActivityTimestamp();
    this.kd_memoryTimestamp = now;
    if (now < last || now - last > 3e3) {
      try {
        localStorage.setItem(this.kd_storageKey, now.toString());
      } catch {
      }
    }
  }
  kd_setupEventListeners() {
    if (this.kd_listenersActive || typeof window === "undefined") return;
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((evt) => {
      window.addEventListener(evt, this.kd_boundHandler, { passive: true });
    });
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", this.kd_visibilityHandler);
    }
    this.kd_listenersActive = true;
  }
  kd_removeEventListeners() {
    if (!this.kd_listenersActive || typeof window === "undefined") return;
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((evt) => {
      window.removeEventListener(evt, this.kd_boundHandler);
    });
    if (typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", this.kd_visibilityHandler);
    }
    this.kd_listenersActive = false;
  }
  kd_notifyLockEvent() {
    if (this.kd_channel) {
      try {
        this.kd_channel.postMessage({ type: "LOCK_NOW" });
      } catch {
      }
    }
  }
};

// src/guard/kd_tamper_guard.ts
var kd_TamperGuard = class {
  constructor(onTamperDetected) {
    this.kd_observer = null;
    this.kd_tamperCheckTimer = null;
    this.kd_periodicIntervalId = null;
    this.kd_storageListener = null;
    this.kd_onTamperDetected = onTamperDetected;
  }
  kd_startMonitoring() {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    this.kd_stopMonitoring();
    if (typeof MutationObserver !== "undefined") {
      this.kd_observer = new MutationObserver((mutations) => {
        if (this.kd_isMutationRelevant(mutations)) {
          this.kd_scheduleTamperCheck();
        }
      });
      this.kd_observer.observe(document.documentElement, {
        childList: true,
        attributes: true,
        subtree: true,
        attributeFilter: ["style", "class", "hidden", "id"]
      });
    }
    this.kd_storageListener = (evt) => {
      if (evt.key && evt.key.startsWith("kd_screen_guard_")) {
        if (evt.newValue === null || evt.newValue === "") {
          this.kd_onTamperDetected({
            timestamp: Date.now(),
            reason: `Storage Security Tampering detected: Key '${evt.key}' was deleted from browser storage.`
          });
        }
      }
    };
    window.addEventListener("storage", this.kd_storageListener);
    this.kd_periodicIntervalId = setInterval(() => {
      this.kd_verifyOverlayIntegrity();
    }, 500);
  }
  kd_stopMonitoring() {
    if (this.kd_observer) {
      this.kd_observer.disconnect();
      this.kd_observer = null;
    }
    if (this.kd_tamperCheckTimer) {
      clearTimeout(this.kd_tamperCheckTimer);
      this.kd_tamperCheckTimer = null;
    }
    if (this.kd_periodicIntervalId) {
      clearInterval(this.kd_periodicIntervalId);
      this.kd_periodicIntervalId = null;
    }
    if (this.kd_storageListener && typeof window !== "undefined") {
      window.removeEventListener("storage", this.kd_storageListener);
      this.kd_storageListener = null;
    }
  }
  kd_scheduleTamperCheck() {
    if (this.kd_tamperCheckTimer) return;
    this.kd_tamperCheckTimer = setTimeout(() => {
      this.kd_tamperCheckTimer = null;
      this.kd_verifyOverlayIntegrity();
    }, 100);
  }
  kd_verifyOverlayIntegrity() {
    if (typeof document === "undefined") return;
    const lockOverlay = document.getElementById("kd-lock-screen");
    if (!lockOverlay) {
      this.kd_onTamperDetected({
        timestamp: Date.now(),
        reason: "Lock overlay element was removed from DOM."
      });
      return;
    }
    if (lockOverlay.getRootNode && lockOverlay.getRootNode() !== document) {
      this.kd_onTamperDetected({
        timestamp: Date.now(),
        reason: "Lock overlay was re-parented into Shadow DOM or external DocumentFragment."
      });
      return;
    }
    const computedStyle = window.getComputedStyle(lockOverlay);
    const display = computedStyle.display;
    const visibility = computedStyle.visibility;
    const opacity = parseFloat(computedStyle.opacity || "1");
    const zIndexStr = computedStyle.zIndex;
    const zIndex = parseInt(zIndexStr, 10);
    const rect = lockOverlay.getBoundingClientRect();
    if (display === "none" || visibility === "hidden" || opacity < 0.1 || rect.height < 10) {
      this.kd_onTamperDetected({
        timestamp: Date.now(),
        reason: `Lock overlay style/CSS tampering detected (display: ${display}, visibility: ${visibility}, opacity: ${opacity}, height: ${rect.height}px).`
      });
      return;
    }
    if (!isNaN(zIndex) && zIndex < 999999) {
      this.kd_onTamperDetected({
        timestamp: Date.now(),
        reason: `Lock overlay z-index lowered below security threshold (z-index: ${zIndex}).`
      });
      return;
    }
    if (typeof localStorage !== "undefined") {
      const isLockedSaved = localStorage.getItem("kd_screen_guard_is_locked") || sessionStorage.getItem("kd_screen_guard_is_locked");
      if (isLockedSaved !== "true") {
        this.kd_onTamperDetected({
          timestamp: Date.now(),
          reason: "Same-tab storage clearing detected: Lock storage key was deleted."
        });
      }
    }
  }
  kd_isMutationRelevant(mutations) {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (let i = 0; i < mutation.removedNodes.length; i++) {
          const node = mutation.removedNodes[i];
          if (node.id === "kd-lock-screen" || node.querySelector && node.querySelector("#kd-lock-screen")) {
            return true;
          }
        }
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (node.tagName === "STYLE" || node.tagName === "LINK") {
            return true;
          }
          const target = mutation.target;
          if (target && (target.id === "kd-lock-screen" || target.closest && target.closest("#kd-lock-screen"))) {
            return true;
          }
        }
      } else if (mutation.type === "attributes") {
        const target = mutation.target;
        if (target.id === "kd-lock-screen" || target.querySelector && target.querySelector("#kd-lock-screen")) {
          return true;
        }
      }
    }
    return false;
  }
};

// src/guard/kd_alarm_system.ts
var kd_AlarmSystem = class {
  constructor(speechEnabled = true, speechMessage = "Security Alert! System Locked!", audioEnabled = true, alarmSoundUrl) {
    this.kd_activeAudio = null;
    this.kd_audioContext = null;
    this.kd_oscillator = null;
    this.kd_lfo = null;
    this.kd_isSpeechActive = false;
    this.kd_isSirenActive = false;
    this.kd_interactionTrapActive = false;
    this.kd_speechErrorCount = 0;
    this.kd_trapHandler = null;
    this.kd_voicesChangedHandler = null;
    this.kd_voicesFallbackTimer = null;
    this.kd_speechLoopFallbackTimer = null;
    this.kd_trapEvents = ["mousemove", "scroll", "click", "keydown", "mousedown", "touchstart"];
    this.kd_speechEnabled = speechEnabled;
    this.kd_speechMessage = speechMessage;
    this.kd_audioEnabled = audioEnabled;
    this.kd_alarmSoundUrl = alarmSoundUrl;
  }
  kd_triggerAlarm(forceTrap = false) {
    if (this.kd_speechEnabled) {
      this.kd_startSpeech();
    }
    if (this.kd_audioEnabled) {
      if (this.kd_alarmSoundUrl) {
        this.kd_playAudioSound(this.kd_alarmSoundUrl, forceTrap);
      } else {
        this.kd_startBuiltInSiren(forceTrap);
      }
    }
  }
  kd_stopAlarm() {
    this.kd_isSpeechActive = false;
    this.kd_isSirenActive = false;
    this.kd_speechErrorCount = 0;
    if (this.kd_voicesFallbackTimer) {
      clearTimeout(this.kd_voicesFallbackTimer);
      this.kd_voicesFallbackTimer = null;
    }
    if (this.kd_speechLoopFallbackTimer) {
      clearTimeout(this.kd_speechLoopFallbackTimer);
      this.kd_speechLoopFallbackTimer = null;
    }
    if (this.kd_voicesChangedHandler && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.removeEventListener("voiceschanged", this.kd_voicesChangedHandler);
      this.kd_voicesChangedHandler = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.kd_stopBuiltInSiren();
    if (this.kd_activeAudio) {
      this.kd_activeAudio.pause();
      this.kd_activeAudio = null;
    }
    this.kd_removeInteractionTrap();
  }
  async kd_startBuiltInSiren(forceTrap) {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.kd_audioContext) {
        this.kd_audioContext = new AudioCtx();
      }
      if (this.kd_audioContext.state === "suspended") {
        if (forceTrap) {
          this.kd_enableInteractionTrap("");
          return;
        }
        try {
          await this.kd_audioContext.resume();
        } catch {
          this.kd_enableInteractionTrap("");
          return;
        }
      }
      if (this.kd_isSirenActive) return;
      this.kd_isSirenActive = true;
      const osc = this.kd_audioContext.createOscillator();
      const lfo = this.kd_audioContext.createOscillator();
      const lfoGain = this.kd_audioContext.createGain();
      const masterGain = this.kd_audioContext.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(880, this.kd_audioContext.currentTime);
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(4, this.kd_audioContext.currentTime);
      lfoGain.gain.setValueAtTime(440, this.kd_audioContext.currentTime);
      lfo.connect(osc.frequency);
      osc.connect(masterGain);
      masterGain.connect(this.kd_audioContext.destination);
      masterGain.gain.setValueAtTime(0.3, this.kd_audioContext.currentTime);
      lfo.start();
      osc.start();
      this.kd_oscillator = osc;
      this.kd_lfo = lfo;
    } catch {
    }
  }
  kd_stopBuiltInSiren() {
    if (this.kd_oscillator) {
      try {
        this.kd_oscillator.stop();
        this.kd_oscillator.disconnect();
      } catch {
      }
      this.kd_oscillator = null;
    }
    if (this.kd_lfo) {
      try {
        this.kd_lfo.stop();
        this.kd_lfo.disconnect();
      } catch {
      }
      this.kd_lfo = null;
    }
    if (this.kd_audioContext && this.kd_audioContext.state !== "closed") {
      try {
        this.kd_audioContext.suspend();
      } catch {
      }
    }
    this.kd_isSirenActive = false;
  }
  kd_startSpeech() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (this.kd_isSpeechActive) return;
    this.kd_isSpeechActive = true;
    this.kd_speechErrorCount = 0;
    const speak = () => {
      if (this.kd_voicesFallbackTimer) {
        clearTimeout(this.kd_voicesFallbackTimer);
        this.kd_voicesFallbackTimer = null;
      }
      if (this.kd_speechLoopFallbackTimer) {
        clearTimeout(this.kd_speechLoopFallbackTimer);
        this.kd_speechLoopFallbackTimer = null;
      }
      if (this.kd_voicesChangedHandler) {
        window.speechSynthesis.removeEventListener("voiceschanged", this.kd_voicesChangedHandler);
        this.kd_voicesChangedHandler = null;
      }
      if (!this.kd_isSpeechActive || this.kd_speechErrorCount >= 3) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(this.kd_speechMessage);
      utterance.lang = "en-US";
      utterance.rate = 1.1;
      utterance.volume = 1;
      utterance.pitch = 1.1;
      utterance.onend = () => {
        this.kd_speechErrorCount = 0;
        if (this.kd_speechLoopFallbackTimer) {
          clearTimeout(this.kd_speechLoopFallbackTimer);
          this.kd_speechLoopFallbackTimer = null;
        }
        if (this.kd_isSpeechActive) setTimeout(speak, 500);
      };
      utterance.onerror = (evt) => {
        if (evt && evt.error === "canceled") return;
        this.kd_speechErrorCount++;
        if (this.kd_speechErrorCount < 3 && this.kd_isSpeechActive) {
          setTimeout(speak, 1e3);
        } else {
          this.kd_isSpeechActive = false;
        }
      };
      window.speechSynthesis.speak(utterance);
      this.kd_speechLoopFallbackTimer = setTimeout(() => {
        if (this.kd_isSpeechActive) {
          speak();
        }
      }, 5e3);
    };
    if (window.speechSynthesis.getVoices().length === 0) {
      this.kd_voicesChangedHandler = () => speak();
      window.speechSynthesis.addEventListener("voiceschanged", this.kd_voicesChangedHandler, { once: true });
      this.kd_voicesFallbackTimer = setTimeout(() => {
        speak();
      }, 1e3);
    } else {
      speak();
    }
  }
  kd_playAudioSound(url, forceTrap) {
    if (typeof Audio === "undefined") return;
    if (this.kd_activeAudio) {
      this.kd_activeAudio.pause();
      this.kd_activeAudio = null;
    }
    const audio = new Audio(url);
    audio.loop = true;
    this.kd_activeAudio = audio;
    if (forceTrap) {
      this.kd_enableInteractionTrap(url);
      return;
    }
    const playPromise = audio.play();
    if (playPromise !== void 0) {
      playPromise.then(() => {
        if (!this.kd_activeAudio || this.kd_activeAudio !== audio) {
          audio.pause();
        }
      }).catch(() => {
        setTimeout(() => {
          this.kd_enableInteractionTrap(url);
        }, 100);
      });
    }
  }
  kd_enableInteractionTrap(url) {
    if (this.kd_interactionTrapActive || typeof document === "undefined") return;
    this.kd_interactionTrapActive = true;
    const weakEvents = ["mousemove", "scroll"];
    const strongEvents = ["click", "keydown", "mousedown", "touchstart"];
    this.kd_trapHandler = (evt) => {
      const isStrongGesture = strongEvents.includes(evt.type);
      if (!isStrongGesture) {
        if (!this.kd_isSpeechActive && this.kd_speechEnabled) {
          this.kd_startSpeech();
        }
        return;
      }
      this.kd_removeInteractionTrap();
      if (this.kd_isSpeechActive) {
        this.kd_isSpeechActive = false;
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
      }
      if (url) {
        this.kd_playAudioSound(url, false);
      } else {
        this.kd_startBuiltInSiren(false);
      }
    };
    this.kd_trapEvents.forEach((evtName) => {
      document.addEventListener(evtName, this.kd_trapHandler, { capture: true });
    });
  }
  kd_removeInteractionTrap() {
    if (this.kd_trapHandler && typeof document !== "undefined") {
      this.kd_trapEvents.forEach((evtName) => {
        document.removeEventListener(evtName, this.kd_trapHandler, true);
      });
      this.kd_trapHandler = null;
    }
    this.kd_interactionTrapActive = false;
  }
};

// src/guard/kd_intruder_camera.ts
var _kd_IntruderCamera = class _kd_IntruderCamera {
  static async kd_captureSnapshot() {
    if (typeof window === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return null;
    }
    if (this.kd_isCapturing) {
      return null;
    }
    this.kd_isCapturing = true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } }
      });
      return await new Promise((resolve) => {
        const video = document.createElement("video");
        video.autoplay = true;
        video.playsInline = true;
        video.muted = true;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play().then(() => {
            setTimeout(() => {
              try {
                const canvas = document.createElement("canvas");
                canvas.width = video.videoWidth || 640;
                canvas.height = video.videoHeight || 480;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
                  kd_stopStream();
                  resolve(dataUrl);
                } else {
                  kd_stopStream();
                  resolve(null);
                }
              } catch {
                kd_stopStream();
                resolve(null);
              }
            }, 200);
          }).catch(() => {
            kd_stopStream();
            resolve(null);
          });
        };
        function kd_stopStream() {
          stream.getTracks().forEach((track) => track.stop());
          video.srcObject = null;
          _kd_IntruderCamera.kd_isCapturing = false;
        }
      });
    } catch {
      this.kd_isCapturing = false;
      return null;
    }
  }
};
_kd_IntruderCamera.kd_isCapturing = false;
var kd_IntruderCamera = _kd_IntruderCamera;

// src/guard/kd_webauthn.ts
var kd_WebAuthnManager = class {
  static async kd_isSupported() {
    if (typeof window === "undefined" || !window.PublicKeyCredential) return false;
    try {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch {
      return false;
    }
  }
  static async kd_registerBiometrics(userDisplayName = "ScreenGuard User") {
    if (!await this.kd_isSupported()) return null;
    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      const userId = new Uint8Array(16);
      window.crypto.getRandomValues(userId);
      const publicKey = {
        challenge,
        rp: { name: "kd-screen-guard" },
        user: {
          id: userId,
          name: "user@screenguard",
          displayName: userDisplayName
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" },
          { alg: -257, type: "public-key" }
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required"
        },
        timeout: 6e4
      };
      const credential = await navigator.credentials.create({ publicKey });
      if (credential && credential.id) {
        return credential.id;
      }
      return null;
    } catch {
      return null;
    }
  }
  static async kd_authenticateBiometrics(credentialId) {
    if (!await this.kd_isSupported()) return false;
    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      const publicKey = {
        challenge,
        userVerification: "required",
        timeout: 6e4
      };
      if (credentialId) {
        const credBuf = kd_stringToBuffer(credentialId);
        publicKey.allowCredentials = [{
          id: credBuf,
          type: "public-key"
        }];
      }
      const assertion = await navigator.credentials.get({ publicKey });
      return !!assertion;
    } catch {
      return false;
    }
  }
};
function kd_stringToBuffer(base64UrlStr) {
  try {
    let base64 = base64UrlStr.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const binaryStr = typeof window !== "undefined" ? atob(base64) : "";
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    return bytes;
  } catch {
    const encoder = new TextEncoder();
    return encoder.encode(base64UrlStr);
  }
}

// src/ui/kd_lock_ui.ts
var LOCK_HEADER_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
var EYE_ICON_SVG = `<svg class="kd-eye-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>`;
var EYE_SLASHED_ICON_SVG = `<svg class="kd-eye-icon-slashed" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 1.78 9.93 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></svg>`;
function kd_escapeHTML(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function kd_sanitizeCssClass(str) {
  if (!str) return "";
  return str.replace(/[^\w\s-]/g, "").trim();
}
var kd_LockUI = class {
  constructor(options, onUnlockAttempt, onRecoveryAttempt, onResetPassword, onWebAuthnAttempt, onBackgroundInteraction) {
    this.kd_focusTrapHandler = null;
    this.kd_touchMoveHandler = null;
    this.kd_visibilitySecurityHandler = null;
    this.kd_isSubmitting = false;
    this.kd_activeViewId = "kd-view-password";
    this.kd_options = options;
    this.kd_onUnlockAttempt = onUnlockAttempt;
    this.kd_onRecoveryAttempt = onRecoveryAttempt;
    this.kd_onResetPassword = onResetPassword;
    this.kd_onWebAuthnAttempt = onWebAuthnAttempt;
    this.kd_onBackgroundInteraction = onBackgroundInteraction;
  }
  get kd_currentActiveViewId() {
    return this.kd_activeViewId;
  }
  kd_renderOverlay(preserveViewId) {
    if (typeof document === "undefined") return;
    this.kd_removeOverlay();
    if (preserveViewId) {
      this.kd_activeViewId = preserveViewId;
    }
    const titleText = kd_escapeHTML(this.kd_options.title || "Application Locked");
    const subtitleText = kd_escapeHTML(this.kd_options.subtitle || "Please enter your password to continue.");
    const questionText = kd_escapeHTML(this.kd_options.securityQuestion || "");
    const customClass = kd_sanitizeCssClass(this.kd_options.customCssClass || "");
    const isPassActive = this.kd_activeViewId === "kd-view-password" ? "active" : "";
    const isRecActive = this.kd_activeViewId === "kd-view-recovery" ? "active" : "";
    const isResetActive = this.kd_activeViewId === "kd-view-reset" ? "active" : "";
    const webAuthnBtnHTML = this.kd_options.enableWebAuthn ? `<button type="button" id="kd-btn-webauthn" class="kd-btn-webauthn"><span>\u{1F446} Touch ID / Face ID / Hello</span></button>` : "";
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
                        <button type="button" id="kd-forgot-link" class="kd-lock-forgot-link" ${!this.kd_options.securityQuestion || !this.kd_options.securityAnswerHash ? 'disabled title="No security question is set"' : ""}>Forgot Password?</button>
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
    document.body.insertAdjacentHTML("beforeend", overlayHTML);
    document.body.classList.add("kd-body-locked");
    this.kd_setAriaHiddenSiblings(true);
    this.kd_setupFocusTrap();
    this.kd_setupTouchMovePrevention();
    this.kd_setupVisibilitySecurity();
    this.kd_bindEvents();
  }
  kd_removeOverlay() {
    if (typeof document === "undefined") return;
    this.kd_setAriaHiddenSiblings(false);
    const existing = document.getElementById("kd-lock-screen");
    if (existing) existing.remove();
    document.body.classList.remove("kd-body-locked");
    if (this.kd_focusTrapHandler) {
      window.removeEventListener("keydown", this.kd_focusTrapHandler, true);
      this.kd_focusTrapHandler = null;
    }
    if (this.kd_touchMoveHandler) {
      window.removeEventListener("touchmove", this.kd_touchMoveHandler);
      this.kd_touchMoveHandler = null;
    }
    if (this.kd_visibilitySecurityHandler) {
      document.removeEventListener("visibilitychange", this.kd_visibilitySecurityHandler);
      this.kd_visibilitySecurityHandler = null;
    }
    this.kd_isSubmitting = false;
  }
  static kd_createHeaderLockButtonIcon() {
    const btnContainer = document.createElement("button");
    btnContainer.type = "button";
    btnContainer.title = "Lock Screen";
    btnContainer.setAttribute("aria-label", "Lock Screen");
    btnContainer.className = "kd-header-lock-btn";
    btnContainer.innerHTML = LOCK_HEADER_ICON;
    return btnContainer;
  }
  static kd_showIntruderReviewModal(dataUrl, reason, timestamp) {
    if (typeof document === "undefined" || !dataUrl) return;
    const existingModal = document.getElementById("kd-intruder-modal");
    if (existingModal) existingModal.remove();
    const dateStr = new Date(timestamp).toLocaleString();
    const reasonText = kd_escapeHTML(reason);
    const modalHTML = `
            <div class="kd-intruder-overlay" id="kd-intruder-modal" role="dialog" aria-modal="true">
                <div class="kd-intruder-panel">
                    <div class="kd-intruder-badge">
                        <span>\u26A0\uFE0F Intruder Snapshot Captured</span>
                    </div>
                    <h3>Security Incident Detected</h3>
                    <p>An unauthorized attempt occurred on <strong>${dateStr}</strong>.<br>Reason: <em>${reasonText}</em></p>
                    <div class="kd-intruder-img-container">
                        <img src="${dataUrl}" alt="Intruder Snapshot" class="kd-intruder-img">
                    </div>
                    <div class="kd-intruder-actions">
                        <button type="button" id="kd-btn-download-snapshot" class="kd-btn-download">
                            <span>\u{1F4E5} Download Photo</span>
                        </button>
                        <button type="button" id="kd-btn-dismiss-snapshot" class="kd-btn-dismiss">
                            <span>\u2716\uFE0F Dismiss & Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const modal = document.getElementById("kd-intruder-modal");
    if (!modal) return;
    const downloadBtn = modal.querySelector("#kd-btn-download-snapshot");
    const dismissBtn = modal.querySelector("#kd-btn-dismiss-snapshot");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `intruder_snapshot_${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
    }
    if (dismissBtn) {
      dismissBtn.addEventListener("click", () => {
        modal.remove();
      });
    }
  }
  kd_showError(msgOrElementId, message) {
    if (typeof document === "undefined") return;
    if (message !== void 0) {
      const el = document.getElementById(msgOrElementId);
      if (el) el.textContent = message;
    } else {
      const el = document.getElementById("kd-password-error") || document.getElementById("kd-recovery-error") || document.getElementById("kd-reset-error");
      if (el) el.textContent = msgOrElementId;
    }
  }
  kd_clearError() {
    this.kd_showError("");
  }
  kd_showLockoutError(secondsRemaining) {
    this.kd_showError(`Too many failed attempts. Locked out for ${secondsRemaining}s.`);
    const unlockBtn = document.getElementById("kd-unlock-btn");
    const passInput = document.getElementById("kd-lock-password-input");
    if (unlockBtn) {
      unlockBtn.disabled = true;
      unlockBtn.setAttribute("data-lockout", "true");
    }
    if (passInput) passInput.disabled = true;
  }
  kd_clearLockoutError() {
    this.kd_showError("");
    const unlockBtn = document.getElementById("kd-unlock-btn");
    const passInput = document.getElementById("kd-lock-password-input");
    if (unlockBtn) {
      unlockBtn.disabled = false;
      unlockBtn.removeAttribute("data-lockout");
    }
    if (passInput) passInput.disabled = false;
  }
  kd_destroy() {
    this.kd_removeOverlay();
  }
  kd_setAriaHiddenSiblings(hide) {
    if (typeof document === "undefined") return;
    const children = Array.from(document.body.children);
    children.forEach((child) => {
      if (child.id !== "kd-lock-screen" && child.tagName !== "SCRIPT" && child.tagName !== "STYLE") {
        if (hide) {
          child.setAttribute("aria-hidden", "true");
          child.setAttribute("data-kd-aria-hidden", "true");
        } else if (child.getAttribute("data-kd-aria-hidden") === "true") {
          child.removeAttribute("aria-hidden");
          child.removeAttribute("data-kd-aria-hidden");
        }
      }
    });
  }
  kd_setupVisibilitySecurity() {
    if (typeof document === "undefined") return;
    this.kd_visibilitySecurityHandler = () => {
      if (document.visibilityState === "hidden") {
        const overlay = document.getElementById("kd-lock-screen");
        if (overlay) {
          overlay.querySelectorAll("input").forEach((input) => {
            input.value = "";
          });
        }
      }
    };
    document.addEventListener("visibilitychange", this.kd_visibilitySecurityHandler);
  }
  kd_setupTouchMovePrevention() {
    const overlay = document.getElementById("kd-lock-screen");
    if (!overlay) return;
    this.kd_touchMoveHandler = (evt) => {
      const targetEl = evt.target;
      if (targetEl && targetEl.closest(".kd-lock-panel")) {
        return;
      }
      if (evt.cancelable) {
        evt.preventDefault();
      }
    };
    overlay.addEventListener("touchmove", this.kd_touchMoveHandler, { passive: false });
  }
  kd_setupFocusTrap() {
    if (this.kd_focusTrapHandler) {
      window.removeEventListener("keydown", this.kd_focusTrapHandler, true);
    }
    this.kd_focusTrapHandler = (evt) => {
      const overlay = document.getElementById("kd-lock-screen");
      if (!overlay) return;
      if (evt.key === "Tab") {
        const activeView = overlay.querySelector(".kd-view.active");
        if (!activeView) return;
        const focusables = Array.from(
          activeView.querySelectorAll(
            'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null && window.getComputedStyle(el).display !== "none");
        if (focusables.length === 0) {
          evt.preventDefault();
          const panel = overlay.querySelector(".kd-lock-panel");
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
      } else if (evt.key === "Escape") {
        evt.preventDefault();
        evt.stopPropagation();
      }
    };
    window.addEventListener("keydown", this.kd_focusTrapHandler, true);
  }
  kd_bindEvents() {
    const lockScreen = document.getElementById("kd-lock-screen");
    if (!lockScreen) return;
    const lockPanel = lockScreen.querySelector(".kd-lock-panel");
    if (lockPanel) {
      lockPanel.addEventListener("mousedown", (e) => {
        e.stopPropagation();
      });
    }
    const activeView = lockScreen.querySelector(`#${this.kd_activeViewId}`);
    const activeInput = activeView ? activeView.querySelector("input") : null;
    const passInput = lockScreen.querySelector("#kd-lock-password-input");
    const unlockBtn = lockScreen.querySelector("#kd-unlock-btn");
    const webAuthnBtn = lockScreen.querySelector("#kd-btn-webauthn");
    const forgotLink = lockScreen.querySelector("#kd-forgot-link");
    const backLoginLink = lockScreen.querySelector("#kd-back-to-login-link");
    const resetBackLoginLink = lockScreen.querySelector("#kd-reset-back-to-login-link");
    const submitAnswerBtn = lockScreen.querySelector("#kd-submit-answer-btn");
    const answerInput = lockScreen.querySelector("#kd-recovery-answer-input");
    const resetPasswordBtn = lockScreen.querySelector("#kd-reset-password-btn");
    if (this.kd_onBackgroundInteraction) {
      lockScreen.addEventListener("mousedown", (e) => {
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
          passInput.value = "";
        }
      } finally {
        this.kd_isSubmitting = false;
        if (unlockBtn && !unlockBtn.hasAttribute("data-lockout")) unlockBtn.disabled = false;
      }
    };
    if (unlockBtn) unlockBtn.onclick = handleUnlock;
    if (passInput) {
      passInput.onkeydown = (e) => {
        if (e.key === "Enter" && !e.isComposing) handleUnlock();
      };
    }
    if (webAuthnBtn && this.kd_onWebAuthnAttempt) {
      webAuthnBtn.onclick = async () => {
        if (this.kd_isSubmitting) return;
        this.kd_isSubmitting = true;
        webAuthnBtn.disabled = true;
        try {
          const success = await this.kd_onWebAuthnAttempt();
          if (!success) {
            this.kd_showError("kd-password-error", "Biometric verification failed.");
          }
        } finally {
          this.kd_isSubmitting = false;
          webAuthnBtn.disabled = false;
        }
      };
    }
    if (forgotLink && !forgotLink.disabled) {
      forgotLink.onclick = () => this.kd_switchView("kd-view-recovery");
    }
    if (backLoginLink) {
      backLoginLink.onclick = () => this.kd_switchView("kd-view-password");
    }
    if (resetBackLoginLink) {
      resetBackLoginLink.onclick = () => this.kd_switchView("kd-view-password");
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
              this.kd_switchView("kd-view-reset");
            } else {
              this.kd_showError("kd-recovery-error", "Incorrect answer.");
              answerInput.value = "";
            }
          }
        } finally {
          this.kd_isSubmitting = false;
          if (submitAnswerBtn) submitAnswerBtn.disabled = false;
        }
      };
      submitAnswerBtn.onclick = handleAnswer;
      answerInput.onkeydown = (e) => {
        if (e.key === "Enter" && !e.isComposing) handleAnswer();
      };
    }
    if (resetPasswordBtn) {
      resetPasswordBtn.onclick = async () => {
        if (this.kd_isSubmitting) return;
        const newPass = lockScreen.querySelector("#kd-reset-new-password")?.value;
        const confirmPass = lockScreen.querySelector("#kd-reset-confirm-password")?.value;
        if (!newPass || !confirmPass || newPass.trim().length === 0 || confirmPass.trim().length === 0) {
          return this.kd_showError("kd-reset-error", "Password cannot be empty or whitespace only.");
        }
        if (newPass !== confirmPass) {
          return this.kd_showError("kd-reset-error", "Passwords do not match.");
        }
        this.kd_isSubmitting = true;
        if (resetPasswordBtn) resetPasswordBtn.disabled = true;
        try {
          if (this.kd_onResetPassword) {
            await this.kd_onResetPassword(newPass);
          }
        } catch (err) {
          this.kd_showError("kd-reset-error", err?.message || "Failed to sync password with server. Please try again.");
        } finally {
          this.kd_isSubmitting = false;
          if (resetPasswordBtn) resetPasswordBtn.disabled = false;
        }
      };
    }
    lockScreen.querySelectorAll(".kd-password-toggle").forEach((btn) => {
      btn.onclick = (e) => {
        const button = e.currentTarget;
        const targetId = button.dataset.target;
        if (!targetId) return;
        const input = lockScreen.querySelector(`#${targetId}`);
        if (!input) return;
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        button.classList.toggle("show-password", isPassword);
        button.setAttribute("aria-pressed", isPassword ? "true" : "false");
        const actionLabel = isPassword ? "Hide Password" : "Show Password";
        button.setAttribute("aria-label", actionLabel);
        button.title = actionLabel;
      };
    });
  }
  kd_switchView(viewId) {
    const overlay = document.getElementById("kd-lock-screen");
    if (!overlay) return;
    this.kd_activeViewId = viewId;
    overlay.querySelectorAll(".kd-view").forEach((v) => v.classList.remove("active"));
    overlay.querySelectorAll(".kd-lock-error").forEach((e) => e.textContent = "");
    overlay.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    const target = overlay.querySelector(`#${viewId}`);
    if (target) {
      target.classList.add("active");
      const input = target.querySelector("input");
      if (input) input.focus();
    }
  }
};

// src/core/kd_lock_engine.ts
var LOCK_STORAGE_KEY = "kd_screen_guard_is_locked";
var FAILED_ATTEMPTS_STORAGE_KEY = "kd_screen_guard_failed_attempts";
var LOCKOUT_UNTIL_STORAGE_KEY = "kd_screen_guard_lockout_until";
var LOCKOUT_COUNT_STORAGE_KEY = "kd_screen_guard_lockout_count";
var kd_LockEngine = class {
  constructor(options = {}) {
    this.kd_passwordHash = "";
    this.kd_isLocked = false;
    this.kd_tamperCount = 0;
    this.kd_actionCount = 0;
    this.kd_failedAttemptsCount = 0;
    this.kd_lockoutCount = 0;
    this.kd_lockoutUntilTimestamp = 0;
    this.kd_lockoutTimerId = null;
    this.kd_lastAlertTimestamp = 0;
    this.kd_autoLockTracker = null;
    this.kd_tamperGuard = null;
    this.kd_alarmSystem = null;
    this.kd_ui = null;
    this.kd_attachedButtons = [];
    this.kd_historySecurityHandler = null;
    this.kd_lastIntruderSnapshot = null;
    this.kd_isHashing = false;
    this.kd_options = { ...options };
  }
  get kd_isLockedState() {
    return this.kd_isLocked;
  }
  async kd_init() {
    if (this.kd_autoLockTracker) {
      this.kd_autoLockTracker.kd_destroy();
      this.kd_autoLockTracker = null;
    }
    if (this.kd_tamperGuard) {
      this.kd_tamperGuard.kd_stopMonitoring();
      this.kd_tamperGuard = null;
    }
    if (this.kd_alarmSystem) {
      this.kd_alarmSystem.kd_stopAlarm();
      this.kd_alarmSystem = null;
    }
    if (this.kd_options.passwordHash) {
      this.kd_passwordHash = this.kd_options.passwordHash;
    } else if (this.kd_options.password) {
      this.kd_passwordHash = await this.kd_hashText(this.kd_options.password);
      delete this.kd_options.password;
    }
    this.kd_alarmSystem = new kd_AlarmSystem(
      this.kd_options.enableSpeechAlarm ?? (this.kd_options.enableAudioAlarm ?? false),
      this.kd_options.speechMessage || "Security Alert! System Locked!",
      this.kd_options.enableAudioAlarm ?? false,
      this.kd_options.alarmSoundUrl
    );
    this.kd_tamperGuard = new kd_TamperGuard((details) => {
      this.kd_handleTamperEvent(details);
    });
    this.kd_ui = new kd_LockUI(
      this.kd_options,
      (pass) => this.kd_verifyAndUnlock(pass),
      (ans) => this.kd_verifyRecoveryAnswer(ans),
      (newPass) => this.kd_resetPasswordAndUnlock(newPass),
      () => this.kd_verifyWebAuthn(),
      () => {
        if (this.kd_options.securityTriggerInteraction !== false) {
          this.kd_sendSecurityAlert("User interaction detected on lock screen.", false);
        }
      }
    );
    this.kd_autoLockTracker = new kd_AutoLockTracker(
      this.kd_options.autoLockMinutes || 0,
      () => this.kd_lock(),
      () => this.kd_unlock(true),
      (newHash) => {
        this.kd_passwordHash = newHash;
        this.kd_options.passwordHash = newHash;
      },
      this.kd_options.channelName
    );
    if (this.kd_options.autoLockMinutes && this.kd_options.autoLockMinutes > 0) {
      this.kd_autoLockTracker.kd_start();
    }
    this.kd_restoreSessionLockState();
    if (this.kd_options.lockOnStartup && !this.kd_isLocked) {
      this.kd_lock();
    }
    if (this.kd_isLocked) {
      if (this.kd_autoLockTracker) {
        this.kd_autoLockTracker.kd_setLockedState(true);
      }
      if (this.kd_ui) {
        this.kd_ui.kd_renderOverlay();
      }
      this.kd_setupHistorySecurityListeners();
    }
  }
  kd_lock() {
    if (this.kd_isLocked) return;
    this.kd_isLocked = true;
    this.kd_lastIntruderSnapshot = null;
    if (this.kd_autoLockTracker) {
      this.kd_autoLockTracker.kd_setLockedState(true);
      this.kd_autoLockTracker.kd_resetActivityTimestamp();
    }
    this.kd_setSessionLockState(true);
    if (this.kd_ui) {
      this.kd_ui.kd_renderOverlay();
    }
    if (this.kd_options.antiTamper !== false && this.kd_tamperGuard) {
      this.kd_tamperGuard.kd_startMonitoring();
    }
    this.kd_setupHistorySecurityListeners();
    this.kd_notifyStateChange();
    if (this.kd_options.onLock) {
      this.kd_options.onLock();
    }
  }
  kd_unlock(isSilent = false) {
    if (!this.kd_isLocked) return;
    this.kd_isLocked = false;
    this.kd_actionCount = 0;
    this.kd_failedAttemptsCount = 0;
    this.kd_lockoutCount = 0;
    this.kd_lockoutUntilTimestamp = 0;
    if (this.kd_lockoutTimerId) {
      clearInterval(this.kd_lockoutTimerId);
      this.kd_lockoutTimerId = null;
    }
    if (this.kd_autoLockTracker) {
      this.kd_autoLockTracker.kd_setLockedState(false);
      this.kd_autoLockTracker.kd_resetActivityTimestamp();
      if (!isSilent) {
        this.kd_autoLockTracker.kd_notifyUnlockEvent();
      }
    }
    this.kd_setSessionLockState(false);
    if (this.kd_tamperGuard) {
      this.kd_tamperGuard.kd_stopMonitoring();
    }
    if (this.kd_alarmSystem) {
      this.kd_alarmSystem.kd_stopAlarm();
    }
    if (this.kd_ui) {
      this.kd_ui.kd_removeOverlay();
    }
    this.kd_removeHistorySecurityListeners();
    if (this.kd_lastIntruderSnapshot) {
      const snapshot = this.kd_lastIntruderSnapshot;
      this.kd_lastIntruderSnapshot = null;
      setTimeout(() => {
        kd_LockUI.kd_showIntruderReviewModal(snapshot.dataUrl, snapshot.reason, snapshot.timestamp);
      }, 300);
    }
    this.kd_notifyStateChange();
    if (this.kd_options.onUnlock) {
      this.kd_options.onUnlock();
    }
  }
  async kd_updateOptions(newOptions) {
    this.kd_options = { ...this.kd_options, ...newOptions };
    if (newOptions.password) {
      this.kd_passwordHash = await this.kd_hashText(newOptions.password);
      delete this.kd_options.password;
    } else if (newOptions.passwordHash) {
      this.kd_passwordHash = newOptions.passwordHash;
    }
    if (newOptions.autoLockMinutes !== void 0 && this.kd_autoLockTracker) {
      this.kd_autoLockTracker.kd_updateConfig(newOptions.autoLockMinutes);
    }
    if (this.kd_alarmSystem) {
      this.kd_alarmSystem.kd_stopAlarm();
      this.kd_alarmSystem = new kd_AlarmSystem(
        this.kd_options.enableSpeechAlarm ?? (this.kd_options.enableAudioAlarm ?? false),
        this.kd_options.speechMessage || "Security Alert! System Locked!",
        this.kd_options.enableAudioAlarm ?? false,
        this.kd_options.alarmSoundUrl
      );
      if (this.kd_isLocked) {
        this.kd_alarmSystem.kd_triggerAlarm();
      }
    }
    if (this.kd_isLocked && this.kd_ui) {
      const currentViewId = this.kd_ui.kd_currentActiveViewId;
      this.kd_ui.kd_destroy();
      this.kd_ui = new kd_LockUI(
        this.kd_options,
        (pass) => this.kd_verifyAndUnlock(pass),
        (ans) => this.kd_verifyRecoveryAnswer(ans),
        (newPass) => this.kd_resetPasswordAndUnlock(newPass),
        () => this.kd_verifyWebAuthn(),
        () => {
          if (this.kd_options.securityTriggerInteraction !== false) {
            this.kd_sendSecurityAlert("User interaction detected on lock screen.", false);
          }
        }
      );
      this.kd_ui.kd_renderOverlay(currentViewId);
    }
  }
  kd_getState() {
    return {
      isLocked: this.kd_isLocked,
      lastActivity: Date.now(),
      tamperCount: this.kd_tamperCount
    };
  }
  async kd_verifyAndUnlock(enteredPassword) {
    if (this.kd_isLockoutActive() || this.kd_isHashing) {
      return false;
    }
    if (!this.kd_passwordHash || !enteredPassword) {
      this.kd_handleFailedAttempt("Empty password attempt or unconfigured password hash.");
      return false;
    }
    this.kd_isHashing = true;
    try {
      const hash = await this.kd_hashText(enteredPassword);
      if (hash === this.kd_passwordHash) {
        this.kd_unlock();
        return true;
      }
      this.kd_handleFailedAttempt("Incorrect password entered.");
      return false;
    } finally {
      this.kd_isHashing = false;
    }
  }
  async kd_verifyWebAuthn() {
    if (this.kd_isLockoutActive()) {
      return false;
    }
    const success = await kd_WebAuthnManager.kd_authenticateBiometrics(this.kd_options.webAuthnCredentialId);
    if (success) {
      this.kd_unlock();
      return true;
    }
    this.kd_handleFailedAttempt("Biometric verification failed.");
    return false;
  }
  async kd_verifyRecoveryAnswer(enteredAnswer) {
    if (this.kd_isLockoutActive()) {
      return false;
    }
    if (!this.kd_options.securityAnswerHash || !enteredAnswer || !enteredAnswer.trim()) {
      this.kd_handleFailedAttempt("Empty recovery answer attempt or unconfigured recovery hash.");
      return false;
    }
    const hash = await this.kd_hashText(enteredAnswer.toLowerCase().trim());
    if (hash === this.kd_options.securityAnswerHash) {
      return true;
    }
    this.kd_handleFailedAttempt("Incorrect password recovery answer attempt.");
    return false;
  }
  async kd_resetPasswordAndUnlock(newPassword) {
    if (!newPassword) return;
    const newHash = await this.kd_hashText(newPassword);
    if (this.kd_options.onPasswordReset) {
      await this.kd_options.onPasswordReset(newHash);
    }
    this.kd_passwordHash = newHash;
    this.kd_options.passwordHash = newHash;
    if (this.kd_autoLockTracker) {
      this.kd_autoLockTracker.kd_notifyPasswordResetEvent(newHash);
    }
    this.kd_unlock();
  }
  kd_createLockButton() {
    const btn = kd_LockUI.kd_createHeaderLockButtonIcon();
    btn.onclick = (e) => {
      e.stopPropagation();
      this.kd_lock();
    };
    this.kd_attachedButtons.push(btn);
    return btn;
  }
  kd_attachLockButton(target) {
    if (typeof document === "undefined") return null;
    let el = null;
    if (typeof target === "string") {
      el = document.querySelector(target);
    } else {
      el = target;
    }
    if (!el) return null;
    const btn = this.kd_createLockButton();
    el.appendChild(btn);
    return btn;
  }
  kd_destroy() {
    this.kd_unlock();
    this.kd_removeHistorySecurityListeners();
    if (this.kd_autoLockTracker) {
      this.kd_autoLockTracker.kd_destroy();
      this.kd_autoLockTracker = null;
    }
    if (this.kd_tamperGuard) {
      this.kd_tamperGuard.kd_stopMonitoring();
      this.kd_tamperGuard = null;
    }
    if (this.kd_alarmSystem) {
      this.kd_alarmSystem.kd_stopAlarm();
      this.kd_alarmSystem = null;
    }
    this.kd_attachedButtons.forEach((btn) => {
      btn.onclick = null;
    });
    this.kd_attachedButtons = [];
    this.kd_ui = null;
    this.kd_lastIntruderSnapshot = null;
  }
  async kd_hashText(text) {
    if (this.kd_options.salt) {
      return await kd_workerCrypto.kd_pbkdf2(text, this.kd_options.salt, this.kd_options.iterations || 1e5);
    }
    return await kd_workerCrypto.kd_sha256(text);
  }
  kd_setupHistorySecurityListeners() {
    if (typeof window === "undefined" || this.kd_historySecurityHandler) return;
    this.kd_historySecurityHandler = () => {
      if (this.kd_isLocked) {
        this.kd_sendSecurityAlert("Browser history navigation detected while locked.", false);
      }
    };
    window.addEventListener("popstate", this.kd_historySecurityHandler);
    window.addEventListener("hashchange", this.kd_historySecurityHandler);
  }
  kd_removeHistorySecurityListeners() {
    if (typeof window === "undefined" || !this.kd_historySecurityHandler) return;
    window.removeEventListener("popstate", this.kd_historySecurityHandler);
    window.removeEventListener("hashchange", this.kd_historySecurityHandler);
    this.kd_historySecurityHandler = null;
  }
  async kd_handleFailedAttempt(reason) {
    this.kd_failedAttemptsCount++;
    const maxAttempts = this.kd_options.maxFailedAttempts || 5;
    if (this.kd_failedAttemptsCount >= maxAttempts) {
      this.kd_lockoutCount++;
      const baseDuration = this.kd_options.lockoutDurationSeconds || 30;
      let durationSec = baseDuration;
      if (this.kd_options.enableExponentialLockout !== false) {
        if (this.kd_lockoutCount === 1) {
          durationSec = baseDuration;
        } else if (this.kd_lockoutCount === 2) {
          durationSec = Math.max(baseDuration * 2, 60);
        } else if (this.kd_lockoutCount === 3) {
          durationSec = Math.max(baseDuration * 10, 300);
        } else if (this.kd_lockoutCount === 4) {
          durationSec = Math.max(baseDuration * 30, 900);
        } else {
          durationSec = Math.max(baseDuration * 120, 3600);
        }
      }
      this.kd_lockoutUntilTimestamp = Date.now() + durationSec * 1e3;
      this.kd_saveSecurityState();
      this.kd_startLockoutCountdown();
      this.kd_sendSecurityAlert(`Max failed authentication attempts exceeded (${this.kd_failedAttemptsCount}). Lockout level ${this.kd_lockoutCount} engaged (${durationSec}s).`, true);
    } else {
      this.kd_saveSecurityState();
      const remaining = maxAttempts - this.kd_failedAttemptsCount;
      if (this.kd_ui) {
        if (remaining === 1) {
          this.kd_ui.kd_showError("Warning: 1 attempt remaining before temporary security lockout.");
        } else {
          this.kd_ui.kd_showError("Incorrect password.");
        }
      }
      this.kd_sendSecurityAlert(`Failed authentication attempt: ${reason}`, false);
    }
    if (this.kd_options.enableIntruderSnapshot) {
      kd_IntruderCamera.kd_captureSnapshot().then((photoUrl) => {
        if (photoUrl) {
          this.kd_lastIntruderSnapshot = {
            dataUrl: photoUrl,
            reason: `Unauthorized unlock attempt: ${reason}`,
            timestamp: Date.now()
          };
          if (this.kd_options.onIntruderCaptured) {
            const alertDetails = {
              reason,
              timestamp: Date.now(),
              actionCount: this.kd_actionCount,
              isLocked: this.kd_isLocked,
              intruderSnapshotUrl: photoUrl
            };
            this.kd_options.onIntruderCaptured(photoUrl, alertDetails);
          }
        }
      }).catch(() => {
      });
    }
  }
  kd_handleTamperEvent(details) {
    this.kd_tamperCount++;
    const baseDuration = Math.max(this.kd_options.lockoutDurationSeconds || 30, 300);
    this.kd_lockoutUntilTimestamp = Date.now() + baseDuration * 1e3;
    this.kd_saveSecurityState();
    this.kd_startLockoutCountdown();
    if (this.kd_options.enableIntruderSnapshot) {
      kd_IntruderCamera.kd_captureSnapshot().then((photoUrl) => {
        if (photoUrl) {
          this.kd_lastIntruderSnapshot = {
            dataUrl: photoUrl,
            reason: `Anti-Tamper Security Triggered: ${details.reason}`,
            timestamp: Date.now()
          };
          if (this.kd_options.onIntruderCaptured) {
            const alertDetails = {
              reason: details.reason,
              timestamp: Date.now(),
              actionCount: this.kd_actionCount,
              isLocked: this.kd_isLocked,
              intruderSnapshotUrl: photoUrl
            };
            this.kd_options.onIntruderCaptured(photoUrl, alertDetails);
          }
        }
      }).catch(() => {
      });
    }
    if (this.kd_ui) {
      this.kd_ui.kd_renderOverlay();
    }
    this.kd_sendSecurityAlert(`Critical Security Tamper Event Detected: ${details.reason}. 5-minute Hard Lockout engaged.`, true);
  }
  kd_isLockoutActive() {
    if (this.kd_lockoutUntilTimestamp > Date.now()) {
      const remainingSec = Math.ceil((this.kd_lockoutUntilTimestamp - Date.now()) / 1e3);
      if (this.kd_ui) {
        this.kd_ui.kd_showLockoutError(remainingSec);
      }
      return true;
    }
    if (this.kd_ui) {
      this.kd_ui.kd_clearLockoutError();
    }
    return false;
  }
  kd_startLockoutCountdown() {
    if (this.kd_lockoutTimerId) {
      clearInterval(this.kd_lockoutTimerId);
    }
    this.kd_lockoutTimerId = setInterval(() => {
      if (this.kd_lockoutUntilTimestamp <= Date.now()) {
        clearInterval(this.kd_lockoutTimerId);
        this.kd_lockoutTimerId = null;
        this.kd_failedAttemptsCount = 0;
        if (this.kd_ui) {
          this.kd_ui.kd_clearError();
        }
      } else {
        this.kd_isLockoutActive();
      }
    }, 1e3);
  }
  kd_sendSecurityAlert(message, isSevere = false) {
    const now = Date.now();
    if (now - this.kd_lastAlertTimestamp < 1e3 && !isSevere) return;
    this.kd_lastAlertTimestamp = now;
    if (this.kd_alarmSystem) {
      this.kd_alarmSystem.kd_triggerAlarm(isSevere);
    }
    if (this.kd_options.onSecurityAlert) {
      const alertDetails = {
        reason: message,
        timestamp: now,
        actionCount: ++this.kd_actionCount,
        isLocked: this.kd_isLocked
      };
      this.kd_options.onSecurityAlert(alertDetails);
    }
  }
  kd_notifyStateChange() {
    if (this.kd_options.onStateChange) {
      this.kd_options.onStateChange(this.kd_getState());
    }
  }
  kd_setSessionLockState(locked) {
    if (typeof window === "undefined") return;
    const storage = this.kd_options.persistLockState === "local" ? localStorage : sessionStorage;
    if (locked) {
      storage.setItem(LOCK_STORAGE_KEY, "true");
    } else {
      storage.removeItem(LOCK_STORAGE_KEY);
      sessionStorage.removeItem(LOCK_STORAGE_KEY);
      localStorage.removeItem(LOCK_STORAGE_KEY);
      sessionStorage.removeItem(FAILED_ATTEMPTS_STORAGE_KEY);
      localStorage.removeItem(FAILED_ATTEMPTS_STORAGE_KEY);
      sessionStorage.removeItem(LOCKOUT_COUNT_STORAGE_KEY);
      localStorage.removeItem(LOCKOUT_COUNT_STORAGE_KEY);
      sessionStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
      localStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
    }
  }
  kd_saveSecurityState() {
    if (typeof window === "undefined") return;
    const storage = this.kd_options.persistLockState === "local" ? localStorage : sessionStorage;
    if (this.kd_isLocked) {
      storage.setItem(LOCK_STORAGE_KEY, "true");
    }
    localStorage.setItem(FAILED_ATTEMPTS_STORAGE_KEY, String(this.kd_failedAttemptsCount));
    localStorage.setItem(LOCKOUT_COUNT_STORAGE_KEY, String(this.kd_lockoutCount));
    if (this.kd_lockoutUntilTimestamp > Date.now()) {
      localStorage.setItem(LOCKOUT_UNTIL_STORAGE_KEY, String(this.kd_lockoutUntilTimestamp));
    } else {
      localStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
    }
  }
  kd_restoreSessionLockState() {
    if (typeof window === "undefined") return;
    const storage = this.kd_options.persistLockState === "local" ? localStorage : sessionStorage;
    const savedLocked = storage.getItem(LOCK_STORAGE_KEY) || sessionStorage.getItem(LOCK_STORAGE_KEY) || localStorage.getItem(LOCK_STORAGE_KEY);
    if (savedLocked === "true") {
      this.kd_isLocked = true;
    }
    const savedFailed = localStorage.getItem(FAILED_ATTEMPTS_STORAGE_KEY) || sessionStorage.getItem(FAILED_ATTEMPTS_STORAGE_KEY);
    if (savedFailed) {
      this.kd_failedAttemptsCount = parseInt(savedFailed, 10) || 0;
    }
    const savedLockoutCount = localStorage.getItem(LOCKOUT_COUNT_STORAGE_KEY) || sessionStorage.getItem(LOCKOUT_COUNT_STORAGE_KEY);
    if (savedLockoutCount) {
      this.kd_lockoutCount = parseInt(savedLockoutCount, 10) || 0;
    }
    const savedUntil = localStorage.getItem(LOCKOUT_UNTIL_STORAGE_KEY) || sessionStorage.getItem(LOCKOUT_UNTIL_STORAGE_KEY);
    if (savedUntil) {
      const untilTs = parseInt(savedUntil, 10) || 0;
      if (untilTs > Date.now()) {
        this.kd_lockoutUntilTimestamp = untilTs;
        this.kd_isLocked = true;
        this.kd_startLockoutCountdown();
      } else {
        localStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
        sessionStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
      }
    }
  }
};

// src/index.ts
var ScreenGuard = class {
  constructor(options = {}) {
    this.kd_engine = new kd_LockEngine(options);
  }
  get isLocked() {
    return this.kd_engine.kd_isLockedState;
  }
  async init() {
    await this.kd_engine.kd_init();
  }
  lock() {
    this.kd_engine.kd_lock();
  }
  unlock() {
    this.kd_engine.kd_unlock();
  }
  async updateOptions(newOptions) {
    await this.kd_engine.kd_updateOptions(newOptions);
  }
  getState() {
    return this.kd_engine.kd_getState();
  }
  createLockButton() {
    return this.kd_engine.kd_createLockButton();
  }
  attachLockButton(target) {
    return this.kd_engine.kd_attachLockButton(target);
  }
  destroy() {
    this.kd_engine.kd_destroy();
  }
  static async registerBiometrics(userDisplayName = "ScreenGuard User") {
    return await kd_WebAuthnManager.kd_registerBiometrics(userDisplayName);
  }
  static async isBiometricsSupported() {
    return await kd_WebAuthnManager.kd_isSupported();
  }
  static async hashPassword(password, salt, iterations = 1e5) {
    if (salt) {
      return await kd_pbkdf2(password, salt, iterations);
    }
    return await kd_sha256(password);
  }
  static async pbkdf2(password, salt, iterations = 1e5) {
    return await kd_pbkdf2(password, salt, iterations);
  }
  static async hashRecoveryAnswer(answer, salt, iterations = 1e5) {
    if (!answer || !answer.trim()) return "";
    const normalized = answer.toLowerCase().trim();
    if (salt) {
      return await kd_pbkdf2(normalized, salt, iterations);
    }
    return await kd_sha256(normalized);
  }
};
var index_default = ScreenGuard;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ScreenGuard,
  kd_LockEngine,
  kd_pbkdf2,
  kd_sha256
});
