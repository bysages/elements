import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, ref, Teleport } from "vue";

import { createToaster, Toast, Toaster, type CreateToasterReturn } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Overlay/Toast" };
export default meta;

function closeGlyph() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "M6 6l12 12M18 6L6 18", "stroke-linecap": "round" })],
  );
}

function statusGlyph(type?: string | null) {
  const paths: Record<string, string[]> = {
    info: ["M12 11v5", "M12 8h.01"],
    success: ["m8.5 12.5 2.5 2.5 5-5.5"],
    warning: ["M12 9v4", "M12 17h.01"],
    error: ["M12 8v5", "M12 16.5h.01"],
    loading: ["M21 12a9 9 0 1 1-9-9"],
  };
  const inner = paths[type ?? ""] ?? [];
  const round = type === "warning" || type === "error";
  return () =>
    h(
      "svg",
      {
        width: 18,
        height: 18,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 1.75,
        "aria-hidden": true,
      },
      [
        ...(round
          ? []
          : [
              h("circle", {
                cx: 12,
                cy: 12,
                r: 9,
                ...(type === "loading" ? { opacity: 0.25 } : {}),
              }),
            ]),
        ...inner.map((d) =>
          h("path", { d, "stroke-linecap": "round", "stroke-linejoin": "round" }),
        ),
      ],
    );
}

const buttonStyle = {
  border: "1px solid var(--bs-color-border)",
  background: "var(--bs-color-surface-2)",
  borderRadius: "var(--bs-radius-sm)",
  padding: "0.375rem 0.75rem",
  font: "inherit",
  fontSize: "var(--bs-font-size-sm)",
  cursor: "pointer",
};

/** The default notice card: title over description, a close glyph at the
 * edge, and the action trigger when the step carries one. */
function card(action = false) {
  return (toast: any) => [
    h(Toast.Root, { key: toast.id }, () => [
      h(Toast.Title, () => toast.title),
      h(Toast.Description, () => toast.description),
      ...(action && toast.action ? [h(Toast.ActionTrigger, () => toast.action?.label)] : []),
      h(Toast.CloseTrigger, { "aria-label": "Close" }, () => closeGlyph()),
    ]),
  ];
}

/** A story host: its own toaster (module-level instances would leak
 * between stories), the trigger buttons, and the teleported vessel. */
function notifier(
  name: string,
  options: Record<string, any>,
  buttons: (toaster: CreateToasterReturn) => any[],
  cardFor?: (toaster: CreateToasterReturn) => (toast: any) => any[],
) {
  const Host = defineComponent({
    name,
    setup() {
      const toaster = createToaster({
        overlap: true,
        placement: "bottom-end",
        gap: 16,
        ...options,
      });
      return () => [
        h("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.5rem" } }, buttons(toaster)),
        h(Teleport, { to: "body" }, () => [
          h(Toaster, { toaster }, { default: cardFor?.(toaster) ?? card() }),
        ]),
      ];
    },
  });
  return () => h(Host);
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
  render: (args: any) =>
    withState(
      // `notifier` yields a render function; the story host needs its
      // vnode, so the inner call happens right here.
      () => () =>
        notifier("ToastBasic", {}, (toaster) => [
          h(
            "button",
            { type: "button", style: buttonStyle, onClick: () => announce(toaster) },
            () => args.triggerLabel,
          ),
        ])(),
    ),
};

/** The notice carries an undo rung: the action trigger sits beside the
 * description until dismissed. */
export const Action = {
  render: () =>
    notifier(
      "ToastAction",
      {},
      (toaster) => [
        h(
          "button",
          {
            type: "button",
            style: buttonStyle,
            onClick: () =>
              toaster.create({
                title: "Event has been created",
                description: "We have sent you an email with the event details.",
                type: "info",
                action: { label: "Undo", onClick: () => {} },
              }),
          },
          () => "Create event",
        ),
      ],
      () => card(true),
    ),
};

/** Four rungs of patience: one, three, five seconds, or until the
 * reader dismisses. */
export const Duration = {
  render: () =>
    notifier("ToastDuration", {}, (toaster) =>
      [
        { label: "1s", value: 1000 },
        { label: "3s", value: 3000 },
        { label: "5s", value: 5000 },
        { label: "∞", value: Infinity },
      ].map((duration) =>
        h(
          "button",
          {
            key: duration.label,
            type: "button",
            style: buttonStyle,
            onClick: () =>
              toaster.create({
                title: "Reminder set",
                description: `This notification will ${
                  duration.value === Infinity
                    ? "stay until dismissed"
                    : `disappear in ${duration.label}`
                }.`,
                type: "info",
                duration: duration.value,
              }),
          },
          () => duration.label,
        ),
      ),
    ),
};

/** The vessel can rise from any edge — here, the top. */
export const Placement = {
  render: () =>
    notifier("ToastPlacement", { placement: "top-end" }, (toaster) => [
      h(
        "button",
        { type: "button", style: buttonStyle, onClick: () => announce(toaster) },
        () => "Show toast (top-end)",
      ),
    ]),
};

/** Each pigment has a voice: success, error, warning, info. */
export const Types = {
  render: () =>
    notifier("ToastTypes", {}, (toaster) =>
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
      ].map((item) =>
        h(
          "button",
          {
            key: item.kind,
            type: "button",
            style: buttonStyle,
            onClick: () =>
              (toaster as any)[item.kind]({ title: item.title, description: item.description }),
          },
          () => item.label,
        ),
      ),
    ),
};

/** A notice can be rewritten in place: loading becomes success without
 * a second toast. */
export const Update = {
  render: () => {
    const id = ref<string | undefined>(undefined);
    return notifier(
      "ToastUpdate",
      {},
      (toaster) => [
        h(
          "button",
          {
            type: "button",
            style: buttonStyle,
            onClick: () => {
              id.value = toaster.create({
                title: "Sending message...",
                description: "Please wait while we deliver your message.",
                type: "loading",
              });
            },
          },
          () => "Send message",
        ),
        h(
          "button",
          {
            type: "button",
            style: buttonStyle,
            onClick: () => {
              if (!id.value) return;
              toaster.update(id.value, {
                title: "Message sent",
                description: "Your message has been delivered successfully.",
                type: "success",
              });
            },
          },
          () => "Mark as sent",
        ),
      ],
      () => (toast: any) => [
        h(Toast.Root, { key: toast.id }, () => [
          h(Toast.Title, () => [statusGlyph(toast.type)(), toast.title]),
          h(Toast.Description, () => toast.description),
        ]),
      ],
    );
  },
};

/** Three at most: the eldest leaves when the queue runs past its cap. */
export const MaxToasts = {
  render: () =>
    notifier(
      "ToastMaxToasts",
      { max: 3 },
      (toaster) => [
        h(
          "button",
          {
            type: "button",
            style: buttonStyle,
            onClick: () =>
              toaster.create({
                title: "New notification",
                description: "You have a new message in your inbox.",
                type: "info",
              }),
          },
          () => "Add notification",
        ),
        h(
          "button",
          {
            type: "button",
            style: buttonStyle,
            onClick: () => {
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
            },
          },
          () => "Add 5 notifications",
        ),
      ],
      () => (toast: any) => [
        h(Toast.Root, { key: toast.id }, () => [
          h(Toast.Title, () => [statusGlyph("info")(), toast.title]),
          h(Toast.Description, () => toast.description),
          h(Toast.CloseTrigger, { "aria-label": "Close" }, () => closeGlyph()),
        ]),
      ],
    ),
};

/** A promise can speak for itself: loading, then success or failure as
 * it settles. */
export const PromiseToast = {
  render: () =>
    notifier(
      "ToastPromise",
      {},
      (toaster) => [
        h(
          "button",
          {
            type: "button",
            style: buttonStyle,
            onClick: () => {
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
            },
          },
          () => "Upload file",
        ),
      ],
      () => (toast: any) => [
        h(Toast.Root, { key: toast.id }, () => [
          h(Toast.Title, () => [statusGlyph(toast.type)(), toast.title]),
          h(Toast.Description, () => toast.description),
        ]),
      ],
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
    return notifier("ToastVaryingHeight", {}, (toaster) => [
      h(
        "button",
        {
          type: "button",
          style: buttonStyle,
          onClick: () => {
            const description = DESCRIPTIONS[count % DESCRIPTIONS.length];
            count += 1;
            toaster.create({ title: `Notification ${count}`, description, type: "info" });
          },
        },
        () => "Create toast",
      ),
    ]);
  },
};
