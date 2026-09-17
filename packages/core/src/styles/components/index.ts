import { accordionCss } from "./accordion";
import { affixCss } from "./affix";
import { aiCss } from "./ai";
import { alertCss } from "./alert";
import { angleSliderCss } from "./angle-slider";
import { aspectRatioCss } from "./aspect-ratio";
import { avatarCss } from "./avatar";
import { avatarGroupCss } from "./avatar-group";
import { backTopCss } from "./back-top";
import { badgeCss } from "./badge";
import { bannerCss } from "./banner";
import { breadcrumbCss } from "./breadcrumb";
import { buttonCss } from "./button";
import { buttonGroupCss } from "./button-group";
import { calendarCss } from "./calendar";
import { cardCss } from "./card";
import { carouselCss } from "./carousel";
import { cascadeSelectCss } from "./cascade-select";
import { checkboxCss } from "./checkbox";
import { checkboxGroupCss } from "./checkbox-group";
import { chipCss } from "./chip";
import { clipboardCss } from "./clipboard";
import { collapsibleCss } from "./collapsible";
import { colorPickerCss } from "./color-picker";
import { comboboxCss } from "./combobox";
import { commandCss } from "./command";
import { commentCss } from "./comment";
import { containerCss } from "./container";
import { dateInputCss } from "./date-input";
import { datePickerCss } from "./date-picker";
import { descriptionsCss } from "./descriptions";
import { dialogCss } from "./dialog";
import { drawerCss } from "./drawer";
import { dynamicInputCss } from "./dynamic-input";
import { editableCss } from "./editable";
import { ellipsisCss } from "./ellipsis";
import { emptyCss } from "./empty";
import { fieldControlCss, fieldCss } from "./field";
import { fieldsetCss } from "./fieldset";
import { fileUploadCss } from "./file-upload";
import { floatButtonCss } from "./float-button";
import { floatingPanelCss } from "./floating-panel";
import { formCss } from "./form";
import { gridCss } from "./grid";
import { highlightCss } from "./highlight";
import { hoverCardCss } from "./hover-card";
import { iconCss } from "./icon";
import { imageCss } from "./image";
import { imageCropperCss } from "./image-cropper";
import { imageViewerCss } from "./image-viewer";
import { inputGroupCss } from "./input-group";
import { jsonTreeViewCss } from "./json-tree-view";
import { kbdCss } from "./kbd";
import { layoutCss } from "./layout";
import { linkCss } from "./link";
import { listCss } from "./list";
import { listboxCss } from "./listbox";
import { marqueeCss } from "./marquee";
import { masonryCss } from "./masonry";
import { mentionsCss } from "./mentions";
import { menuCss } from "./menu";
import { menubarCss } from "./menubar";
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
import { progressGroupCss } from "./progress-group";
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
import { splitButtonCss } from "./split-button";
import { splitterCss } from "./splitter";
import { stackCss } from "./stack";
import { statCss } from "./stat";
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
import { transferCss } from "./transfer";
import { treeSelectCss } from "./tree-select";
import { treeViewCss } from "./tree-view";
import { typographyCss } from "./typography";
import { watermarkCss } from "./watermark";

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
  "cascade-select": cascadeSelectCss,
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
  // The bare Input and Textarea are the field's control recipe standing
  // alone: same stylesheet, their own data-scope and root part — re-scope
  // it, never copy.
  input: fieldControlCss
    .replaceAll('data-scope="field"', 'data-scope="input"')
    .replaceAll('data-part="input"', 'data-part="root"'),
  "json-tree-view": jsonTreeViewCss,
  kbd: kbdCss,
  link: linkCss,
  listbox: listboxCss,
  marquee: marqueeCss,
  menu: menuCss,
  meter: meterCss,
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
  textarea: fieldControlCss
    .replaceAll('data-scope="field"', 'data-scope="textarea"')
    .replaceAll('data-part="textarea"', 'data-part="root"'),
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
  typography: typographyCss,
  container: containerCss,
  stack: stackCss,
  grid: gridCss,
  "aspect-ratio": aspectRatioCss,
  masonry: masonryCss,
  icon: iconCss,
  ellipsis: ellipsisCss,
  image: imageCss,
  "image-viewer": imageViewerCss,
  list: listCss,
  comment: commentCss,
  watermark: watermarkCss,
  "progress-group": progressGroupCss,
  "back-top": backTopCss,
  affix: affixCss,
  command: commandCss,
  mentions: mentionsCss,
  menubar: menubarCss,
  "input-group": inputGroupCss,
  "dynamic-input": dynamicInputCss,
  "button-group": buttonGroupCss,
  "split-button": splitButtonCss,
  "float-button": floatButtonCss,
  layout: layoutCss,
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
  cascadeSelectCss,
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
