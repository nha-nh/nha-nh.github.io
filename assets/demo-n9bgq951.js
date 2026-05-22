const n=`<script setup lang="ts">
import {
  _Animate_CreateOscillator,
  _Math_GetBezierCurveNodes,
} from "nhanh-pure-function";
import { onMounted, onUnmounted, ref } from "vue";

const nodes: [number, number][] = [];
const aspectRatio = 1;

const x = ref(0);
const y = ref(0);
const angle = ref(0);

const oscillator = _Animate_CreateOscillator(0, 1, 400, (v, direction) => {
  const node = _Math_GetBezierCurveNodes(nodes, v);
  x.value = node[0] * 100;
  y.value = node[1] * 100;
  angle.value = (node[2] / Math.PI) * 180;
  if (direction == -1) angle.value += 180;
});

onMounted(() => {
  oscillator.play();
});
onUnmounted(() => {
  oscillator.pause();
});
<\/script>

<template>
  <div
    :style="{
      '--x': x,
      '--y': y,
      '--angle': angle,
      'aspect-ratio': aspectRatio,
    }"
  ></div>
</template>

<style scoped lang="less">
div {
  width: 400px;
  background-color: #eee;
  position: relative;
  container-type: size;

  &::after {
    content: "↑";
    color: #000;
    font-weight: bold;
    font-size: 14px;
    line-height: 1;
    display: block;
    width: 14px;
    height: 14px;
    transform: translate3d(
        calc(var(--x) * 1cqw - 50%),
        calc(var(--y) * 1cqh - 50%),
        0
      )
      rotate(calc(var(--angle) * 1deg + 90deg));
    will-change: transform;
  }
}
</style>
`;export{n as default};
