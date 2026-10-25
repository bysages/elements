import { injectComponentStyle } from "@bysages/core/styling";
import type {
  CustomContentUIPart,
  DataUIPart,
  DynamicToolUIPart,
  FileUIPart,
  ReasoningFileUIPart,
  ReasoningUIPart,
  SourceDocumentUIPart,
  SourceUrlUIPart,
  StepStartUIPart,
  TextUIPart,
  ToolUIPart,
  UIDataTypes,
  UIMessage,
  UITools,
} from "ai";
import type { PropType, SetupContext, VNode } from "vue";
import { computed, defineComponent, Fragment, h } from "vue";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { Reasoning } from "../ai-reasoning";
import { Response } from "../ai-response";
import { Source, Sources } from "../ai-source";
import { Tool, type ToolValue } from "../ai-tool";

export type AiSdkMessage = UIMessage<unknown, UIDataTypes, UITools>;
export type AiSdkMessagePart<MESSAGE extends AiSdkMessage = AiSdkMessage> =
  MESSAGE["parts"][number];
export type AiSdkTextPart<MESSAGE extends AiSdkMessage = AiSdkMessage> = Extract<
  AiSdkMessagePart<MESSAGE>,
  TextUIPart
>;
export type AiSdkCustomPart<MESSAGE extends AiSdkMessage = AiSdkMessage> = Extract<
  AiSdkMessagePart<MESSAGE>,
  CustomContentUIPart
>;
export type AiSdkReasoningPart<MESSAGE extends AiSdkMessage = AiSdkMessage> = Extract<
  AiSdkMessagePart<MESSAGE>,
  ReasoningUIPart
>;
export type AiSdkReasoningFilePart<MESSAGE extends AiSdkMessage = AiSdkMessage> = Extract<
  AiSdkMessagePart<MESSAGE>,
  ReasoningFileUIPart
>;
export type AiSdkToolPart<MESSAGE extends AiSdkMessage = AiSdkMessage> = Extract<
  AiSdkMessagePart<MESSAGE>,
  ToolUIPart<UITools> | DynamicToolUIPart
>;
export type AiSdkSourceUrlPart<MESSAGE extends AiSdkMessage = AiSdkMessage> = Extract<
  AiSdkMessagePart<MESSAGE>,
  SourceUrlUIPart
>;
export type AiSdkSourceDocumentPart<MESSAGE extends AiSdkMessage = AiSdkMessage> = Extract<
  AiSdkMessagePart<MESSAGE>,
  SourceDocumentUIPart
>;
export type AiSdkFilePart<MESSAGE extends AiSdkMessage = AiSdkMessage> = Extract<
  AiSdkMessagePart<MESSAGE>,
  FileUIPart
>;
export type AiSdkDataPart<MESSAGE extends AiSdkMessage = AiSdkMessage> = Extract<
  AiSdkMessagePart<MESSAGE>,
  DataUIPart<UIDataTypes>
>;
export type AiSdkStepStartPart<MESSAGE extends AiSdkMessage = AiSdkMessage> = Extract<
  AiSdkMessagePart<MESSAGE>,
  StepStartUIPart
>;
export type AiSdkMediaPart<MESSAGE extends AiSdkMessage = AiSdkMessage> =
  | AiSdkFilePart<MESSAGE>
  | AiSdkReasoningFilePart<MESSAGE>;
export type AiMediaKind = "image" | "audio" | "video" | "file";

export type AiToolDisplay = {
  /** The tool's stable identifier. */
  name: string;
  /** The shared tool fold's rendering state. */
  status: "pending" | "running" | "completed" | "error" | "denied";
  /** The approval gate, when the SDK part carries one. */
  approval?: "required" | "approved" | "denied";
  /** The SDK input, passed straight through to the fold. */
  input?: ToolValue;
  /** The SDK output, or the error text for `output-error`. */
  output?: ToolValue;
};

const mediaKind = (mediaType: string): AiMediaKind => {
  const family = mediaType.split("/")[0];
  if (family === "image") return "image";
  if (family === "audio") return "audio";
  if (family === "video") return "video";
  return "file";
};

/** Maps either SDK tool shape onto the one display contract used by the
 * shared tool fold, including approval and denied output states. */
export function toolPartDisplay<MESSAGE extends AiSdkMessage = AiSdkMessage>(
  part: AiSdkToolPart<MESSAGE>,
): AiToolDisplay {
  const name = part.type === "dynamic-tool" ? part.toolName : part.type.slice("tool-".length);
  const approval = (() => {
    if (part.state === "approval-requested") return "required" as const;
    if (part.state === "approval-responded")
      return part.approval.approved ? ("approved" as const) : ("denied" as const);
    if (part.state === "output-denied") return "denied" as const;
    return undefined;
  })();
  const status = (() => {
    if (part.state === "input-streaming") return "pending" as const;
    if (part.state === "input-available") return "running" as const;
    if (part.state === "approval-requested") return "running" as const;
    if (part.state === "approval-responded") return "running" as const;
    if (part.state === "output-available") return "completed" as const;
    if (part.state === "output-error") return "error" as const;
    return "denied" as const;
  })();

  return {
    name,
    status,
    approval,
    input: part.input as ToolValue,
    output: part.state === "output-error" ? part.errorText : (part.output as ToolValue),
  };
}

const fileLabel = (part: AiSdkMediaPart) =>
  "filename" in part && part.filename ? part.filename : part.mediaType;

const fileLink = (part: AiSdkMediaPart) =>
  h(
    "a",
    {
      "data-scope": "ai",
      "data-part": "file-link",
      href: part.url,
      target: "_blank",
      rel: "noreferrer",
    },
    [iconNode("file"), h("span", fileLabel(part))],
  );

export interface AiMediaProps<MESSAGE extends AiSdkMessage = AiSdkMessage> {
  /** The AI SDK part. Supply this, or supply the direct props below. */
  part?: AiSdkMediaPart<MESSAGE>;
  /** The part's IANA media type when no `part` is supplied. */
  mediaType?: string;
  /** The media source when no `part` is supplied. */
  url?: string;
  /** The accessible label and filename shown for a file download. */
  filename?: string;
  /** Accessible text for an image; filename is the sensible default. */
  alt?: string;
}

/** One SDK file or reasoning-file part. Browsers get the native viewer
 * for media they can play; every other media type remains a download
 * link with its filename. */
export const AiMedia = withSelfRoot(
  defineComponent({
    name: "AiMedia",
    props: {
      /** The AI SDK part. Supply this, or supply the direct props below. */
      part: { type: Object as PropType<AiSdkMediaPart>, default: undefined },
      /** The part's IANA media type when no `part` is supplied. */
      mediaType: { type: String, default: undefined },
      /** The media source when no `part` is supplied. */
      url: { type: String, default: undefined },
      /** The accessible label and filename shown for a file download. */
      filename: { type: String, default: undefined },
      /** Accessible text for an image; filename is the sensible default. */
      alt: { type: String, default: undefined },
    },
    setup(props) {
      injectComponentStyle("ai");
      const active = computed<AiSdkMediaPart | null>(() => {
        if (props.part) return props.part;
        if (!props.mediaType || !props.url) return null;
        return {
          type: "file",
          mediaType: props.mediaType,
          url: props.url,
          ...(props.filename ? { filename: props.filename } : {}),
        };
      });

      return () => {
        const part = active.value;
        if (!part) return null;
        const kind = mediaKind(part.mediaType);

        return h(
          "figure",
          {
            "data-scope": "ai",
            "data-part": "media",
            "data-kind": kind,
          },
          [
            kind === "image"
              ? h("img", {
                  src: part.url,
                  alt: props.alt ?? (fileLabel(part) === part.mediaType ? "" : fileLabel(part)),
                })
              : kind === "audio"
                ? h("audio", { src: part.url, controls: true })
                : kind === "video"
                  ? h("video", { src: part.url, controls: true })
                  : fileLink(part),
          ],
        );
      };
    },
  }),
);

export interface AiPartsProps<MESSAGE extends AiSdkMessage = AiSdkMessage> {
  /** The AI SDK message to render. */
  message: MESSAGE;
  /** Optional markdown highlighter passed to every text part. */
  highlighter?: (code: string, lang?: string) => string;
  onApprove?: (event: { part: AiSdkToolPart<MESSAGE>; index: number }) => void;
  onDeny?: (event: { part: AiSdkToolPart<MESSAGE>; index: number }) => void;
}

export interface AiPartsSlots<MESSAGE extends AiSdkMessage = AiSdkMessage> {
  /** Takes over the whole message renderer. */
  default?: (props: { message: MESSAGE }) => VNode[];
  text?: (props: { part: AiSdkTextPart<MESSAGE>; index: number }) => VNode[];
  custom?: (props: { part: AiSdkCustomPart<MESSAGE>; index: number }) => VNode[];
  reasoning?: (props: { part: AiSdkReasoningPart<MESSAGE>; index: number }) => VNode[];
  reasoningFile?: (props: { part: AiSdkReasoningFilePart<MESSAGE>; index: number }) => VNode[];
  tool?: (props: { part: AiSdkToolPart<MESSAGE>; index: number }) => VNode[];
  sourceUrl?: (props: { part: AiSdkSourceUrlPart<MESSAGE>; index: number }) => VNode[];
  sourceDocument?: (props: { part: AiSdkSourceDocumentPart<MESSAGE>; index: number }) => VNode[];
  file?: (props: { part: AiSdkFilePart<MESSAGE>; index: number }) => VNode[];
  data?: (props: { part: AiSdkDataPart<MESSAGE>; index: number }) => VNode[];
  stepStart?: (props: { part: AiSdkStepStartPart<MESSAGE>; index: number }) => VNode[];
  fallback?: (props: { part: AiSdkMessagePart<MESSAGE>; index: number }) => VNode[];
}

/** Renders one typed `UIMessage` from AI SDK as the shared conversation
 * anatomy. SDK state stays authoritative: streaming reasoning opens,
 * completed reasoning folds, approval state maps to tool actions, and
 * unknown data parts wait for their application slot. The generic
 * `MESSAGE extends AiSdkMessage` narrows every part and slot to the
 * application's own `UIMessage` type. */
export const AiParts = defineComponent({
  name: "AiParts",
  props: {
    /** The AI SDK message to render. */
    message: { type: Object as PropType<AiSdkMessage>, required: true },
    /** Optional markdown highlighter passed to every text part. */
    highlighter: {
      type: Function as PropType<(code: string, lang?: string) => string>,
      default: undefined,
    },
  },
  emits: {
    approve: (_event: { part: AiSdkToolPart; index: number }) => true,
    deny: (_event: { part: AiSdkToolPart; index: number }) => true,
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("ai");
    const slots = ctx.slots as unknown as AiPartsSlots<AiSdkMessage>;
    const custom = <T>(render: ((props: T) => VNode[]) | undefined, partProps: T) => {
      const nodes = render?.(partProps);
      return nodes?.length ? h(Fragment, nodes) : undefined;
    };

    const source = (part: SourceUrlUIPart | SourceDocumentUIPart, index: number) => {
      const customSource =
        "url" in part
          ? custom(slots.sourceUrl, { part, index })
          : custom(slots.sourceDocument, { part, index });
      if (customSource) return customSource;

      return h(Sources, () =>
        "url" in part
          ? [h(Source, { href: part.url }, () => part.title ?? part.url)]
          : [
              h(
                "li",
                {
                  "data-scope": "ai",
                  "data-part": "document-source",
                },
                [h("span", part.title), h("span", part.mediaType)],
              ),
            ],
      );
    };

    const renderPart = (part: AiSdkMessagePart, index: number): VNode | null => {
      if (part.type === "text") {
        return (
          custom(slots.text, { part, index }) ??
          (part.text
            ? h(Response, {
                content: part.text,
                ...(props.highlighter ? { highlighter: props.highlighter } : {}),
              })
            : null)
        );
      }
      if (part.type === "reasoning") {
        return (
          custom(slots.reasoning, { part, index }) ??
          h(Reasoning, { defaultOpen: part.state === "streaming" }, () => part.text)
        );
      }
      if (part.type === "reasoning-file") {
        return custom(slots.reasoningFile, { part, index }) ?? h(AiMedia, { part });
      }
      if (part.type === "file") {
        return custom(slots.file, { part, index }) ?? h(AiMedia, { part });
      }
      if (part.type === "source-url" || part.type === "source-document") {
        return source(part, index);
      }
      if (part.type.startsWith("tool-") || part.type === "dynamic-tool") {
        const toolPart = part as AiSdkToolPart;
        const customTool = custom(slots.tool, { part: toolPart, index });
        if (customTool) return customTool;

        const display = toolPartDisplay(toolPart);
        return h(Tool, {
          key: toolPart.toolCallId,
          name: display.name,
          status: display.status,
          ...(display.approval ? { approval: display.approval } : {}),
          ...(display.input !== undefined ? { inputValue: display.input } : {}),
          ...(display.output !== undefined ? { outputValue: display.output } : {}),
          defaultOpen: display.status === "error" || display.approval === "required",
          onApprove: () => ctx.emit("approve", { part: toolPart, index }),
          onDeny: () => ctx.emit("deny", { part: toolPart, index }),
        });
      }
      if (part.type === "step-start") {
        return (
          custom(slots.stepStart, { part, index }) ??
          h("hr", {
            "data-scope": "ai",
            "data-part": "step-start",
          })
        );
      }
      if (part.type.startsWith("data-")) {
        return (
          custom(slots.data, { part: part as DataUIPart<UIDataTypes>, index }) ?? h(Fragment, [])
        );
      }
      if (part.type === "custom") {
        return custom(slots.custom, { part, index }) ?? h(Fragment, []);
      }
      return custom(slots.fallback, { part, index }) ?? h(Fragment, []);
    };

    return () =>
      custom(slots.default, { message: props.message }) ??
      h(Fragment, props.message.parts.map(renderPart));
  },
});
