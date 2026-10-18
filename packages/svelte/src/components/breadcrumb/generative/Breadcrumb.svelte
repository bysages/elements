<script lang="ts">
  import { slug } from "../../../generative/shared";
  import { Breadcrumb } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();

  const labels = $derived(props.items ?? ["Home", "Guides", "Ink"]);
  const items = $derived(
    labels.map((label, index) =>
      index === labels.length - 1 ? { label } : { label, href: `#${slug(label)}` },
    ),
  );
</script>

<Breadcrumb {items} />
