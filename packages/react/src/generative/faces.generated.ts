import { z } from "zod";

/** One family's claim in the generative vocabulary — what the model may
 * compose. Framework-free by design: the wrappers add the assembly (how
 * it renders) beside the face, so the words live here once and render
 * four ways. */
export interface Face {
  /** The zod schema the model's JSON must satisfy. */
  props: z.ZodObject;
  /** Named regions beyond the children, where the framework carries them. */
  slots?: string[];
  /** What the face is for, in one breath — the model reads this, so it
   * states the intent, not the anatomy. */
  description: string;
}

/** Name the faces a family contributes; the identity keeps inference
 * honest at the call site. */
export function defineFace<T extends Record<string, Face>>(faces: T): T {
  return faces;
}

/** Map a catalog Heading level to a measure — the serif voice stays, the
 * size steps down. */
export const headingClass: Record<string, string> = {
  "1": "text-4xl",
  "2": "text-3xl",
  "3": "text-2xl",
  "4": "text-xl",
  "5": "text-lg",
  "6": "text-base",
};

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function slug(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || value
  );
}

export type SelectOption = { label: string; value: string };

/** The vocabulary the wrappers speak. One face per composed name — the
 * per-family assemblies in each wrapper spread these and add only the
 * rendering. */
export const faces = defineFace({
  Alert: {
    props: z.object({
      status: z.enum(["success", "warning", "danger", "info", "ink"]).optional(),
      title: z.string().optional(),
      message: z.string().optional(),
    }),
    description: "A bordered notice; status picks the pigment.",
  },
  Avatar: {
    props: z.object({
      name: z.string(),
      src: z.string().optional(),
      size: z.enum(["sm", "md", "lg"]).optional(),
    }),
    description: "A person's seal: image when given, initials as the fallback.",
  },
  Badge: {
    props: z.object({
      text: z.string(),
      tone: z.string().optional(),
      variant: z.string().optional(),
    }),
    description: "A small status seal beside content; reads at a glance.",
  },
  Button: {
    props: z.object({
      label: z.string(),
      variant: z.enum(["solid", "outline", "ghost", "subtle"]).optional(),
      tone: z.string().optional(),
      size: z.enum(["sm", "md", "lg"]).optional(),
    }),
    description:
      "The primary action register: solid ink for the one main action, outline, ghost, or subtle for the rest.",
  },
  Card: {
    props: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }),
    slots: ["default", "header", "footer"],
    description:
      "Grouping vessel. Give title and description instead of hand-building a header; children render in the body; footer holds actions.",
  },
  Checkbox: {
    props: z.object({
      label: z.string(),
      checked: z.boolean().optional(),
      disabled: z.boolean().optional(),
    }),
    description: "One independent box with its label.",
  },
  Heading: {
    props: z.object({ text: z.string(), level: z.enum(["1", "2", "3", "4", "5", "6"]).optional() }),
    description: "Section heading. One per view at level 1; do not skip levels.",
  },
  Input: {
    props: z.object({
      label: z.string().optional(),
      placeholder: z.string().optional(),
      type: z.enum(["text", "email", "url", "search", "tel"]).optional(),
      value: z.string().optional(),
    }),
    description: "A single-line field; rely on border, surface and the focus halo.",
  },
  Progress: {
    props: z.object({ value: z.number().optional(), label: z.string().optional() }),
    description: "A working track that fills toward done.",
  },
  RadioGroup: {
    props: z.object({ label: z.string().optional(), items: z.array(z.string()).optional() }),
    description: "Several boxes where exactly one may hold.",
  },
  Select: {
    props: z.object({
      label: z.string().optional(),
      placeholder: z.string().optional(),
      options: z.array(z.object({ label: z.string(), value: z.string() })),
      value: z.string().optional(),
    }),
    description: "A choice field that opens a ruled list; options carry label and value.",
  },
  Separator: {
    props: z.object({ orientation: z.enum(["horizontal", "vertical"]).optional() }),
    description: "Hairline divider between sections.",
  },
  Slider: {
    props: z.object({ label: z.string().optional(), value: z.number().optional() }),
    description: "A ruled track the hand slides between bounds.",
  },
  Spinner: {
    props: z.object({ size: z.enum(["sm", "md", "lg"]).optional(), label: z.string().optional() }),
    description: "A quiet wheel for work still settling.",
  },
  Stack: {
    props: z.object({
      direction: z.enum(["column", "row"]).optional(),
      gap: z.enum(["none", "xs", "sm", "md", "lg", "xl"]).optional(),
      align: z.string().optional(),
      justify: z.string().optional(),
      wrap: z.boolean().optional(),
    }),
    slots: ["default"],
    description:
      "Flex container for layout. direction column stacks vertically, row lays side by side. gap is a named spacing step.",
  },
  Stat: {
    props: z.object({
      label: z.string(),
      value: z.string(),
      change: z.string().optional(),
      direction: z.enum(["up", "down", "flat"]).optional(),
    }),
    description: "One loud figure with its quiet label and an optional delta.",
  },
  Switch: {
    props: z.object({ label: z.string().optional(), checked: z.boolean().optional() }),
    description: "An instant on/off; label names what it switches.",
  },
  Text: {
    props: z.object({
      text: z.string(),
      variant: z.enum(["body", "lead", "muted", "label"]).optional(),
    }),
    description: "A prose voice: lead opens, body carries, muted whispers, label names.",
  },
  Textarea: {
    props: z.object({
      label: z.string().optional(),
      placeholder: z.string().optional(),
      rows: z.number().int().optional(),
      value: z.string().optional(),
    }),
    description: "A multi-line field for prose-length answers.",
  },
});
