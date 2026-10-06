import { withSelfRoot } from "../../internal/family";
import AttachmentComponent from "./Attachment.svelte";
import AttachmentsComponent from "./Attachments.svelte";

export const Attachment = withSelfRoot(AttachmentComponent);
export const Attachments = withSelfRoot(AttachmentsComponent);

export type { AttachmentProps, AttachmentStatus, AttachmentsProps } from "./props";
export { Attachment as AiAttachment, Attachments as AiAttachments };
