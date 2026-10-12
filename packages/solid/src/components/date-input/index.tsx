import { DateInput as ArkDateInput, type DateInputDateValue } from "@ark-ui/solid/date-input";
import type { DateInputRootProps as ArkDateInputRootProps } from "@ark-ui/solid/date-input";
import { injectComponentStyle } from "@bysages/core/styling";
import { Show, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's DateInput, dressed in the paper-and-ink system: a segmented
 * field where the focused segment takes the flat ink fill. The API is
 * Ark's own — Root, Label, Control, SegmentGroup, Segment, SegmentContext,
 * HiddenInput. */

type DateInputOwnProps = {
  /** One rung of the control-height ladder for the segmented field. */
  size?: "sm" | "md" | "lg";
};

function DateInputRoot(props: ArkDateInputRootProps & DateInputOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("date-input", () => rest.id);
  return <ArkDateInput.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

type DateInputFacadeValue = DateInputDateValue | DateInputDateValue[];

function toDateInputValue(value: DateInputFacadeValue | undefined) {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

export interface DateInputFacadeProps {
  value?: DateInputFacadeValue;
  defaultValue?: DateInputFacadeValue;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  label?: string;
  /** One rung of the control-height ladder for the segmented field. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: DateInputDateValue[]) => void;
}

/** The complete segmented date field behind one value. */
function DateInputFacade(props: DateInputFacadeProps) {
  injectComponentStyle("date-input");

  return (
    <DateInputRoot
      size={props.size ?? "md"}
      defaultValue={toDateInputValue(props.defaultValue)}
      disabled={props.disabled}
      invalid={props.invalid}
      required={props.required}
      {...(props.value === undefined ? {} : { value: toDateInputValue(props.value) })}
      onValueChange={(details: { value: DateInputDateValue[] }) =>
        props.onValueChange?.(details.value)
      }
    >
      <Show when={props.label}>
        <ArkDateInput.Label>{props.label}</ArkDateInput.Label>
      </Show>
      <ArkDateInput.Control>
        <ArkDateInput.SegmentGroup>
          <ArkDateInput.SegmentContext>
            {(segment) => <ArkDateInput.Segment segment={segment} />}
          </ArkDateInput.SegmentContext>
        </ArkDateInput.SegmentGroup>
      </ArkDateInput.Control>
      <ArkDateInput.HiddenInput />
    </DateInputRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const DateInput: typeof DateInputFacade &
  Omit<typeof ArkDateInput, "Root"> & { Root: typeof DateInputRoot } = defineFamily(
  DateInputFacade,
  {
    ...ArkDateInput,
    Root: DateInputRoot,
  },
);

injectComponentStyle("date-input");
