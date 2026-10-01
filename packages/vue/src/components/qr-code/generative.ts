import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { QrCode } from "./index";

/** A QR seal encoding a value. */
export default defineEntry({
  QrCode: {
    props: z.object({ value: z.string().optional() }),
    description: "A QR seal encoding a value.",
    component: ({ props }) =>
      h(
        QrCode.Root as never,
        { defaultValue: props.value ?? "https://elements.bysages.com" },
        () => [h(QrCode.Frame, () => h(QrCode.Pattern as never))],
      ),
  },
});
