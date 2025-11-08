import type {
  ImageData,
  Mode,
  Background,
  OutputSettings,
  TextOverlay,
} from "@/types";
import { applyExifOrientation } from "./imageUtils";

interface RenderOptions {
  image: ImageData;
  mode: Mode;
  background: Background;
  output: OutputSettings;
  text?: TextOverlay;
  tileOffset: { x: number; y: number };
  tileScale: number;
  imageOffset: { x: number; y: number };
  imageScale: number;
  imageRotation: number;
}

export async function renderCover(
  canvas: HTMLCanvasElement,
  options: RenderOptions
): Promise<void> {
  const {
    image,
    mode,
    background,
    output,
    text,
    tileOffset,
    tileScale,
    imageOffset,
    imageScale,
    imageRotation,
  } = options;

  if (!image.bitmap) return;

  // 고해상도 렌더링 (2x)
  const scale = 2;
  const renderWidth = output.width * scale;
  const renderHeight = output.height * scale;

  canvas.width = renderWidth;
  canvas.height = renderHeight;

  const ctx = canvas.getContext("2d", {
    alpha: output.format === "png",
    willReadFrequently: false,
  });

  if (!ctx) return;

  ctx.imageSmoothingQuality = "high";
  ctx.imageSmoothingEnabled = true;

  // 배경 렌더링
  await renderBackground(ctx, background, image, renderWidth, renderHeight);

  // 이미지 레이어
  ctx.save();
  applyExifOrientation(
    ctx,
    renderWidth,
    renderHeight,
    image.exifOrientation
  );

  if (mode === "fill") {
    renderFill(ctx, image.bitmap, renderWidth, renderHeight, imageScale, imageOffset, imageRotation);
  } else if (mode === "fit") {
    renderFit(ctx, image.bitmap, renderWidth, renderHeight, imageScale, imageOffset, imageRotation);
  } else if (mode === "tile") {
    renderTile(
      ctx,
      image.bitmap,
      renderWidth,
      renderHeight,
      tileOffset,
      tileScale
    );
  }

  ctx.restore();

  // 텍스트 오버레이
  if (text?.enabled && text.content) {
    renderText(ctx, text, renderWidth, renderHeight);
  }

  // 최종 다운샘플링
  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = output.width;
  finalCanvas.height = output.height;
  const finalCtx = finalCanvas.getContext("2d");
  if (finalCtx) {
    finalCtx.imageSmoothingQuality = "high";
    finalCtx.imageSmoothingEnabled = true;
    finalCtx.drawImage(canvas, 0, 0, renderWidth, renderHeight, 0, 0, output.width, output.height);
    
    // 원본 캔버스를 최종 크기로 교체
    const imageData = finalCtx.getImageData(0, 0, output.width, output.height);
    canvas.width = output.width;
    canvas.height = output.height;
    ctx.putImageData(imageData, 0, 0);
  }
}

async function renderBackground(
  ctx: CanvasRenderingContext2D,
  background: Background,
  image: ImageData,
  width: number,
  height: number
): Promise<void> {
  if (background.type === "solid") {
    ctx.fillStyle = background.color;
    ctx.fillRect(0, 0, width, height);
  } else if (background.type === "gradient") {
    const angle = (background.angle * Math.PI) / 180;
    const centerX = width / 2;
    const centerY = height / 2;
    const length = Math.sqrt(width * width + height * height);
    const x1 = centerX - (length / 2) * Math.cos(angle);
    const y1 = centerY - (length / 2) * Math.sin(angle);
    const x2 = centerX + (length / 2) * Math.cos(angle);
    const y2 = centerY + (length / 2) * Math.sin(angle);

    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, background.color1);
    gradient.addColorStop(1, background.color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  } else if (background.type === "blur") {
    if (!image.bitmap) return;

    const blurCanvas = document.createElement("canvas");
    blurCanvas.width = width * background.scale;
    blurCanvas.height = height * background.scale;
    const blurCtx = blurCanvas.getContext("2d");
    if (!blurCtx) return;

    blurCtx.drawImage(
      image.bitmap,
      0,
      0,
      blurCanvas.width,
      blurCanvas.height
    );

    // 간단한 박스 블러 (실제로는 더 정교한 가우시안 블러 필요)
    ctx.filter = `blur(${background.radius}px)`;
    ctx.drawImage(blurCanvas, 0, 0, width, height);
    ctx.filter = "none";
  }
}

function renderFill(
  ctx: CanvasRenderingContext2D,
  bitmap: ImageBitmap,
  width: number,
  height: number,
  scale: number,
  offset: { x: number; y: number },
  rotation: number
): void {
  const aspect = bitmap.width / bitmap.height;
  const targetAspect = width / height;

  // 기본 크기 계산 (비율 유지, 캔버스 꽉 채우기)
  let baseW: number;
  let baseH: number;

  if (aspect > targetAspect) {
    // 이미지가 더 넓음 - 높이 기준으로 채움
    baseH = height;
    baseW = bitmap.width * (height / bitmap.height);
  } else {
    // 이미지가 더 높음 - 너비 기준으로 채움
    baseW = width;
    baseH = bitmap.height * (width / bitmap.width);
  }

  // 스케일 적용 (가로세로 비율 유지)
  const drawW = baseW * scale;
  const drawH = baseH * scale;

  // 중앙 정렬
  const offsetX = (width - drawW) / 2;
  const offsetY = (height - drawH) / 2;

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-width / 2, -height / 2);
  ctx.drawImage(
    bitmap,
    offsetX + offset.x,
    offsetY + offset.y,
    drawW,
    drawH
  );
  ctx.restore();
}

function renderFit(
  ctx: CanvasRenderingContext2D,
  bitmap: ImageBitmap,
  width: number,
  height: number,
  scale: number,
  offset: { x: number; y: number },
  rotation: number
): void {
  const aspect = bitmap.width / bitmap.height;
  const targetAspect = width / height;

  // 기본 크기 계산 (비율 유지, 전체 이미지 보이기)
  let baseW: number;
  let baseH: number;

  if (aspect > targetAspect) {
    // 이미지가 더 넓음 - 너비 기준으로 맞춤
    baseW = width;
    baseH = bitmap.height * (width / bitmap.width);
  } else {
    // 이미지가 더 높음 - 높이 기준으로 맞춤
    baseH = height;
    baseW = bitmap.width * (height / bitmap.height);
  }

  // 스케일 적용 (가로세로 비율 유지)
  const drawW = baseW * scale;
  const drawH = baseH * scale;

  // 중앙 정렬
  const offsetX = (width - drawW) / 2;
  const offsetY = (height - drawH) / 2;

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-width / 2, -height / 2);
  ctx.drawImage(
    bitmap,
    offsetX + offset.x,
    offsetY + offset.y,
    drawW,
    drawH
  );
  ctx.restore();
}

function renderTile(
  ctx: CanvasRenderingContext2D,
  bitmap: ImageBitmap,
  width: number,
  height: number,
  offset: { x: number; y: number },
  scale: number
): void {
  const patternCanvas = document.createElement("canvas");
  const tileW = Math.round(bitmap.width * scale);
  const tileH = Math.round(bitmap.height * scale);
  patternCanvas.width = tileW;
  patternCanvas.height = tileH;
  const patternCtx = patternCanvas.getContext("2d");
  if (!patternCtx) return;

  patternCtx.imageSmoothingQuality = "high";
  patternCtx.drawImage(bitmap, 0, 0, tileW, tileH);

  const pattern = ctx.createPattern(patternCanvas, "repeat");
  if (!pattern) return;

  ctx.fillStyle = pattern;
  ctx.translate(offset.x, offset.y);
  ctx.fillRect(-offset.x, -offset.y, width, height);
  ctx.translate(-offset.x, -offset.y);
}

function renderText(
  ctx: CanvasRenderingContext2D,
  text: TextOverlay,
  width: number,
  height: number
): void {
  ctx.save();
  ctx.font = `${text.weight} ${text.size}px ${text.font}`;
  ctx.fillStyle = text.color;
  ctx.textAlign = text.align;
  ctx.textBaseline = "middle";
  ctx.letterSpacing = `${text.tracking}px`;

  if (text.shadow) {
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
  }

  const x = text.align === "center" ? width / 2 : text.align === "right" ? width - 40 : 40;
  ctx.fillText(text.content, x, height / 2);
  ctx.restore();
}

