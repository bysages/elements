export interface Localized {
  en: string;
  zh: string;
}

export interface PostBlock {
  type: "h2" | "p" | "quote" | "code";
  id?: string;
  text: Localized;
}

export interface PostComment {
  id: string;
  author: string;
  initials: string;
  datetime: Localized;
  body: Localized;
  replies?: PostComment[];
}

export interface Post {
  id: string;
  title: Localized;
  excerpt: Localized;
  tags: Localized[];
  author: string;
  initials: string;
  date: Localized;
  readingTime: Localized;
  blocks: PostBlock[];
  comments: PostComment[];
}

/** Eight posts of paper-and-ink editorial. Headings carry explicit ids —
 * the article view anchors the TOC to them, so slugging never has to
 * guess. */
export const posts: Post[] = [
  {
    id: "light-as-shadow",
    title: {
      en: "Light as shadow: hierarchy without weight",
      zh: "以光为影：不靠重量的层级",
    },
    excerpt: {
      en: "The premise of the system is that depth is not decoration — surfaces rest in ambient shade and hierarchy is carried by light.",
      zh: "系统的前提是深度不是装饰——表面停在环境阴影里，层级由光来背负。",
    },
    tags: [
      { en: "design", zh: "设计" },
      { en: "craft", zh: "工艺" },
    ],
    author: "Sage Wei",
    initials: "SW",
    date: { en: "Sep 14, 2026", zh: "2026 年 9 月 14 日" },
    readingTime: { en: "6 min", zh: "6 分钟" },
    blocks: [
      {
        type: "p",
        text: {
          en: "Interfaces are warm paper, content is ink. Nothing on the page floats free: every surface rests at a measured elevation, and the reader's eye is drawn the way light actually falls — slowly, from the top-left of attention to the quiet foot of the page.",
          zh: "界面是温热的纸，内容是墨。页面上的东西没有一样是悬空的：每个表面都停在量过的海拔上，读者的视线被引向光真正落下的方向——慢慢地，从注意力的左上角，走到页面安静的底部。",
        },
      },
      {
        type: "h2",
        id: "the-surface-ladder",
        text: { en: "The surface ladder", zh: "表面阶梯" },
      },
      {
        type: "p",
        text: {
          en: "Cards rest at the first elevation, dropdowns lift one step higher, dialogs leave the page entirely. Each step is computed from the same ink and light primitives — never copy-pasted — so a change in the lighting model ripples through every vessel at once.",
          zh: "卡片停在第一级海拔，下拉浮起一级，对话框则完全离开页面。每一级都从同一组墨与光的原语计算而来——从不复制粘贴——于是光照模型的一处改动，会同时波及所有器物。",
        },
      },
      {
        type: "quote",
        text: {
          en: "Cast shadows are reserved for things that actually leave the page.",
          zh: "投影只留给真正离开页面的东西。",
        },
      },
      {
        type: "h2",
        id: "ink-bleeds",
        text: { en: "Ink bleeds", zh: "墨要洇开" },
      },
      {
        type: "p",
        text: {
          en: "Motion follows the same physical intuition. Shadows transition roughly one and a half times slower than the property that raised them, because light needs time. Panels dissolve in with a fade and a blur — ink soaking into fibre — never a hard pop.",
          zh: "动效遵循同一种物理直觉。阴影的过渡大约比托起它的属性慢上一倍半，因为光需要时间。面板以淡入加模糊的方式化进来——像墨渗进纤维——从不会生硬地弹出。",
        },
      },
      {
        type: "code",
        text: {
          en: "transition:\n  box-shadow var(--bs-duration-slow) var(--bs-ease-out),\n  background var(--bs-duration-fast) var(--bs-ease-out);",
          zh: "transition:\n  box-shadow var(--bs-duration-slow) var(--bs-ease-out),\n  background var(--bs-duration-fast) var(--bs-ease-out);",
        },
      },
      {
        type: "h2",
        id: "restraint",
        text: { en: "Restraint as a feature", zh: "克制是一种功能" },
      },
      {
        type: "p",
        text: {
          en: "The discipline is subtraction. One hairline per boundary, one accent pigment at a time, and no decorative noise anywhere. What remains is an interface that reads like a well-set page: quiet, even, and impossible to tire of.",
          zh: "这门纪律是做减法。每条边界一根发丝线，一次只用一种强调颜料，任何地方都没有装饰性噪音。留下来的界面读起来像一页排得很好的书：安静、均匀，不会让人厌倦。",
        },
      },
    ],
    comments: [
      {
        id: "c-1",
        author: "Ren Mei",
        initials: "RM",
        datetime: { en: "Sep 15, 2026", zh: "2026 年 9 月 15 日" },
        body: {
          en: "The surface ladder finally made elevation auditable for us. Shipping the tokens was the turning point.",
          zh: "表面阶梯终于让海拔变得可审计了。把令牌发布出去是转折点。",
        },
        replies: [
          {
            id: "c-1-1",
            author: "Sage Wei",
            initials: "SW",
            datetime: { en: "Sep 15, 2026", zh: "2026 年 9 月 15 日" },
            body: {
              en: "Once the ladder is computed, review stops being taste and starts being arithmetic.",
              zh: "阶梯一旦变成计算，评审就不再是品味问题，而是算术问题。",
            },
          },
        ],
      },
      {
        id: "c-2",
        author: "Wen Zai",
        initials: "WZ",
        datetime: { en: "Sep 16, 2026", zh: "2026 年 9 月 16 日" },
        body: {
          en: "Ink bleeds is a lovely phrase for it. We borrowed the timing ratio for our own motion pass.",
          zh: "“墨要洇开”这个说法真美。我们自己的动效一轮就借用了这个时间比。",
        },
      },
    ],
  },
  {
    id: "square-cut-controls",
    title: {
      en: "Square-cut controls, round vessels",
      zh: "方寸为章，器物为圆",
    },
    excerpt: {
      en: "方寸为章，器物为圆 — controls cut square like a seal, vessels kept round like bowls. The shape grammar carries meaning.",
      zh: "控件像印章一样切成方形，器物像碗一样保持圆润。形状语法本身承载着意思。",
    },
    tags: [
      { en: "design", zh: "设计" },
      { en: "tokens", zh: "令牌" },
    ],
    author: "Wen Zai",
    initials: "WZ",
    date: { en: "Sep 2, 2026", zh: "2026 年 9 月 2 日" },
    readingTime: { en: "4 min", zh: "4 分钟" },
    blocks: [
      {
        type: "p",
        text: {
          en: "Shape is a signature. Interactive controls are square-cut at the small radius — a stamp pressed into paper — while vessels such as cards and dialogs stay round at the large radius. You never have to ask whether a thing is a control or a container; the corner tells you.",
          zh: "形状是一种签名。交互控件在小圆角处切成方形——像按进纸里的印章——而卡片、对话框这类器物在大圆角处保持圆润。你从不需要问一个东西是控件还是容器；转角自己会说话。",
        },
      },
      { type: "h2", id: "the-seal", text: { en: "The seal", zh: "印章" } },
      {
        type: "p",
        text: {
          en: "A square-cut control reads as an action because stamps are actions: pressed once, leaving a mark. The radius is deliberately small — six pixels, not zero — so the edge still catches light.",
          zh: "方形控件读起来像一个动作，因为印章本就是动作：按下一次，留下一枚印记。圆角刻意地小——六像素，而不是零——边缘才还能接住一点光。",
        },
      },
      { type: "h2", id: "the-bowl", text: { en: "The bowl", zh: "碗" } },
      {
        type: "p",
        text: {
          en: "Vessels round at the large radius hold content the way bowls hold rice: softly, without corners to trap the eye. Dialogs, sheets, and cards all inherit the same bowl.",
          zh: "大圆角的器物盛放内容，像碗盛饭：柔和，没有卡住视线的尖角。对话框、侧板与卡片继承的是同一只碗。",
        },
      },
    ],
    comments: [
      {
        id: "c-3",
        author: "Ren Mei",
        initials: "RM",
        datetime: { en: "Sep 3, 2026", zh: "2026 年 9 月 3 日" },
        body: {
          en: "The seal metaphor finally sold the radius tokens to our review board.",
          zh: "印章这个比喻终于让评审会通过了圆角令牌。",
        },
      },
    ],
  },
  {
    id: "inclusive-density",
    title: {
      en: "Density is information organization",
      zh: "密度是信息的组织方式",
    },
    excerpt: {
      en: "Four density tiers scale whitespace, never type size or contrast — legibility is a floor, not an option.",
      zh: "四档密度只缩放留白，不动字号与对比度——可读性是底线，不是选项。",
    },
    tags: [
      { en: "a11y", zh: "无障碍" },
      { en: "tokens", zh: "令牌" },
    ],
    author: "Ren Mei",
    initials: "RM",
    date: { en: "Aug 25, 2026", zh: "2026 年 8 月 25 日" },
    readingTime: { en: "5 min", zh: "5 分钟" },
    blocks: [
      {
        type: "p",
        text: {
          en: "Compact interfaces fail when compression is applied to the wrong dimension. Squeezing type or lowering contrast trades long-term legibility for short-term compactness. The system's answer is a density scale that only moves whitespace: gaps, padding, row heights.",
          zh: "把压缩用错了维度，紧凑界面就会失败。挤压字号或降低对比度，是拿长期的可读性换短期的紧凑。系统的答案是只移动留白的密度阶梯：间距、内边距、行高。",
        },
      },
      {
        type: "h2",
        id: "four-tiers",
        text: { en: "Four tiers", zh: "四档阶梯" },
      },
      {
        type: "p",
        text: {
          en: "Compact, default, comfortable, spacious. A single factor drives all of them, so an operator can move a control console to compact for a 4k wall and back to spacious for a training room without re-authoring a single screen.",
          zh: "紧凑、默认、宽松、疏朗。一个系数驱动全部四档，操作员可以把控制台调到紧凑去对付 4K 大墙，再调回疏朗给培训室，而不必重做任何一屏。",
        },
      },
      { type: "h2", id: "the-floor", text: { en: "The floor", zh: "底线" } },
      {
        type: "p",
        text: {
          en: "Type sizes and contrast ratios are the floor the scale may never dig through. The scale compresses space; it does not compress meaning.",
          zh: "字号与对比率是这条阶梯永远不能挖穿的底线。阶梯压缩的是空间，不是意思。",
        },
      },
    ],
    comments: [],
  },
  {
    id: "agent-legible",
    title: {
      en: "Anatomy that agents can read",
      zh: "智能体读得懂的解剖结构",
    },
    excerpt: {
      en: "data-scope, data-part, and machine state attributes make the component tree legible to codegen and coding agents alike.",
      zh: "data-scope、data-part 与机器状态属性，让组件树对代码生成和编码智能体同样可读。",
    },
    tags: [
      { en: "ai", zh: "智能" },
      { en: "craft", zh: "工艺" },
    ],
    author: "Sage Wei",
    initials: "SW",
    date: { en: "Aug 11, 2026", zh: "2026 年 8 月 11 日" },
    readingTime: { en: "7 min", zh: "7 分钟" },
    blocks: [
      {
        type: "p",
        text: {
          en: "The components must stay legible to machines: anatomy is a stable contract of data attributes, and props and types are the API docs. A coding agent reading the DOM sees the same vocabulary the stylesheets see.",
          zh: "组件必须让机器也读得懂：解剖结构是一份数据属性的稳定契约，props 与类型就是 API 文档。阅读 DOM 的编码智能体，看到的是和样式表同一套词汇。",
        },
      },
      {
        type: "h2",
        id: "the-contract",
        text: { en: "The contract", zh: "契约" },
      },
      {
        type: "p",
        text: {
          en: "Every part carries its scope and part name; every state rides data-state. Selectors never guess. When the anatomy and the CSS agree by construction, one stylesheet serves every framework wrapper.",
          zh: "每个部件都带着自己的 scope 与部件名；每个状态都骑在 data-state 上。选择器从不需要猜。当解剖结构与 CSS 在构造上就彼此一致，一份样式表就能服务所有框架的包装。",
        },
      },
      {
        type: "code",
        text: {
          en: '<div data-scope="dialog" data-part="content" data-state="open">',
          zh: '<div data-scope="dialog" data-part="content" data-state="open">',
        },
      },
      {
        type: "h2",
        id: "why-it-pays",
        text: { en: "Why it pays", zh: "回报在哪里" },
      },
      {
        type: "p",
        text: {
          en: "Tests target parts, not classes. Agents compose flows from the same map. And refactors that respect the contract can move internals freely without breaking a single consumer.",
          zh: "测试瞄准部件，而不是类名。智能体按同一张地图编排流程。尊重契约的重构可以自由搬动内部实现，而不弄坏任何一个使用方。",
        },
      },
    ],
    comments: [
      {
        id: "c-4",
        author: "Wen Zai",
        initials: "WZ",
        datetime: { en: "Aug 12, 2026", zh: "2026 年 8 月 12 日" },
        body: {
          en: "This is the article I send to every new hire on the platform team.",
          zh: "平台团队每个新人入职，我都发这篇。",
        },
        replies: [
          {
            id: "c-4-1",
            author: "Ren Mei",
            initials: "RM",
            datetime: { en: "Aug 12, 2026", zh: "2026 年 8 月 12 日" },
            body: {
              en: "Same — the contract framing finally made styling reviews fast.",
              zh: "我也是——契约这个讲法终于让样式评审快了起来。",
            },
          },
        ],
      },
    ],
  },
  {
    id: "pigment-accents",
    title: {
      en: "Mineral pigments: accents that hold their hue",
      zh: "矿物颜料：守得住色相的强调色",
    },
    excerpt: {
      en: "Semantic colors are fixed pigments — bamboo, ochre, cinnabar, ultramarine — independent of the swappable accent theme.",
      zh: "语义色是固定的颜料——竹青、赭石、朱砂、群青——与可替换的强调主题互不相干。",
    },
    tags: [
      { en: "tokens", zh: "令牌" },
      { en: "design", zh: "设计" },
    ],
    author: "Wen Zai",
    initials: "WZ",
    date: { en: "Jul 30, 2026", zh: "2026 年 7 月 30 日" },
    readingTime: { en: "5 min", zh: "5 分钟" },
    blocks: [
      {
        type: "p",
        text: {
          en: "The accent theme can switch — qinghua cobalt today, celadon tomorrow — but the semantic pigments never move. Success is bamboo green, warning is ochre, danger is cinnabar, info is ultramarine, in every theme and both modes.",
          zh: "强调主题可以换——今天是青花钴，明天是青瓷——但语义颜料从不动。成功是竹青，警示是赭石，危险是朱砂，信息是群青，在任何主题、任何模式下都如此。",
        },
      },
      {
        type: "h2",
        id: "why-fixed",
        text: { en: "Why fixed", zh: "为什么固定" },
      },
      {
        type: "p",
        text: {
          en: "Meaning cannot ride a theme. A reader who learns that cinnabar marks the destructive path must find it in the same place tomorrow, whichever pigment the product team fell in love with this quarter.",
          zh: "意思不能骑在主题上。一个记住了朱砂标记危险路径的读者，明天必须还在同一个地方找到它，无论产品团队这个季度又爱上了哪种颜料。",
        },
      },
      {
        type: "h2",
        id: "composing",
        text: { en: "Composing the two", zh: "两套如何合奏" },
      },
      {
        type: "p",
        text: {
          en: "Accents color the primary path and selection; pigments color state. The two systems never overlap, so a themed product keeps its personality without lying about danger.",
          zh: "强调色染主路径与选中态；颜料染状态。两套系统从不重叠，所以换肤的产品保住个性，也不在危险上撒谎。",
        },
      },
    ],
    comments: [],
  },
  {
    id: "css-var-pipeline",
    title: {
      en: "The CSS-variable pipeline end to end",
      zh: "贯通始终的 CSS 变量管线",
    },
    excerpt: {
      en: "Tokens compile to custom properties; the lighting engine writes variables; component CSS only consumes. One direction, no cycles.",
      zh: "令牌编译成自定义属性；光照引擎写入变量；组件 CSS 只消费。单向流动，没有循环。",
    },
    tags: [
      { en: "tokens", zh: "令牌" },
      { en: "craft", zh: "工艺" },
    ],
    author: "Ren Mei",
    initials: "RM",
    date: { en: "Jul 18, 2026", zh: "2026 年 7 月 18 日" },
    readingTime: { en: "8 min", zh: "8 分钟" },
    blocks: [
      {
        type: "p",
        text: {
          en: "Every visual value in a component is a var() reference. The token pipeline compiles design tokens into custom properties; the lighting engine computes light and writes variables onto the subtree; component styles read and never recompute.",
          zh: "组件里每个视觉值都是一处 var() 引用。令牌管线把设计令牌编译成自定义属性；光照引擎算出光、把变量写到子树上；组件样式只读取，从不重算。",
        },
      },
      {
        type: "h2",
        id: "one-direction",
        text: { en: "One direction", zh: "单向流动" },
      },
      {
        type: "p",
        text: {
          en: "Values flow from tokens through the engine into components. Nothing flows back. That single direction is what lets a palette change land as data instead of a migration.",
          zh: "值从令牌经引擎流向组件，没有任何东西回流。正是这个单向，让换一套配色落地时只是改数据，而不是一次迁移。",
        },
      },
      {
        type: "h2",
        id: "the-freeze-trap",
        text: { en: "The freeze trap", zh: "冻结陷阱" },
      },
      {
        type: "p",
        text: {
          en: "Custom properties resolve at their declaring element. A derived declaration on the root freezes the base value — the fix is to declare derived properties on the subtree that owns them, so the chain follows configuration instead of the document root.",
          zh: "自定义属性在声明它的元素上求值。写在根上的派生声明会把基础值冻住——解法是把派生属性声明在真正拥有它的子树上，让链条跟随配置，而不是文档根。",
        },
      },
    ],
    comments: [
      {
        id: "c-5",
        author: "Sage Wei",
        initials: "SW",
        datetime: { en: "Jul 19, 2026", zh: "2026 年 7 月 19 日" },
        body: {
          en: "The freeze trap paragraph has saved two of our engineers from a very long afternoon.",
          zh: "冻结陷阱那一段，救了我们两位工程师的整个下午。",
        },
      },
    ],
  },
  {
    id: "container-queries",
    title: {
      en: "Components that measure their own room",
      zh: "自己量房间的组件",
    },
    excerpt: {
      en: "Container queries let a component re-organize by the space it is given — the viewport belongs to the page, the container to the component.",
      zh: "容器查询让组件按分到的空间重新排布——视口属于页面，容器属于组件。",
    },
    tags: [
      { en: "craft", zh: "工艺" },
      { en: "a11y", zh: "无障碍" },
    ],
    author: "Sage Wei",
    initials: "SW",
    date: { en: "Jul 2, 2026", zh: "2026 年 7 月 2 日" },
    readingTime: { en: "6 min", zh: "6 分钟" },
    blocks: [
      {
        type: "p",
        text: {
          en: "Media queries ask how wide the window is; container queries ask how wide the room is. A table dropped into a narrow panel re-prioritizes its columns without the page caring, and the same table on a wide canvas shows everything.",
          zh: "媒体查询问的是窗口多宽；容器查询问的是房间多宽。一张表格被放进窄面板时会自己重排列的优先级，页面毫不知情；同一张表格摊在大画布上则全部展开。",
        },
      },
      {
        type: "h2",
        id: "re-layout",
        text: { en: "Re-layout, don't scale", zh: "重排，而不是缩放" },
      },
      {
        type: "p",
        text: {
          en: "Responsive behavior in the system is re-organization: sidebar becomes topbar, priority columns survive while the rest collapse into expandable details. Semantics never change — only the arrangement does.",
          zh: "系统里的响应式是重新组织：侧栏变成顶栏，优先列留下来，其余折进可展开的详情。语义从不改变——改变的只是排布。",
        },
      },
      {
        type: "h2",
        id: "typical-moves",
        text: { en: "Typical moves", zh: "几种常见的走法" },
      },
      {
        type: "p",
        text: {
          en: "A navigation list becomes a drawer. A stat row wraps from four across to one. A form flips from columns to a single measure. Each move is a container query the component carries with it.",
          zh: "导航列表折进抽屉。一排统计从四个一行换到各占一行。表单从多栏翻成单栏。每一步走法都是组件随身携带的一条容器查询。",
        },
      },
    ],
    comments: [],
  },
  {
    id: "quiet-motion",
    title: {
      en: "Quiet motion: states remain, animation does not",
      zh: "安静的动作：状态还在，动画退场",
    },
    excerpt: {
      en: "Under reduced motion the durations retune to one millisecond — every state still lands, instantly and legibly.",
      zh: "在减少动效的偏好下，时长统一调成 1 毫秒——每个状态依然到达，只是即时而清晰。",
    },
    tags: [
      { en: "a11y", zh: "无障碍" },
      { en: "design", zh: "设计" },
    ],
    author: "Ren Mei",
    initials: "RM",
    date: { en: "Jun 20, 2026", zh: "2026 年 6 月 20 日" },
    readingTime: { en: "3 min", zh: "3 分钟" },
    blocks: [
      {
        type: "p",
        text: {
          en: "Motion in the system is a grammar — springs for moving parts, staggers for lists, dissolves for panels. But the grammar has a reduced register: when the platform asks for less motion, durations retune to one millisecond.",
          zh: "系统里的动效是一门语法——活动部件用弹簧，列表用错落，面板用消融。但这门语法有一个弱音区：当平台要求减少动效，所有时长统一调成 1 毫秒。",
        },
      },
      {
        type: "h2",
        id: "states-not-effects",
        text: { en: "States, not effects", zh: "要状态，不要表演" },
      },
      {
        type: "p",
        text: {
          en: "What survives is information, not spectacle. A dialog still opens; it simply arrives without the dissolve. Focus rings still bloom. The reader who needs stillness gets the same interface, only quieter.",
          zh: "留下的是信息，不是表演。对话框照样打开，只是不再带着消融登场。焦点光晕照样绽放。需要安静的读者拿到的是同一个界面，只是更安静。",
        },
      },
    ],
    comments: [
      {
        id: "c-6",
        author: "Wen Zai",
        initials: "WZ",
        datetime: { en: "Jun 21, 2026", zh: "2026 年 6 月 21 日" },
        body: {
          en: "Three minutes that belong in every onboarding packet.",
          zh: "这三分钟应该进每个人的入职材料。",
        },
      },
    ],
  },
];

/** Every tag in publication order — the filter row reads the same way. */
export const allTags = [...new Set(posts.flatMap((post) => post.tags.map((tag) => tag.en)))];

export const tagLabel = (tag: string): Localized =>
  posts.flatMap((post) => post.tags).find((candidate) => candidate.en === tag)!;
