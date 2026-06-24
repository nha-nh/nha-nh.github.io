import {
  _File_Download,
  _Utility_Clone,
  _Utility_ColorConverter,
  _Utility_ShortcutManager,
  _Utility_UndoRedoHistory,
} from "nhanh-pure-function";

class Base {
  /** id */
  private id = "";
  /** 网格大小 */
  protected gridSize = 0;
  /** 绘图上下文 */
  protected ctx: CanvasRenderingContext2D | null = null;
  /** 已填充网格 */
  protected filledGrids = new Map<number, Set<number>>();
  /** 图像填充目标网格 */
  protected imageFilledGrids = new Map<number, Set<number>>();
  /** 快捷键管理器 */
  protected shortcutManager = new _Utility_ShortcutManager();
  /** 撤销重做管理器 */
  protected undoRedoHistory = new _Utility_UndoRedoHistory({
    clone: _Utility_Clone,
    initialState: new Map<number, Set<number>>(),
  });

  /** 禁用 */
  protected disabled = false;

  /** 网格数量 */
  gridCount = 0;
  /** 统计已填充网格数量 */
  onFilledCount?: (count: number) => void;

  /** 初始化 */
  init(id: string) {
    this.id = id;

    const canvas = document.getElementById(this.id!);
    if (!canvas) return;

    canvas.addEventListener("click", this.handleClick);
    canvas.addEventListener("mousedown", this.handleMouseDown);
    canvas.addEventListener("mouseup", this.handleMouseUp);
    canvas.addEventListener("mousemove", this.handleMouseMove);

    this.shortcutManager.bind("Ctrl+z", {
      callback: () => {
        if (this.disabled) return;
        const undoRedoHistory = this.undoRedoHistory;
        if (undoRedoHistory.undo()) {
          this.filledGrids = _Utility_Clone(undoRedoHistory.current) as any;
          this.render();
        } else {
          window.$message.warning("没有可撤销的操作");
        }
      },
    });
    this.shortcutManager.bind("Ctrl+y", {
      callback: () => {
        if (this.disabled) return;
        const undoRedoHistory = this.undoRedoHistory;
        if (undoRedoHistory.redo()) {
          this.filledGrids = _Utility_Clone(undoRedoHistory.current) as any;
          this.render();
        } else {
          window.$message.warning("没有可重做的操作");
        }
      },
    });

    return canvas;
  }
  /** 销毁 */
  destroy() {
    const canvas = document.getElementById(this.id!);
    if (!canvas) return;

    canvas.removeEventListener("click", this.handleClick);
    canvas.removeEventListener("mousedown", this.handleMouseDown);
    canvas.removeEventListener("mouseup", this.handleMouseUp);
    canvas.removeEventListener("mousemove", this.handleMouseMove);

    this.shortcutManager.destroy();
    return canvas;
  }
  /** 清除 */
  clear() {
    this.filledGrids.clear();
    this.undoRedoHistory.push(this.filledGrids);
    this.render();
  }

  /** 获取子网格 */
  private getSubGrid(x: number, y: number) {
    const row = Math.floor(y / this.gridSize);
    const col = Math.floor(x / this.gridSize);
    return { row, col };
  }
  /** 添加已填充网格 */
  protected addFilledGrid(row: number, col: number) {
    const clos = this.filledGrids.get(row) || new Set<number>();
    clos.add(col);
    this.filledGrids.set(row, clos);
  }
  /** 删除已填充网格 */
  private removeFilledGrid(row: number, col: number) {
    const clos = this.filledGrids.get(row);
    if (!clos) return;
    clos.delete(col);
    if (clos.size === 0) {
      this.filledGrids.delete(row);
    }
  }
  /** 切换已填充网格 */
  private toggleFilledGrid(row: number, col: number) {
    const has = this.filledGrids.get(row)?.has(col);
    if (has) this.removeFilledGrid(row, col);
    else this.addFilledGrid(row, col);
  }

  /** 是否正在执行拖拽操作 */
  protected isDragging = false;
  /** 鼠标是否按下 */
  protected isPointerDown = false;
  /** 拖拽效果取反 */
  isDragInverted = false;

  /** 点击事件：仅处理纯粹的单点触发 */
  private handleClick = (ev: MouseEvent) => {
    // 如果刚刚经历了拖拽过程，则直接拦截本次点击，防止状态被 toggle 误触发
    if (this.isDragging || this.disabled) return;

    const { offsetX, offsetY } = ev;
    const subGrid = this.getSubGrid(offsetX, offsetY);
    this.toggleFilledGrid(subGrid.row, subGrid.col);
    this.undoRedoHistory.push(this.filledGrids);
    this.render();
  };
  /** 按下事件 */
  private handleMouseDown = () => {
    this.isPointerDown = true;
    this.isDragging = false; // 每次按下时重置拖拽状态
  };

  /** 抬起事件 */
  private handleMouseUp = () => {
    this.isPointerDown = false;
    if (this.isDragging && !this.disabled)
      this.undoRedoHistory.push(this.filledGrids);
  };
  /** 移动事件 */
  private handleMouseMove = (ev: MouseEvent) => {
    if (!this.isPointerDown || this.disabled) return;

    // 一旦在按下状态下触发了移动，就标记为正在拖拽
    this.isDragging = true;

    const { offsetX, offsetY } = ev;
    const subGrid = this.getSubGrid(offsetX, offsetY);

    if (this.isDragInverted) this.removeFilledGrid(subGrid.row, subGrid.col);
    else this.addFilledGrid(subGrid.row, subGrid.col);
    this.render();
  };

  /** 初始化画布 */
  protected initCanvas() {
    const canvas = document.getElementById(this.id!) as HTMLCanvasElement;
    const rect = canvas.parentElement!.getBoundingClientRect();

    const gridSize = Math.floor(
      Math.sqrt(Math.pow(Math.min(rect.width, rect.height), 2) / 2) /
        this.gridCount
    );
    if (gridSize < 1) return;

    const gridPanelSize = gridSize * this.gridCount;

    canvas.style.width = gridPanelSize + "px";
    canvas.style.height = gridPanelSize + "px";
    canvas.width = gridPanelSize;
    canvas.height = gridPanelSize;

    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.clearRect(0, 0, gridPanelSize, gridPanelSize);

    Object.assign(this, { ctx, gridSize });
  }

  /** 绘制棋盘格背景（双色交替网格） */
  private renderGrid(): void {
    const { ctx, gridSize } = this;
    if (!ctx) return;

    const baseColor = "#F0F0F0";
    const alternateColor = "#FFFFFF";
    const totalSize = this.gridCount * gridSize;

    // 1. 先将整个网格区域整体填充为底色
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, totalSize, totalSize);

    // 2. 更改填充颜色，准备绘制交替的格子
    ctx.fillStyle = alternateColor;

    // 3. 仅循环渲染需要交替颜色的格子
    for (let r = 0; r < this.gridCount; r++) {
      for (let c = 0; c < this.gridCount; c++) {
        // 当行索引与列索引之和为奇数时，填充交替色
        if ((r + c) % 2 === 1) {
          ctx.fillRect(c * gridSize, r * gridSize, gridSize, gridSize);
        }
      }
    }
  }

  /** 绘制已填充网格 */
  private renderFilledGrids(): void {
    const { ctx, gridSize, gridCount, filledGrids, imageFilledGrids } = this;
    if (!ctx) return;

    ctx.fillStyle = "#000";

    const grids = [...filledGrids, ...imageFilledGrids];

    for (const [row, cols] of grids) {
      if (row >= gridCount) continue;
      for (const col of cols) {
        if (col >= gridCount) continue;
        ctx.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);
      }
    }
  }

  /** 计算已填充网格数量 */
  private get filledCount() {
    return [
      ...this.filledGrids.values(),
      ...this.imageFilledGrids.values(),
    ].reduce((acc, cols) => {
      return acc + cols.size;
    }, 0);
  }

  /** 渲染 */
  render() {
    this.initCanvas();
    if (!this.ctx) return;

    this.renderGrid();
    this.renderFilledGrids();
    this.onFilledCount?.(this.filledCount);
  }
  /** 导出图片 */
  exportImage() {
    const ctx = this.ctx;
    if (!ctx) return;

    const canvas = document.createElement("canvas");
    const width = Math.sqrt(Math.pow(ctx.canvas.width, 2) * 2);
    canvas.width = width;
    canvas.height = width;
    const _ctx = canvas.getContext("2d")!;

    const center = width * 0.5;
    _ctx.translate(center, center);
    _ctx.rotate(Math.PI / 4);
    _ctx.drawImage(ctx.canvas, -ctx.canvas.width / 2, -ctx.canvas.width / 2);

    const href = canvas.toDataURL("image/png");
    _File_Download({ href, fileName: `自定义网格` });
  }
}

/** 融合图像 */
export default class MergeImage extends Base {
  /** 图像 */
  private images?: HTMLImageElement;
  /** 融合目标颜色 */
  targetColor = "#000";
  /** 颜色阈值比率 */
  colorThresholdRatio = 0.1;
  /** 颜色统一化 */
  uniformization = false;
  /** 缩放比例 */
  scale = 0.5;
  /** 偏移量 */
  private offset = {
    x: 0,
    y: 0,
  };

  init(id: string) {
    const canvas = super.init(id);
    if (!canvas) return;

    canvas.addEventListener("mousemove", this.handleMouseMoveByImage);

    return canvas;
  }

  destroy() {
    const canvas = super.destroy();
    if (!canvas) return;

    canvas.removeEventListener("mousemove", this.handleMouseMoveByImage);
    return canvas;
  }

  private handleMouseMoveByImage = (ev: MouseEvent) => {
    if (!this.isPointerDown || !this.disabled) return;
    this.isDragging = true;
    const { movementX, movementY } = ev;
    this.offset.x += movementX;
    this.offset.y += movementY;
    this.render();
  };

  /** 加载图像 */
  loadImage(file: File, onerror?: () => void) {
    const src = URL.createObjectURL(file);

    this.images = new Image();
    this.images.src = src;
    this.images.onload = () => {
      this.render();
      URL.revokeObjectURL(src);
    };
    this.images.onerror = () => {
      window.$message.error("图像加载失败");
      URL.revokeObjectURL(src);
      this.clearImage();
      onerror?.();
    };
    this.disabled = true;
  }
  /** 清除图像 */
  private clearImage() {
    this.images = undefined;
    this.uniformization = false;
    this.disabled = false;
    this.scale = 0.5;
    this.offset = { x: 0, y: 0 };
    this.imageFilledGrids.clear();
  }
  /** 确认融合 */
  confirmMerge() {
    this.uniformization = true;
    this.render();

    this.imageFilledGrids.forEach((cols, row) => {
      cols.forEach((col) => {
        this.addFilledGrid(row, col);
      });
    });
    this.undoRedoHistory.push(this.filledGrids);

    this.clearImage();
    this.render();
  }

  /** 渲染图像 */
  private renderImage() {
    const { ctx, images, gridSize, gridCount, scale, offset } = this;

    if (!images || !ctx) return;
    ctx.save();

    const center = gridSize * gridCount * 0.5;
    ctx.translate(center, center);
    ctx.rotate(-Math.PI / 4);

    const { naturalWidth, naturalHeight } = images;
    const width = naturalWidth * scale;
    const height = naturalHeight * scale;
    ctx.drawImage(
      images,
      -width / 2 + offset.x,
      -height / 2 + offset.y,
      width,
      height
    );

    ctx.restore();
  }

  /** 计算图像填充网格 */
  private calculateImageFilledGrids() {
    this.initCanvas();
    const { ctx, gridSize, gridCount, colorThresholdRatio } = this;
    if (!ctx) return;

    this.renderImage();

    const size = gridSize * gridCount;
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;

    // 1. 预解析/预计算常量，避免在循环中重复计算
    const threshold = gridSize * gridSize * colorThresholdRatio;
    this.imageFilledGrids.clear();

    // 容差平方
    const tolerance = 20;
    const color = _Utility_ColorConverter.toRgba(this.targetColor);

    // 2. 创建一个一维计数数组，大小为网格总数 (gridCount * gridCount)
    // 使用 Uint32Array 性能最好，占用内存极小
    const gridCounts = new Uint32Array(gridCount * gridCount);

    // 3. 核心优化：只遍历一次像素数据 (线性 O(N) 扫描)
    // 每个像素占用 4 个位置，所以步长为 4
    const len = data.length;
    for (let i = 0; i < len; i += 4) {
      const xx = `rgba(${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${
        data[i + 3]
      })`;
      const isWithin = _Utility_ColorConverter.isWithinColorDifference(
        color,
        xx,
        tolerance
      );

      // 3.2 如果颜色匹配，计算该像素属于哪个网格
      if (isWithin) {
        // 算出当前像素在整个图片中的一维像素序号
        const pixelIndex = i >> 2; // 等价于 Math.floor(i / 4)，位运算极快

        // 算出像素所在的绝对图片行、列
        const imgRow = Math.floor(pixelIndex / size);
        const imgCol = pixelIndex % size;

        // 换算成对应的网格行、列
        const gridRow = Math.floor(imgRow / gridSize);
        const gridCol = Math.floor(imgCol / gridSize);

        // 对应网格计数加 1
        gridCounts[gridRow * gridCount + gridCol]++;
      }
    }

    // 4. 最后统计结果，把超过阈值的网格存入 imageFilledGrids
    for (let r = 0; r < gridCount; r++) {
      const rowOffset = r * gridCount;
      let colsSet: Set<number> | null = null;

      for (let c = 0; c < gridCount; c++) {
        if (gridCounts[rowOffset + c] >= threshold) {
          if (!colsSet) {
            colsSet = this.imageFilledGrids.get(r) || new Set<number>();
          }
          colsSet.add(c);
        }
      }

      if (colsSet) {
        this.imageFilledGrids.set(r, colsSet);
      }
    }
  }

  render() {
    if (this.uniformization) this.calculateImageFilledGrids();
    else this.imageFilledGrids.clear();

    super.render();

    if (!this.uniformization) this.renderImage();
  }
}
