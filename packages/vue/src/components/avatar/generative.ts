import { h } from "vue";
import { z } from "zod";

import { initials } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Avatar } from "./index";

/** A person's seal: image when given, initials as the fallback. */
export default defineEntry({
  Avatar: {
    props: z.object({
      name: z.string(),
      src: z.string().optional(),
      size: z.enum(["sm", "md", "lg"]).optional(),
    }),
    description: "A person's seal: image when given, initials as the fallback.",
    component: ({ props }) =>
      h(Avatar.Root, { size: props.size }, () => [
        props.src != null ? h(Avatar.Image as never, { src: props.src, alt: props.name }) : null,
        h(Avatar.Fallback as never, () => initials(props.name)),
      ]),
  },
});
