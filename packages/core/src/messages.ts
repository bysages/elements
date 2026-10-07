/**
 * Shared, framework-agnostic copy for wrapper-owned controls. Keeping the
 * complete strings in core gives every binding the same accessible fallback
 * while leaving consumers free to override a single leaf.
 *
 * @module
 */

export type ComponentMessages = {
  ai: {
    conversation: string;
    loading: string;
    send: string;
    stop: string;
    copyCode: string;
    copied: string;
    removeAttachment: string;
  };
  banner: { dismiss: string };
  breadcrumb: { label: string };
  pagination: { previous: string; next: string };
  select: { filter: string };
  table: {
    empty: string;
    selectRow: string;
    selectAllRows: string;
    expandRow: string;
    collapseRow: string;
    rowsCount: string;
    perPage: string;
    rowsPerPage: string;
    filterColumn: string;
    filterAll: string;
  };
  command: { palette: string; search: string; filter: string; noMatches: string };
  spinner: { loading: string };
  floatButton: { actions: string };
  imageViewer: { preview: string; zoomIn: string; zoomOut: string; rotate: string; close: string };
  transfer: { filter: string; moveRight: string; moveLeft: string };
  orderList: { toTop: string; moveUp: string; moveDown: string; toBottom: string };
  dynamicEntry: { remove: string };
  terminal: { commandLine: string };
  sidebar: { resize: string };
  more: { actions: string };
};

/** Every leaf is independently replaceable; unresolved branches fall through
 * to the locale default instead of forcing consumers to copy a whole tree. */
export type ComponentMessagesOverride = {
  [Group in keyof ComponentMessages]?: {
    [Message in keyof ComponentMessages[Group]]?: string;
  };
};

const ENGLISH_MESSAGES: ComponentMessages = {
  ai: {
    conversation: "Conversation",
    loading: "Loading",
    send: "Send",
    stop: "Stop",
    copyCode: "Copy code",
    copied: "Copied",
    removeAttachment: "Remove {name}",
  },
  banner: { dismiss: "Dismiss" },
  breadcrumb: { label: "Breadcrumb" },
  pagination: { previous: "Previous page", next: "Next page" },
  select: { filter: "Filter options" },
  table: {
    empty: "No rows",
    selectRow: "Select row",
    selectAllRows: "Select all rows",
    expandRow: "Expand row",
    collapseRow: "Collapse row",
    rowsCount: "{count} rows",
    perPage: "{size} / page",
    rowsPerPage: "Rows per page",
    filterColumn: "Filter {name}",
    filterAll: "Filter all columns",
  },
  command: {
    palette: "Command palette",
    search: "Search",
    filter: "Filter",
    noMatches: "No matches",
  },
  spinner: { loading: "Loading" },
  floatButton: { actions: "Floating actions" },
  imageViewer: {
    preview: "Preview",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    rotate: "Rotate 90 degrees",
    close: "Close",
  },
  transfer: { filter: "Filter {name}", moveRight: "Move right", moveLeft: "Move left" },
  orderList: {
    toTop: "Move to top",
    moveUp: "Move up",
    moveDown: "Move down",
    toBottom: "Move to bottom",
  },
  dynamicEntry: { remove: "Remove" },
  terminal: { commandLine: "Terminal command line" },
  sidebar: { resize: "Resize sidebar" },
  more: { actions: "More actions" },
};

const CHINESE_MESSAGES: ComponentMessages = {
  ai: {
    conversation: "对话",
    loading: "加载中",
    send: "发送",
    stop: "停止",
    copyCode: "复制代码",
    copied: "已复制",
    removeAttachment: "移除 {name}",
  },
  banner: { dismiss: "关闭" },
  breadcrumb: { label: "面包屑" },
  pagination: { previous: "上一页", next: "下一页" },
  select: { filter: "筛选选项" },
  table: {
    empty: "暂无数据",
    selectRow: "选择行",
    selectAllRows: "选择全部行",
    expandRow: "展开行",
    collapseRow: "折叠行",
    rowsCount: "{count} 行",
    perPage: "{size} / 页",
    rowsPerPage: "每页行数",
    filterColumn: "筛选 {name}",
    filterAll: "筛选全部列",
  },
  command: { palette: "命令面板", search: "搜索", filter: "筛选", noMatches: "未找到匹配项" },
  spinner: { loading: "加载中" },
  floatButton: { actions: "浮动操作" },
  imageViewer: {
    preview: "预览",
    zoomIn: "放大",
    zoomOut: "缩小",
    rotate: "旋转 90 度",
    close: "关闭",
  },
  transfer: { filter: "筛选 {name}", moveRight: "向右移动", moveLeft: "向左移动" },
  orderList: { toTop: "移到顶部", moveUp: "上移", moveDown: "下移", toBottom: "移到底部" },
  dynamicEntry: { remove: "移除" },
  terminal: { commandLine: "终端命令行" },
  sidebar: { resize: "调整侧边栏大小" },
  more: { actions: "更多操作" },
};

/** A valid BCP-47 tag whose language subtag is `zh` resolves the Chinese
 * defaults; regional and script subtags stay the caller's choice. */
function isChineseLocale(locale: string): boolean {
  try {
    return new Intl.Locale(locale).language.toLowerCase() === "zh";
  } catch {
    return false;
  }
}

function mergeGroup<Group extends Record<string, string>>(
  defaults: Group,
  override?: Partial<Group>,
): Group {
  return { ...defaults, ...override };
}

function mergeMessages(
  defaults: ComponentMessages,
  override?: ComponentMessagesOverride,
): ComponentMessages {
  return {
    ai: mergeGroup(defaults.ai, override?.ai),
    banner: mergeGroup(defaults.banner, override?.banner),
    breadcrumb: mergeGroup(defaults.breadcrumb, override?.breadcrumb),
    pagination: mergeGroup(defaults.pagination, override?.pagination),
    select: mergeGroup(defaults.select, override?.select),
    table: mergeGroup(defaults.table, override?.table),
    command: mergeGroup(defaults.command, override?.command),
    spinner: mergeGroup(defaults.spinner, override?.spinner),
    floatButton: mergeGroup(defaults.floatButton, override?.floatButton),
    imageViewer: mergeGroup(defaults.imageViewer, override?.imageViewer),
    transfer: mergeGroup(defaults.transfer, override?.transfer),
    orderList: mergeGroup(defaults.orderList, override?.orderList),
    dynamicEntry: mergeGroup(defaults.dynamicEntry, override?.dynamicEntry),
    terminal: mergeGroup(defaults.terminal, override?.terminal),
    sidebar: mergeGroup(defaults.sidebar, override?.sidebar),
    more: mergeGroup(defaults.more, override?.more),
  };
}
/** Resolve complete component copy for a BCP-47 locale, then apply partial
 * overrides. An invalid locale falls back to English rather than guessing. */
export function resolveComponentMessages(
  locale: string,
  overrides?: ComponentMessagesOverride,
): ComponentMessages {
  return mergeMessages(isChineseLocale(locale) ? CHINESE_MESSAGES : ENGLISH_MESSAGES, overrides);
}
