import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { FloatButton } from "./index";

/** A floating action cluster: the trigger speaks the label, items fan out beneath. */
export default defineEntry({
  FloatButton: {
    props: z.object({ label: z.string().optional(), items: z.array(z.string()).optional() }),
    slots: ["default"],
    description: "A floating action cluster: the trigger speaks the label, items fan out beneath.",
    component: ({ props }) => {
      const items = props.items ?? ["Edit"];
      return h(FloatButton.Root as never, { defaultOpen: true }, () => [
        h(FloatButton.Trigger as never, { label: props.label ?? "Actions" }),
        ...items.map((item: string) =>
          h(FloatButton.Item as never, { key: item, label: item }, () => item),
        ),
      ]);
    },
  },
});
