import { h } from "vue";
import { z } from "zod";

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
          h(Avatar as never, { key: name, name, size: props.size }),
        ),
      ),
  },
});
