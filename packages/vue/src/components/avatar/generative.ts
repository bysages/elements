import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry } from "../../generative/shared";
import { Avatar } from "./index";

/** A person's seal: image when given, initials as the fallback. */
export default defineEntry({
  Avatar: {
    ...faces.Avatar,
    component: ({ props }) => h(Avatar as never, props as never),
  },
});
