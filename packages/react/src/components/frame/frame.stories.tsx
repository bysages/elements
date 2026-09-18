import type { Meta } from "@storybook/react-vite";
import { useRef } from "react";

import { Frame } from ".";

const meta: Meta = { title: "Components/Layout/Frame" };
export default meta;

/** The vessel belongs to the consumer — an iframe carries no anatomy
 * attributes, so the border and paper are set right here. The frame
 * reports its content size through --width / --height. */
const VESSEL = {
  inlineSize: "100%",
  blockSize: "var(--height, 12rem)",
  border: "1px solid var(--bs-color-border)",
  borderRadius: "var(--bs-radius-lg)",
  background: "var(--bs-color-surface-1)",
  boxShadow: "var(--bs-shadow-xs)",
} as const;

const INNER = { padding: "1.5rem 2rem" } as const;

/** Styles travel through the head slot; content teleports into the
 * frame's body and the vessel grows to fit it. */
export const Basic = {
  render: () => (
    <Frame
      title="Paper vessel"
      style={VESSEL}
      head={
        <style>
          {"body { background: #f0ece4; font-family: var(--bs-font-sans, system-ui); margin: 0; }"}
        </style>
      }
    >
      <h1 style={{ ...INNER, margin: 0, fontSize: "1.25rem" }}>Hello from inside the frame!</h1>
      <p style={{ ...INNER, margin: 0, color: "var(--bs-color-text-secondary)" }}>
        This content is rendered within the frame component using a Teleport.
      </p>
    </Frame>
  ),
};

/** A full document may instead arrive as srcDoc; the slotted content is
 * teleported on top of it. */
export const SrcDoc = {
  render: () => (
    <Frame
      title="Paper vessel"
      srcDoc='<html><head><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700" rel="stylesheet" /></head><body style="margin: 0; overflow: hidden"><div class="frame-root"></div></body></html>'
      style={VESSEL}
    >
      <h1
        style={{
          ...INNER,
          margin: 0,
          fontFamily: "'Open Sans', sans-serif",
          fontSize: "1.25rem",
        }}
      >
        Hello from inside the frame!
      </h1>
    </Frame>
  ),
};

/** The mount event hands over the frame: scripts can be written into
 * the child document once it is ready. */
export const Script = {
  render: () => {
    const frameRef = useRef<HTMLIFrameElement>(null);
    const onMount = () => {
      const doc = frameRef.current?.contentDocument;
      if (!doc) return;
      const script = doc.createElement("script");
      script.innerHTML = 'document.body.style.background = "#f0ece4"';
      doc.body.appendChild(script);
    };
    return (
      <Frame ref={frameRef} title="Paper vessel" onMount={onMount} style={VESSEL}>
        <p style={{ ...INNER, margin: 0 }}>Scripted from outside the frame.</p>
      </Frame>
    );
  },
};
