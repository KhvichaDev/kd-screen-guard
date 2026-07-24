/**
 * Self-Healing Tamper Guard for kd-screen-guard overlay.
 * Uses MutationObserver to monitor DOM node deletion, inline CSS tampering, z-index modifications, Shadow DOM re-parenting, and LocalStorage tampering, automatically healing the lock screen overlay and storage state.
 */

import { kd_TamperDetails } from '../types';

export class kd_TamperGuard {
    private kd_observer: MutationObserver | null = null;
    private kd_onTamperDetected: (details: kd_TamperDetails) => void;
    private kd_tamperCheckTimer: ReturnType<typeof setTimeout> | null = null;
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

            this.kd_observer.observe(document.body, {
                childList: true,
                attributes: true,
                subtree: true,
                attributeFilter: ['style', 'class', 'hidden', 'id']
            });
        }

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

        if (display === 'none' || visibility === 'hidden' || opacity < 0.1) {
            this.kd_onTamperDetected({
                timestamp: Date.now(),
                reason: `Lock overlay style tampering detected (display: ${display}, visibility: ${visibility}, opacity: ${opacity}).`
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
