import { dateInputCss } from "./date-input";
import { datePickerCss } from "./date-picker";
import { dialogCss } from "./dialog";
import { timerCss } from "./timer";
import { tourCss } from "./tour";
import { treeViewCss } from "./tree-view";

/** Component style registry — every component contributes its stylesheet
 * here, keyed by the name wrappers pass to `injectComponentStyle`. */
export const componentStyles: Record<string, string> = {
  "date-input": dateInputCss,
  "date-picker": datePickerCss,
  dialog: dialogCss,
  timer: timerCss,
  tour: tourCss,
  "tree-view": treeViewCss,
};

export { dateInputCss, datePickerCss, dialogCss, timerCss, tourCss, treeViewCss };
