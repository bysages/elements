import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Attachments } from "./index";

/** A row of attached files. */
export default defineEntry({
  AiAttachments: {
    props: z.object({}),
    description: "A row of attached files.",
    component: () => h(Attachments as never, {} as never),
  },
});
