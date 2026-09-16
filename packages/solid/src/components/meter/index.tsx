import { injectComponentStyle } from "@bysages/core";
import { splitProps, type JSX } from "solid-js";

function part(name: string, tag: string) {
  function Component(props: JSX.HTMLAttributes<HTMLElement>) {
    const Tag = tag as "span";
    return (
      <Tag
        {...(props as JSX.HTMLAttributes<HTMLElement>)}
        data-scope="meter"
        data-part={name.toLowerCase()}
      />
    );
  }
  return Component;
}

const Label = part("Label", "span");
const ValueText = part("ValueText", "span");

const Track = (props: JSX.HTMLAttributes<HTMLElement>) => (
  <span {...props} data-scope="meter" data-part="track">
    <span data-scope="meter" data-part="range" />
  </span>
);

export interface MeterRootProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The measured value — clamped between min and max. */
  value: number;
  min?: number;
  max?: number;
  /** The pigment the ink rides: primary unless a threshold is crossed. */
  level?: "normal" | "success" | "warning" | "danger";
  label?: string;
}

function Root(props: MeterRootProps) {
  const [own, rest] = splitProps(props, ["value", "min", "max", "level", "label"]);
  const min = () => own.min ?? 0;
  const max = () => own.max ?? 100;
  const ratio = () => {
    const span = max() - min();
    return span > 0 ? Math.min(Math.max((own.value - min()) / span, 0), 1) : 0;
  };
  const level = () => own.level ?? "normal";
  return (
    <div
      {...rest}
      role="meter"
      aria-valuemin={min()}
      aria-valuemax={max()}
      aria-valuenow={own.value}
      aria-label={own.label ?? rest["aria-label"]}
      data-scope="meter"
      data-part="root"
      data-level={level() !== "normal" ? level() : undefined}
      style={{ ...(rest.style as JSX.CSSProperties), "--_percent": `${ratio() * 100}%` }}
    >
      {rest.children ?? (
        <>
          <Label>{own.label}</Label>
          <ValueText>{`${Math.round(ratio() * 100)}%`}</ValueText>
          <Track />
        </>
      )}
    </div>
  );
}

export const Meter = Object.assign(Root, { Root, Label, ValueText, Track });

injectComponentStyle("meter");
