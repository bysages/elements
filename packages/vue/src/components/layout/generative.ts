import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Layout } from "./index";

/** The application skeleton root: a full-height grid; give sider to reserve a rail. */
export default defineEntry({
  Layout: {
    props: z.object({ sider: z.enum(["start", "end"]).optional() }),
    slots: ["default"],
    description: "The application skeleton root: a full-height grid; give sider to reserve a rail.",
    component: ({ props, children }) =>
      h(Layout.Root, { sider: props.sider ?? undefined }, () => slotted(children)),
  },
  LayoutHeader: {
    props: z.object({}),
    slots: ["default"],
    description: "The skeleton's top band. Place inside Layout.",
    component: ({ children }) => h(Layout.Header, () => slotted(children)),
  },
  LayoutSider: {
    props: z.object({}),
    slots: ["default"],
    description: "The side rail inside a Layout that declared sider.",
    component: ({ children }) => h(Layout.Sider, () => slotted(children)),
  },
  LayoutContent: {
    props: z.object({}),
    slots: ["default"],
    description: "The skeleton's main area. Place inside Layout.",
    component: ({ children }) => h(Layout.Content, () => slotted(children)),
  },
  LayoutFooter: {
    props: z.object({}),
    slots: ["default"],
    description: "The skeleton's bottom band. Place inside Layout.",
    component: ({ children }) => h(Layout.Footer, () => slotted(children)),
  },
});
