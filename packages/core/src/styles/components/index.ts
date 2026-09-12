import { dateInputCss } from "./date-input";
import { datePickerCss } from "./date-picker";
import { dialogCss } from "./dialog";
import { timerCss } from "./timer";

/** Component style registry — every component contributes its stylesheet
 * here, keyed by the name wrappers pass to `injectComponentStyle`. */
export const componentStyles: Record<string, string> = {
  "date-input": dateInputCss,
  "date-picker": datePickerCss,
  dialog: dialogCss,
  timer: timerCss,
};

export { dateInputCss, datePickerCss, dialogCss, timerCss };
