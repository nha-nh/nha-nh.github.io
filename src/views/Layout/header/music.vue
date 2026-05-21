<script setup lang="ts">
import { MusicalNotesOutline } from "@vicons/ionicons5";
import { NButton, NIcon } from "naive-ui";
import { isPlaying, togglePlayback } from "./music";
</script>

<template>
  <NButton
    title="人类之歌"
    :type="isPlaying ? 'success' : 'default'"
    quaternary
    @click.stop="togglePlayback"
  >
    <template #icon>
      <NIcon :component="MusicalNotesOutline" />
    </template>
  </NButton>
</template>

<style scoped lang="less">
.n-button--success-type {
  position: relative;

  // 1. 飞走的音符
  &::after {
    content: "♪";
    position: absolute;
    // 起始点定在按钮图标的右上方附近
    top: 5px;
    right: 5px;
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
