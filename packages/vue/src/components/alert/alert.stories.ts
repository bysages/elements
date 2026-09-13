import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Alert } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Elements/Alert" };
export default meta;

function notice(status: string, title: string, description: string) {
  return h(Alert.Root as any, { status, style: { inlineSize: "30rem" } }, () => [
    h(Alert.Icon),
    h(Alert.Body, () => [h(Alert.Title, () => title), h(Alert.Description, () => description)]),
  ]);
}

/** Four fixed pigments, one register: a wash of the status, a heavier
 * hairline on the leading edge, the serif for its title. */
export const Statuses = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "grid", gap: "1rem" } }, [
          notice("info", "Renewal scheduled", "The archive will be reindexed tonight."),
          notice("success", "Sealed and delivered", "Your petition reached the desk."),
          notice("warning", "Stamp expiring", "The permit lapses in seven days."),
          notice("danger", "Delivery refused", "The address could not be verified."),
        ]),
    ),
};

/** Without a status the alert rests in ink: quiet, monochrome. */
export const Plain = {
  render: () =>
    withState(() => () => notice("ink", "Draft restored", "Recovered from the last session.")),
};

/** Description only: the wash and the edge still announce the pigment. */
export const WithoutTitle = {
  render: () =>
    withState(
      () => () =>
        h(Alert.Root as any, { status: "warning", style: { inlineSize: "30rem" } }, () => [
          h(Alert.Icon),
          h(Alert.Body, () =>
            h(Alert.Description, () => "Save your work before the session times out."),
          ),
        ]),
    ),
};
