import { injectComponentStyle } from "@bysages/core";

import AttachmentComponent from "./Attachment.svelte";
import AttachmentsComponent from "./Attachments.svelte";

export const Attachment = AttachmentComponent;
export const Attachments = AttachmentsComponent;

export type { AttachmentProps, AttachmentStatus, AttachmentsProps } from "./props";

injectComponentStyle("ai");

export { Attachment as AiAttachment, Attachments as AiAttachments };
