import { Fieldset as ArkFieldset } from "@ark-ui/solid/fieldset";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, Show, type ComponentProps, type JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Fieldset, dressed in the paper-and-ink system: a song-serif
 * legend heading a column of fields. The API is Ark's own — Root, Legend,
 * HelperText, ErrorText. */
function FieldsetRoot(props: ComponentProps<typeof ArkFieldset.Root>) {
  const id = useElementId("fieldset", () => props.id);

  return createComponent(
    ArkFieldset.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

/** The one-tag path: one label and optional description around the
 * caller's controls; compound or bespoke groups keep the anatomy. */
export interface FieldsetFacadeProps {
  label?: string;
  description?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  children?: JSX.Element;
}

function FieldsetFacade(props: FieldsetFacadeProps) {
  injectComponentStyle("fieldset");

  return (
    <FieldsetRoot
      disabled={props.disabled}
      invalid={props.invalid}
      data-required={props.required || undefined}
    >
      <Show when={props.label}>
        <ArkFieldset.Legend>{props.label}</ArkFieldset.Legend>
      </Show>
      {props.children}
      <Show when={props.description}>
        <ArkFieldset.HelperText>{props.description}</ArkFieldset.HelperText>
      </Show>
    </FieldsetRoot>
  );
}

type FieldsetParts = Omit<typeof ArkFieldset, "Root"> & {
  Root: typeof FieldsetRoot;
};

export const Fieldset: typeof FieldsetFacade & FieldsetParts = defineFamily(FieldsetFacade, {
  ...ArkFieldset,
  Root: FieldsetRoot,
});
injectComponentStyle("fieldset");
