/**
 * DOM Vault Manager for physically detaching sensitive application content during locked state.
 * Prevents DevTools inspection and DOM querying when screen guard is active.
 */

export class kd_DomVault {
    private kd_target: string | HTMLElement;
    private kd_detachedElement: HTMLElement | null = null;
    private kd_placeholderNode: Comment | null = null;

    constructor(target?: string | HTMLElement) {
        this.kd_target = target || 'main';
    }

    public kd_detach(): boolean {
        if (typeof document === 'undefined') return false;
        if (this.kd_detachedElement) return true;

        const element = this.kd_findTargetElement();
        if (!element || !element.parentNode) return false;

        const parent = element.parentNode;
        const placeholder = document.createComment('kd-screen-guard-dom-vault-placeholder');

        parent.insertBefore(placeholder, element);
        element.remove();

        this.kd_detachedElement = element;
        this.kd_placeholderNode = placeholder;
        return true;
    }

    public kd_restore(): boolean {
        if (!this.kd_detachedElement || !this.kd_placeholderNode) return false;

        if (this.kd_placeholderNode.parentNode) {
            this.kd_placeholderNode.parentNode.insertBefore(this.kd_detachedElement, this.kd_placeholderNode);
            this.kd_placeholderNode.remove();
        } else if (typeof document !== 'undefined' && document.body) {
            document.body.appendChild(this.kd_detachedElement);
        }

        this.kd_detachedElement = null;
        this.kd_placeholderNode = null;
        return true;
    }

    public get kd_isDetached(): boolean {
        return this.kd_detachedElement !== null;
    }

    private kd_findTargetElement(): HTMLElement | null {
        if (typeof document === 'undefined') return null;

        if (typeof this.kd_target === 'string') {
            const found = document.querySelector(this.kd_target) as HTMLElement;
            if (found) return found;

            const fallbacks = ['main', '#app', '#root', '.app-container'];
            for (const fallback of fallbacks) {
                const fbEl = document.querySelector(fallback) as HTMLElement;
                if (fbEl && fbEl.id !== 'kd-lock-screen' && fbEl.id !== 'kd-lock-screen-host') {
                    return fbEl;
                }
            }
            return null;
        }

        return this.kd_target;
    }
}
