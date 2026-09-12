import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Tabs } from "./index.js";

const meta: Meta = { title: "Components / Tabs" };
export default meta;

export const Basic = {
  render: () =>
    h(Tabs.Root, { defaultValue: "account" }, () => [
      h(Tabs.List, () => [
        h(Tabs.Trigger, { value: "account" }, () => "Account"),
        h(Tabs.Trigger, { value: "security" }, () => "Security"),
        h(Tabs.Trigger, { value: "billing" }, () => "Billing"),
        h(Tabs.Indicator),
      ]),
      h(Tabs.Content, { value: "account" }, () => "Manage your profile and contact details."),
      h(Tabs.Content, { value: "security" }, () => "Change your password and two-step settings."),
      h(Tabs.Content, { value: "billing" }, () => "Review invoices and payment methods."),
    ]),
};
