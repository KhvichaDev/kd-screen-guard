/**
 * Intruder Camera Snapshot Capture Utility.
 * Uses WebRTC getUserMedia to capture a single photo frame on security violation and cleanly closes media tracks immediately.
 */

export class kd_IntruderCamera {
    private static kd_isCapturing: boolean = false;

    public static async kd_captureSnapshot(): Promise<string | null> {
        if (typeof window === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            return null;
        }

        if (this.kd_isCapturing) {
            return null;
        }

        this.kd_isCapturing = true;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
            });

            return await new Promise<string | null>((resolve) => {
                const video = document.createElement('video');
                video.autoplay = true;
                video.playsInline = true;
                video.muted = true;
                video.srcObject = stream;

                video.onloadedmetadata = () => {
                    video.play().then(() => {
                        setTimeout(() => {
                            try {
                                const canvas = document.createElement('canvas');
                                canvas.width = video.videoWidth || 640;
                                canvas.height = video.videoHeight || 480;
                                const ctx = canvas.getContext('2d');

                                if (ctx) {
                                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                                    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
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
                    kd_IntruderCamera.kd_isCapturing = false;
                }
            });
        } catch {
            this.kd_isCapturing = false;
            return null;
        }
    }
}
