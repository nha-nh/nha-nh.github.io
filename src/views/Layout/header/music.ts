import { ref } from "vue";

/**
 * 音频播放控制器
 * 封装类，处理渐强/渐弱逻辑。
 */
class AudioFader {
  private audio: HTMLAudioElement;
  private maxVolume: number;
  private intervalId: number | null = null;
  private isFading: boolean = false;

  constructor(src: string, maxVolume: number = 0.5) {
    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.volume = 0;
    this.maxVolume = maxVolume;
  }

  public play(): void {
    if (this.isFading) this.clearFade();
    if (this.audio.paused) {
      this.audio.volume = 0;
      this.audio.play().catch(console.error);
    }
    this.startFade(true);
  }

  public pause(): void {
    if (this.isFading) this.clearFade();
    this.startFade(false);
  }

  private startFade(fadeIn: boolean): void {
    this.isFading = true;
    const step = 0.025;
    const interval = 50;

    this.intervalId = window.setInterval(() => {
      if (fadeIn) {
        if (this.audio.volume + step >= this.maxVolume) {
          this.audio.volume = this.maxVolume;
          this.clearFade();
        } else {
          this.audio.volume += step;
        }
      } else {
        if (this.audio.volume - step <= 0) {
          this.audio.volume = 0;
          this.audio.pause();
          this.clearFade();
        } else {
          this.audio.volume -= step;
        }
      }
    }, interval);
  }

  private clearFade(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isFading = false;
  }
}
const fader = new AudioFader("/public/multimedia/Human Music.mp3", 0.5);

export const isPlaying = ref(false);

export function togglePlayback() {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    fader.play();
  } else {
    fader.pause();
  }
}
