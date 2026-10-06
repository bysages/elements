import { RatingGroup as ArkRatingGroup } from "@ark-ui/react/rating-group";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

type RatingGroupRootProps = ComponentProps<typeof ArkRatingGroup.Root> & {
  /** One rung of the control-height ladder every seal stands on. */
  size?: "sm" | "md" | "lg";
};

function RatingGroupRoot(props: RatingGroupRootProps) {
  const id = useElementId("rating-group", props);
  const { size = "md", ...rest } = props;

  return <ArkRatingGroup.Root {...rest} id={id} data-size={size} />;
}

export interface RatingGroupFacadeProps {
  value?: number;
  defaultValue?: number;
  label?: string;
  count?: number;
  disabled?: boolean;
  readOnly?: boolean;
  /** One rung of the control-height ladder every seal stands on. */
  size?: "sm" | "md" | "lg";
  className?: string;
  onValueChange?: (value: number) => void;
}

function RatingGroupFacade({
  value,
  defaultValue = 0,
  label,
  count = 5,
  disabled = false,
  readOnly = false,
  size = "md",
  className,
  onValueChange,
}: RatingGroupFacadeProps) {
  return (
    <RatingGroupRoot
      className={className}
      size={size}
      count={count}
      disabled={disabled}
      readOnly={readOnly}
      defaultValue={defaultValue}
      {...(value === undefined ? {} : { value })}
      onValueChange={(details: { value: number | null }) => onValueChange?.(details.value ?? 0)}
    >
      {label ? <ArkRatingGroup.Label>{label}</ArkRatingGroup.Label> : null}
      <ArkRatingGroup.Control>
        <ArkRatingGroup.Context>
          {(api: { items: number[] }) =>
            api.items.map((item) => (
              <ArkRatingGroup.Item key={item} index={item}>
                {iconNode("star")}
              </ArkRatingGroup.Item>
            ))
          }
        </ArkRatingGroup.Context>
        <ArkRatingGroup.HiddenInput />
      </ArkRatingGroup.Control>
    </RatingGroupRoot>
  );
}

RatingGroupFacade.displayName = "SRatingGroup";

/** Ark's RatingGroup, dressed in the paper-and-ink system: a row of quiet
 * seals whose icons take the primary pigment as they light up. The API is
 * Ark's own — Root, Label, Control, Item, HiddenInput (plus the Context and
 * ItemContext render helpers). */
type RatingGroupParts = Omit<typeof ArkRatingGroup, "Root"> & {
  Root: typeof RatingGroupRoot;
};

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const RatingGroup = Object.assign(RatingGroupFacade, {
  ...ArkRatingGroup,
  Root: RatingGroupRoot,
}) as typeof RatingGroupFacade & RatingGroupParts;

injectComponentStyle("rating-group");
