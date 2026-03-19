<script setup lang="ts">
import { _Utility_GenerateUUID, _Canvas_Axis } from "nhanh-pure-function";
import { onMounted, shallowRef } from "vue";
import { Settings } from "@/components/popups/components/Settings";
import { NButton, NIcon, NSpace } from "naive-ui";
import {
  RemoveOutline,
  ShapesOutline,
  TrashBinOutline,
} from "@vicons/ionicons5";

const id = _Utility_GenerateUUID();
let myCanvas = shallowRef<_Canvas_Axis>();

onMounted(() => {
  myCanvas.value = new _Canvas_Axis({
    id,
    theme: Settings.value.theme,
  });
});
defineExpose({ myCanvas });
</script>

<template>
  <NSpace style="margin-bottom: 10px">
    <NButton
      type="info"
      secondary
      @click="myCanvas?.overlayCreator.createLine()"
    >
      <template #icon>
        <NIcon :component="RemoveOutline" />
      </template>
      创建线
    </NButton>
    <NButton
      type="success"
      secondary
      @click="myCanvas?.overlayCreator.createPolygon()"
    >
      <template #icon>
        <NIcon :component="ShapesOutline" />
      </template>
      创建面
    </NButton>
    <NButton type="warning" secondary @click="myCanvas?.overlayCreator.clear()">
      <template #icon>
        <NIcon :component="TrashBinOutline" />
      </template>
      清理
    </NButton>
  </NSpace>
  <canvas :id="id" class="my-canvas"></canvas>
</template>
