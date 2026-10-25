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
import { For, type JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { Reasoning } from "../ai-reasoning";
import { Response } from "../ai-response";
import { AiSource as Source, AiSources as Sources } from "../ai-source";
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
  name: string;
  status: "pending" | "running" | "completed" | "error" | "denied";
  approval?: "required" | "approved" | "denied";
  input?: ToolValue;
  output?: ToolValue;
};

export interface AiPartsSlots<MESSAGE extends AiSdkMessage = AiSdkMessage> {
  default?: (props: { message: MESSAGE }) => JSX.Element;
  text?: (props: { part: AiSdkTextPart<MESSAGE>; index: number }) => JSX.Element;
  custom?: (props: { part: AiSdkCustomPart<MESSAGE>; index: number }) => JSX.Element;
  reasoning?: (props: { part: AiSdkReasoningPart<MESSAGE>; index: number }) => JSX.Element;
  reasoningFile?: (props: { part: AiSdkReasoningFilePart<MESSAGE>; index: number }) => JSX.Element;
  tool?: (props: { part: AiSdkToolPart<MESSAGE>; index: number }) => JSX.Element;
  sourceUrl?: (props: { part: AiSdkSourceUrlPart<MESSAGE>; index: number }) => JSX.Element;
  sourceDocument?: (props: {
    part: AiSdkSourceDocumentPart<MESSAGE>;
    index: number;
  }) => JSX.Element;
  file?: (props: { part: AiSdkFilePart<MESSAGE>; index: number }) => JSX.Element;
  data?: (props: { part: AiSdkDataPart<MESSAGE>; index: number }) => JSX.Element;
  stepStart?: (props: { part: AiSdkStepStartPart<MESSAGE>; index: number }) => JSX.Element;
  fallback?: (props: { part: AiSdkMessagePart<MESSAGE>; index: number }) => JSX.Element;
}

export interface AiPartsProps<MESSAGE extends AiSdkMessage = AiSdkMessage> {
  message: MESSAGE;
  highlighter?: (code: string, lang?: string) => string;
  slots?: AiPartsSlots<MESSAGE>;
  onApprove?: (event: { part: AiSdkToolPart<MESSAGE>; index: number }) => void;
  onDeny?: (event: { part: AiSdkToolPart<MESSAGE>; index: number }) => void;
}

export interface AiMediaProps<MESSAGE extends AiSdkMessage = AiSdkMessage> {
  part?: AiSdkMediaPart<MESSAGE>;
  mediaType?: string;
  url?: string;
  filename?: string;
  alt?: string;
}

const mediaKind = (mediaType: string): AiMediaKind => {
  const family = mediaType.split("/")[0];
  if (family === "image") return "image";
  if (family === "audio") return "audio";
  if (family === "video") return "video";
  return "file";
};

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

const fileLink = (part: AiSdkMediaPart) => (
  <a data-scope="ai" data-part="file-link" href={part.url} target="_blank" rel="noreferrer">
    {iconNode("file")}
    <span>{fileLabel(part)}</span>
  </a>
);

const slotContent = (content: JSX.Element | undefined): JSX.Element | null => content ?? null;

const isTextPart = <MESSAGE extends AiSdkMessage>(
  part: AiSdkMessagePart<MESSAGE>,
): part is AiSdkTextPart<MESSAGE> => part.type === "text";
const isCustomPart = <MESSAGE extends AiSdkMessage>(
  part: AiSdkMessagePart<MESSAGE>,
): part is AiSdkCustomPart<MESSAGE> => part.type === "custom";
const isReasoningPart = <MESSAGE extends AiSdkMessage>(
  part: AiSdkMessagePart<MESSAGE>,
): part is AiSdkReasoningPart<MESSAGE> => part.type === "reasoning";
const isReasoningFilePart = <MESSAGE extends AiSdkMessage>(
  part: AiSdkMessagePart<MESSAGE>,
): part is AiSdkReasoningFilePart<MESSAGE> => part.type === "reasoning-file";
const isFilePart = <MESSAGE extends AiSdkMessage>(
  part: AiSdkMessagePart<MESSAGE>,
): part is AiSdkFilePart<MESSAGE> => part.type === "file";
const isSourceUrlPart = <MESSAGE extends AiSdkMessage>(
  part: AiSdkMessagePart<MESSAGE>,
): part is AiSdkSourceUrlPart<MESSAGE> => part.type === "source-url";
const isSourceDocumentPart = <MESSAGE extends AiSdkMessage>(
  part: AiSdkMessagePart<MESSAGE>,
): part is AiSdkSourceDocumentPart<MESSAGE> => part.type === "source-document";
const isToolPart = <MESSAGE extends AiSdkMessage>(
  part: AiSdkMessagePart<MESSAGE>,
): part is AiSdkToolPart<MESSAGE> => part.type === "dynamic-tool" || part.type.startsWith("tool-");
const isDataPart = <MESSAGE extends AiSdkMessage>(
  part: AiSdkMessagePart<MESSAGE>,
): part is AiSdkDataPart<MESSAGE> => part.type.startsWith("data-");
const isStepStartPart = <MESSAGE extends AiSdkMessage>(
  part: AiSdkMessagePart<MESSAGE>,
): part is AiSdkStepStartPart<MESSAGE> => part.type === "step-start";

export const AiMedia = withSelfRoot(function AiMedia(props: AiMediaProps) {
  injectComponentStyle("ai");
  const shown: AiSdkMediaPart | null =
    props.part ??
    (props.mediaType && props.url
      ? {
          type: "file",
          mediaType: props.mediaType,
          url: props.url,
          ...(props.filename ? { filename: props.filename } : {}),
        }
      : null);
  if (!shown) return null;

  const kind = mediaKind(shown.mediaType);
  const label = fileLabel(shown);

  return (
    <figure data-scope="ai" data-part="media" data-kind={kind}>
      {kind === "image" ? (
        <img src={shown.url} alt={props.alt ?? (label === shown.mediaType ? "" : label)} />
      ) : kind === "audio" ? (
        <audio src={shown.url} controls />
      ) : kind === "video" ? (
        <video src={shown.url} controls />
      ) : (
        fileLink(shown)
      )}
    </figure>
  );
});

const source = (part: SourceUrlUIPart | SourceDocumentUIPart) =>
  "url" in part ? (
    <Sources>
      <Source href={part.url}>{part.title ?? part.url}</Source>
    </Sources>
  ) : (
    <Sources>
      <li data-scope="ai" data-part="document-source">
        <span>{part.title}</span>
        <span>{part.mediaType}</span>
      </li>
    </Sources>
  );

function AiPartsRenderer<MESSAGE extends AiSdkMessage>(props: AiPartsProps<MESSAGE>) {
  injectComponentStyle("ai");

  const renderPart = (part: AiSdkMessagePart<MESSAGE>, index: number): JSX.Element | null => {
    if (isTextPart(part)) {
      const custom = slotContent(props.slots?.text?.({ part, index }));
      if (custom) return custom;
      return part.text ? <Response content={part.text} highlighter={props.highlighter} /> : null;
    }
    if (isReasoningPart(part)) {
      const custom = slotContent(props.slots?.reasoning?.({ part, index }));
      if (custom) return custom;
      return <Reasoning defaultOpen={part.state === "streaming"}>{part.text}</Reasoning>;
    }
    if (isReasoningFilePart(part)) {
      return slotContent(props.slots?.reasoningFile?.({ part, index })) ?? <AiMedia part={part} />;
    }
    if (isFilePart(part)) {
      return slotContent(props.slots?.file?.({ part, index })) ?? <AiMedia part={part} />;
    }
    if (isSourceUrlPart(part)) {
      return slotContent(props.slots?.sourceUrl?.({ part, index })) ?? source(part);
    }
    if (isSourceDocumentPart(part)) {
      return slotContent(props.slots?.sourceDocument?.({ part, index })) ?? source(part);
    }
    if (isToolPart(part)) {
      const custom = slotContent(props.slots?.tool?.({ part, index }));
      if (custom) return custom;

      const display = toolPartDisplay(part);
      return (
        <Tool
          name={display.name}
          status={display.status}
          approval={display.approval}
          inputValue={display.input}
          outputValue={display.output}
          defaultOpen={display.status === "error" || display.approval === "required"}
          onApprove={() => props.onApprove?.({ part, index })}
          onDeny={() => props.onDeny?.({ part, index })}
        />
      );
    }
    if (isStepStartPart(part)) {
      return (
        slotContent(props.slots?.stepStart?.({ part, index })) ?? (
          <hr data-scope="ai" data-part="step-start" />
        )
      );
    }
    if (isDataPart(part)) return slotContent(props.slots?.data?.({ part, index }));
    if (isCustomPart(part)) return slotContent(props.slots?.custom?.({ part, index }));
    return slotContent(props.slots?.fallback?.({ part, index }));
  };

  const overriddenMessage = slotContent(props.slots?.default?.({ message: props.message }));
  if (overriddenMessage) return overriddenMessage;

  return <For each={props.message.parts}>{(part, index) => renderPart(part, index())}</For>;
}

export const AiParts = withSelfRoot(AiPartsRenderer);
