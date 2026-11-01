// @vitest-environment happy-dom
import { describe, expect, it } from "vite-plus/test";

import { createImageViewerGestures } from "./image-viewer-gestures";

function createImage() {
  const node = document.createElement("img");
  document.body.append(node);
  Object.defineProperty(node, "getBoundingClientRect", {
    configurable: true,
    value: () => ({
      left: 100,
      top: 50,
      width: 200,
      height: 100,
      x: 100,
      y: 50,
      right: 300,
      bottom: 150,
      toJSON: () => ({}),
    }),
  });
  return node;
}

function transform(node: HTMLImageElement) {
  return node.style.getPropertyValue("--bs-image-viewer-transform");
}

function pointer(id: number, x: number, y: number, type = "pointermove") {
  return new PointerEvent(type, { bubbles: true, pointerId: id, clientX: x, clientY: y });
}

describe("createImageViewerGestures", () => {
  it("clamps toolbar zoom and restores the image", () => {
    const node = createImage();
    const gestures = createImageViewerGestures(node, { scaleStep: 0.75 });
    gestures.zoomBy(1);
    expect(transform(node)).toContain("scale(2)");
    gestures.zoomBy(-4);
    expect(transform(node)).toContain("scale(0.5)");
    gestures.rotate();
    expect(transform(node)).toContain("rotate(90deg)");
    gestures.reset();
    expect(transform(node)).toBe("translate(0px, 0px) scale(1) rotate(0deg)");
    gestures.stop();
    node.remove();
  });

  it("zooms with the wheel anchored at the pointer", () => {
    const node = createImage();
    const gestures = createImageViewerGestures(node, { scaleStep: 0.25 });
    node.dispatchEvent(
      new WheelEvent("wheel", { cancelable: true, clientX: 200, clientY: 100, deltaY: -100 }),
    );
    expect(transform(node)).toContain("scale(1.25)");
    gestures.stop();
    node.remove();
  });

  it("pans with a pointer and resets on double click", () => {
    const node = createImage();
    const gestures = createImageViewerGestures(node);
    node.dispatchEvent(pointer(1, 120, 80, "pointerdown"));
    node.dispatchEvent(pointer(1, 150, 90));
    expect(transform(node)).toBe("translate(30px, 10px) scale(1) rotate(0deg)");
    node.dispatchEvent(new MouseEvent("dblclick", { cancelable: true }));
    expect(transform(node)).toBe("translate(0px, 0px) scale(1) rotate(0deg)");
    gestures.stop();
    node.remove();
  });
  it("pinches from the two-pointer midpoint", () => {
    const node = createImage();
    const gestures = createImageViewerGestures(node);
    node.dispatchEvent(pointer(1, 100, 100, "pointerdown"));
    node.dispatchEvent(pointer(2, 200, 100, "pointerdown"));
    node.dispatchEvent(pointer(1, 50, 120));
    node.dispatchEvent(pointer(2, 250, 120));
    expect(transform(node)).toBe("translate(-150px, -80px) scale(2) rotate(0deg)");
    gestures.stop();
    node.remove();
  });

  it("ignores pointer and wheel gestures while rotation stays available", () => {
    const node = createImage();
    const before = transform(node);
    const gestures = createImageViewerGestures(node, { zoomable: false });
    node.dispatchEvent(new WheelEvent("wheel", { cancelable: true }));
    node.dispatchEvent(pointer(1, 120, 80, "pointerdown"));
    node.dispatchEvent(pointer(1, 180, 100));
    node.dispatchEvent(new MouseEvent("dblclick", { cancelable: true }));
    expect(transform(node)).toBe(before);
    gestures.rotate();
    expect(transform(node)).toContain("rotate(90deg)");
    gestures.stop();
    node.remove();
  });
});
