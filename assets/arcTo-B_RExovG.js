const n=`<script setup lang="ts">
import { _Utility_GenerateUUID, _Canvas_Axis } from "nhanh-pure-function";
import { onMounted, shallowRef } from "vue";
import { Settings } from "@/components/popups/components/Settings";
import UpdateData from "../updateData.vue";

const id = _Utility_GenerateUUID();

let myCanvas = shallowRef<_Canvas_Axis>();

const arcTo_value = new _Canvas_Axis.ArcTo({
  value: [
    [0, 2],
    [-4, -4],
    [0, -2],
  ],
  radiusValue: 2,
  isDraggable: true,
});

const arcToArr = [arcTo_value];

onMounted(() => {
  myCanvas.value = new _Canvas_Axis({ id, theme: Settings.value.theme });
});
defineExpose({ myCanvas });
<\/script>

<template>
  <!-- <UpdateData :canvas="myCanvas" :overlays="arcToArr" /> -->
  <canvas :id="id" class="my-canvas"></canvas>
</template>
`;export{n as default};
