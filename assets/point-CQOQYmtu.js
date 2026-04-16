const n=`<script setup lang="ts">
import { _Utility_GenerateUUID, _Canvas_Axis } from "nhanh-pure-function";
import { onMounted, shallowRef } from "vue";
import { Settings } from "@/components/popups/components/Settings";
import UpdateData from "../updateData.vue";

const id = _Utility_GenerateUUID();

let myCanvas = shallowRef<_Canvas_Axis>();
const point_value = new _Canvas_Axis.Point({
  value: [0, -0.5],
  isDraggable: true,
});
const point_position = new _Canvas_Axis.Point({
  position: [0, 25],
  isDraggable: true,
});
const point_arr = [point_value, point_position];

onMounted(() => {
  myCanvas.value = new _Canvas_Axis({ id, theme: Settings.value.theme });
  myCanvas.value.addOverlay(point_arr);
});
defineExpose({ myCanvas });
<\/script>

<template>
  <UpdateData :canvas="myCanvas" :overlays="point_arr" />
  <canvas :id="id" class="my-canvas"></canvas>
</template>
`;export{n as default};
