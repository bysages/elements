import { Field as ArkField } from "@ark-ui/vue/field";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { computed, defineComponent, h, inject, provide, ref, type PropType, type Ref } from "vue";

/** The one error a field can carry: where it lives in the form state
 * (dot notation for nested objects, indexes for arrays) and what went
 * wrong. */
export interface FormError {
  name: string;
  message: string;
}

/** The Standard Schema surface this package understands — the slice
 * valibot, zod, arktype and friends all expose. Declared structurally
 * so no spec package becomes a dependency. */
export interface StandardSchema<Input = unknown> {
  readonly "~standard": {
    readonly validate: (value: Input) => Promise<ValidateResult> | ValidateResult;
  };
}

interface ValidateResult {
  readonly value?: unknown;
  readonly issues?: ReadonlyArray<{
    readonly message: string;
    readonly path?: ReadonlyArray<PropertyKey | { readonly key: PropertyKey }>;
  }>;
}

export type FormInputEvent = "input" | "change" | "blur";

interface FormContext {
  errors: Ref<Map<string, string>>;
  disabled: boolean;
}

const FORM_KEY = Symbol("bysages-form");

/** Walk a Standard Schema issue's path back to the dotted name the
 * matching FormField declared. */
function issueName(issue: NonNullable<ValidateResult["issues"]>[number]): string {
  return (issue.path ?? [])
    .map((segment) => (typeof segment === "object" ? segment.key : segment))
    .join(".");
}

/**
 * The validation scheduler: one reactive error map, a submit that
 * validates before it emits, live re-validation on the events the
 * `validateOn` prop names, and the imperative handle. The schema is any
 * Standard Schema (valibot, zod, arktype, …) — none are bundled; a
 * `validate` function composes with it for the cases schemas can't
 * express. Errors reach their field by name, through FormField.
 */
export const Form = defineComponent({
  name: "Form",
  props: {
    state: { type: Object, required: true },
    schema: { type: Object as PropType<StandardSchema>, default: undefined },
    validate: {
      type: Function as PropType<
        (state: Record<string, unknown>) => FormError[] | Promise<FormError[]>
      >,
      default: undefined,
    },
    validateOn: {
      type: Array as PropType<FormInputEvent[]>,
      default: () => ["input", "change", "blur"],
    },
    disabled: { type: Boolean, default: false },
  },
  emits: {
    submit: (_state: Record<string, unknown>) => true,
    error: (_errors: FormError[]) => true,
  },
  setup(props, ctx: SetupContext) {
    const errors = ref(new Map<string, string>());

    provide(FORM_KEY, { errors, disabled: props.disabled } satisfies FormContext);

    let run = 0;
    async function runValidate(): Promise<Map<string, string>> {
      const seq = ++run;
      const next = new Map<string, string>();
      if (props.validate) {
        for (const error of await props.validate(props.state)) next.set(error.name, error.message);
      }
      if (props.schema) {
        const result = await props.schema["~standard"].validate(props.state);
        for (const issue of result.issues ?? []) {
          const name = issueName(issue);
          if (!next.has(name)) next.set(name, issue.message);
        }
      }
      if (seq === run) errors.value = next;
      return next;
    }

    function clear(name?: string | RegExp) {
      if (!name) {
        errors.value = new Map();
        return;
      }
      const next = new Map(errors.value);
      for (const key of next.keys()) {
        const hit = typeof name === "string" ? key === name : name.test(key);
        if (hit) next.delete(key);
      }
      errors.value = next;
    }

    function setErrors(list: FormError[]) {
      errors.value = new Map(list.map((error) => [error.name, error.message]));
    }

    function getErrors(name?: string | RegExp): FormError[] {
      const all = [...errors.value].map(([entry, message]) => ({ name: entry, message }));
      if (!name) return all;
      return all.filter((error) =>
        typeof name === "string" ? error.name === name : name.test(error.name),
      );
    }

    ctx.expose({
      validate: runValidate,
      clear,
      setErrors,
      getErrors,
      errors,
    });

    function handleSubmit(event: Event) {
      event.preventDefault();
      void runValidate().then((map) => {
        if (map.size === 0) {
          ctx.emit("submit", props.state);
          return;
        }
        ctx.emit(
          "error",
          [...map].map(([name, message]) => ({ name, message })),
        );
      });
    }

    // Live validation rides event delegation off the form element — blur
    // does not bubble, so it arrives through the capture phase. Input
    // events debounce: validating each keystroke is waste.
    let timer: ReturnType<typeof setTimeout> | undefined;
    function onDelegated(event: Event) {
      if (!props.validateOn.includes(event.type as FormInputEvent)) return;
      const target = event.target as HTMLElement | null;
      if (!target || !("value" in target)) return;
      clearTimeout(timer);
      timer = setTimeout(() => void runValidate(), event.type === "input" ? 300 : 0);
    }

    return () =>
      h(
        "form",
        {
          ...ctx.attrs,
          "data-scope": "form",
          "data-part": "root",
          novalidate: true,
          onSubmit: handleSubmit,
          onInput: onDelegated,
          onChange: onDelegated,
          onBlurCapture: onDelegated,
        },
        ctx.slots.default?.(),
      );
  },
});

/**
 * The named slot in the grid: label, control, hint — and the error the
 * Form routed to this name, shown through the same parts the standalone
 * Field family styles. The Ark field context runs underneath, so our
 * Input and Textarea pick up the label wiring and the invalid state
 * without knowing the Form exists. Without a Form above it degrades to
 * a plain labelled field.
 */
export const FormField = defineComponent({
  name: "FormField",
  props: {
    name: { type: String, default: undefined },
    label: { type: String, default: undefined },
    hint: { type: String, default: undefined },
    required: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  setup(props, ctx: SetupContext) {
    const form = inject<FormContext | null>(FORM_KEY, null);
    const formError = computed(() => (props.name ? form?.errors.value.get(props.name) : undefined));
    const invalid = computed(() => props.invalid || formError.value != null);
    const disabled = computed(() => props.disabled || (form?.disabled ?? false));

    return () => {
      const error = formError.value;
      return h("div", { ...ctx.attrs, "data-form-field": props.name }, [
        h(
          ArkField.Root,
          { invalid: invalid.value, required: props.required, disabled: disabled.value },
          () => [
            props.label ? h(ArkField.Label, () => props.label) : null,
            ctx.slots.default?.(),
            props.hint && error == null ? h(ArkField.HelperText, () => props.hint) : null,
            error != null ? h(ArkField.ErrorText, () => error) : null,
          ],
        ),
      ]);
    };
  },
});

injectComponentStyle("form");
