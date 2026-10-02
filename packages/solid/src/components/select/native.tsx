import { useFieldContext } from "@ark-ui/solid/field";
import { injectComponentStyle } from "@bysages/core";
import { For, Show, createEffect, createSignal, onMount, splitProps, type JSX } from "solid-js";

/** One row of the platform's own list. */
export interface NativeSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/** The native select wearing the field recipe: the platform's own list
 * behind the same hairline shell the framed select wears. The shell is
 * a wrapper so the indicator rides beside the value as a real stroke —
 * the same chevron the framed trigger shows. */
export interface NativeSelectProps extends Omit<
  JSX.HTMLAttributes<HTMLSpanElement>,
  "children" | "onChange"
> {
  value?: string;
  options: NativeSelectOption[];
  /** One rung of the control-height ladder. */
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export function NativeSelect(props: NativeSelectProps) {
  injectComponentStyle("select");
  const field = useFieldContext();
  const [own, rest] = splitProps(props, [
    "value",
    "options",
    "size",
    "invalid",
    "placeholder",
    "disabled",
    "onValueChange",
    "aria-label",
    "aria-labelledby",
  ]);
  const [select, setSelect] = createSignal<HTMLSelectElement | null>(null);
  // The browser picks the first enabled option the moment the option
  // children land, forgetting the value set before they existed — the
  // controlled value must be re-asserted after the mount.
  onMount(() => {
    createEffect(() => {
      const el = select();
      if (el) el.value = own.value ?? "";
    });
  });
  const fieldProps = (field?.().getInputProps() ?? {}) as JSX.HTMLAttributes<HTMLSelectElement>;
  const empty = () => own.value == null || own.value === "";
  const off = () => own.disabled || field?.().disabled;
  return (
    <span
      {...rest}
      data-scope="select"
      data-part="native-root"
      data-size={own.size ?? "md"}
      data-invalid={own.invalid || field?.().invalid ? "" : undefined}
      data-disabled={off() ? "" : undefined}
      data-placeholder-shown={empty() ? "" : undefined}
    >
      <select
        {...fieldProps}
        aria-label={own["aria-label"]}
        aria-labelledby={own["aria-labelledby"]}
        ref={setSelect}
        data-scope="select"
        data-part="native"
        disabled={off() || undefined}
        onChange={(event) => own.onValueChange?.(event.currentTarget.value)}
      >
        <Show when={own.placeholder}>
          <option value="" disabled hidden={empty() ? undefined : true}>
            {own.placeholder}
          </option>
        </Show>
        <For each={own.options}>
          {(option) => (
            <option value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          )}
        </For>
      </select>
      <svg data-scope="select" data-part="native-icon" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M4 6l4 4 4-4"
          fill="none"
          stroke="currentColor"
          stroke-width={1.5}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  );
}
