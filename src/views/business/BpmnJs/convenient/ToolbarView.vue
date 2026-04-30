<script setup lang="ts">
import { NButton, NIcon, NTooltip } from "naive-ui";
import { Add, CompassOutline, Remove } from "@vicons/ionicons5";
import type BpmnJs from "../index";

const props = defineProps<{
  bpmnJs: InstanceType<typeof BpmnJs> | null;
}>();

const run = (fn: () => void) => {
  if (!props.bpmnJs) return;
  fn();
};
</script>

<template>
  <div class="toolbar-view">
    <NTooltip placement="left">
      <template #trigger>
        <NButton
          quaternary
          size="small"
          :disabled="!bpmnJs"
          class="view-btn"
          @click="run(() => props.bpmnJs!.zoomFitView())"
        >
          <template #icon>
            <NIcon :component="CompassOutline" />
          </template>
        </NButton>
      </template>
      适应视口
    </NTooltip>
    <span class="divider-h" />
    <NTooltip placement="left">
      <template #trigger>
        <NButton
          quaternary
          size="small"
          :disabled="!bpmnJs"
          class="view-btn"
          @click="run(() => props.bpmnJs!.zoomInDiagram())"
        >
          <template #icon>
            <NIcon :component="Add" />
          </template>
        </NButton>
      </template>
      放大
    </NTooltip>
    <span class="divider-h" />
    <NTooltip placement="left">
      <template #trigger>
        <NButton
          quaternary
          size="small"
          :disabled="!bpmnJs"
          class="view-btn"
          @click="run(() => props.bpmnJs!.zoomOutDiagram())"
        >
          <template #icon>
            <NIcon :component="Remove" />
          </template>
        </NButton>
      </template>
      缩小
    </NTooltip>
  </div>
</template>

<style scoped lang="less">
@import "./toolbar-surface.less";

.toolbar-view {
  .toolbar-floating-surface();
  display: flex;
  flex-direction: column;
  align-items: center;
}

.view-btn {
  .toolbar-icon-button();
}

.divider-h {
  .toolbar-divider-horizontal();
}
</style>
