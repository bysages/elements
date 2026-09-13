import { accordionCss } from "./accordion";
import { alertCss } from "./alert";
import { angleSliderCss } from "./angle-slider";
import { avatarCss } from "./avatar";
import { avatarGroupCss } from "./avatar-group";
import { badgeCss } from "./badge";
import { breadcrumbCss } from "./breadcrumb";
import { buttonCss } from "./button";
import { cardCss } from "./card";
import { carouselCss } from "./carousel";
import { checkboxCss } from "./checkbox";
import { chipCss } from "./chip";
import { clipboardCss } from "./clipboard";
import { collapsibleCss } from "./collapsible";
import { colorPickerCss } from "./color-picker";
import { comboboxCss } from "./combobox";
import { dateInputCss } from "./date-input";
import { datePickerCss } from "./date-picker";
import { dialogCss } from "./dialog";
import { drawerCss } from "./drawer";
import { editableCss } from "./editable";
import { emptyCss } from "./empty";
import { fieldCss } from "./field";
import { fieldsetCss } from "./fieldset";
import { fileUploadCss } from "./file-upload";
import { floatingPanelCss } from "./floating-panel";
import { highlightCss } from "./highlight";
import { hoverCardCss } from "./hover-card";
import { imageCropperCss } from "./image-cropper";
import { jsonTreeViewCss } from "./json-tree-view";
import { kbdCss } from "./kbd";
import { listboxCss } from "./listbox";
import { marqueeCss } from "./marquee";
import { menuCss } from "./menu";
import { navigationMenuCss } from "./navigation-menu";
import { numberInputCss } from "./number-input";
import { paginationCss } from "./pagination";
import { passwordInputCss } from "./password-input";
import { pinInputCss } from "./pin-input";
import { popoverCss } from "./popover";
import { progressCss } from "./progress";
import { qrCodeCss } from "./qr-code";
import { radioGroupCss } from "./radio-group";
import { ratingGroupCss } from "./rating-group";
import { scrollAreaCss } from "./scroll-area";
import { segmentGroupCss } from "./segment-group";
import { selectCss } from "./select";
import { separatorCss } from "./separator";
import { signaturePadCss } from "./signature-pad";
import { skeletonCss } from "./skeleton";
import { sliderCss } from "./slider";
import { splitterCss } from "./splitter";
import { stepsCss } from "./steps";
import { swapCss } from "./swap";
import { switchCss } from "./switch";
import { tableCss } from "./table";
import { tabsCss } from "./tabs";
import { tagsInputCss } from "./tags-input";
import { timelineCss } from "./timeline";
import { timerCss } from "./timer";
import { toastCss } from "./toast";
import { tocCss } from "./toc";
import { toggleCss } from "./toggle";
import { toggleGroupCss } from "./toggle-group";
import { tooltipCss } from "./tooltip";
import { tourCss } from "./tour";
import { treeViewCss } from "./tree-view";

/** Component style registry — every component contributes its stylesheet
 * here, keyed by the name wrappers pass to `injectComponentStyle`. */
export const componentStyles: Record<string, string> = {
  accordion: accordionCss,
  alert: alertCss,
  "angle-slider": angleSliderCss,
  avatar: avatarCss,
  "avatar-group": avatarGroupCss,
  badge: badgeCss,
  breadcrumb: breadcrumbCss,
  button: buttonCss,
  card: cardCss,
  carousel: carouselCss,
  checkbox: checkboxCss,
  chip: chipCss,
  clipboard: clipboardCss,
  collapsible: collapsibleCss,
  "color-picker": colorPickerCss,
  combobox: comboboxCss,
  "date-input": dateInputCss,
  "date-picker": datePickerCss,
  dialog: dialogCss,
  drawer: drawerCss,
  editable: editableCss,
  empty: emptyCss,
  field: fieldCss,
  fieldset: fieldsetCss,
  "file-upload": fileUploadCss,
  "floating-panel": floatingPanelCss,
  highlight: highlightCss,
  "hover-card": hoverCardCss,
  "image-cropper": imageCropperCss,
  "json-tree-view": jsonTreeViewCss,
  kbd: kbdCss,
  listbox: listboxCss,
  marquee: marqueeCss,
  menu: menuCss,
  "navigation-menu": navigationMenuCss,
  "number-input": numberInputCss,
  pagination: paginationCss,
  "password-input": passwordInputCss,
  "pin-input": pinInputCss,
  popover: popoverCss,
  progress: progressCss,
  "qr-code": qrCodeCss,
  "radio-group": radioGroupCss,
  "rating-group": ratingGroupCss,
  "scroll-area": scrollAreaCss,
  "segment-group": segmentGroupCss,
  select: selectCss,
  separator: separatorCss,
  "signature-pad": signaturePadCss,
  skeleton: skeletonCss,
  slider: sliderCss,
  splitter: splitterCss,
  steps: stepsCss,
  swap: swapCss,
  switch: switchCss,
  tabs: tabsCss,
  "tags-input": tagsInputCss,
  timeline: timelineCss,
  timer: timerCss,
  table: tableCss,
  toast: toastCss,
  toc: tocCss,
  toggle: toggleCss,
  "toggle-group": toggleGroupCss,
  tooltip: tooltipCss,
  tour: tourCss,
  "tree-view": treeViewCss,
};

export {
  accordionCss,
  alertCss,
  angleSliderCss,
  avatarCss,
  avatarGroupCss,
  badgeCss,
  breadcrumbCss,
  buttonCss,
  cardCss,
  carouselCss,
  checkboxCss,
  chipCss,
  clipboardCss,
  collapsibleCss,
  colorPickerCss,
  comboboxCss,
  dateInputCss,
  datePickerCss,
  dialogCss,
  drawerCss,
  editableCss,
  emptyCss,
  fieldCss,
  fieldsetCss,
  fileUploadCss,
  floatingPanelCss,
  highlightCss,
  hoverCardCss,
  imageCropperCss,
  jsonTreeViewCss,
  kbdCss,
  listboxCss,
  marqueeCss,
  menuCss,
  navigationMenuCss,
  numberInputCss,
  paginationCss,
  passwordInputCss,
  pinInputCss,
  popoverCss,
  progressCss,
  qrCodeCss,
  radioGroupCss,
  ratingGroupCss,
  scrollAreaCss,
  segmentGroupCss,
  selectCss,
  separatorCss,
  signaturePadCss,
  skeletonCss,
  sliderCss,
  splitterCss,
  stepsCss,
  swapCss,
  switchCss,
  tabsCss,
  tagsInputCss,
  timelineCss,
  timerCss,
  toastCss,
  tocCss,
  toggleCss,
  toggleGroupCss,
  tooltipCss,
  tourCss,
  treeViewCss,
};
