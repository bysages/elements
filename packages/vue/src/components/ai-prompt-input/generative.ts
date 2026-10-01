import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { PromptInput } from "./index";

/** The ask box of an AI surface. */
export default defineEntry({
  AiPromptInput: {
    props: z.object({ placeholder: z.string().optional() }),
    description: "The ask box of an AI surface.",
    component: ({ props }) => h(PromptInput as never, { placeholder: props.placeholder } as never),
  },
});
