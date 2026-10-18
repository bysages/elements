import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Avatar } from "./index";

/** A person's seal: image when given, initials as the fallback. */
export default defineEntry({
  Avatar: {
    ...faces.Avatar,
    component: ({ props }) =>
      createComponent(Avatar, {
        get name() {
          return props.name;
        },
        get size() {
          return props.size;
        },
        get src() {
          return props.src;
        },
      }),
  },
});
