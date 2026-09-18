import type { Meta } from "@storybook/react-vite";
import { useState } from "react";
import type { ReactNode } from "react";

import { createToaster, Toast, Toaster } from ".";
import type { CreateToasterReturn } from ".";

const meta: Meta = { title: "Components/Overlay/Toast" };
export default meta;

function closeGlyph() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function StatusGlyph({ type }: { type?: string | null }) {
  const paths: Record<string, string[]> = {
    info: ["M12 11v5", "M12 8h.01"],
    success: ["m8.5 12.5 2.5 2.5 5-5.5"],
    warning: ["M12 9v4", "M12 17h.01"],
    error: ["M12 8v5", "M12 16.5h.01"],
    loading: ["M21 12a9 9 0 1 1-9-9"],
  };
  const inner = paths[type ?? ""] ?? [];
  const round = type === "warning" || type === "error";
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      {round ? null : (
        <circle cx={12} cy={12} r={9} opacity={type === "loading" ? 0.25 : undefined} />
      )}
      {inner.map((d) => (
        <path key={d} d={d} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

const BUTTON_STYLE = {
  border: "1px solid var(--bs-color-border)",
  background: "var(--bs-color-surface-2)",
  borderRadius: "var(--bs-radius-sm)",
  padding: "0.375rem 0.75rem",
  font: "inherit",
  fontSize: "var(--bs-font-size-sm)",
  cursor: "pointer",
};

type ToastCard = (toast: any) => ReactNode;

/** The default notice card: title over description, a close glyph at the
 * edge, and the action trigger when the step carries one. */
function card(action = false): ToastCard {
  return (toast: any) => (
    <Toast.Root key={toast.id}>
      <Toast.Title>{toast.title}</Toast.Title>
      <Toast.Description>{toast.description}</Toast.Description>
      {action && toast.action ? (
        <Toast.ActionTrigger>{toast.action?.label}</Toast.ActionTrigger>
      ) : null}
      <Toast.CloseTrigger aria-label="Close">{closeGlyph()}</Toast.CloseTrigger>
    </Toast.Root>
  );
}

/** A story host: its own toaster (module-level instances would leak
 * between stories), the trigger buttons, and the notice vessel. */
function Notifier({
  options = {},
  buttons,
  cardFor,
}: {
  options?: Record<string, any>;
  buttons: (toaster: CreateToasterReturn) => ReactNode;
  cardFor?: ToastCard;
}) {
  const [toaster] = useState(() =>
    createToaster({ overlap: true, placement: "bottom-end", gap: 16, ...options }),
  );
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>{buttons(toaster)}</div>
      <Toaster toaster={toaster}>{cardFor ?? card()}</Toaster>
    </>
  );
}

const announce = (toaster: CreateToasterReturn) =>
  toaster.create({
    title: "Scheduled for tomorrow",
    description: "Your meeting has been scheduled for tomorrow at ten.",
    type: "info",
  });

/** One notice rises from the bottom edge; the machine's translate
 * variables carry the slide. */
export const Basic = {
  args: {
    triggerLabel: "Schedule meeting",
  },
  render: (args: any) => (
    <Notifier
      buttons={(toaster) => (
        <button type="button" style={BUTTON_STYLE} onClick={() => announce(toaster)}>
          {args.triggerLabel}
        </button>
      )}
    />
  ),
};

/** The notice carries an undo rung: the action trigger sits beside the
 * description until dismissed. */
export const Action = {
  render: () => (
    <Notifier
      buttons={(toaster) => (
        <button
          type="button"
          style={BUTTON_STYLE}
          onClick={() =>
            toaster.create({
              title: "Event has been created",
              description: "We have sent you an email with the event details.",
              type: "info",
              action: { label: "Undo", onClick: () => {} },
            })
          }
        >
          Create event
        </button>
      )}
      cardFor={card(true)}
    />
  ),
};

/** Four rungs of patience: one, three, five seconds, or until the
 * reader dismisses. */
export const Duration = {
  render: () => (
    <Notifier
      buttons={(toaster) =>
        [
          { label: "1s", value: 1000 },
          { label: "3s", value: 3000 },
          { label: "5s", value: 5000 },
          { label: "∞", value: Infinity },
        ].map((duration) => (
          <button
            key={duration.label}
            type="button"
            style={BUTTON_STYLE}
            onClick={() =>
              toaster.create({
                title: "Reminder set",
                description: `This notification will ${
                  duration.value === Infinity
                    ? "stay until dismissed"
                    : `disappear in ${duration.label}`
                }.`,
                type: "info",
                duration: duration.value,
              })
            }
          >
            {duration.label}
          </button>
        ))
      }
    />
  ),
};

/** The vessel can rise from any edge — here, the top. */
export const Placement = {
  render: () => (
    <Notifier
      options={{ placement: "top-end" }}
      buttons={(toaster) => (
        <button type="button" style={BUTTON_STYLE} onClick={() => announce(toaster)}>
          Show toast (top-end)
        </button>
      )}
    />
  ),
};

/** Each pigment has a voice: success, error, warning, info. */
export const Types = {
  render: () => (
    <Notifier
      buttons={(toaster) =>
        [
          {
            label: "Success",
            kind: "success",
            title: "Changes saved",
            description: "Your profile has been updated successfully.",
          },
          {
            label: "Error",
            kind: "error",
            title: "Upload failed",
            description: "There was an error uploading your file.",
          },
          {
            label: "Warning",
            kind: "warning",
            title: "Low storage",
            description: "You have less than 10% storage remaining.",
          },
          {
            label: "Info",
            kind: "info",
            title: "Update available",
            description: "A new version of the app is ready to install.",
          },
        ].map((item) => (
          <button
            key={item.kind}
            type="button"
            style={BUTTON_STYLE}
            onClick={() =>
              (toaster as any)[item.kind]({ title: item.title, description: item.description })
            }
          >
            {item.label}
          </button>
        ))
      }
    />
  ),
};

/** A notice can be rewritten in place: loading becomes success without
 * a second toast. */
export const Update = {
  render: () => {
    const [id, setId] = useState<string | undefined>(undefined);
    return (
      <Notifier
        buttons={(toaster) => (
          <>
            <button
              type="button"
              style={BUTTON_STYLE}
              onClick={() => {
                setId(
                  toaster.create({
                    title: "Sending message...",
                    description: "Please wait while we deliver your message.",
                    type: "loading",
                  }),
                );
              }}
            >
              Send message
            </button>
            <button
              type="button"
              style={BUTTON_STYLE}
              onClick={() => {
                if (!id) return;
                toaster.update(id, {
                  title: "Message sent",
                  description: "Your message has been delivered successfully.",
                  type: "success",
                });
              }}
            >
              Mark as sent
            </button>
          </>
        )}
        cardFor={(toast: any) => (
          <Toast.Root key={toast.id}>
            <Toast.Title>
              <StatusGlyph type={toast.type} /> {toast.title}
            </Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
          </Toast.Root>
        )}
      />
    );
  },
};

/** Three at most: the eldest leaves when the queue runs past its cap. */
export const MaxToasts = {
  render: () => (
    <Notifier
      options={{ max: 3 }}
      buttons={(toaster) => (
        <>
          <button
            type="button"
            style={BUTTON_STYLE}
            onClick={() =>
              toaster.create({
                title: "New notification",
                description: "You have a new message in your inbox.",
                type: "info",
              })
            }
          >
            Add notification
          </button>
          <button
            type="button"
            style={BUTTON_STYLE}
            onClick={() => {
              const messages = [
                "John liked your post",
                "Sarah commented on your photo",
                "New follower: @designpro",
                "Your post was shared 10 times",
                "Meeting reminder in 15 minutes",
              ];
              messages.forEach((description) =>
                toaster.create({ title: "Notification", description, type: "info" }),
              );
            }}
          >
            Add 5 notifications
          </button>
        </>
      )}
      cardFor={(toast: any) => (
        <Toast.Root key={toast.id}>
          <Toast.Title>
            <StatusGlyph type="info" /> {toast.title}
          </Toast.Title>
          <Toast.Description>{toast.description}</Toast.Description>
          <Toast.CloseTrigger aria-label="Close">{closeGlyph()}</Toast.CloseTrigger>
        </Toast.Root>
      )}
    />
  ),
};

/** A promise can speak for itself: loading, then success or failure as
 * it settles. */
export const PromiseToast = {
  render: () => (
    <Notifier
      buttons={(toaster) => (
        <button
          type="button"
          style={BUTTON_STYLE}
          onClick={() => {
            const upload = new Promise<void>((resolve, reject) => {
              setTimeout(
                () => (Math.random() > 0.5 ? resolve() : reject(new Error("failed"))),
                2000,
              );
            });
            toaster.promise(upload, {
              loading: {
                title: "Uploading file...",
                description: "Please wait while we upload your document.",
              },
              success: {
                title: "Upload complete",
                description: "Your file has been uploaded successfully.",
              },
              error: {
                title: "Upload failed",
                description: "Could not upload the file. Please try again.",
              },
            });
          }}
        >
          Upload file
        </button>
      )}
      cardFor={(toast: any) => (
        <Toast.Root key={toast.id}>
          <Toast.Title>
            <StatusGlyph type={toast.type} /> {toast.title}
          </Toast.Title>
          <Toast.Description>{toast.description}</Toast.Description>
        </Toast.Root>
      )}
    />
  ),
};

/** Notices of every height stack in order — the column keeps its step. */
export const VaryingHeight = {
  render: () => {
    const DESCRIPTIONS = [
      "Your changes have been saved.",
      "File uploaded successfully. You can view it in your documents folder.",
      "Your meeting has been scheduled for tomorrow at 10:00. A calendar invite went to all participants.",
      "We noticed unusual activity on your account. Please verify your identity via the link we sent.",
    ];
    let count = 0;
    return (
      <Notifier
        buttons={(toaster) => (
          <button
            type="button"
            style={BUTTON_STYLE}
            onClick={() => {
              const description = DESCRIPTIONS[count % DESCRIPTIONS.length];
              count += 1;
              toaster.create({ title: `Notification ${count}`, description, type: "info" });
            }}
          >
            Create toast
          </button>
        )}
      />
    );
  },
};
