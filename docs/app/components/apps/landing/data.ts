/** Copy for a fictional letterpress studio, keyed by site locale — the
 * landing exercises the library's editorial register: serif display,
 * hairline lattices, and a masonry wall of uneven cards. */

const en = {
  header: {
    brand: "Songyan",
    navLabel: "Site",
    links: [
      { label: "Work", href: "#work" },
      { label: "Studio", href: "#studio" },
      { label: "Voices", href: "#voices" },
      { label: "Editions", href: "#editions" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Start a project",
  },
  hero: {
    eyebrow: "Songyan Press · a stationery works",
    title: "Paper that answers to the hand.",
    lede: "Letterpress stationery from a two-press studio in Huizhou — set by hand, inked in twelve house pigments, bound to outlast the inbox it announces.",
    primaryCta: "Browse the work",
    secondaryCta: "Meet the inks",
    specimen: {
      title: "Ink No. 04 — Qinghua",
      glyph: "圓",
      swatches: [
        { name: "Qinghua", accent: "qinghua" },
        { name: "Celadon", accent: "celadon" },
        { name: "Zhusha", accent: "zhusha" },
      ],
      notes: ["Cobalt ground from lapis", "Sheets 110–320 gsm"],
    },
  },
  brands: {
    kicker: "Printed for",
    names: [
      "Meridian Press",
      "Fold & Vellum",
      "Mulberry Press",
      "Cartouche",
      "Nightjar Editions",
      "Basil & Slate",
      "The Composing Room",
      "Palmwhite",
      "Karst Archive",
      "Inkstone Works",
    ],
  },
  gallery: {
    kicker: "Work",
    title: "Recent presses.",
    lede: "Cards from the past season — series, proofs, and the numbers behind them.",
    items: [
      {
        kind: "tint",
        accent: "qinghua",
        glyph: "青花",
        series: "Cobalt series — twelve blues ground from lapis.",
      },
      {
        kind: "quote",
        quote: "A letterpress proof is honest in a way a screen never is — it weighs something.",
        attribution: "Wen Zhao · Mulberry Press",
      },
      {
        kind: "count",
        count: "37",
        caption: "editions pressed this year, each under five hundred copies",
      },
      {
        kind: "figure",
        bars: [42, 66, 50, 88, 72, 96, 58],
        caption: "Ink coverage across the autumn run",
      },
      {
        kind: "tint",
        accent: "celadon",
        glyph: "青瓷",
        series: "Celadon — the quiet green of a crackled glaze.",
      },
      {
        kind: "note",
        body: "Our paper comes from one mill in Jing County, aged nine months before it meets a press. The wait is the recipe.",
      },
      {
        kind: "quote",
        quote: "They set our wedding invitations by hand. My grandmother read them aloud twice.",
        attribution: "M. Okafor · printed 2025",
      },
      {
        kind: "tint",
        accent: "zhusha",
        glyph: "朱砂",
        series: "Zhusha — cinnabar, the seal-maker's red.",
      },
      {
        kind: "count",
        count: "9",
        caption: "months every sheet rests in the loft before pressing",
      },
    ],
  },
  features: {
    kicker: "Studio",
    title: "Slow tools, kept sharp.",
    items: [
      {
        title: "Deckle edges",
        body: "Every sheet leaves the mold with its feathered edge intact; trimming is a choice, not a default.",
        icon: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5",
      },
      {
        title: "Vegetable inks",
        body: "Twelve lines mixed in house — qinghua cobalt to zhusha red — lightfast and soy-based.",
        icon: "M12 3c3.5 4 6 7.2 6 10.2a6 6 0 1 1-12 0C6 10.2 8.5 7 12 3z",
      },
      {
        title: "Set by hand",
        body: "Metal first, then pixels: our faces are drawn at press size and cut back for the screen.",
        icon: "M6 7V5h12v2M12 5v14M9 19h6",
      },
      {
        title: "Bound to last",
        body: "Smyth-sewn spines open flat and stay that way; glue is for envelopes.",
        icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z",
      },
    ],
  },
  voices: {
    kicker: "Voices",
    title: "What the trade says.",
    items: [
      {
        quote:
          "Songyan treats a business card like a broadside — the small things get the loud type.",
        author: "Lena Vogel",
        role: "Cartouche",
        initials: "LV",
      },
      {
        quote:
          "One proof revision, forty minutes, and the plates were perfect. The press still answers email.",
        author: "Daniel Achebe",
        role: "Nightjar Editions",
        initials: "DA",
      },
      {
        quote: "The celadon series sold out twice. People keep the boxes.",
        author: "Mei Chen",
        role: "Mulberry Press",
        initials: "YM",
      },
    ],
  },
  pricing: {
    kicker: "Editions",
    title: "Pick a standing order.",
    lede: "Every edition is real paper on real presses — the tiers only change how much of the studio is yours.",
    currency: "$",
    unit: " / month",
    featuredBadge: "Most chosen",
    plans: [
      {
        name: "Proof",
        price: 0,
        tagline: "One sheet, one color, our stock paper.",
        cta: "Choose Proof",
        features: ["Single ink on warm white", "Deckle edge finish", "Ships in ten days"],
      },
      {
        name: "Studio",
        price: 18,
        tagline: "The standing order for studios that send paper monthly.",
        cta: "Start with Studio",
        features: [
          "Three ink lines, your choice",
          "Custom stock from the Jing County mill",
          "Plate storage between runs",
          "Ships in five days",
        ],
        featured: true,
      },
      {
        name: "Atelier",
        price: 49,
        tagline: "A private press of your own, plates and all.",
        cta: "Choose Atelier",
        features: [
          "Unlimited ink lines, mixed to sample",
          "Named typeface license",
          "Bound archive of every proof",
          "Ships in two days",
        ],
      },
    ],
  },
  faq: {
    kicker: "FAQ",
    title: "Asked, answered.",
    items: [
      {
        value: "run",
        question: "How small can a run be?",
        answer:
          "Fifty. The press does not care whether fifty is a proof or a finale — the plates are set either way.",
      },
      {
        value: "color",
        question: "Can you match a color I already have?",
        answer: "Send the swatch. We grind to sample and keep the formula on file under your name.",
      },
      {
        value: "type",
        question: "Do you license your typefaces?",
        answer:
          "The Atelier edition includes a named license; every face is drawn here and cut for both press and screen.",
      },
      {
        value: "paper",
        question: "What does the paper weigh?",
        answer:
          "Our stock runs 110 to 320 gsm, and the deckle edge adds nothing to the weight — it is how the sheet leaves the mold.",
      },
      {
        value: "ship",
        question: "Where do you ship?",
        answer:
          "Anywhere the postal service walks. Plate storage and reprints are handled from the same studio bench.",
      },
    ],
  },
  footer: {
    brand: "Songyan",
    blurb: "A two-press stationery works in Huizhou, China — set by hand since 2019.",
    columns: [
      { title: "Studio", links: ["The press", "Inks", "Paper mill", "Typefaces"] },
      {
        title: "Visit",
        links: ["Huizhou bench, Anhui", "Thu–Sat, by letter", "No walk-ins, sorry"],
      },
      { title: "Journal", links: ["Setting the seal", "Twelve blues", "A year of proofs"] },
      { title: "Legal", links: ["Terms", "Privacy", "Colophon"] },
    ],
    legal: "© 2026 Songyan Press — Huizhou, China",
    credit: "Set in Elements",
  },
};

const zh: typeof en = {
  header: {
    brand: "松烟",
    navLabel: "站内导航",
    links: [
      { label: "作品", href: "#work" },
      { label: "工坊", href: "#studio" },
      { label: "声音", href: "#voices" },
      { label: "印制方案", href: "#editions" },
      { label: "常见问题", href: "#faq" },
    ],
    cta: "开始一桩印事",
  },
  hero: {
    eyebrow: "松烟社 · 徽州文具印坊",
    title: "纸，应手而生。",
    lede: "来自徽州的双机印坊，以手工排字、十二种家制墨色印成文具——装订得比它所通报的那封邮件更长久。",
    primaryCta: "赏鉴作品",
    secondaryCta: "品鉴十二彩",
    specimen: {
      title: "墨色〇四 · 青花",
      glyph: "圓",
      swatches: [
        { name: "青花", accent: "qinghua" },
        { name: "青瓷", accent: "celadon" },
        { name: "朱砂", accent: "zhusha" },
      ],
      notes: ["以青金石研磨的钴蓝", "纸张 110–320 gsm"],
    },
  },
  brands: {
    kicker: "他们把纸交给我们印",
    names: [
      "子午书局",
      "折页与皮纸",
      "桑皮印社",
      "玺章",
      "夜鹰版房",
      "罗勒与青石",
      "拾字房",
      "掌心白",
      "石林存档",
      "砚工坊",
    ],
  },
  gallery: {
    kicker: "作品",
    title: "近期印件。",
    lede: "这一季的印品——系列、打样，以及它们背后的数字。",
    items: [
      {
        kind: "tint",
        accent: "qinghua",
        glyph: "青花",
        series: "钴蓝系列——以青金石研磨出的十二种蓝。",
      },
      {
        kind: "quote",
        quote: "凸版打样有一种屏幕永远给不了的诚实——它是有重量的。",
        attribution: "文昭 · 桑皮印社",
      },
      {
        kind: "count",
        count: "37",
        caption: "今年印成的版次，每一种都少于五百份",
      },
      {
        kind: "figure",
        bars: [42, 66, 50, 88, 72, 96, 58],
        caption: "秋季印程中的墨量覆盖",
      },
      {
        kind: "tint",
        accent: "celadon",
        glyph: "青瓷",
        series: "青瓷——开片釉里安静下来的那种绿。",
      },
      {
        kind: "note",
        body: "纸只来自泾县一间纸坊，陈放九个月后才上机。等待本身就是配方。",
      },
      {
        kind: "quote",
        quote: "他们为我们的喜帖逐字手排。祖母把它从头到尾念了两遍。",
        attribution: "M. 奥卡福 · 2025 年印制",
      },
      {
        kind: "tint",
        accent: "zhusha",
        glyph: "朱砂",
        series: "朱砂——制印人用的那一种红。",
      },
      {
        kind: "count",
        count: "9",
        caption: "每张纸在上机前，都要在阁楼里静置的月数",
      },
    ],
  },
  features: {
    kicker: "工坊",
    title: "慢工具，常磨常新。",
    items: [
      {
        title: "毛边",
        body: "每张纸离模时都保留羽状毛边；裁与不裁，是选择，不是默认。",
        icon: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5",
      },
      {
        title: "植物墨色",
        body: "十二条色线全在社内调配——从青花钴蓝到朱砂红，耐光，以大豆为基。",
        icon: "M12 3c3.5 4 6 7.2 6 10.2a6 6 0 1 1-12 0C6 10.2 8.5 7 12 3z",
      },
      {
        title: "手工排版",
        body: "先金属，后像素：字形先按印机尺寸绘制，再为屏幕收小。",
        icon: "M6 7V5h12v2M12 5v14M9 19h6",
      },
      {
        title: "装订耐久",
        body: "锁线订的书脊能完全摊平，并且一直如此；胶水留给信封。",
        icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z",
      },
    ],
  },
  voices: {
    kicker: "声音",
    title: "同行怎么说。",
    items: [
      {
        quote: "松烟社连名片都当作招贴来做——越小的事，越敢用响亮的字。",
        author: "Lena Vogel",
        role: "玺章",
        initials: "LV",
      },
      {
        quote: "改一次打样，四十分钟，印版就完美了。到现在，印坊还会认真回邮件。",
        author: "Daniel Achebe",
        role: "夜鹰版房",
        initials: "DA",
      },
      {
        quote: "青瓷系列售罄过两次。连包装盒都有人留着。",
        author: "Mei Chen",
        role: "桑皮印社",
        initials: "YM",
      },
    ],
  },
  pricing: {
    kicker: "印制方案",
    title: "选一种长期印制。",
    lede: "每种方案都是真实的纸与真实的印机——档位只改变这座工坊有多少属于你。",
    currency: "¥",
    unit: " / 月",
    featuredBadge: "最多人选",
    plans: [
      {
        name: "打样",
        price: 0,
        tagline: "一张纸，一种色，用我们的常备纸。",
        cta: "选择打样",
        features: ["暖白纸上的单色印制", "毛边收边", "十日内寄出"],
      },
      {
        name: "工作室",
        price: 18,
        tagline: "为每月都要寄纸的工作室准备的长期订单。",
        cta: "从工作室开始",
        features: ["三条墨线，任你选择", "来自泾县纸坊的定制纸", "印程之间代存印版", "五日内寄出"],
        featured: true,
      },
      {
        name: "私印坊",
        price: 49,
        tagline: "一间属于你的私人印坊，连印版一起。",
        cta: "选择私印坊",
        features: ["不限墨线数量，按样调色", "具名字体授权", "每次打样的装订档案", "两日内寄出"],
      },
    ],
  },
  faq: {
    kicker: "常见问题",
    title: "有问，有答。",
    items: [
      {
        value: "run",
        question: "最小可以印多少份？",
        answer: "五十份。印机并不在意它是打样还是收官——无论如何，版都要排好。",
      },
      {
        value: "color",
        question: "能匹配我已有的颜色吗？",
        answer: "把色样寄来。我们按样研色，并把配方以你的名字存档。",
      },
      {
        value: "type",
        question: "你们的字体会授权吗？",
        answer: "私印坊方案包含具名授权；每款字形都在这里绘制，并同时为印机与屏幕裁切。",
      },
      {
        value: "paper",
        question: "纸有多重？",
        answer: "常备纸为 110 至 320 克，毛边不增加重量——那是纸离开纸模时的样子。",
      },
      {
        value: "ship",
        question: "你们寄送到哪里？",
        answer: "邮政走得到的地方都寄。印版寄存与补印，也在同一张工坊长桌上处理。",
      },
    ],
  },
  footer: {
    brand: "松烟",
    blurb: "中国徽州的一间双机文具印坊——自 2019 年起手工排字。",
    columns: [
      { title: "工坊", links: ["印机", "墨色", "纸坊", "字体"] },
      { title: "到访", links: ["安徽 · 徽州工坊", "周四至周六，请先来信", "恕不接待临时来访"] },
      { title: "手记", links: ["钤印之时", "十二种蓝", "一年打样"] },
      { title: "条款", links: ["服务条款", "隐私政策", "版记"] },
    ],
    legal: "© 2026 松烟社 · 中国徽州",
    credit: "以 Elements 排印",
  },
};

const landingCopy = { en, zh };

/** Site locales beyond the landing's two copy sets fall back to English. */
export function resolveLandingCopy(locale: string) {
  return landingCopy[locale === "zh" ? "zh" : "en"];
}
