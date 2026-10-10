/** Runtime style loaders for each component family. The wrappers import
 * this entry instead of the full registry, so a client bundle pays only
 * for the styles its mounted components actually request. Build-time
 * integrations keep reading the complete `componentStyles` registry. */
const styleLoaders = {
  accordion: () => import("./styles/components/accordion").then((m) => m.accordionCss),
  ai: () => import("./styles/components/ai").then((m) => m.aiCss),
  alert: () => import("./styles/components/alert").then((m) => m.alertCss),
  "angle-slider": () => import("./styles/components/angle-slider").then((m) => m.angleSliderCss),
  avatar: () => import("./styles/components/avatar").then((m) => m.avatarCss),
  "avatar-group": () => import("./styles/components/avatar-group").then((m) => m.avatarGroupCss),
  badge: () => import("./styles/components/badge").then((m) => m.badgeCss),
  banner: () => import("./styles/components/banner").then((m) => m.bannerCss),
  breadcrumb: () => import("./styles/components/breadcrumb").then((m) => m.breadcrumbCss),
  button: () => import("./styles/components/button").then((m) => m.buttonCss),
  calendar: () => import("./styles/components/calendar").then((m) => m.calendarCss),
  "cascade-select": () =>
    import("./styles/components/cascade-select").then((m) => m.cascadeSelectCss),
  card: () => import("./styles/components/card").then((m) => m.cardCss),
  carousel: () => import("./styles/components/carousel").then((m) => m.carouselCss),
  checkbox: () => import("./styles/components/checkbox").then((m) => m.checkboxCss),
  "checkbox-group": () =>
    import("./styles/components/checkbox-group").then((m) => m.checkboxGroupCss),
  chip: () => import("./styles/components/chip").then((m) => m.chipCss),
  clipboard: () => import("./styles/components/clipboard").then((m) => m.clipboardCss),
  collapsible: () => import("./styles/components/collapsible").then((m) => m.collapsibleCss),
  "color-picker": () => import("./styles/components/color-picker").then((m) => m.colorPickerCss),
  combobox: () => import("./styles/components/combobox").then((m) => m.comboboxCss),
  "date-input": () => import("./styles/components/date-input").then((m) => m.dateInputCss),
  "date-picker": () => import("./styles/components/date-picker").then((m) => m.datePickerCss),
  descriptions: () => import("./styles/components/descriptions").then((m) => m.descriptionsCss),
  dialog: () => import("./styles/components/dialog").then((m) => m.dialogCss),
  drawer: () => import("./styles/components/drawer").then((m) => m.drawerCss),
  editable: () => import("./styles/components/editable").then((m) => m.editableCss),
  empty: () => import("./styles/components/empty").then((m) => m.emptyCss),
  field: () => import("./styles/components/field").then((m) => m.fieldCss),
  fieldset: () => import("./styles/components/fieldset").then((m) => m.fieldsetCss),
  "file-upload": () => import("./styles/components/file-upload").then((m) => m.fileUploadCss),
  "floating-panel": () =>
    import("./styles/components/floating-panel").then((m) => m.floatingPanelCss),
  form: () => import("./styles/components/form").then((m) => m.formCss),
  highlight: () => import("./styles/components/highlight").then((m) => m.highlightCss),
  "hover-card": () => import("./styles/components/hover-card").then((m) => m.hoverCardCss),
  "image-cropper": () => import("./styles/components/image-cropper").then((m) => m.imageCropperCss),
  input: () =>
    import("./styles/components/field").then((m) =>
      m.fieldControlCss
        .replaceAll('data-scope="field"', 'data-scope="input"')
        .replaceAll('data-part="input"', 'data-part="root"'),
    ),
  "json-tree-view": () =>
    import("./styles/components/json-tree-view").then((m) => m.jsonTreeViewCss),
  kbd: () => import("./styles/components/kbd").then((m) => m.kbdCss),
  link: () => import("./styles/components/link").then((m) => m.linkCss),
  listbox: () => import("./styles/components/listbox").then((m) => m.listboxCss),
  marquee: () => import("./styles/components/marquee").then((m) => m.marqueeCss),
  "media-player": () => import("./styles/components/media-player").then((m) => m.mediaPlayerCss),
  menu: () => import("./styles/components/menu").then((m) => m.menuCss),
  meter: () => import("./styles/components/meter").then((m) => m.meterCss),
  "navigation-menu": () =>
    import("./styles/components/navigation-menu").then((m) => m.navigationMenuCss),
  "order-list": () => import("./styles/components/order-list").then((m) => m.orderListCss),
  "number-input": () => import("./styles/components/number-input").then((m) => m.numberInputCss),
  "page-header": () => import("./styles/components/page-header").then((m) => m.pageHeaderCss),
  pagination: () => import("./styles/components/pagination").then((m) => m.paginationCss),
  "password-input": () =>
    import("./styles/components/password-input").then((m) => m.passwordInputCss),
  "pin-input": () => import("./styles/components/pin-input").then((m) => m.pinInputCss),
  popconfirm: () => import("./styles/components/popconfirm").then((m) => m.popconfirmCss),
  popover: () => import("./styles/components/popover").then((m) => m.popoverCss),
  progress: () => import("./styles/components/progress").then((m) => m.progressCss),
  result: () => import("./styles/components/result").then((m) => m.resultCss),
  "qr-code": () => import("./styles/components/qr-code").then((m) => m.qrCodeCss),
  "radio-group": () => import("./styles/components/radio-group").then((m) => m.radioGroupCss),
  "rating-group": () => import("./styles/components/rating-group").then((m) => m.ratingGroupCss),
  "scroll-area": () => import("./styles/components/scroll-area").then((m) => m.scrollAreaCss),
  "segment-group": () => import("./styles/components/segment-group").then((m) => m.segmentGroupCss),
  select: () => import("./styles/components/select").then((m) => m.selectCss),
  separator: () => import("./styles/components/separator").then((m) => m.separatorCss),
  "signature-pad": () => import("./styles/components/signature-pad").then((m) => m.signaturePadCss),
  skeleton: () => import("./styles/components/skeleton").then((m) => m.skeletonCss),
  spinner: () => import("./styles/components/spinner").then((m) => m.spinnerCss),
  stat: () => import("./styles/components/stat").then((m) => m.statCss),
  slider: () => import("./styles/components/slider").then((m) => m.sliderCss),
  splitter: () => import("./styles/components/splitter").then((m) => m.splitterCss),
  steps: () => import("./styles/components/steps").then((m) => m.stepsCss),
  swap: () => import("./styles/components/swap").then((m) => m.swapCss),
  switch: () => import("./styles/components/switch").then((m) => m.switchCss),
  tabs: () => import("./styles/components/tabs").then((m) => m.tabsCss),
  terminal: () => import("./styles/components/terminal").then((m) => m.terminalCss),
  "tags-input": () => import("./styles/components/tags-input").then((m) => m.tagsInputCss),
  textarea: () =>
    import("./styles/components/field").then((m) =>
      m.fieldControlCss
        .replaceAll('data-scope="field"', 'data-scope="textarea"')
        .replaceAll('data-part="textarea"', 'data-part="root"'),
    ),
  timeline: () => import("./styles/components/timeline").then((m) => m.timelineCss),
  timer: () => import("./styles/components/timer").then((m) => m.timerCss),
  table: () => import("./styles/components/table").then((m) => m.tableCss),
  toast: () => import("./styles/components/toast").then((m) => m.toastCss),
  toolbar: () => import("./styles/components/toolbar").then((m) => m.toolbarCss),
  toc: () => import("./styles/components/toc").then((m) => m.tocCss),
  toggle: () => import("./styles/components/toggle").then((m) => m.toggleCss),
  "toggle-group": () => import("./styles/components/toggle-group").then((m) => m.toggleGroupCss),
  transfer: () => import("./styles/components/transfer").then((m) => m.transferCss),
  tooltip: () => import("./styles/components/tooltip").then((m) => m.tooltipCss),
  tour: () => import("./styles/components/tour").then((m) => m.tourCss),
  "tree-select": () => import("./styles/components/tree-select").then((m) => m.treeSelectCss),
  "tree-view": () => import("./styles/components/tree-view").then((m) => m.treeViewCss),
  typography: () => import("./styles/components/typography").then((m) => m.typographyCss),
  user: () => import("./styles/components/user").then((m) => m.userCss),
  container: () => import("./styles/components/container").then((m) => m.containerCss),
  "data-view": () => import("./styles/components/data-view").then((m) => m.dataViewCss),
  "deferred-content": () =>
    import("./styles/components/deferred-content").then((m) => m.deferredContentCss),
  stack: () => import("./styles/components/stack").then((m) => m.stackCss),
  grid: () => import("./styles/components/grid").then((m) => m.gridCss),
  "aspect-ratio": () => import("./styles/components/aspect-ratio").then((m) => m.aspectRatioCss),
  masonry: () => import("./styles/components/masonry").then((m) => m.masonryCss),
  icon: () => import("./styles/components/icon").then((m) => m.iconCss),
  ellipsis: () => import("./styles/components/ellipsis").then((m) => m.ellipsisCss),
  image: () => import("./styles/components/image").then((m) => m.imageCss),
  "image-viewer": () => import("./styles/components/image-viewer").then((m) => m.imageViewerCss),
  list: () => import("./styles/components/list").then((m) => m.listCss),
  comment: () => import("./styles/components/comment").then((m) => m.commentCss),
  "virtual-list": () => import("./styles/components/virtual-list").then((m) => m.virtualListCss),
  watermark: () => import("./styles/components/watermark").then((m) => m.watermarkCss),
  "progress-group": () =>
    import("./styles/components/progress-group").then((m) => m.progressGroupCss),
  "back-top": () => import("./styles/components/back-top").then((m) => m.backTopCss),
  affix: () => import("./styles/components/affix").then((m) => m.affixCss),
  command: () => import("./styles/components/command").then((m) => m.commandCss),
  mentions: () => import("./styles/components/mentions").then((m) => m.mentionsCss),
  menubar: () => import("./styles/components/menubar").then((m) => m.menubarCss),
  "input-group": () => import("./styles/components/input-group").then((m) => m.inputGroupCss),
  "dynamic-input": () => import("./styles/components/dynamic-input").then((m) => m.dynamicInputCss),
  "button-group": () => import("./styles/components/button-group").then((m) => m.buttonGroupCss),
  "split-button": () => import("./styles/components/split-button").then((m) => m.splitButtonCss),
  "float-button": () => import("./styles/components/float-button").then((m) => m.floatButtonCss),
  layout: () => import("./styles/components/layout").then((m) => m.layoutCss),
  workflow: () => import("./styles/components/workflow").then((m) => m.workflowCss),
  spotlight: () => import("./styles/components/spotlight").then((m) => m.spotlightCss),
  dock: () => import("./styles/components/dock").then((m) => m.dockCss),
  browser: () => import("./styles/components/browser").then((m) => m.browserCss),
  bento: () => import("./styles/components/bento").then((m) => m.bentoCss),
  "block-ui": () => import("./styles/components/block-ui").then((m) => m.blockUiCss),
} as const;

let shippedStyles: boolean | undefined;
let injectedTokens = false;
let tokensPromise: Promise<void> | undefined;
const injectedComponents = new Set<string>();

/** True once an SSR integration has delivered the whole style layer. The
 * answer is cached so mounted wrappers do not repeatedly scan the head. */
export function stylesShipped(): boolean {
  if (shippedStyles === undefined) {
    shippedStyles =
      typeof document !== "undefined" && !!document.querySelector("meta[name='bs-styles-shipped']");
  }
  return shippedStyles;
}

/** Load and inject the token, base and ripple layers once. SSR is a no-op;
 * pass the complete `tokensCss` registry to the server head instead. */
export function injectTokens(): Promise<void> {
  if (injectedTokens || stylesShipped() || typeof document === "undefined")
    return Promise.resolve();
  tokensPromise ??= Promise.all([import("@bysages/tokens/styles"), import("./styles/base")]).then(
    ([tokens, base]) => {
      appendStyle("tokens", tokens.default + base.baseCss + base.inkRippleCss);
      injectedTokens = true;
    },
  );
  return tokensPromise;
}

/** Inject one component stylesheet plus its token ancestry. Idempotent per
 * family; wrappers fire and forget because a late style insert is still
 * ordered before the next paint. */
export function injectComponentStyle(key: string): void {
  if (injectedComponents.has(key) || stylesShipped() || typeof document === "undefined") return;

  const loader = styleLoaders[key as keyof typeof styleLoaders];
  if (!loader) return;

  void Promise.all([injectTokens(), loader()])
    .then(([, css]) => {
      if (!injectedComponents.has(key)) {
        appendStyle(key, css);
        injectedComponents.add(key);
      }
    })
    .catch(() => {
      // Late style chunks cannot recover a missing network response; leaving
      // the rejection unhandled would only turn a visual fallback into a
      // runtime crash after test/server teardown.
    });
}

function appendStyle(key: string, css: string): void {
  const style = document.createElement("style");
  style.dataset.bsStyles = key;
  style.textContent = css;
  document.head.append(style);
}
