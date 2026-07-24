/**
 * Audio and Speech Alarm System with Autoplay Interaction Trap fallback.
 * Includes built-in Web Audio API synthesized security siren (zero external file dependency), custom audio URL support, and speech synthesis.
 */

export class kd_AlarmSystem {
    private kd_activeAudio: HTMLAudioElement | null = null;
    private kd_audioContext: AudioContext | null = null;
    private kd_oscillator: OscillatorNode | null = null;
    private kd_lfo: OscillatorNode | null = null;
    private kd_isSpeechActive: boolean = false;
    private kd_isSirenActive: boolean = false;
    private kd_interactionTrapActive: boolean = false;
    private kd_speechMessage: string;
    private kd_alarmSoundUrl?: string;
    private kd_speechEnabled: boolean;
    private kd_audioEnabled: boolean;
    private kd_speechErrorCount: number = 0;
    private kd_trapHandler: ((evt: Event) => void) | null = null;
    private kd_voicesChangedHandler: (() => void) | null = null;
    private kd_voicesFallbackTimer: ReturnType<typeof setTimeout> | null = null;
    private kd_speechLoopFallbackTimer: ReturnType<typeof setTimeout> | null = null;
    private kd_trapEvents: string[] = ['mousemove', 'scroll', 'click', 'keydown', 'mousedown', 'touchstart'];

    constructor(
        speechEnabled: boolean = true,
        speechMessage: string = 'Security Alert! System Locked!',
        audioEnabled: boolean = true,
        alarmSoundUrl?: string
    ) {
        this.kd_speechEnabled = speechEnabled;
        this.kd_speechMessage = speechMessage;
        this.kd_audioEnabled = audioEnabled;
        this.kd_alarmSoundUrl = alarmSoundUrl;
    }

    public kd_triggerAlarm(forceTrap: boolean = false): void {
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

    public kd_stopAlarm(): void {
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

        if (this.kd_voicesChangedHandler && typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.removeEventListener('voiceschanged', this.kd_voicesChangedHandler);
            this.kd_voicesChangedHandler = null;
        }

        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        this.kd_stopBuiltInSiren();

        if (this.kd_activeAudio) {
            this.kd_activeAudio.pause();
            this.kd_activeAudio = null;
        }

        this.kd_removeInteractionTrap();
    }

    private async kd_startBuiltInSiren(forceTrap: boolean): Promise<void> {
        if (typeof window === 'undefined') return;

        try {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioCtx) return;

            if (!this.kd_audioContext) {
                this.kd_audioContext = new AudioCtx();
            }

            if (this.kd_audioContext.state === 'suspended') {
                if (forceTrap) {
                    this.kd_enableInteractionTrap('');
                    return;
                }
                try {
                    await this.kd_audioContext.resume();
                } catch {
                    this.kd_enableInteractionTrap('');
                    return;
                }
            }

            if (this.kd_isSirenActive) return;
            this.kd_isSirenActive = true;

            const osc = this.kd_audioContext.createOscillator();
            const lfo = this.kd_audioContext.createOscillator();
            const lfoGain = this.kd_audioContext.createGain();
            const masterGain = this.kd_audioContext.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(880, this.kd_audioContext.currentTime);

            lfo.type = 'sine';
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
            // AudioContext not supported or restricted
        }
    }

    private kd_stopBuiltInSiren(): void {
        if (this.kd_oscillator) {
            try {
                this.kd_oscillator.stop();
                this.kd_oscillator.disconnect();
            } catch {
                // Ignore disconnect errors
            }
            this.kd_oscillator = null;
        }

        if (this.kd_lfo) {
            try {
                this.kd_lfo.stop();
                this.kd_lfo.disconnect();
            } catch {
                // Ignore disconnect errors
            }
            this.kd_lfo = null;
        }

        if (this.kd_audioContext && this.kd_audioContext.state !== 'closed') {
            try {
                this.kd_audioContext.suspend();
            } catch {
                // Ignore suspend errors
            }
        }

        this.kd_isSirenActive = false;
    }

    private kd_startSpeech(): void {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
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
                window.speechSynthesis.removeEventListener('voiceschanged', this.kd_voicesChangedHandler);
                this.kd_voicesChangedHandler = null;
            }

            if (!this.kd_isSpeechActive || this.kd_speechErrorCount >= 3) return;

            window.speechSynthesis.cancel(); // Cancel any existing speech queue

            const utterance = new SpeechSynthesisUtterance(this.kd_speechMessage);
            utterance.lang = 'en-US';
            utterance.rate = 1.1;
            utterance.volume = 1.0;
            utterance.pitch = 1.1;

            utterance.onend = () => {
                this.kd_speechErrorCount = 0;
                if (this.kd_speechLoopFallbackTimer) {
                    clearTimeout(this.kd_speechLoopFallbackTimer);
                    this.kd_speechLoopFallbackTimer = null;
                }
                if (this.kd_isSpeechActive) setTimeout(speak, 500);
            };

            utterance.onerror = (evt: SpeechSynthesisErrorEvent) => {
                if (evt && evt.error === 'canceled') return;

                this.kd_speechErrorCount++;
                if (this.kd_speechErrorCount < 3 && this.kd_isSpeechActive) {
                    setTimeout(speak, 1000);
                } else {
                    this.kd_isSpeechActive = false;
                }
            };

            window.speechSynthesis.speak(utterance);

            this.kd_speechLoopFallbackTimer = setTimeout(() => {
                if (this.kd_isSpeechActive) {
                    speak();
                }
            }, 5000);
        };

        if (window.speechSynthesis.getVoices().length === 0) {
            this.kd_voicesChangedHandler = () => speak();
            window.speechSynthesis.addEventListener('voiceschanged', this.kd_voicesChangedHandler, { once: true });

            this.kd_voicesFallbackTimer = setTimeout(() => {
                speak();
            }, 1000);
        } else {
            speak();
        }
    }

    private kd_playAudioSound(url: string, forceTrap: boolean): void {
        if (typeof Audio === 'undefined') return;

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
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    if (!this.kd_activeAudio || this.kd_activeAudio !== audio) {
                        audio.pause();
                    }
                })
                .catch(() => {
                    setTimeout(() => {
                        this.kd_enableInteractionTrap(url);
                    }, 100);
                });
        }
    }

    private kd_enableInteractionTrap(url: string): void {
        if (this.kd_interactionTrapActive || typeof document === 'undefined') return;
        this.kd_interactionTrapActive = true;

        const weakEvents = ['mousemove', 'scroll'];
        const strongEvents = ['click', 'keydown', 'mousedown', 'touchstart'];

        this.kd_trapHandler = (evt: Event) => {
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
                if ('speechSynthesis' in window) {
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
            document.addEventListener(evtName, this.kd_trapHandler!, { capture: true });
        });
    }

    private kd_removeInteractionTrap(): void {
        if (this.kd_trapHandler && typeof document !== 'undefined') {
            this.kd_trapEvents.forEach((evtName) => {
                document.removeEventListener(evtName, this.kd_trapHandler!, true);
            });
            this.kd_trapHandler = null;
        }
        this.kd_interactionTrapActive = false;
    }
}
