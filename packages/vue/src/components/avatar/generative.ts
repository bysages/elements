import { h } from "vue";

import { faces } from "../../generative/faces";
import { initials } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Avatar } from "./index";

/** A person's seal: image when given, initials as the fallback. */
export default defineEntry({
  Avatar: {
    ...faces.Avatar,
    component: ({ props }) =>
      h(Avatar.Root, { size: props.size }, () => [
        props.src != null ? h(Avatar.Image as never, { src: props.src, alt: props.name }) : null,
        h(Avatar.Fallback as never, () => initials(props.name)),
      ]),
  },
});
