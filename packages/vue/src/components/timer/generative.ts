import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Timer } from "./index";

/** A counting dial; runs from zero or a set duration. */
export default defineEntry({
  Timer: {
    props: z.object({}),
    description: "A counting dial; runs from zero or a set duration.",
    component: () =>
      h(
        Timer.Root as never,
        { defaultValue: { hours: 0, minutes: 1, seconds: 30 } } as never,
        () => [
          h(Timer.Area, () => [
            h(Timer.Item, { value: "minutes" } as never, () => "00"),
            h(Timer.Separator, { value: ":" } as never),
            h(Timer.Item, { value: "seconds" } as never, () => "00"),
          ]),
          h(Timer.Control, () => [
            h(Timer.ActionTrigger, { value: "play" } as never, () => "Start"),
            h(Timer.ActionTrigger, { value: "reset" } as never, () => "Reset"),
          ]),
        ],
      ),
  },
});
