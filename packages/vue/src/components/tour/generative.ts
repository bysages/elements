import { defineComponent, h, ref } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Tour, useTour } from "./index";

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
          const tour = ref(useTour({ steps }));
          return () => h(Tour, { tour: tour.value });
        },
      });
      return h(Walk);
    },
  },
});
