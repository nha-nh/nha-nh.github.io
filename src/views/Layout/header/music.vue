<script setup lang="ts">
import { MusicalNotesOutline } from "@vicons/ionicons5";
import { NButton, NIcon } from "naive-ui";
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

const isPlaying = ref(false);

function togglePlayback() {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    fader.play();
  } else {
    fader.pause();
  }
}

if (import.meta.env.PROD)
  window.addEventListener("click", togglePlayback, { once: true });
</script>

<template>
  <NButton
    title="Human Music"
    :type="isPlaying ? 'success' : 'default'"
    icon-placement="right"
    text
    @click.stop="togglePlayback"
  >
    <template #icon>
      <NIcon :component="MusicalNotesOutline" />
    </template>
    你好啊你好
  </NButton>
</template>

<style scoped lang="less">
.n-button {
  :deep(.n-button__content) {
    font-size: 18px;
    color: var(--text-color);
  }
}
.n-button--success-type {
  position: relative;

  // 1. 飞走的音符
  &::after {
    content: "♪";
    position: absolute;
    // 起始点定在按钮图标的右上方附近
    top: 5px;
    right: -8px;
    color: #18a058;
    font-size: 14px;
    pointer-events: none;
    // 2秒一个周期，线性/平滑循环飞走
    animation: note-fly-away 2s infinite linear;
  }

  // 2. Icon 仅在底部轻微摇晃
  :deep(.n-button__icon) {
    transform-origin: bottom center;
    // 适当放慢摇晃速度（2.5秒），角度减小，使其显得轻柔不生硬
    animation: gentle-sway 2.5s infinite ease-in-out;
  }
}

/**
 * 音符向右上角摇摆飞走（缩短版）
 * 限制了最大位移，让它只在按钮右上角附近轻轻漂浮并淡出
 */
@keyframes note-fly-away {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.6) rotate(0deg);
  }
  20% {
    opacity: 1;
    transform: translate(3px, -5px) scale(1) rotate(-12deg); /* 稍微向右上，微左摆 */
  }
  50% {
    opacity: 0.8;
    transform: translate(8px, -12px) scale(1.05) rotate(12deg); /* 核心浮动点，微右摆 */
  }
  80% {
    opacity: 0.3;
    transform: translate(12px, -18px) scale(0.9) rotate(-6deg); /* 开始淡出 */
  }
  100% {
    opacity: 0;
    transform: translate(15px, -22px) scale(0.7) rotate(0deg); /* 在22px高度处完全消失 */
  }
}

/**
 * Icon 底部支点轻微摇晃
 */
@keyframes gentle-sway {
  0%,
  100% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(4deg);
  }
}
</style>
