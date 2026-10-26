import { defineFamily, type FamilyParts } from "../../internal/family";
import { Popover } from "../popover";
import PopconfirmComponent from "./Popconfirm.svelte";

/** A question at the point of no return: the trigger opens a small
 * anchored vessel carrying the message and two answers. */
export const Popconfirm = defineFamily(PopconfirmComponent, {
  ...Popover,
}) as typeof PopconfirmComponent & FamilyParts<typeof Popover>;

export type { PopconfirmProps } from "./props";
