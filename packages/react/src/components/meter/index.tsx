import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, HTMLAttributes } from "react";

function part(name: string, tag: string) {
  const Tag = tag as "span";
  const Component = ({ children, ...rest }: HTMLAttributes<HTMLElement>) => (
    <Tag {...rest} data-scope="meter" data-part={name.toLowerCase()}>
      {children}
    </Tag>
  );
  Component.displayName = "Meter" + name;
  return Component;
}

const Label = part("Label", "span");
const ValueText = part("ValueText", "span");

const Track = ({ ...rest }: HTMLAttributes<HTMLElement>) => (
  <span {...rest} data-scope="meter" data-part="track">
    <span data-scope="meter" data-part="range" />
  </span>
);

export interface MeterRootProps extends HTMLAttributes<HTMLElement> {
  /** The measured value — clamped between min and max. */
  value: number;
  min?: number;
  max?: number;
  /** The pigment the ink rides: primary unless a threshold is crossed. */
  level?: "normal" | "success" | "warning" | "danger";
  label?: string;
}

const Root = ({
  value,
  min = 0,
  max = 100,
  level = "normal",
  label,
  children,
  ...rest
}: MeterRootProps) => {
  const span = max - min;
  const ratio = span > 0 ? Math.min(Math.max((value - min) / span, 0), 1) : 0;
  return (
    <div
      {...rest}
      role="meter"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label={label ?? rest["aria-label"]}
      data-scope="meter"
      data-part="root"
      data-level={level !== "normal" ? level : undefined}
      style={{ ...(rest.style as CSSProperties), "--_percent": `${ratio * 100}%` } as CSSProperties}
    >
      {children ?? (
        <>
          <Label>{label}</Label>
          <ValueText>{`${Math.round(ratio * 100)}%`}</ValueText>
          <Track />
        </>
      )}
    </div>
  );
};

export const Meter = Object.assign(Root, { Root, Label, ValueText, Track });

injectComponentStyle("meter");
