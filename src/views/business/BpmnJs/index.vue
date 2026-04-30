<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef } from "vue";
import { _Utility_GenerateUUID } from "nhanh-pure-function";
import BpmnJs from "./index";
import DiagramToolbar from "./convenient/DiagramToolbar.vue";

const id = _Utility_GenerateUUID("bpmn-js-");
const propertiesPanelId = _Utility_GenerateUUID("bpmn-properties-");
const bpmnJs = shallowRef<BpmnJs | null>(null);

onMounted(() => {
  bpmnJs.value = new BpmnJs(id, undefined, propertiesPanelId);
});

onBeforeUnmount(() => {
  void bpmnJs.value?.destroy();
  bpmnJs.value = null;
});
</script>

<template>
  <div class="bpmn-wrap">
    <div :id="id" class="bpmn-box">
      <DiagramToolbar :bpmn-js="bpmnJs" />
    </div>
    <div :id="propertiesPanelId" class="bpmn-properties"></div>
  </div>
</template>

<style scoped lang="less">
@import "./convenient/toolbar-surface.less";

.bpmn-wrap {
  height: 100%;
  width: 100%;
  display: flex;
}

.bpmn-box {
  height: 100%;
  width: calc(100% - 320px);
  position: relative;
  :deep(.bjs-container) {
    .djs-palette {
      top: @bpmn-toolbar-inset;
      left: @bpmn-toolbar-inset;
      .bpmn-ui-chrome-surface();
      .separator {
        border-bottom-color: @toolbar-divider-color;
      }
    }
    .djs-minimap {
      top: auto;
      bottom: @bpmn-toolbar-inset;
      right: @bpmn-toolbar-inset;

      .bpmn-ui-chrome-surface();
      .toggle {
        cursor: pointer;
        padding: 6px 12px;
      }
    }
    .bjs-powered-by {
      left: 50%;
      right: inherit !important;
      transform: translateX(-50%);
    }
  }
}

.bpmn-properties {
  height: 100%;
  width: 320px;
  border-left: 1px solid #e5e7eb;
  background: #fff;
  overflow: auto;
}
</style>
