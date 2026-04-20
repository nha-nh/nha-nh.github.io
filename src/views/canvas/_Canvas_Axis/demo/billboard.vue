<script setup lang="ts">
import {
  _Utility_GenerateUUID,
  _Canvas_Axis,
  type Billboard,
} from "nhanh-pure-function";
import { Settings } from "@/components/popups/components/Settings";
import { NRadioGroup, NRadio, NAvatar, NSpace, NDivider } from "naive-ui";
import img200 from "@/assets/img/picsum/200x200.jpg";
import img350 from "@/assets/img/picsum/350x300.jpg";
import { onMounted, ref, shallowRef } from "vue";

const id = _Utility_GenerateUUID();
const url = ref(img350);
const objectFit = ref<Billboard["objectFit"]>("fill");

let myCanvas = shallowRef<_Canvas_Axis>();
const billboard = new _Canvas_Axis.Billboard({
  value: [
    [0, 0],
    [1, 1],
  ],
  url: url.value,
  isDraggable: true,
  objectFit: objectFit.value,
});
function updateUrl(value: string) {
  billboard.url = value;
}
function updateObjectFit(value: Billboard["objectFit"]) {
  billboard.objectFit = value;
}

onMounted(() => {
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  const { width, height } = canvas.getBoundingClientRect();

  myCanvas.value = new _Canvas_Axis({
    id,
    theme: Settings.value.theme,
    defaultCenter: _Canvas_Axis.ViewFit.computeDefaultCenter(
      50,
      50,
      width,
      height,
    ),
    defaultScale:
      _Canvas_Axis.ViewFit.computeDefaultScale(50, 50, width, height) - 0.1,
  });
  myCanvas.value.addOverlay(billboard);
});
defineExpose({ myCanvas });
</script>

<template>
  <NSpace>
    <NRadioGroup v-model:value="url" @update-value="updateUrl">
      <NRadio :value="img200">
        <n-avatar :src="img200" />
      </NRadio>
      <NRadio :value="img350">
        <n-avatar :src="img350" />
      </NRadio>
    </NRadioGroup>

    <NDivider vertical />

    <NRadioGroup v-model:value="objectFit" @update-value="updateObjectFit">
      <NRadio value="fill">fill</NRadio>
      <NRadio value="contain">contain</NRadio>
      <NRadio value="cover">cover</NRadio>
      <NRadio value="scale-down">scale-down</NRadio>
    </NRadioGroup>
  </NSpace>

  <canvas :id="id" class="my-canvas"></canvas>
</template>
