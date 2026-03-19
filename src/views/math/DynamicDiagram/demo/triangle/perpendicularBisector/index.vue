<script setup lang="ts">
import { _Canvas_Axis } from "nhanh-pure-function";
import { onMounted, shallowRef } from "vue";
import { Settings } from "@/components/popups/components/Settings";
import { overlays, id, Update, showCircumcircle } from ".";
import Card from "@/views/math/DynamicDiagram/components/Card.vue";
import { NSwitch } from "naive-ui";

let myCanvas = shallowRef<_Canvas_Axis>();

onMounted(() => {
  myCanvas.value = new _Canvas_Axis({
    id,
    theme: Settings.value.theme,
    axisShow: false,
  });
  myCanvas.value.addOverlay(overlays);
  myCanvas.value.addEventListener("dragg", Update);
  Update();
});
</script>

<template>
  <Card
    :canvas="myCanvas"
    vertical
    alert="尝试改变三角形"
    alert-content="1. 点击三角形 ； 2. 拖拽顶点"
  >
    <NSwitch v-model:value="showCircumcircle" @update:value="Update">
      <template #checked>外接圆</template>
      <template #unchecked>外接圆</template>
    </NSwitch>
    <canvas :id="id"></canvas>
  </Card>
</template>

<style scoped lang="less"></style>
