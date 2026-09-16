import { accordionCss } from "./accordion";
import { aiCss } from "./ai";
import { alertCss } from "./alert";
import { angleSliderCss } from "./angle-slider";
import { avatarCss } from "./avatar";
import { avatarGroupCss } from "./avatar-group";
import { badgeCss } from "./badge";
import { bannerCss } from "./banner";
import { breadcrumbCss } from "./breadcrumb";
import { buttonCss } from "./button";
import { calendarCss } from "./calendar";
import { cardCss } from "./card";
import { carouselCss } from "./carousel";
import { checkboxCss } from "./checkbox";
import { checkboxGroupCss } from "./checkbox-group";
import { chipCss } from "./chip";
import { clipboardCss } from "./clipboard";
import { collapsibleCss } from "./collapsible";
import { colorPickerCss } from "./color-picker";
import { comboboxCss } from "./combobox";
import { dateInputCss } from "./date-input";
import { datePickerCss } from "./date-picker";
import { descriptionsCss } from "./descriptions";
import { dialogCss } from "./dialog";
import { drawerCss } from "./drawer";
import { editableCss } from "./editable";
import { emptyCss } from "./empty";
import { fieldCss } from "./field";
import { fieldsetCss } from "./fieldset";
import { fileUploadCss } from "./file-upload";
import { floatingPanelCss } from "./floating-panel";
import { formCss } from "./form";
import { highlightCss } from "./highlight";
import { hoverCardCss } from "./hover-card";
import { imageCropperCss } from "./image-cropper";
import { inputCss } from "./input";
import { jsonTreeViewCss } from "./json-tree-view";
import { kbdCss } from "./kbd";
import { linkCss } from "./link";
import { listboxCss } from "./listbox";
import { marqueeCss } from "./marquee";
import { menuCss } from "./menu";
import { meterCss } from "./meter";
import { navigationMenuCss } from "./navigation-menu";
import { numberInputCss } from "./number-input";
import { pageHeaderCss } from "./page-header";
import { paginationCss } from "./pagination";
import { passwordInputCss } from "./password-input";
import { pinInputCss } from "./pin-input";
import { popconfirmCss } from "./popconfirm";
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
import { spinnerCss } from "./spinner";
import { splitterCss } from "./splitter";
import { statCss } from "./stat";
import { stepsCss } from "./steps";
import { swapCss } from "./swap";
import { switchCss } from "./switch";
import { tableCss } from "./table";
import { tabsCss } from "./tabs";
import { tagsInputCss } from "./tags-input";
import { textareaCss } from "./textarea";
import { timelineCss } from "./timeline";
import { timerCss } from "./timer";
import { toastCss } from "./toast";
import { tocCss } from "./toc";
import { toggleCss } from "./toggle";
import { toggleGroupCss } from "./toggle-group";
import { tooltipCss } from "./tooltip";
import { tourCss } from "./tour";
import { transferCss } from "./transfer";
import { treeSelectCss } from "./tree-select";
import { treeViewCss } from "./tree-view";
import { typographyCss } from "./typography";

/** Component style registry — every component contributes its stylesheet
 * here, keyed by the name wrappers pass to `injectComponentStyle`. */
export const componentStyles: Record<string, string> = {
  accordion: accordionCss,
  ai: aiCss,
  alert: alertCss,
  "angle-slider": angleSliderCss,
  avatar: avatarCss,
  "avatar-group": avatarGroupCss,
  badge: badgeCss,
  banner: bannerCss,
  breadcrumb: breadcrumbCss,
  button: buttonCss,
  // The calendar is the date-picker's grid standing alone: same parts,
  // its own data-scope — re-scope the shared stylesheet, never copy it.
  calendar:
    calendarCss + datePickerCss.replaceAll('data-scope="date-picker"', 'data-scope="calendar"'),
  card: cardCss,
  carousel: carouselCss,
  checkbox: checkboxCss,
  "checkbox-group": checkboxGroupCss,
  chip: chipCss,
  clipboard: clipboardCss,
  collapsible: collapsibleCss,
  "color-picker": colorPickerCss,
  combobox: comboboxCss,
  "date-input": dateInputCss,
  "date-picker": datePickerCss,
  descriptions: descriptionsCss,
  dialog: dialogCss,
  drawer: drawerCss,
  editable: editableCss,
  empty: emptyCss,
  field: fieldCss,
  fieldset: fieldsetCss,
  "file-upload": fileUploadCss,
  "floating-panel": floatingPanelCss,
  form: formCss,
  highlight: highlightCss,
  "hover-card": hoverCardCss,
  "image-cropper": imageCropperCss,
  input: inputCss,
  "json-tree-view": jsonTreeViewCss,
  kbd: kbdCss,
  link: linkCss,
  listbox: listboxCss,
  marquee: marqueeCss,
  menu: menuCss,
  meter: meterCss,
  typography: typographyCss,
  "navigation-menu": navigationMenuCss,
  "number-input": numberInputCss,
  "page-header": pageHeaderCss,
  pagination: paginationCss,
  "password-input": passwordInputCss,
  "pin-input": pinInputCss,
  popconfirm: popconfirmCss,
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
  spinner: spinnerCss,
  stat: statCss,
  slider: sliderCss,
  splitter: splitterCss,
  steps: stepsCss,
  swap: swapCss,
  switch: switchCss,
  tabs: tabsCss,
  "tags-input": tagsInputCss,
  textarea: textareaCss,
  timeline: timelineCss,
  timer: timerCss,
  table: tableCss,
  toast: toastCss,
  toc: tocCss,
  toggle: toggleCss,
  "toggle-group": toggleGroupCss,
  transfer: transferCss,
  tooltip: tooltipCss,
  tour: tourCss,
  "tree-select": treeSelectCss,
  "tree-view": treeViewCss,
};

export {
  accordionCss,
  aiCss,
  alertCss,
  angleSliderCss,
  avatarCss,
  avatarGroupCss,
  badgeCss,
  breadcrumbCss,
  buttonCss,
  calendarCss,
  cardCss,
  carouselCss,
  checkboxCss,
  checkboxGroupCss,
  chipCss,
  clipboardCss,
  collapsibleCss,
  colorPickerCss,
  comboboxCss,
  dateInputCss,
  datePickerCss,
  descriptionsCss,
  dialogCss,
  drawerCss,
  editableCss,
  emptyCss,
  fieldCss,
  fieldsetCss,
  fileUploadCss,
  floatingPanelCss,
  formCss,
  highlightCss,
  hoverCardCss,
  imageCropperCss,
  inputCss,
  jsonTreeViewCss,
  kbdCss,
  linkCss,
  listboxCss,
  marqueeCss,
  menuCss,
  meterCss,
  typographyCss,
  navigationMenuCss,
  numberInputCss,
  paginationCss,
  passwordInputCss,
  pinInputCss,
  popconfirmCss,
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
  textareaCss,
  timelineCss,
  timerCss,
  toastCss,
  tocCss,
  toggleCss,
  toggleGroupCss,
  transferCss,
  tooltipCss,
  tourCss,
  treeSelectCss,
  treeViewCss,
};
