<script lang="ts">
import type { FormError, FormInputEvent, FormProps } from "./props";
import { provideForm } from "./context";

let {
  state,
  schema,
  validate: customValidate,
  validateOn = ["input", "change", "blur"],
  disabled = false,
  onSubmit,
  onError,
  children,
  ...rest
}: FormProps = $props();

let errors = $state(new Map<string, string>());

provideForm({
  errors: () => errors,
  disabled,
});

/** Walk a Standard Schema issue's path back to the dotted name the
 * matching FormField declared. */
function issueName(issue: {
  path?: ReadonlyArray<PropertyKey | { readonly key: PropertyKey }>;
}): string {
  return (issue.path ?? [])
    .map((segment) => (typeof segment === "object" ? segment.key : segment))
    .join(".");
}

let run = 0;

async function runValidate(): Promise<Map<string, string>> {
  const seq = ++run;
  const next = new Map<string, string>();
  if (customValidate) {
    for (const error of await customValidate(state)) next.set(error.name, error.message);
  }
  if (schema) {
    const result = await schema["~standard"].validate(state);
    for (const issue of result.issues ?? []) {
      const name = issueName(issue);
      if (!next.has(name)) next.set(name, issue.message);
    }
  }
  if (seq === run) errors = next;
  return next;
}

function clear(name?: string | RegExp) {
  if (!name) {
    errors = new Map();
    return;
  }
  const next = new Map(errors);
  for (const key of next.keys()) {
    const hit = typeof name === "string" ? key === name : name.test(key);
    if (hit) next.delete(key);
  }
  errors = next;
}

function setErrors(list: FormError[]) {
  errors = new Map(list.map((error) => [error.name, error.message]));
}

function getErrors(name?: string | RegExp): FormError[] {
  const all = [...errors].map(([entry, message]) => ({ name: entry, message }));
  if (!name) return all;
  return all.filter((error) =>
    typeof name === "string" ? error.name === name : name.test(error.name),
  );
}

/** The imperative handle — bind this component and drive the engine
 * directly. */
export function validate(): Promise<Map<string, string>> {
  return runValidate();
}

function handleSubmit(event: Event) {
  event.preventDefault();
  void runValidate().then((map) => {
    if (map.size === 0) {
      onSubmit?.(state);
      return;
    }
    onError?.([...map].map(([name, message]) => ({ name, message })));
  });
}

// Live validation rides event delegation off the form element — blur
// does not bubble, so it arrives through the capture phase. Input
// events debounce: validating each keystroke is waste.
let timer: ReturnType<typeof setTimeout> | undefined;
function onDelegated(event: Event) {
  if (!validateOn.includes(event.type as FormInputEvent)) return;
  const target = event.target as HTMLElement | null;
  if (!target || !("value" in target)) return;
  clearTimeout(timer);
  timer = setTimeout(() => void runValidate(), event.type === "input" ? 300 : 0);
}
</script>

<!-- The validation scheduler: one reactive error map, a submit that
validates before it emits, live re-validation on the events the
`validateOn` prop names, and an imperative handle. The schema is any
Standard Schema (valibot, zod, arktype, …) — none are bundled. Errors
reach their field by name, through FormField. -->
<form
  {...rest}
  data-scope="form"
  data-part="root"
  novalidate
  onsubmit={handleSubmit}
  oninput={onDelegated}
  onchange={onDelegated}
  onblurcapture={onDelegated}
>
  {@render children?.()}
</form>
