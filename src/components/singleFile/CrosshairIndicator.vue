<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

/** 与 `KeyboardEvent.getModifierState` 参数对应 */
const MODIFIER_GET_STATE_ARG = {
  ctrl: "Control",
  alt: "Alt",
  shift: "Shift",
  meta: "Meta",
} as const;

type ModifierKeyName = keyof typeof MODIFIER_GET_STATE_ARG;

const props = withDefaults(
  defineProps<{
    /** 十字线颜色 */
    lineColor?: string;
    /** 按住该修饰键且在容器内时显示十字线，默认 Ctrl */
    modifierKey?: ModifierKeyName;
  }>(),
  { lineColor: "#868383", modifierKey: "ctrl" },
);

const containerRef = ref<HTMLElement | null>(null);
const hover = ref(false);
const modifierHeld = ref(false);
const pos = ref({ x: 0, y: 0 });

function readModifierHeld(e: MouseEvent | KeyboardEvent) {
  return e.getModifierState(MODIFIER_GET_STATE_ARG[props.modifierKey]);
}

function onMouseMove(e: MouseEvent) {
  const el = containerRef.value;
  if (!el) return;
  const r = el.getBoundingClientRect();
  pos.value = { x: e.clientX - r.left, y: e.clientY - r.top };
  modifierHeld.value = readModifierHeld(e);
}

function onMouseEnter(e: MouseEvent) {
  hover.value = true;
  modifierHeld.value = readModifierHeld(e);
}

function onMouseLeave() {
  hover.value = false;
}

function onKeyDown(e: KeyboardEvent) {
  modifierHeld.value = readModifierHeld(e);
  if (hover.value) e.preventDefault();
}

function onKeyUp(e: KeyboardEvent) {
  modifierHeld.value = readModifierHeld(e);
}

function onWindowBlur() {
  modifierHeld.value = false;
}

const show = computed(() => hover.value && modifierHeld.value);

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", onWindowBlur);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("keyup", onKeyUp);
  window.removeEventListener("blur", onWindowBlur);
});
</script>

<template>
  <div
    ref="containerRef"
    class="crosshair-indicator"
    :style="{ '--crosshair-line-color': lineColor }"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot />
    <div
      class="indicator"
      :class="{ 'indicator--visible': show }"
      :style="{ left: `${pos.x}px`, top: `${pos.y}px` }"
    />
  </div>
</template>

<style scoped lang="less">
.crosshair-indicator {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.indicator {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  &--visible {
    opacity: 1;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: min(200vw, 4000px);
    height: 2px;
    background-color: var(--crosshair-line-color);
    transform: translate(-50%, -50%);
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: min(200vh, 4000px);
    background-color: var(--crosshair-line-color);
    transform: translate(-50%, -50%);
  }
}
</style>
