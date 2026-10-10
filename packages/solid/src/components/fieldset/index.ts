import { Fieldset as ArkFieldset } from "@ark-ui/solid/fieldset";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

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

export const Fieldset: typeof FieldsetRoot &
  Omit<typeof ArkFieldset, "Root"> & { Root: typeof FieldsetRoot } = defineFamily(FieldsetRoot, {
  ...ArkFieldset,
  Root: FieldsetRoot,
});
injectComponentStyle("fieldset");
