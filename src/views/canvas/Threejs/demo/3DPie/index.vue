<script setup lang="ts">
import { _Utility_GenerateUUID } from "nhanh-pure-function";
import * as THREE from "three";
import { onMounted, onUnmounted } from "vue";
import { createClosedCutCylinder } from "./index";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const id = _Utility_GenerateUUID();
let stopRender = false;

function main() {
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const scene = new THREE.Scene();

  // 1) 方向光：方向与相机视角一致（光从相机方向打向 controls.target）
  const light = new THREE.DirectionalLight(0xffffff, 2.5);
  scene.add(light);
  // 2) 显示 x/y/z 轴
  scene.add(new THREE.AxesHelper(10));

  const fov = 45;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(
    fov,
    canvas.clientWidth / canvas.clientHeight,
    near,
    far,
  );
  camera.position.set(0, 15, 20);
  camera.lookAt(0, 0, 0);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  function syncLightToCamera() {
    light.position.copy(camera.position);
    light.target.position.copy(controls.target);
    light.target.updateMatrixWorld();
  }
  syncLightToCamera();

  const baseRadius = 5;
  const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5,
  });

  const cylinder = createClosedCutCylinder(
    {
      radiusTop: baseRadius,
      radiusBottom: baseRadius,
      height: 10,
      radialSegments: 60,
      heightSegments: 1,
      openEnded: false,
      thetaStart: 0,
      thetaLength: 5,
    },
    material,
  );
  scene.add(cylinder);

  function resizeRendererToDisplaySize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    return needResize;
  }

  resizeRendererToDisplaySize();
  renderer.render(scene, camera);

  function render() {
    if (stopRender) return;

    controls.update();
    syncLightToCamera();
    resizeRendererToDisplaySize();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

onMounted(() => {
  main();
});
onUnmounted(() => {
  stopRender = true;
});
</script>

<template>
  <canvas :id="id" />
</template>

<style lang="less" scoped></style>
