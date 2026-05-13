<script setup lang="ts">
import {
  _Animate_CreateOscillator,
  _Math_GetBezierCurveNodes,
} from "nhanh-pure-function";
import { onMounted, onUnmounted, ref } from "vue";

const nodes: [number, number][] = [];
const aspectRatio = 1;

const x = ref(0);
const y = ref(0);

const oscillator = _Animate_CreateOscillator(0, 1, 200, (v) => {
  const node = _Math_GetBezierCurveNodes(nodes, v);
  x.value = node[0] * 100;
  y.value = node[1] * 100;
});

onMounted(() => {
  oscillator.play();
});
onUnmounted(() => {
  oscillator.pause();
});
</script>

<template>
  <div
    :style="{
      '--x': x + '%',
      '--y': y + '%',
      '--aspect-ratio': aspectRatio + ' / 1',
    }"
  ></div>
</template>

<style scoped lang="less">
div {
  width: 400px;
  background-color: #eee;
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background-color: #000;
    border-radius: 50%;
    position: absolute;
    top: var(--y);
    left: var(--x);
    transform: translate(-50%, -50%);
  }
}
</style>
