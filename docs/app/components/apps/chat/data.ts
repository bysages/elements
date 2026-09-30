export interface Localized {
  en: string;
  zh: string;
}

export interface ChatScript {
  /** Any of these substrings in the prompt (lowercased) selects the script. */
  match: string[];
  tool?: { name: string; input: string; output: string };
  reasoning?: Localized;
  text: Localized;
  suggestions: { en: string[]; zh: string[] };
}

export const GREETING: Localized = {
  en: "Welcome to the Elements workbench. Ask about tokens, components, or the docs — answers stream in locally, so nothing leaves this page.",
  zh: "欢迎来到 Elements 工作台。可以问令牌、组件或文档的事——回答都在本地生成，不会离开这个页面。",
};

export const FALLBACK_SUGGESTIONS: { en: string[]; zh: string[] } = {
  en: ["What tokens exist?", "How do I theme it?", "Show the docs map"],
  zh: ["有哪些令牌？", "怎么换主题？", "看看文档地图"],
};

export const FALLBACK_TEXT: Localized = {
  en: "There is no documentation on that yet. The shelves cover the design system's tokens, components, and workflows — try asking about theming, density, or any component family.",
  zh: "这个还没有写下文档。架子上的内容是设计系统的令牌、组件与工作流——试试问主题、密度，或者某个组件家族。",
};

/** A scripted assistant: each entry matches by keyword and plays its
 * tool call, reasoning, and streamed text in sequence. */
export const SCRIPTS: ChatScript[] = [
  {
    match: ["token", "density", "accent", "令牌", "密度", "强调色"],
    tool: {
      name: "list-pages",
      input: '{"filter": "tokens"}',
      output: '{"hits": 3, "pages": ["tokens", "core", "theming"]}',
    },
    reasoning: {
      en: "The reader asks about tokens. The docs shelf has a tokens page under reference and a theming guide — point at both, keep it short.",
      zh: "读者在问令牌。参考架下有令牌页，还有一份主题指南——两处都指到，话说短些。",
    },
    text: {
      en: "The design tokens compile to CSS custom properties: color, spacing, radius, elevation, and motion. **Density** has four tiers driven by `[data-density]`, and the **accent** switches pigments through `[data-accent]` without touching the semantic colors. Start with the tokens page under Reference, then the theming guide.",
      zh: "设计令牌会编译成 CSS 自定义属性：颜色、间距、圆角、海拔与动效。**密度**有四档，由 `[data-density]` 驱动；**强调色**经 `[data-accent]` 换颜料，不碰语义色。可以先看参考架下的令牌页，再读主题指南。",
    },
    suggestions: {
      en: ["How do I theme it?", "What about dark mode?", "Show the docs map"],
      zh: ["怎么换主题？", "暗色模式呢？", "看看文档地图"],
    },
  },
  {
    match: ["theme", "dark mode", "dark", "主题", "暗色", "深色"],
    reasoning: {
      en: "Theming question. The answer is the same tokens in both modes — contrast tiers flip, pigments hold. Two or three sentences will do.",
      zh: "主题问题。两种模式用的是同一套令牌——对比档位翻转，颜料不动。两三句说完。",
    },
    text: {
      en: "Theming rides the tokens: switch the accent with `[data-accent]` (qinghua cobalt, celadon, zhusha cinnabar), flip light and dark through the color-mode panel in the header. The semantic pigments — bamboo, ochre, cinnabar, ultramarine — hold their meaning in every theme and both modes, so danger always reads as danger.",
      zh: "主题骑在令牌上：用 `[data-accent]` 换强调色（青花钴、青瓷、朱砂），明暗经页眉的色模式面板切换。语义颜料——竹青、赭石、朱砂、群青——在任何主题、任何模式下都守着自己的意思，危险永远读作危险。",
    },
    suggestions: {
      en: ["What tokens exist?", "How do accents switch?"],
      zh: ["有哪些令牌？", "强调色怎么换？"],
    },
  },
  {
    match: ["map", "docs", "find", "page", "文档", "地图", "找", "页面"],
    tool: {
      name: "list-pages",
      input: '{"locale": "en"}',
      output: '{"count": 174, "shelves": ["guide", "components", "reference"]}',
    },
    reasoning: {
      en: "They want the shape of the docs. Give the three shelves and what each is for — the assistant has list-pages for this, so showing a tool call is honest.",
      zh: "对方想要文档的全貌。给出三个架子和各自用途——助手本来就有 list-pages 这个工具，把工具调用演出来才诚实。",
    },
    text: {
      en: "The site has three shelves. **Guide** explains the workflow and the architecture. **Components** holds every family with live demos and a code tab. **Reference** carries the tokens, the theming guide, and the design language. The header tabs move between them.",
      zh: "站点有三个架子。**指南**讲工作流与架构；**组件**收着每个家族，带可跑的演示和代码页；**参考**放着令牌、主题指南与设计语言。页眉的页签在它们之间移动。",
    },
    suggestions: {
      en: ["What tokens exist?", "How do I theme it?"],
      zh: ["有哪些令牌？", "怎么换主题？"],
    },
  },
  {
    match: ["button", "component", "dialog", "table", "按钮", "组件", "对话框", "表格"],
    text: {
      en: "Every family lives on the Components shelf with live demos you can copy from. The **Button** page shows variants and tones; **DataTable** demonstrates sorting, filtering, and selection; **Dialog** covers the controlled and trigger-driven patterns. This very page is an example of the AI family composing together.",
      zh: "每个家族都住在组件架上，演示可以直接拷走。**按钮**页看变体与色调；**数据表格**演示排序、筛选与选择；**对话框**覆盖受控与触发器两种写法。眼前这一页，本身就是 AI 家族组合起来的样子。",
    },
    suggestions: {
      en: ["Show the docs map", "How do I theme it?"],
      zh: ["看看文档地图", "怎么换主题？"],
    },
  },
];
