import { RatingGroup as ArkRatingGroup } from "@ark-ui/solid/rating-group";
import type { RatingGroupRootProps as ArkRatingGroupRootProps } from "@ark-ui/solid/rating-group";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's RatingGroup, dressed in the paper-and-ink system: a row of quiet
 * seals whose icons take the primary pigment as they light up. The API is
 * Ark's own — Root, Label, Control, Item, HiddenInput (plus the Context and
 * ItemContext render helpers). */

type RatingGroupOwnProps = {
  /** One rung of the control-height ladder every seal stands on. */
  size?: "sm" | "md" | "lg";
};

function RatingGroupRoot(props: ArkRatingGroupRootProps & RatingGroupOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("rating-group", () => rest.id);
  return <ArkRatingGroup.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/** The complete whole-star rating behind one numeric value. */
export interface RatingGroupFacadeProps {
  value?: number;
  defaultValue?: number;
  label?: string;
  count?: number;
  disabled?: boolean;
  readOnly?: boolean;
  /** One rung of the control-height ladder every seal stands on. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: number) => void;
}

function RatingGroupFacade(props: RatingGroupFacadeProps) {
  injectComponentStyle("rating-group");

  return (
    <RatingGroupRoot
      size={props.size ?? "md"}
      count={props.count ?? 5}
      disabled={props.disabled}
      readOnly={props.readOnly}
      defaultValue={props.defaultValue ?? 0}
      {...(props.value === undefined ? {} : { value: props.value })}
      onValueChange={(details) => props.onValueChange?.(details.value)}
    >
      <Show when={props.label}>
        <ArkRatingGroup.Label>{props.label}</ArkRatingGroup.Label>
      </Show>
      <ArkRatingGroup.Control>
        <ArkRatingGroup.Context>
          {(context) => (
            <For each={context().items}>
              {(item) => <ArkRatingGroup.Item index={item}>{iconNode("star")}</ArkRatingGroup.Item>}
            </For>
          )}
        </ArkRatingGroup.Context>
        <ArkRatingGroup.HiddenInput />
      </ArkRatingGroup.Control>
    </RatingGroupRoot>
  );
}

type RatingGroupParts = Omit<typeof ArkRatingGroup, "Root"> & {
  Root: typeof RatingGroupRoot;
};

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const RatingGroup: typeof RatingGroupFacade & RatingGroupParts = defineFamily(
  RatingGroupFacade,
  {
    ...ArkRatingGroup,
    Root: RatingGroupRoot,
  },
);

injectComponentStyle("rating-group");
