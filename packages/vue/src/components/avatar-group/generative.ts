import { h } from "vue";
import { z } from "zod";

import { initials } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Avatar } from "../avatar";
import { AvatarGroup } from "./index";

/** Overlapping seals for a team; names render as initials. */
export default defineEntry({
  AvatarGroup: {
    props: z.object({
      names: z.array(z.string()).optional(),
      size: z.enum(["sm", "md", "lg"]).optional(),
    }),
    description: "Overlapping seals for a team; names render as initials.",
    component: ({ props }) =>
      h(AvatarGroup as never, { size: props.size } as never, () =>
        (props.names ?? []).map((name: string) =>
          h(Avatar.Root as never, { key: name }, () =>
            h(Avatar.Fallback as never, () => initials(name)),
          ),
        ),
      ),
  },
});
