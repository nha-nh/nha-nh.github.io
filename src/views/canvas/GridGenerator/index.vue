<script setup lang="ts">
import { NTabPane, NTabs } from "naive-ui";
import Text from "./Text/index.vue";
import CustomDraw from "./CustomDraw/index.vue";
</script>

<template>
  <NTabs type="line" animated placement="left">
    <NTabPane name="文字">
      <Text />
    </NTabPane>
    <NTabPane name="自由">
      <CustomDraw />
    </NTabPane>
  </NTabs>
</template>

<style lang="less" scoped>
.n-tabs {
  height: 100%;
  padding: 10px;
  :deep(.n-tabs-tab) {
    padding: 8px 14px 8px 8px;
    .n-tabs-tab__label {
      font-size: 16px;
      font-weight: bold;
      writing-mode: vertical-rl;
      letter-spacing: 5px;
    }
  }
}
</style>
