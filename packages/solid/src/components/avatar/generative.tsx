import { createComponent, Show, type JSX } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { initials } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Avatar } from "./index";

/** A person's seal: image when given, initials as the fallback. */
export default defineEntry({
  Avatar: {
    ...faces.Avatar,
    component: ({ props }) =>
      createComponent(Avatar.Root, {
        get size() {
          return props.size;
        },
        get children() {
          return [
            createComponent(Show, {
              keyed: true,
              get when() {
                return props.src != null;
              },
              get children() {
                return createComponent(Avatar.Image, {
                  get src() {
                    return props.src;
                  },
                  get alt() {
                    return props.name;
                  },
                });
              },
            }),
            createComponent(Avatar.Fallback, {
              get children() {
                return initials(props.name);
              },
            }),
          ] as JSX.Element;
        },
      }),
  },
});
