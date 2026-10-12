import { createToaster } from "@ark-ui/solid/toast";

import { Toaster } from ".";
import { Button } from "../button";

const meta = { title: "Components/Overlay/Toast", component: Toaster };
export default meta;

/** One notice rises from the bottom edge; the callable toaster supplies
 * the default card. */
export const Basic = {
  render: () => {
    const toaster = createToaster({
      overlap: true,
      placement: "bottom-end",
      gap: 16,
    });

    return (
      <div style={{ display: "flex", "flex-wrap": "wrap", gap: "0.5rem" }}>
        <Button
          size="sm"
          onClick={() =>
            toaster.create({
              title: "Scheduled for tomorrow",
              description: "Your meeting has been scheduled for tomorrow at ten.",
              type: "info",
            })
          }
        >
          Schedule meeting
        </Button>
        <Toaster toaster={toaster} />
      </div>
    );
  },
};
