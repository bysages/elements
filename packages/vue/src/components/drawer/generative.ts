import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Drawer } from "./index";

/** A sheet that slides from an edge; children are its body. */
export default defineEntry({
  Drawer: {
    props: z.object({ title: z.string().optional(), open: z.boolean().optional() }),
    slots: ["default"],
    description: "A sheet that slides from an edge; children are its body.",
    component: ({ props, children }) =>
      h(Drawer.Root, { defaultOpen: props.open ?? true }, () => [
        h(Drawer.Backdrop as never),
        h(Drawer.Positioner, () =>
          h(Drawer.Content, () => [
            h(Drawer.Grabber, () => h(Drawer.GrabberIndicator)),
            props.title != null ? h(Drawer.Title, () => props.title!) : null,
            h(Drawer.CloseTrigger, () => "x"),
            ...slotted(children),
          ]),
        ),
      ]),
  },
});
