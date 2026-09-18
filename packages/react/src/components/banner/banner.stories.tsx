import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Banner } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Feedback/Banner" };
export default meta;

/** The page-level notice in its ink register: title, description, and
 * the way out resting in the actions row. */
export const Basic = {
  render: () => (
    <Banner.Root>
      <Banner.Body>
        <Banner.Title>Scheduled maintenance</Banner.Title>
        <Banner.Description>
          The reading room closes early this Friday, at four in the afternoon.
        </Banner.Description>
        <Banner.Actions>
          <Button variant="outline" size="sm">
            View schedule
          </Button>
        </Banner.Actions>
      </Banner.Body>
      <Banner.Close />
    </Banner.Root>
  ),
};

/** The four semantic pigments, each spoken across the full measure. */
export const Statuses = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--bs-space-3)" }}>
      <Banner.Root status="info">
        <Banner.Body>
          <Banner.Title>New catalogue online</Banner.Title>
          <Banner.Description>Search now covers the manuscripts wing.</Banner.Description>
        </Banner.Body>
      </Banner.Root>
      <Banner.Root status="success">
        <Banner.Body>
          <Banner.Title>Delivery complete</Banner.Title>
          <Banner.Description>The autumn acquisitions arrived this morning.</Banner.Description>
        </Banner.Body>
      </Banner.Root>
      <Banner.Root status="warning">
        <Banner.Body>
          <Banner.Title>Two letters unanswered</Banner.Title>
          <Banner.Description>
            The registry flags correspondence past thirty days.
          </Banner.Description>
        </Banner.Body>
      </Banner.Root>
      <Banner.Root status="danger">
        <Banner.Body>
          <Banner.Title>East wing closed</Banner.Title>
          <Banner.Description>
            Shelving is under repair; requests held until Monday.
          </Banner.Description>
        </Banner.Body>
      </Banner.Root>
    </div>
  ),
};

/** Dismissal is the consumer's state — the close only reports the click. */
export const Dismissible = {
  render: () => {
    const [open, setOpen] = useState(true);
    return open ? (
      <Banner.Root status="warning">
        <Banner.Body>
          <Banner.Title>Two letters unanswered</Banner.Title>
          <Banner.Description>
            The registry flags correspondence past thirty days.
          </Banner.Description>
        </Banner.Body>
        <Banner.Close onClick={() => setOpen(false)} />
      </Banner.Root>
    ) : (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Bring the notice back
      </Button>
    );
  },
};
