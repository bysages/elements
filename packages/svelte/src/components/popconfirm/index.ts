import { injectComponentStyle } from "@bysages/core";

import PopconfirmComponent from "./Popconfirm.svelte";

/** A question at the point of no return: the trigger opens a small
 * anchored vessel carrying the message and two answers. */
export const Popconfirm = PopconfirmComponent;

export type { PopconfirmProps } from "./props";

injectComponentStyle("popconfirm");
