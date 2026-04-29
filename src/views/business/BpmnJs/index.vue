<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { _Utility_GenerateUUID } from "nhanh-pure-function";
import BpmnJs from "./index";

const id = _Utility_GenerateUUID("bpmn-js-");
const propertiesPanelId = _Utility_GenerateUUID("bpmn-properties-");
let bpmnJs: BpmnJs | null = null;

onMounted(async () => {
  bpmnJs = new BpmnJs(id, undefined, propertiesPanelId);
});

onBeforeUnmount(() => {
  bpmnJs?.destroy();
  bpmnJs = null;
});
</script>

<template>
  <div class="bpmn-wrap">
    <div :id="id" class="bpmn-box"></div>
    <div :id="propertiesPanelId" class="bpmn-properties"></div>
  </div>
</template>

<style scoped lang="less">
.bpmn-wrap {
  height: 100%;
  width: 100%;
  display: flex;
}

.bpmn-box {
  height: 100%;
  width: calc(100% - 320px);
}

.bpmn-properties {
  height: 100%;
  width: 320px;
  border-left: 1px solid #e5e7eb;
  background: #fff;
  overflow: auto;
}
</style>
