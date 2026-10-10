import { Marquee as ArkMarquee } from "@ark-ui/react/marquee";
import { injectComponentStyle } from "@bysages/core/styling";
import type { CSSProperties } from "react";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

/** Ark's Marquee, dressed in the paper-and-ink system: a linear ribbon of
 * seal-cut chips that dissolves into the paper at its edges rather than
 * cutting off. The API is Ark's own — Root, Viewport, Content, Edge, Item. */
function MarqueeRoot(props: ComponentProps<typeof ArkMarquee.Root>) {
  injectComponentStyle("marquee");
  const id = useElementId("marquee", props);

  return <ArkMarquee.Root {...props} id={id} />;
}

type MarqueeItem = string | { label: string };

type MarqueeFacadeProps = {
  items: MarqueeItem[];
  spacing?: string;
  speed?: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
};

/** The complete ribbon behind a list of short marks. */
function MarqueeFacade(props: MarqueeFacadeProps) {
  const { items, spacing, speed, label, className, style } = props;
  const labels = items.map((item) => (typeof item === "string" ? item : item.label));

  return (
    <MarqueeRoot
      aria-label={label}
      spacing={spacing}
      speed={speed}
      className={className}
      style={style}
    >
      <ArkMarquee.Viewport>
        <ArkMarquee.Content>
          {labels.map((item, index) => (
            <ArkMarquee.Item key={`${item}-${index}`}>
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 3 3 9l9 12 9-12-9-6Z" />
              </svg>
              <span>{item}</span>
            </ArkMarquee.Item>
          ))}
        </ArkMarquee.Content>
      </ArkMarquee.Viewport>
    </MarqueeRoot>
  );
}

export const Marquee: typeof MarqueeFacade &
  Omit<typeof ArkMarquee, "Root"> & { Root: typeof MarqueeRoot } = Object.assign(MarqueeFacade, {
  ...ArkMarquee,
  Root: MarqueeRoot,
}) as typeof MarqueeFacade & Omit<typeof ArkMarquee, "Root"> & { Root: typeof MarqueeRoot };
