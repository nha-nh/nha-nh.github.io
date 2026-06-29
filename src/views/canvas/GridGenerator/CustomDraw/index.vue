<script setup lang="ts">
import ResponsiveDirectionLayout from "@/components/layout/ResponsiveDirectionLayout.vue";
import {
  NButton,
  NButtonGroup,
  NCard,
  NCheckbox,
  NCollapseTransition,
  NH5,
  NIcon,
  NInputGroup,
  NInputGroupLabel,
  NInputNumber,
  NScrollbar,
  NSlider,
  NSpace,
  NSwitch,
  NText,
  NUpload,
  NUploadDragger,
  type UploadFileInfo,
} from "naive-ui";
import { _Utility_Debounce, _Utility_GenerateUUID } from "nhanh-pure-function";
import { onMounted, ref, watch } from "vue";
import CustomDraw from ".";
import { ArchiveOutline, CloudDownloadOutline } from "@vicons/ionicons5";

const id = _Utility_GenerateUUID("canvas-");
const customDraw = new CustomDraw();

const tilt45Degree = ref(false);
const textOccupiedGridCount = ref(0);
const enableMerge = ref(false);
const config = ref({
  gridCount: 44,
  colorThresholdRatio: 0.1,
  uniformization: false,
  targetColor: "#000",
  scale: 0.5,
  isDragInverted: false,

  enableKaleidoscope: false,
  kaleidoscopeMirrors: 2,
});

const render = _Utility_Debounce(() => {
  Object.assign(customDraw, config.value);
  customDraw.render();
}, 250);

watch(config, render, { deep: true });

function loadImage(fileList: UploadFileInfo[]) {
  const file = fileList[0].file;
  if (!file) return;
  customDraw.loadImage(file, () => (enableMerge.value = false));
  enableMerge.value = true;
  tilt45Degree.value = true;
}
function confirmMerge() {
  customDraw.confirmMerge();
  Object.keys(config.value).forEach((key) => {
    /** @ts-ignore */
    config.value[key] = customDraw[key];
  });
  enableMerge.value = false;
}

onMounted(() => {
  customDraw.init(id);
  customDraw.onFilledCount = (count) => {
    textOccupiedGridCount.value = count;
  };
  render();
});
</script>

<template>
  <ResponsiveDirectionLayout :default-size="0.35" :min="0">
    <template #left>
      <NScrollbar style="max-height: 100%">
        <div class="config-panel">
          <NCard title="网格" size="small">
            <div class="config-panel">
              <NInputGroup>
                <NInputGroupLabel>占用计数</NInputGroupLabel>
                <NInputNumber
                  :value="textOccupiedGridCount"
                  :show-button="false"
                  readonly
                />
              </NInputGroup>

              <NInputGroup>
                <NInputGroupLabel>行列数量</NInputGroupLabel>
                <NInputNumber
                  v-model:value="config.gridCount"
                  :min="1"
                  :precision="0"
                />
              </NInputGroup>
            </div>
          </NCard>

          <NCard title="图像融合" size="small">
            <template #header-extra>
              <NText v-if="enableMerge" type="warning">
                图像融合时自由绘制将被禁用
              </NText>
            </template>
            <div class="config-panel">
              <NCollapseTransition :show="!enableMerge">
                <NUpload
                  accept="image/*"
                  :file-list="[]"
                  @update:file-list="loadImage"
                >
                  <NUploadDragger>
                    <div>
                      <n-icon
                        size="40"
                        :depth="3"
                        :component="ArchiveOutline"
                      />
                    </div>
                    <n-text> 点击或者拖动文件到该区域来上传 </n-text>
                  </NUploadDragger>
                </NUpload>
              </NCollapseTransition>
              <NCollapseTransition :show="enableMerge">
                <div class="config-panel">
                  <NInputGroup>
                    <NInputGroupLabel>图像缩放比例</NInputGroupLabel>
                    <NSlider
                      v-model:value="config.scale"
                      :min="0.1"
                      :max="5"
                      :step="0.01"
                    />
                  </NInputGroup>
                  <NInputGroup>
                    <NInputGroupLabel>融合目标颜色</NInputGroupLabel>
                    <NInputGroupLabel class="input-color-label">
                      <input
                        v-model="config.targetColor"
                        type="color"
                        class="input-color"
                      />
                    </NInputGroupLabel>
                  </NInputGroup>
                  <NInputGroup>
                    <NInputGroupLabel>颜色阈值比率</NInputGroupLabel>
                    <NSlider
                      v-model:value="config.colorThresholdRatio"
                      :min="0.01"
                      :max="1"
                      :step="0.01"
                    />
                  </NInputGroup>
                  <NInputGroup>
                    <NInputGroupLabel>网格颜色统一</NInputGroupLabel>
                    <NSwitch v-model:value="config.uniformization" />
                  </NInputGroup>

                  <NButtonGroup>
                    <NButton
                      strong
                      secondary
                      type="error"
                      @click="
                        customDraw.clearImage();
                        enableMerge = false;
                      "
                    >
                      清除图像
                    </NButton>
                    <NButton
                      strong
                      secondary
                      type="success"
                      @click="confirmMerge"
                    >
                      确认融合
                    </NButton>
                  </NButtonGroup>
                </div>
              </NCollapseTransition>
            </div>
          </NCard>

          <NCard title="拖拽绘制" size="small">
            <div class="config-panel">
              <NSpace :size="20">
                <NH5 prefix="bar" style="margin: 0">
                  <NText code> CTRL + Z </NText>
                  <NText type="success"> 撤销 </NText>
                </NH5>

                <NH5 prefix="bar" style="margin: 0">
                  <NText code> CTRL + Y </NText>
                  <NText type="success"> 重做 </NText>
                </NH5>
              </NSpace>

              <NInputGroup>
                <NInputGroupLabel>效果取反</NInputGroupLabel>
                <NSwitch v-model:value="config.isDragInverted" />
              </NInputGroup>

              <NInputGroup>
                <NInputGroupLabel>万花筒&nbsp;</NInputGroupLabel>
                <NSwitch v-model:value="config.enableKaleidoscope" />
                <NInputGroupLabel>镜面数量</NInputGroupLabel>
                <NInputNumber
                  v-model:value="config.kaleidoscopeMirrors"
                  :min="1"
                  :precision="0"
                />
              </NInputGroup>

              <NButton
                strong
                secondary
                type="error"
                @click="customDraw.clear()"
              >
                清除
              </NButton>
            </div>
          </NCard>

          <NCard size="small">
            <div class="config-panel">
              <NButton type="success" ghost @click="customDraw.exportImage()">
                <template #icon>
                  <NIcon :component="CloudDownloadOutline" />
                </template>
                导出图片
              </NButton>
            </div>
          </NCard>
        </div>
      </NScrollbar>
    </template>
    <template #right>
      <div class="canvas-container">
        <NCheckbox
          v-model:checked="tilt45Degree"
          label="倾斜45°"
          :disabled="enableMerge"
        />
        <canvas :id="id" :class="{ 'tilt-45-degree': tilt45Degree }" />
      </div>
    </template>
  </ResponsiveDirectionLayout>
</template>

<style lang="less" scoped>
.config-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .n-button-group {
    width: 100%;
    .n-button {
      width: 50%;
    }
  }
  .n-input-group {
    align-items: center;
  }
  .n-input,
  .n-input-number {
    text-align: center;
    flex-grow: 1;
  }
  .n-slider,
  .n-switch {
    margin-left: 10px !important;
    &:not(:last-child) {
      margin-right: 10px !important;
    }
  }
}
.input-color-label {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  .input-color {
    width: 100%;
    border-radius: none;
    background-color: transparent;
    border: none;
    z-index: 2;
    cursor: pointer;
  }
}

.canvas-container {
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  canvas {
    width: 100%;
    height: 100%;
    transform: rotate(0deg);
    transition: transform 0.2s ease-in-out;
  }
  .tilt-45-degree {
    transform: rotate(45deg);
  }
  .n-checkbox {
    position: absolute;
    top: 10px;
    left: 10px;
  }
}
</style>
