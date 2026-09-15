<script lang="ts">
import { Button } from "../button";
import { Field } from "../field";
import type { PromptInputProps } from "./props";

let {
  value = $bindable(""),
  onSubmit,
  placeholder = "Send a message",
  disabled = false,
  ...rest
}: PromptInputProps = $props();

function send() {
  const text = value.trim();
  if (!text || disabled) return;
  onSubmit?.(text);
  value = "";
}
</script>

<!-- The prompt vessel: the shared field textarea — self-growing on the
machine's autoresize — over a footer row carrying the submit seal.
Controlled — `bind:value` mirrors the field, `onSubmit` hands back the
text. Enter sends; Shift+Enter breaks the line. -->
<form
  {...rest}
  data-scope="ai"
  data-part="prompt"
  onsubmit={(event) => {
    event.preventDefault();
    send();
  }}
>
  <Field.Root>
    <Field.Textarea
      autoresize
      rows={1}
      bind:value
      placeholder={placeholder}
      disabled={disabled}
      onkeydown={(event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          send();
        }
      }}
    />
  </Field.Root>
  <div data-scope="ai" data-part="prompt-footer">
    <Button
      variant="solid"
      size="sm"
      square
      type="submit"
      aria-label="Send"
      disabled={disabled || !value.trim()}
    >
      <svg
        viewBox="0 0 16 16"
        width="14"
        height="14"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="square"
      >
        <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
      </svg>
    </Button>
  </div>
</form>
