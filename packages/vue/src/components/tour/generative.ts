import { useTour } from "@ark-ui/vue/tour";
import { defineComponent, h, ref } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Tour } from "./index";

/** A guided walk with a spotlighted step. */
export default defineEntry({
  Tour: {
    props: z.object({ title: z.string().optional(), description: z.string().optional() }),
    description: "A guided walk with a spotlighted step.",
    component: ({ props }) => {
      const Walk = defineComponent({
        name: "GenerativeTour",
        setup() {
          const steps = [
            {
              id: "welcome",
              type: "modal",
              title: props.title ?? "Welcome to Elements",
              description: props.description ?? "A short walk through the paper-and-ink system.",
            },
          ] as never;
          const tour = ref(useTour({ steps } as never));
          return () =>
            h(Tour.Root as never, { tour: tour.value } as never, () => [
              h(Tour.Backdrop as never),
              h(Tour.Positioner, () =>
                h(Tour.Content, () => [
                  h(Tour.Title),
                  h(Tour.Description),
                  h(Tour.Control, () =>
                    h(Tour.Actions, null, {
                      default: (actions: Array<{ label: string }>) =>
                        actions?.map((action) =>
                          h(Tour.ActionTrigger, { key: action.label, action }, () => action.label),
                        ),
                    }),
                  ),
                ]),
              ),
            ]);
        },
      });
      return h(Walk);
    },
  },
});
