<script lang="ts">
  import type { FormProps } from "./props";
  import { provideForm } from "./context";

  let { form, children, ...rest }: FormProps = $props();

  provideForm(form);
</script>

<!-- The form element itself: native submit interception handing the
event to the engine; the grid and its spacing live in the stylesheet. -->
<form
  {...rest}
  data-scope="form"
  data-part="root"
  novalidate
  onsubmit={(event) => {
    event.preventDefault();
    void form.handleSubmit();
  }}
>
  {@render children?.()}
</form>
