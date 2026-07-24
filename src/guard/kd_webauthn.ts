/**
 * WebAuthn Biometric Authenticator Manager.
 * Provides Touch ID, Face ID, Windows Hello, and YubiKey biometric authentication and device registration via WebAuthn credentials Web API.
 */

export class kd_WebAuthnManager {
    public static async kd_isSupported(): Promise<boolean> {
        if (typeof window === 'undefined' || !window.PublicKeyCredential) return false;
        try {
            return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        } catch {
            return false;
        }
    }

    public static async kd_registerBiometrics(userDisplayName: string = 'ScreenGuard User'): Promise<string | null> {
        if (!await this.kd_isSupported()) return null;

        try {
            const challenge = new Uint8Array(32);
            window.crypto.getRandomValues(challenge);

            const userId = new Uint8Array(16);
            window.crypto.getRandomValues(userId);

            const publicKey: PublicKeyCredentialCreationOptions = {
                challenge,
                rp: { name: 'kd-screen-guard' },
                user: {
                    id: userId,
                    name: 'user@screenguard',
                    displayName: userDisplayName
                },
                pubKeyCredParams: [
                    { alg: -7, type: 'public-key' },
                    { alg: -257, type: 'public-key' }
                ],
                authenticatorSelection: {
                    authenticatorAttachment: 'platform',
                    userVerification: 'required'
                },
                timeout: 60000
            };

            const credential = (await navigator.credentials.create({ publicKey })) as PublicKeyCredential;
            if (credential && credential.id) {
                return credential.id;
            }
            return null;
        } catch {
            return null;
        }
    }

    public static async kd_authenticateBiometrics(credentialId?: string): Promise<boolean> {
        if (!await this.kd_isSupported()) return false;

        try {
            const challenge = new Uint8Array(32);
            window.crypto.getRandomValues(challenge);

            const publicKey: PublicKeyCredentialRequestOptions = {
                challenge,
                userVerification: 'required',
                timeout: 60000
            };

            if (credentialId) {
                const credBuf = kd_stringToBuffer(credentialId);
                publicKey.allowCredentials = [{
                    id: credBuf,
                    type: 'public-key'
                }];
            }

            const assertion = await navigator.credentials.get({ publicKey });
            return !!assertion;
        } catch {
            return false;
        }
    }
}

function kd_stringToBuffer(base64UrlStr: string): Uint8Array {
    try {
        let base64 = base64UrlStr.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
            base64 += '=';
        }
        const binaryStr = typeof window !== 'undefined' ? atob(base64) : '';
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
