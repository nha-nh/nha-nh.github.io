<script setup lang="ts">
import ToolbarFile from "./ToolbarFile.vue";
import ToolbarView from "./ToolbarView.vue";
import ToolbarShortcuts from "./ToolbarShortcuts.vue";
import type BpmnJs from "../index";

defineProps<{
  bpmnJs: InstanceType<typeof BpmnJs> | null;
}>();
</script>

<template>
  <div class="diagram-toolbar">
    <ToolbarFile class="dock dock-bottom-left" :bpmn-js="bpmnJs" />
    <div class="dock dock-top-right dock-top-right-cluster">
      <ToolbarShortcuts />
      <ToolbarView :bpmn-js="bpmnJs" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import "./toolbar-surface.less";

.diagram-toolbar {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

.dock {
  position: absolute;
  pointer-events: auto;
}

.dock-bottom-left {
  left: @bpmn-toolbar-inset;
  bottom: @bpmn-toolbar-inset;
}

.dock-top-right {
  right: @bpmn-toolbar-inset;
  top: @bpmn-toolbar-inset;
}

.dock-top-right-cluster {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
