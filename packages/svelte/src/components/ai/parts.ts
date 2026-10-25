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
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

import type { ToolValue } from "../ai-tool";

export type AiSdkMessage = UIMessage<unknown, UIDataTypes, UITools>;
export type AiSdkMessageData<MESSAGE extends AiSdkMessage = AiSdkMessage> =
  MESSAGE extends UIMessage<unknown, infer DATA_TYPES, UITools> ? DATA_TYPES : UIDataTypes;
export type AiSdkMessageTools<MESSAGE extends AiSdkMessage = AiSdkMessage> =
  MESSAGE extends UIMessage<unknown, UIDataTypes, infer TOOLS> ? TOOLS : UITools;
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
export type AiSdkToolPart<MESSAGE extends AiSdkMessage = AiSdkMessage> =
  | ToolUIPart<AiSdkMessageTools<MESSAGE>>
  | DynamicToolUIPart;
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
  DataUIPart<AiSdkMessageData<MESSAGE>>
>;
export type AiSdkStepStartPart<MESSAGE extends AiSdkMessage = AiSdkMessage> = Extract<
  AiSdkMessagePart<MESSAGE>,
  StepStartUIPart
>;
export type AiSdkMediaPart<MESSAGE extends AiSdkMessage = AiSdkMessage> =
  | AiSdkFilePart<MESSAGE>
  | AiSdkReasoningFilePart<MESSAGE>;
export type AiMediaKind = "image" | "audio" | "video" | "file";

export type AiMediaProps<MESSAGE extends AiSdkMessage = AiSdkMessage> = Omit<
  HTMLAttributes<HTMLElement>,
  "part" | "mediaType" | "url" | "filename" | "alt"
> & {
  /** The AI SDK part. Supply this, or supply the direct props below. */
  part?: AiSdkMediaPart<MESSAGE>;
  mediaType?: string;
  url?: string;
  filename?: string;
  /** Accessible text for an image; the filename is the sensible default. */
  alt?: string;
};

export interface AiMediaComponent {
  <MESSAGE extends AiSdkMessage>(
    internals: import("svelte").ComponentInternals,
    props: AiMediaProps<MESSAGE>,
  ): Record<string, never>;
  element?: typeof HTMLElement;
}

export interface AiPartsProps<MESSAGE extends AiSdkMessage = AiSdkMessage> {
  /** The AI SDK message to render. */
  message: MESSAGE;
  /** Optional markdown highlighter passed to every text part. */
  highlighter?: (code: string, lang?: string) => string;
  /** Takes over the whole message renderer. */
  children?: Snippet<[MESSAGE]>;
  text?: Snippet<[AiSdkTextPart<MESSAGE>, number]>;
  custom?: Snippet<[AiSdkCustomPart<MESSAGE>, number]>;
  reasoning?: Snippet<[AiSdkReasoningPart<MESSAGE>, number]>;
  reasoningFile?: Snippet<[AiSdkReasoningFilePart<MESSAGE>, number]>;
  tool?: Snippet<[AiSdkToolPart<MESSAGE>, number]>;
  sourceUrl?: Snippet<[AiSdkSourceUrlPart<MESSAGE>, number]>;
  sourceDocument?: Snippet<[AiSdkSourceDocumentPart<MESSAGE>, number]>;
  file?: Snippet<[AiSdkFilePart<MESSAGE>, number]>;
  data?: Snippet<[AiSdkDataPart<MESSAGE>, number]>;
  stepStart?: Snippet<[AiSdkStepStartPart<MESSAGE>, number]>;
  fallback?: Snippet<[AiSdkMessagePart<MESSAGE>, number]>;
  /** The SDK request was approved. */
  onApprove?: (event: { part: AiSdkToolPart<MESSAGE>; index: number }) => void;
  /** The SDK request was denied. */
  onDeny?: (event: { part: AiSdkToolPart<MESSAGE>; index: number }) => void;
}

export interface AiPartsComponent {
  <MESSAGE extends AiSdkMessage>(
    internals: import("svelte").ComponentInternals,
    props: AiPartsProps<MESSAGE>,
  ): Record<string, never>;
  element?: typeof HTMLElement;
}

export type AiPartsSlots<MESSAGE extends AiSdkMessage = AiSdkMessage> = Pick<
  AiPartsProps<MESSAGE>,
  | "children"
  | "text"
  | "custom"
  | "reasoning"
  | "reasoningFile"
  | "tool"
  | "sourceUrl"
  | "sourceDocument"
  | "file"
  | "data"
  | "stepStart"
  | "fallback"
>;

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

/** Maps either SDK tool shape onto the one display contract used by the
 * shared tool fold, including approval and denied output states. */
export function toolPartDisplay<MESSAGE extends AiSdkMessage = AiSdkMessage>(
  part: AiSdkToolPart<MESSAGE>,
): AiToolDisplay {
  const name = "toolName" in part ? part.toolName : part.type.slice("tool-".length);
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
