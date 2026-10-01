import { createElement } from "react";

import { faces } from "../../generative/faces.generated";
import { initials } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Avatar } from "./index";

/** A person's seal: image when given, initials as the fallback. */
export default defineEntry({
  Avatar: {
    ...faces.Avatar,
    component: ({ props }) =>
      createElement(Avatar.Root, { size: props.size }, [
        props.src != null ? createElement(Avatar.Image, { src: props.src, alt: props.name }) : null,
        createElement(Avatar.Fallback, null, initials(props.name)),
      ]),
  },
});
