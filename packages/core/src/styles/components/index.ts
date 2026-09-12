import { dialogCss } from "./dialog";

/** Component style registry — every component contributes its stylesheet
 * here, keyed by the name wrappers pass to `injectComponentStyle`. */
export const componentStyles: Record<string, string> = {
  dialog: dialogCss,
};

export { dialogCss };
