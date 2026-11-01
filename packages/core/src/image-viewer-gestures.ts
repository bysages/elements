/**
 * Pointer, wheel and double-click physics shared by the image viewer
 * lightboxes. Transform state lives beside the picture so every framework
 * wrapper gets the same anchored zoom and pan behavior.
 *
 * @module
 */

export interface ImageViewerGestureOptions {
  /** Whether wheel, drag, pinch and double-click control the image. */
  zoomable?: boolean;
  minScale?: number;
  maxScale?: number;
  /** Toolbar and wheel zoom increment. */
  scaleStep?: number;
}

export interface ImageViewerGestureController {
  zoomBy(step: number): void;
  rotate(): void;
  reset(): void;
  stop(): void;
}

type PointerState = { x: number; y: number };

function clampScale(value: number, minScale: number, maxScale: number) {
  return Math.min(maxScale, Math.max(minScale, value));
}

export function createImageViewerGestures(
  node: HTMLImageElement,
  {
    zoomable = true,
    minScale = 0.5,
    maxScale = 3,
    scaleStep = 0.25,
  }: ImageViewerGestureOptions = {},
): ImageViewerGestureController {
  let scale = 1;
  let rotation = 0;
  let x = 0;
  let y = 0;
  const pointers = new Map<number, PointerState>();

  const render = () => {
    node.style.setProperty(
      "--bs-image-viewer-transform",
      `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`,
    );
  };

  /** Keep the image point under `anchor` visually in place. */
  const zoomAt = (nextScale: number, anchorX: number, anchorY: number) => {
    const next = clampScale(nextScale, minScale, maxScale);
    if (next === scale) return;

    const rect = node.getBoundingClientRect();
    // The anchor is relative to the untransformed center. Rotation is
    // applied before scale in the transform chain, so it must turn the
    // anchor before translating to hold the same screen point.
    const angle = (rotation * Math.PI) / 180;
    const ax = anchorX - rect.left - rect.width / 2;
    const ay = anchorY - rect.top - rect.height / 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    x += (scale - next) * (ax * cos - ay * sin);
    y += (scale - next) * (ax * sin + ay * cos);
    scale = next;
    render();
  };

  const zoomBy = (step: number) => {
    zoomAt(scale + step, rectCenterX(), rectCenterY());
  };

  function rectCenterX() {
    const rect = node.getBoundingClientRect();
    return rect.left + rect.width / 2;
  }

  function rectCenterY() {
    const rect = node.getBoundingClientRect();
    return rect.top + rect.height / 2;
  }

  const rotate = () => {
    rotation = (rotation + 90) % 360;
    render();
  };

  const reset = () => {
    scale = 1;
    rotation = 0;
    x = 0;
    y = 0;
    render();
  };

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    // A wheel notch or trackpad swipe is a deliberate zoom step, not a
    // raw scale factor; direction alone keeps all platforms predictable.
    const direction = Math.sign(event.deltaY || event.deltaX);
    // Wheel coordinates are unavailable in some test DOMs; center then
    // instead of turning a missing coordinate into a NaN transform.
    const anchored = Number.isFinite(event.clientX) && Number.isFinite(event.clientY);
    zoomAt(
      scale - direction * scaleStep,
      anchored ? event.clientX : rectCenterX(),
      anchored ? event.clientY : rectCenterY(),
    );
  };

  const moveVisualCenter = (previous: PointerState, next: PointerState) => {
    x += next.x - previous.x;
    y += next.y - previous.y;
    render();
  };

  const pinch = (previous: Map<number, PointerState>) => {
    const [oldA, oldB] = [...previous.values()];
    const [newA, newB] = [...pointers.values()];
    if (!oldA || !oldB || !newA || !newB) return;

    const oldDistance = Math.hypot(oldB.x - oldA.x, oldB.y - oldA.y);
    const newDistance = Math.hypot(newB.x - newA.x, newB.y - newA.y);
    if (oldDistance === 0 || newDistance === 0) return;

    const oldMid = { x: (oldA.x + oldB.x) / 2, y: (oldA.y + oldB.y) / 2 };
    const newMid = { x: (newA.x + newB.x) / 2, y: (newA.y + newB.y) / 2 };
    const ratio = newDistance / oldDistance;

    // Solve the transform equation for the new visual center: both the
    // midpoint and the zoom anchor are held across the gesture.
    x = newMid.x - ratio * (oldMid.x - x);
    y = newMid.y - ratio * (oldMid.y - y);
    scale = clampScale(scale * ratio, minScale, maxScale);
    render();
  };

  const setPanning = (panning: boolean) => {
    if (panning) node.dataset.panning = "true";
    else delete node.dataset.panning;
  };

  const handlePointerDown = (event: PointerEvent) => {
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    node.setPointerCapture?.(event.pointerId);
    setPanning(pointers.size > 0);
  };

  const handlePointerMove = (event: PointerEvent) => {
    const previous = new Map(pointers);
    if (!previous.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.size === 1)
      moveVisualCenter(previous.get(event.pointerId)!, pointers.get(event.pointerId)!);
    else if (pointers.size === 2) pinch(previous);
  };

  const releasePointer = (event: PointerEvent) => {
    pointers.delete(event.pointerId);
    node.releasePointerCapture?.(event.pointerId);
    if (pointers.size === 0) setPanning(false);
  };

  const handleDoubleClick = (event: MouseEvent) => {
    event.preventDefault();
    reset();
  };

  node.dataset.zoomable = String(zoomable);
  if (zoomable) {
    node.addEventListener("wheel", handleWheel, { passive: false });
    node.addEventListener("pointerdown", handlePointerDown);
    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerup", releasePointer);
    node.addEventListener("pointercancel", releasePointer);
    node.addEventListener("dblclick", handleDoubleClick);
  }

  return {
    zoomBy,
    rotate,
    reset,
    stop() {
      if (zoomable) {
        node.removeEventListener("wheel", handleWheel);
        node.removeEventListener("pointerdown", handlePointerDown);
        node.removeEventListener("pointermove", handlePointerMove);
        node.removeEventListener("pointerup", releasePointer);
        node.removeEventListener("pointercancel", releasePointer);
        node.removeEventListener("dblclick", handleDoubleClick);
      }
      pointers.clear();
      delete node.dataset.panning;
      delete node.dataset.zoomable;
    },
  };
}
