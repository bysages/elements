import { DateInput as ArkDateInput } from "@ark-ui/react/date-input";
import { type DateInputDateValue } from "@ark-ui/react/date-input";
import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties } from "react";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

export type {
  DateInputFocusChangeDetails,
  DateInputValueChangeDetails,
} from "@ark-ui/react/date-input";

type DateInputRootProps = ComponentProps<typeof ArkDateInput.Root> & {
  /** One rung of the control-height ladder for the segmented field. */
  size?: "sm" | "md" | "lg";
};

function DateInputRoot(props: DateInputRootProps) {
  injectComponentStyle("date-input");
  const id = useElementId("date-input", props);
  const { size = "md", ...rest } = props;

  return <ArkDateInput.Root {...rest} id={id} data-size={size} />;
}

/** Ark's DateInput, dressed in the paper-and-ink system: a segmented
 * field where the focused segment takes the flat ink fill. The API is
 * Ark's own — Root, Label, Control, SegmentGroup, Segment, SegmentContext,
 * HiddenInput. */

type DateInputFacadeValue = DateInputDateValue | DateInputDateValue[];

type DateInputFacadeProps = {
  value?: DateInputFacadeValue;
  defaultValue?: DateInputFacadeValue;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  onValueChange?: (value: DateInputDateValue[]) => void;
};

function toDateInputValue(value: DateInputFacadeValue | undefined) {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

/** The complete segmented date field behind one model value. */
function DateInputFacade(props: DateInputFacadeProps) {
  const {
    value,
    defaultValue,
    disabled,
    invalid,
    required,
    label,
    size = "md",
    className,
    style,
    onValueChange,
  } = props;

  return (
    <DateInputRoot
      size={size}
      defaultValue={toDateInputValue(defaultValue)}
      value={toDateInputValue(value)}
      disabled={disabled}
      invalid={invalid}
      required={required}
      className={className}
      style={style}
      onValueChange={(event: { value: DateInputDateValue[] }) => onValueChange?.(event.value)}
    >
      {label ? <ArkDateInput.Label>{label}</ArkDateInput.Label> : null}
      <ArkDateInput.Control>
        <ArkDateInput.SegmentGroup>
          <ArkDateInput.SegmentContext>
            {(segmentProps: any) => <ArkDateInput.Segment segment={segmentProps} />}
          </ArkDateInput.SegmentContext>
        </ArkDateInput.SegmentGroup>
      </ArkDateInput.Control>
      <ArkDateInput.HiddenInput />
    </DateInputRoot>
  );
}

export const DateInput: typeof DateInputFacade &
  Omit<typeof ArkDateInput, "Root"> & { Root: typeof DateInputRoot } = Object.assign(
  DateInputFacade,
  {
    ...ArkDateInput,
    Root: DateInputRoot,
  },
) as typeof DateInputFacade & Omit<typeof ArkDateInput, "Root"> & { Root: typeof DateInputRoot };
