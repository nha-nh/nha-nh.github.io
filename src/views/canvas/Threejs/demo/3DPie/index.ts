import * as THREE from "three";

type ClosedCutCylinderParams = {
    radiusTop: number;
    radiusBottom: number;
    height: number;
    radialSegments?: number;
    heightSegments?: number;
    openEnded?: boolean;
    thetaStart?: number;
    thetaLength?: number;
};

function buildCutSideGeometryFromOuterPoints(
    topOuter: THREE.Vector3,
    bottomOuter: THREE.Vector3,
) {
    // 切口所在的径向平面：外侧边 + 轴心，组成一个“梯形”(圆台) / “矩形”(圆柱)
    // 这里直接复用 CylinderGeometry 生成出来的边界点，避免任何角度/坐标系差异导致的偏移
    const yTop = topOuter.y;
    const yBottom = bottomOuter.y;

    const pBottomCenter = new THREE.Vector3(0, yBottom, 0);
    const pTopCenter = new THREE.Vector3(0, yTop, 0);

    const positions = new Float32Array([
        topOuter.x,
        topOuter.y,
        topOuter.z,
        bottomOuter.x,
        bottomOuter.y,
        bottomOuter.z,
        pBottomCenter.x,
        pBottomCenter.y,
        pBottomCenter.z,
        pTopCenter.x,
        pTopCenter.y,
        pTopCenter.z,
    ]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setIndex([0, 1, 2, 0, 2, 3]);
    geometry.computeVertexNormals();
    return geometry;
}

export function createClosedCutCylinder(
    params: ClosedCutCylinderParams,
    material: THREE.Material,
) {
    const {
        radiusTop,
        radiusBottom,
        height,
        radialSegments = 32,
        heightSegments = 1,
        openEnded = false,
        thetaStart = 0,
        thetaLength = Math.PI * 2,
    } = params;

    const bodyGeometry = new THREE.CylinderGeometry(
        radiusTop,
        radiusBottom,
        height,
        radialSegments,
        heightSegments,
        openEnded,
        thetaStart,
        thetaLength,
    );

    const group = new THREE.Group();
    group.add(new THREE.Mesh(bodyGeometry, material));

    // thetaLength < 2π 时补齐两条切口侧面
    if (Math.abs(thetaLength) < Math.PI * 2) {
        const positionAttr = bodyGeometry.getAttribute(
            "position",
        ) as THREE.BufferAttribute;

        const stride = radialSegments + 1;
        const topRow = 0;
        const bottomRow = heightSegments;

        function readVertex(y: number, x: number) {
            const i = (y * stride + x) * 3;
            return new THREE.Vector3(
                positionAttr.array[i] as number,
                positionAttr.array[i + 1] as number,
                positionAttr.array[i + 2] as number,
            );
        }

        // CylinderGeometry 的边界列就是 x=0（thetaStart）和 x=radialSegments（thetaStart+thetaLength）
        const startTopOuter = readVertex(topRow, 0);
        const startBottomOuter = readVertex(bottomRow, 0);
        const endTopOuter = readVertex(topRow, radialSegments);
        const endBottomOuter = readVertex(bottomRow, radialSegments);

        const startSide = new THREE.Mesh(
            buildCutSideGeometryFromOuterPoints(startTopOuter, startBottomOuter),
            material,
        );
        const endSide = new THREE.Mesh(
            buildCutSideGeometryFromOuterPoints(endTopOuter, endBottomOuter),
            material,
        );

        group.add(startSide, endSide);
    }

    return group;
}
