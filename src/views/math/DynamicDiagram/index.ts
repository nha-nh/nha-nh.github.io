import { useLocalStorage } from "@vueuse/core";

export type Collection = {
  title: string;
  children?: Collection;
  component?: string;
}[];
export const dynamicDiagramCollection: Collection = [
  {
    title: "三角形",
    children: [
      {
        title: "三角函数",
        component: "triangle/trigonometricFunctions",
      },
      {
        title: "垂直平分线",
        component: "triangle/perpendicularBisector",
      },
      {
        title: "角平分线",
        component: "triangle/angleBisector",
      },
      {
        title: "中位线",
        component: "triangle/midline",
      },
      {
        title: "平行于第三边的线",
        component: "triangle/lineParallelToThirdSide",
      },
      {
        title: "勾股定理",
        children: [
          {
            title: "欧几里得论证法",
            component: "triangle/pythagoreanTheorem/euclideanArgument",
          },
          {
            title: "月牙定理",
            component: "triangle/pythagoreanTheorem/lunesTheorem",
          },
        ],
      },
    ],
  },
  {
    title: "多边形",
    children: [
      {
        title: "黄金分割",
        component: "polygon/goldenSection",
      },
    ],
  },
  {
    title: "反直觉",
    children: [
      {
        title: "三边围墙",
        component: "unintuitive/threeWalledEnclosure",
      },
    ],
  },
] as const;
export const dynamicDiagram = useLocalStorage(
  "math-dynamic-diagram",
  "三角函数",
);

const Modules = import.meta.glob(`./demo/**/index.vue`);
export function GetComponent(
  title: string,
  collection = dynamicDiagramCollection,
) {
  for (let i = 0; i < collection.length; i++) {
    const element = collection[i];
    if (element.title === title) {
      return Modules[
        `./demo/${element.component!}/index.vue`
      ] as () => Promise<Comment>;
    }
    if (element.children) {
      const component = GetComponent(
        title,
        element.children,
      ) as () => Promise<Comment>;
      if (component) {
        return component;
      }
    }
  }
}
