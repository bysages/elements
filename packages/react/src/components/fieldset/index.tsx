import { Fieldset as ArkFieldset } from "@ark-ui/react/fieldset";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps, ReactNode } from "react";

import { useElementId } from "../../internal/id";

/** Fieldset, dressed in the paper-and-ink system: a song-serif
 * legend heading a column of fields. The parts — Root, Legend,
 * HelperText, ErrorText. */
function FieldsetRoot(props: ComponentProps<typeof ArkFieldset.Root>) {
  const id = useElementId("fieldset", props);

  return <ArkFieldset.Root {...props} id={id} />;
}

interface FieldsetFacadeProps {
  label?: string;
  description?: string;
  disabled?: boolean;
  invalid?: boolean;
  children?: ReactNode;
}

/** The one-tag path: one label and optional description around the
 * caller controls; compound or bespoke groups keep the anatomy. */
function FieldsetFacade({
  label,
  description,
  disabled = false,
  invalid = false,
  children,
}: FieldsetFacadeProps) {
  return (
    <FieldsetRoot disabled={disabled} invalid={invalid}>
      {label ? <ArkFieldset.Legend>{label}</ArkFieldset.Legend> : null}
      {children}
      {description ? <ArkFieldset.HelperText>{description}</ArkFieldset.HelperText> : null}
    </FieldsetRoot>
  );
}

export const Fieldset = Object.assign(FieldsetFacade, {
  ...ArkFieldset,
  Root: FieldsetRoot as unknown as typeof ArkFieldset.Root,
});

injectComponentStyle("fieldset");
