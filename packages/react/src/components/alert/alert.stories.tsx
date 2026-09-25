import type { Meta } from "@storybook/react-vite";

import { Alert } from ".";

const meta: Meta = { title: "Components/Feedback/Alert" };
export default meta;

function notice(status: any, title: string, description: string) {
  return (
    <Alert status={status} style={{ maxWidth: "34rem" }}>
      <Alert.Icon />
      <Alert.Body>
        <Alert.Title>{title}</Alert.Title>
        <Alert.Description>{description}</Alert.Description>
      </Alert.Body>
    </Alert>
  );
}

export const Plain = {
  render: () => notice("ink", "Draft restored", "Recovered from the last session."),
};

/** Description only: the wash and the edge still announce the pigment. */
export const WithoutTitle = {
  render: () => (
    <Alert status="warning" style={{ maxWidth: "34rem" }}>
      <Alert.Icon />
      <Alert.Body>
        <Alert.Description>Save your work before the session times out.</Alert.Description>
      </Alert.Body>
    </Alert>
  ),
};

export const Statuses = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      {(
        [
          ["info", "Ink is flowing", "The release is being written to the registry."],
          ["success", "Filed", "The colophon joined the archive without a scratch."],
          ["warning", "Low paper", "The stock of smooth surfaces runs thin."],
          ["danger", "Ink spilled", "The write failed; the page is untouched."],
        ] as const
      ).map(([status, title, description]) => (
        <div key={status}>{notice(status, title, description)}</div>
      ))}
    </div>
  ),
};
