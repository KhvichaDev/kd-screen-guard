/**
 * Self-Healing Tamper Guard for kd-screen-guard overlay.
 * Uses MutationObserver to monitor DOM node deletion, head style tag injection, inline CSS tampering, z-index modifications, Shadow DOM re-parenting, and LocalStorage tampering in same and cross-tabs.
 */

import { kd_TamperDetails } from '../types';

export class kd_TamperGuard {
    private kd_observer: MutationObserver | null = null;
    private kd_onTamperDetected: (details: kd_TamperDetails) => void;
    private kd_tamperCheckTimer: ReturnType<typeof setTimeout> | null = null;
    private kd_periodicIntervalId: ReturnType<typeof setInterval> | null = null;
    private kd_storageListener: ((evt: StorageEvent) => void) | null = null;

    constructor(onTamperDetected: (details: kd_TamperDetails) => void) {
        this.kd_onTamperDetected = onTamperDetected;
    }

    public kd_startMonitoring(): void {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;
        this.kd_stopMonitoring();

        if (typeof MutationObserver !== 'undefined') {
            this.kd_observer = new MutationObserver((mutations) => {
                if (this.kd_isMutationRelevant(mutations)) {
                    this.kd_scheduleTamperCheck();
                }
            });

            // Observe whole document (document.documentElement) to catch head style injections and body modifications
            this.kd_observer.observe(document.documentElement, {
                childList: true,
                attributes: true,
                subtree: true,
                attributeFilter: ['style', 'class', 'hidden', 'id']
            });
        }

        // Cross-tab storage listener
        this.kd_storageListener = (evt: StorageEvent) => {
            if (evt.key && evt.key.startsWith('kd_screen_guard_')) {
                if (evt.newValue === null || evt.newValue === '') {
                    this.kd_onTamperDetected({
                        timestamp: Date.now(),
                        reason: `Storage Security Tampering detected: Key '${evt.key}' was deleted from browser storage.`
                    });
                }
            }
        };

        window.addEventListener('storage', this.kd_storageListener);

        // Periodic 500ms integrity check to catch head CSS overrides and same-tab console localStorage clearing
        this.kd_periodicIntervalId = setInterval(() => {
            this.kd_verifyOverlayIntegrity();
        }, 500);
    }

    public kd_stopMonitoring(): void {
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
        if (this.kd_storageListener && typeof window !== 'undefined') {
            window.removeEventListener('storage', this.kd_storageListener);
            this.kd_storageListener = null;
        }
    }

    private kd_scheduleTamperCheck(): void {
        if (this.kd_tamperCheckTimer) return;

        this.kd_tamperCheckTimer = setTimeout(() => {
            this.kd_tamperCheckTimer = null;
            this.kd_verifyOverlayIntegrity();
        }, 100);
    }

    private kd_verifyOverlayIntegrity(): void {
        if (typeof document === 'undefined') return;

        const lockOverlay = document.getElementById('kd-lock-screen');
        if (!lockOverlay) {
            this.kd_onTamperDetected({
                timestamp: Date.now(),
                reason: 'Lock overlay element was removed from DOM.'
            });
            return;
        }

        if (lockOverlay.getRootNode && lockOverlay.getRootNode() !== document) {
            this.kd_onTamperDetected({
                timestamp: Date.now(),
                reason: 'Lock overlay was re-parented into Shadow DOM or external DocumentFragment.'
            });
            return;
        }

        const computedStyle = window.getComputedStyle(lockOverlay);
        const display = computedStyle.display;
        const visibility = computedStyle.visibility;
        const opacity = parseFloat(computedStyle.opacity || '1');
        const zIndexStr = computedStyle.zIndex;
        const zIndex = parseInt(zIndexStr, 10);
        const rect = lockOverlay.getBoundingClientRect();

        if (display === 'none' || visibility === 'hidden' || opacity < 0.1 || rect.height < 10) {
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

        // Same-tab storage clearing check
        if (typeof localStorage !== 'undefined') {
            const isLockedSaved = localStorage.getItem('kd_screen_guard_is_locked') || sessionStorage.getItem('kd_screen_guard_is_locked');
            if (isLockedSaved !== 'true') {
                this.kd_onTamperDetected({
                    timestamp: Date.now(),
                    reason: 'Same-tab storage clearing detected: Lock storage key was deleted.'
                });
            }
        }
    }

    private kd_isMutationRelevant(mutations: MutationRecord[]): boolean {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                for (let i = 0; i < mutation.removedNodes.length; i++) {
                    const node = mutation.removedNodes[i] as HTMLElement;
                    if (node.id === 'kd-lock-screen' || (node.querySelector && node.querySelector('#kd-lock-screen'))) {
                        return true;
                    }
                }
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    const node = mutation.addedNodes[i] as HTMLElement;
                    if (node.tagName === 'STYLE' || node.tagName === 'LINK') {
                        return true;
                    }
                    const target = mutation.target as HTMLElement;
                    if (target && (target.id === 'kd-lock-screen' || (target.closest && target.closest('#kd-lock-screen')))) {
                        return true;
                    }
                }
            } else if (mutation.type === 'attributes') {
                const target = mutation.target as HTMLElement;
                if (target.id === 'kd-lock-screen' || (target.querySelector && target.querySelector('#kd-lock-screen'))) {
                    return true;
                }
            }
        }
        return false;
    }
}
