/** Chinese renderings for the JSDoc prose the component shelves are
 * generated from, keyed by component name — the English JSDoc stays
 * the single source of truth and the generator falls back to it for
 * any name this table does not know, so the table can trail the
 * wrappers without blanking the zh shelf. */
const CJK = /[\u4e00-\u9fff]/;

/** Half-width punctuation inside a Chinese sentence reads as a typo, so
 * the render normalizes it — the table collects prose from many hands
 * and stays typographically even without policing every entry. Code
 * spans (backticks) are protected, and any mark without CJK around it
 * (URLs, signatures, English lists) is left alone. */
export const normalizeZh = (text: string | undefined): string => {
  if (!text || !CJK.test(text)) return text ?? "";
  return text
    .split(/(`[^`]*`)/g)
    .map((part, i) => {
      if (i % 2 === 1) return part;
      return part
        .replace(/([\u4e00-\u9fff]) *, */g, "$1，")
        .replace(/, *(?=[\u4e00-\u9fff])/g, "，")
        .replace(/([\u4e00-\u9fff]) *: */g, "$1：")
        .replace(/: *(?=[\u4e00-\u9fff])/g, "：")
        .replace(/([\u4e00-\u9fff]) *; */g, "$1；")
        .replace(/([\u4e00-\u9fff])\. +/g, "$1。")
        .replace(/([\u4e00-\u9fff])\.$/g, "$1。")
        .replace(/([\u4e00-\u9fff]) *\?/g, "$1？")
        .replace(/([\u4e00-\u9fff]) *!/g, "$1！")
        .replace(/\(/g, "（")
        .replace(/\)/g, "）");
    })
    .join("");
};

/** One family's renderings: its frontmatter description, per-part
 * descriptions, and per-part prop renderings — each level optional so
 * the table carries only what it knows. */
type FamilyZh = {
  description?: string;
  parts?: Record<string, { description?: string; props?: Record<string, string> }>;
};

export const jsdocZh: Record<string, FamilyZh> = {
  accordion: {
    description:
      "Accordion：折叠面板。行与行之间有细线，展开内容淡入显示，箭头以回弹曲线切换。部件：Root、Item、ItemTrigger、ItemContent、ItemIndicator。",
    parts: {
      Item: {
        props: {
          disabled: "是否禁用手风琴项",
          value: "手风琴项的值",
        },
      },
      Root: {
        props: {
          collapsible: "手风琴项展开后能否关闭",
          defaultValue: "默认展开的手风琴项；无需控制手风琴值时使用",
          disabled: "是否禁用手风琴项",
          id: "组件内部状态机的唯一标识",
          ids: "手风琴内各元素的 id；便于组合使用",
          modelValue: "手风琴的 v-model 值",
          multiple: "是否允许同时展开多个手风琴项",
          orientation: "手风琴项的方向，可为 `horizontal` 或 `vertical`",
        },
      },
    },
  },
  affix: {
    description:
      "固钉组件：包裹的内容随页面滚动，到达偏移量后固定，页面继续滚动。语义就是普通的 `position: sticky`——固定相对于最近的*滚动*祖先，因此元素在可滚动面板内的行为与在页面上相同；父级 `overflow: hidden` 会裁剪固定效果。可以同时设置两个偏移量，内容会保持在这个范围内。",
    parts: {
      Affix: {
        description:
          "固钉组件：包裹的内容随页面滚动，到达偏移量后固定，页面继续滚动。语义就是普通的 `position: sticky`——固定相对于最近的*滚动*祖先，因此元素在可滚动面板内的行为与在页面上相同；父级 `overflow: hidden` 会裁剪固定效果。可以同时设置两个偏移量，内容会保持在这个范围内。",
      },
    },
  },
  ai: {
    description:
      "AI 对话容器：Root 记录对话，Message 标记 role，Response、Reasoning、Tool、Sources 分别承载不同类型的回复片段。可交互折叠区复用共享 Collapsible，并加上 `data-ai` 标记，交互逻辑仍由状态机处理。部件不绑定任何客户端；使用者把自己的消息格式（例如此处重新导出的 `UIMessage` parts）映射到这些基础组件上。",
    parts: {
      AiConversation: {
        description: "对话日志容器：所有消息都渲染在这一栏中，并作为屏幕阅读器的地标。",
        props: {
          autoScroll:
            "回复流式生长时，读者停在底边就跟随滚动；向上回读即停止拽动，回到底边自动恢复",
        },
      },
      AiContent: {
        description: "气泡内容区，用来放置两侧通用的内容。",
      },
      AiActions: {
        description: "消息下方的操作区，通常包含复制、重试和反馈按钮。",
      },
      AiLoader: {
        description: "AI 处理中的对话轮次显示的加载提示。",
      },
    },
  },
  "ai-action": {
    description:
      "AI 操作按钮：提供复制、重试、点赞等图标操作。label 同时作为辅助技术名称和悬停提示。控件复用共享 Button 的 ghost 形态。",
    parts: {
      AiAction: {
        description:
          "AI 操作按钮：提供复制、重试、点赞等图标操作。label 同时作为辅助技术名称和悬停提示。控件复用共享 Button 的 ghost 形态。",
        props: {
          label: "按钮用途，会读给辅助技术，并作为悬停标题显示；如复制、重试、点赞",
        },
      },
    },
  },
  "ai-attachments": {
    description:
      "附件条目：按扩展名显示图标，并显示文件名和易读的大小，同时提供不突出的移除操作。上传中使用虚线样式，错误使用危险色。",
    parts: {
      AiAttachment: {
        description:
          "附件条目：按扩展名显示图标，并显示文件名和易读的大小，同时提供不突出的移除操作。上传中使用虚线样式，错误使用危险色。",
        props: {
          name: "文件名；组件按扩展名选择图标",
          size: "文件大小，单位字节；已知时按易读格式显示",
          status: "上传在传输中的状态",
        },
      },
      AiAttachments: {
        description: "附件区域，把多个附件渲染为一行可换行的 Chip。",
      },
    },
  },
  "ai-message": {
    description: "AI 消息：区分发言方。用户消息显示在内凹气泡中，助手消息直接平铺在纸面上。",
    parts: {
      AiMessage: {
        description: "AI 消息：区分发言方。用户消息显示在内凹气泡中，助手消息直接平铺在纸面上。",
        props: {
          role: "AI 消息：区分发言方。用户消息显示在内凹气泡中，助手消息直接平铺在纸面上。",
        },
      },
    },
  },
  "ai-prompt-input": {
    description:
      "AI 输入框：复用共享 field textarea，状态机的 autoresize 让高度自动增长，发送按钮位于最后一行。主体周围的插槽对应输入区结构：`header` 放上方附件，`leading` 放文本左侧工具，`trailing` 放按钮本身，`footer` 放文本下方工具，`footer-end` 放 footer 行末尾的控件；发送按钮默认落在 `footer-end`，因此加入模型选择器后会与发送按钮同排。插槽为空时不渲染对应部件，空白输入框仍保持一行。组件受控：绑定 `v-model`，在 `submit` 时获取文本。Enter 发送，Shift+Enter 换行。`busy` 时发送按钮变为停止按钮，Enter 暂不生效。",
    parts: {
      AiPromptInput: {
        description:
          "AI 输入框：复用共享 field textarea，状态机的 autoresize 让高度自动增长，发送按钮位于最后一行。主体周围的插槽对应输入区结构：`header` 放上方附件，`leading` 放文本左侧工具，`trailing` 放按钮本身，`footer` 放文本下方工具，`footer-end` 放 footer 行末尾的控件；发送按钮默认落在 `footer-end`，因此加入模型选择器后会与发送按钮同排。插槽为空时不渲染对应部件，空白输入框仍保持一行。组件受控：绑定 `v-model`，在 `submit` 时获取文本。Enter 发送，Shift+Enter 换行。`busy` 时发送按钮变为停止按钮，Enter 暂不生效。",
        props: {
          modelValue: "输入框中的草稿，绑定 `v-model`；提交成功后自动清空",
          placeholder: "输入前的占位提示",
          disabled: "禁用时文字仍留在输入区域，但提交按钮不生效，Enter 只换行",
          busy: "状态机处理中；提交按钮变为停止按钮，Enter 暂不提交",
          mentions:
            "可提及的候选项；传入候选列表和触发字符（默认 `@`），组件会附着到 textarea 上；候选列表打开时，Enter 插入候选值，发送暂缓",
        },
      },
    },
  },
  "ai-reasoning": {
    description:
      "推理内容折叠区：复用共享 Collapsible 的低调样式。触发器只显示文字，内容由一条发丝线框住。",
    parts: {
      AiReasoning: {
        description:
          "推理内容折叠区：复用共享 Collapsible 的低调样式。触发器只显示文字，内容由一条发丝线框住。",
        props: {
          label: "触发器文字；其下方的折叠面板默认展开",
          defaultOpen: "设置后折叠面板默认展开，并复用共享折叠组件",
        },
      },
    },
  },
  "ai-response": {
    description:
      "AI Markdown 渲染：内容渲染通过 `@tanstack/markdown` 完成；默认配置让原始 HTML 和可执行链接保持不可执行，因此在结构上就是流式安全的。可选高亮器会重新着色围栏代码块，组件不关心由哪个引擎提供。",
    parts: {
      AiResponse: {
        description:
          "AI Markdown 渲染：内容渲染通过 `@tanstack/markdown` 完成；默认配置让原始 HTML 和可执行链接保持不可执行，因此在结构上就是流式安全的。可选高亮器会重新着色围栏代码块，组件不关心由哪个引擎提供。",
        props: {
          content: "显示在内容区的 markdown 文本，可自由流式传入；原始 HTML 和可执行链接不会生效",
          highlighter: "可选的代码高亮函数，用于重绘围栏代码块；组件不关心高亮引擎",
          copyLabel: "复制前复制按钮的无障碍名称",
          copiedLabel: "复制完成后复制按钮的无障碍名称",
        },
      },
    },
  },
  "ai-source": {
    description: "AI 来源链接：显示一个引用来源；href 和其他属性传给锚点。",
    parts: {
      AiSource: {
        description: "AI 来源链接：显示一个引用来源；href 和其他属性传给锚点。",
        props: {
          href: "来源链接；未提供插槽时也作为链接文字；在新标签页打开，且不携带 referrer",
        },
      },
      AiSources: {
        description: "回复下方的来源列表，列示这条回复引用了哪些资源。",
      },
    },
  },
  "ai-suggestion": {
    description:
      "AI 建议按钮：提出下一步输入，选中后把提示词交回调用方。按钮复用共享 Button 的 outline 形态。",
    parts: {
      AiSuggestion: {
        description:
          "AI 建议按钮：提出下一步输入，选中后把提示词交回调用方。按钮复用共享 Button 的 outline 形态。",
        props: {
          prompt: "建议词，同时作为标签；`select` 时完整返回",
        },
      },
    },
  },
  "ai-tool": {
    description:
      "AI 工具调用：复用共享 Collapsible 作为容器。触发器显示调用名称和调用状态，输入与输出折叠在内部。",
    parts: {
      AiTool: {
        description:
          "AI 工具调用：复用共享 Collapsible 作为容器。触发器显示调用名称和调用状态，输入与输出折叠在内部。",
        props: {
          name: "调用工具时使用的名称；未通过 `label` 插槽提供更友好的文字时，触发器原样显示",
          status:
            "调用状态，可为 `pending`、`running`、`completed` 或 `error`；显示在折叠面板和状态徽章中",
          defaultOpen: "设置后折叠面板默认展开，并复用共享折叠组件",
        },
      },
    },
  },
  alert: {
    description:
      "警告提示：嵌在页面中的通知。背景使用状态色的浅色填充，前缘有一条更重的发丝线，标题使用衬线字。",
  },
  "angle-slider": {
    description:
      "AngleSlider：角度滑块。平面刻度盘上有发丝线角度刻度，滑块像指针一样在其上移动。部件：Root、Label、ValueText、Control、Thumb、MarkerGroup、Marker、HiddenInput。",
    parts: {
      Marker: {
        props: {
          value: "标记值",
        },
      },
      Root: {
        props: {
          size: "刻度盘尺寸，可为 `sm`、`md` 或 `lg`；尺寸即指针扫过的直径",
          "aria-label": "滑块的 aria-label",
          "aria-labelledby": "滑块的 aria-labelledby",
          defaultValue: "滑块初始值；无需控制滑块值时使用",
          dir: "文档的文本方向和书写方向",
          disabled: "滑块是否禁用",
          getRootNode: "用于在 iframe、Electron 等自定义环境中正确解析 document 的根节点",
          id: "组件内部状态机的唯一标识",
          ids: "状态机内各元素的 id；便于组合使用",
          invalid: "滑块是否无效",
          modelValue: "角度滑块的 v-model 值",
          name: "滑块名称，用于表单提交",
          readOnly: "滑块是否只读",
          step: "滑块步进值",
        },
      },
    },
  },
  "aspect-ratio": {
    description:
      "AspectRatio：固定宽高比的容器。无论外部宽度如何，盒子都保持指定比例，子元素填满容器。",
  },
  autocomplete: {
    description:
      "Autocomplete：带建议的自由输入。使用者可以输入任意文本，列表会收窄以辅助选择；无论是选择建议还是提交自定义值，结果都写入同一个 `modelValue`。它是 combobox 状态机的一组预设，部件和样式相同，只面向这一个场景。`items` 只在初始时填充建议列表；除非 `filter` 另有指定，匹配规则是不区分大小写的子串匹配。",
    parts: {
      AutoComplete: {
        description:
          "Autocomplete：带建议的自由输入。使用者可以输入任意文本，列表会收窄以辅助选择；无论是选择建议还是提交自定义值，结果都写入同一个 `modelValue`。它是 combobox 状态机的一组预设，部件和样式相同，只面向这一个场景。`items` 只在初始时填充建议列表；除非 `filter` 另有指定，匹配规则是不区分大小写的子串匹配。",
        props: {
          filter: "参与匹配的字段文本；默认匹配条目本身",
          size: "字段行高度，可为 `sm`、`md` 或 `lg`",
        },
      },
    },
  },
  avatar: {
    description:
      "Avatar：头像组件。先在内凹纸面上显示首字母，图片加载完成后覆盖显示。`size` 从控件高度阶梯中取一档，core 样式会按档位改写 `--bs-avatar-size`，场景仍可直接调整这个变量。",
    parts: {
      Root: {
        props: {
          size: "头像直径，取控件高度档位；默认 `md`，与其他控件对齐，头像随行显示时不会撑高行",
          shape: "头像形状，可为 `circle` 或 `square`；默认 `circle`",
          id: "组件内部状态机的唯一标识",
          ids: "头像内各元素的 id；便于组合使用",
        },
      },
    },
  },
  "avatar-group": {
    description: "AvatarGroup：一组重叠头像。每个头像带底色描边，重叠后仍能识别。",
    parts: {
      AvatarGroup: {
        description: "AvatarGroup：一组重叠头像。每个头像带底色描边，重叠后仍能识别。",
        props: {
          size: "头像组统一的尺寸档位；写入 data-size，供样式表调整头像尺寸",
        },
      },
    },
  },
  "back-top": {
    description:
      "BackTop：回到顶部按钮。页面滚动超过 `threshold` 后，小型浮动按钮出现在页面角落，并把使用者带回顶部。滚动保持原生行为——`window.scrollTo` 遵循样式表的 `scroll-behavior: smooth`；reduced motion 会改回即时跳转（自带滚动容器的控件没有样式表可遵循，因此直接查询 media query）。两种情况下按钮都保持挂载，进场走过渡而不是突然出现。控件复用共享 `Button`（outline、方形）；纸面、发丝线和聚焦光晕由它提供，这个家族只负责浮动和进场。",
    parts: {
      BackTop: {
        description:
          "BackTop：回到顶部按钮。页面滚动超过 `threshold` 后，小型浮动按钮出现在页面角落，并把使用者带回顶部。滚动保持原生行为——`window.scrollTo` 遵循样式表的 `scroll-behavior: smooth`；reduced motion 会改回即时跳转（自带滚动容器的控件没有样式表可遵循，因此直接查询 media query）。两种情况下按钮都保持挂载，进场走过渡而不是突然出现。控件复用共享 `Button`（outline、方形）；纸面、发丝线和聚焦光晕由它提供，这个家族只负责浮动和进场。",
      },
    },
  },
  badge: {
    description:
      "Badge：状态徽标。默认使用墨色作为中性 tone，四种语义色固定不变。Subtle 和 outline 只改变同一颜色的呈现方式。",
    parts: {
      Badge: {
        description:
          "Badge：状态徽标。默认使用墨色作为中性 tone，四种语义色固定不变。Subtle 和 outline 只改变同一颜色的呈现方式。",
      },
    },
  },
  banner: {
    description:
      "Banner：页面级通知。通栏使用状态色浅色填充，前缘有一条更重的发丝线，并预留操作和关闭按钮的位置。默认为墨色，四种语义色固定不变。",
    parts: {
      BannerIcon: {
        description: "横幅状态对应的图标。",
      },
      BannerBody: {
        description: "横幅正文区域，纵向排列标题和描述。",
      },
      BannerTitle: {
        description: "横幅标题，用较重的衬线字突出提醒的核心信息。",
      },
      BannerDescription: {
        description: "横幅描述，提供标题后的补充说明，视觉上更低调。",
      },
      BannerActions: {
        description: "横幅操作区，用来放置一组按钮。",
      },
      BannerClose: {
        description: "横幅的关闭按钮，是一个方切的普通按钮；是否关闭由使用方状态决定。",
      },
    },
  },
  bento: {
    description:
      "Bento：不等宽磁贴网格。整体呈现为一个版面；容器决定轨道数量，每个单元格自行声明跨度。",
    parts: {
      SBentoRoot: {
        description:
          "Bento：不等宽磁贴网格。整体呈现为一个版面；容器决定轨道数量，每个单元格自行声明跨度。",
      },
      SBentoCell: {
        description:
          "Bento 单元格。`span` 设置跨列数，`rowSpan` 设置跨行数；整体布局仍由网格保持对齐。",
      },
    },
  },
  "block-ui": {
    description:
      "BlockUI：加载遮罩。遮住需要等待的区域，保持其形状，在半透明磨砂效果下变暗，并用一个低调的加载指示提示等待。状态由调用方管理，遮罩只负责响应。",
    parts: {
      BlockUI: {
        description:
          "BlockUI：加载遮罩。遮住需要等待的区域，保持其形状，在半透明磨砂效果下变暗，并用一个低调的加载指示提示等待。状态由调用方管理，遮罩只负责响应。",
        props: {
          blocked: "是否显示阻塞遮罩",
        },
      },
    },
  },
  breadcrumb: {
    description:
      "Breadcrumb：面包屑导航。Root 包裹 nav，List 承载有序路径，每个 Item 内放 Link 或当前页，项之间由 Separator 分隔。Link 通过属性接收 href 和其他配置。",
  },
  browser: {
    description:
      "Browser：浏览器窗口容器。包含标题栏、三个窗口按钮、地址栏和主体；主体可放 iframe、截图或实际页面。",
    parts: {
      SBrowserDots: {
        description: "浏览器窗口的三个圆点，分别沿用系统固定语义中的危险、警告和成功色。",
      },
    },
  },
  button: {
    description:
      "Button：按钮。variant 决定静止时的样式，tone 决定颜色。默认使用墨色，任何操作都可以作为 primary。",
    parts: {
      Button: {
        description:
          "Button：按钮。variant 决定静止时的样式，tone 决定颜色。默认使用墨色，任何操作都可以作为 primary。",
        props: {
          variant: "按钮形态：`solid` 实心、`outline` 描边、`ghost` 幽灵或 `subtle` 淡色",
          tone: "按钮变体使用的颜色；默认 `ink`，固定语义色表示对应含义",
          size: "按钮高度，可为 `sm`、`md` 或 `lg`",
          square: "是否将图标按钮外形调整为方形，并贴合控件高度",
          asChild:
            "把插槽元素渲染成按钮；样式直接作用在该元素（例如 NuxtLink）上，不再嵌套 `<button>`",
        },
      },
    },
  },
  "button-group": {
    description:
      "ButtonGroup：按钮组，把多个按钮合并为一个控件。组只负责接缝，成员保留自己的 variant；solid 按钮可以和 outline 按钮并列，接缝仍然清晰。选择属于 toggle group，这里只处理布局。",
    parts: {
      ButtonGroup: {
        props: {
          orientation: "按钮组方向，可为 `horizontal` 或 `vertical`；默认 `horizontal`",
          size: "按钮组统一的尺寸档位；写入 data-size，供样式表调整按钮高度",
          radius: "按钮组统一的圆角档位；调整 `--bs-radius-control`，让边缘和裁切接缝保持一致",
        },
      },
    },
  },
  calendar: {
    description:
      "Calendar：日历网格，即日期选择器的月份视图，不带弹层。它始终展开，没有触发器，容器呈现为一张低调卡片。标题可在月份和年份网格之间切换层级；网格复用日期选择器的状态机，包括取值、范围选择和焦点。",
    parts: {
      Calendar: {
        description:
          "Calendar：日历网格，即日期选择器的月份视图，不带弹层。它始终展开，没有触发器，容器呈现为一张低调卡片。标题可在月份和年份网格之间切换层级；网格复用日期选择器的状态机，包括取值、范围选择和焦点。",
        props: {
          modelValue: "选中的日期；日期范围以数组表示，并由状态机处理",
        },
      },
    },
  },
  card: {
    description:
      "Card：卡片容器。圆角、位于第一层 elevation，边缘是一条发丝线。Root、Header、Title、Description、Content、Footer 各区块自带留白，可以按需组合。",
  },
  carousel: {
    description:
      "Carousel：轮播组件。幻灯片在一条由发丝线裁边的轨道中切换，切换按钮是低调的 outline 控件，只有当前指示器使用墨色。部件：Root、Control、PrevTrigger、NextTrigger、ItemGroup、Item、IndicatorGroup、Indicator、AutoplayTrigger、ProgressText。",
    parts: {
      AutoplayIndicator: {
        props: {
          fallback: "自动播放暂停时显示的备用内容",
        },
      },
      Indicator: {
        props: {
          index: "指示器索引",
          readOnly: "指示器是否只读",
        },
      },
      Item: {
        props: {
          index: "条目索引",
          snapAlign: "条目的吸附对齐方式",
        },
      },
      Root: {
        props: {
          allowMouseDrag: "是否允许用鼠标拖拽滚动",
          autoplay: "是否自动滚动；默认延迟 4000ms",
          autoSize: "是否允许幻灯片使用不同宽度",
          defaultPage: "初始滚动到的页码；无需控制轮播页码时使用",
          id: "组件内部状态机的唯一标识",
          ids: "轮播内各元素的 id；便于组合使用",
          inViewThreshold: "判断条目是否进入可视区域的阈值",
          loop: "轮播是否循环",
          orientation: "轮播方向，可为 `horizontal` 或 `vertical`",
          padding: "滚动区域四周的额外空间；用于让相邻条目部分保持可见",
          page: "轮播的受控页码",
          slideCount: "幻灯片总数；用于 SSR 渲染初始吸附点状态",
          slidesPerMove: "每次滚动的幻灯片数量；设为 `auto` 时，由 `slidesPerPage` 决定",
          slidesPerPage: "同时显示的幻灯片数量",
          snapType: "条目的吸附类型",
          spacing: "条目间距",
          translations: "本地化文案",
        },
      },
    },
  },
  "cascade-select": {
    description:
      'CascadeSelect：级联选择器。选择一个分支后，下一列在其旁边淡入展开，直到点击叶节点确定整条路径。`modelValue` 是选中的路径；开启 `multiple` 时是路径数组，拼接好的标签显示在触发器上。`highlightTrigger: "hover"` 会切换为经典级联菜单，悬停即可展开。`filterable` 在查询期间把多列结构换成平铺的匹配路径列表，每条结果仍显示完整路径。',
    parts: {
      CascadeSelect: {
        description:
          'CascadeSelect：级联选择器。选择一个分支后，下一列在其旁边淡入展开，直到点击叶节点确定整条路径。`modelValue` 是选中的路径；开启 `multiple` 时是路径数组，拼接好的标签显示在触发器上。`highlightTrigger: "hover"` 会切换为经典级联菜单，悬停即可展开。`filterable` 在查询期间把多列结构换成平铺的匹配路径列表，每条结果仍显示完整路径。',
        props: {
          size: "触发器高度，可为 `sm`、`md` 或 `lg`",
        },
      },
    },
  },
  chart: {
    description:
      "基于设计令牌的图表：Chart 组件渲染由 mark 工厂构建的 ChartDefinition，调色板（chartColors、chartSeriesRange）为 mark 提供当前主题的配色。",
  },
  checkbox: {
    description:
      "Checkbox：复选框。方形控件在勾选后使用 primary 墨色平铺填充，标记以回弹曲线出现。部件：Root、Label、Control、Indicator、HiddenInput。",
    parts: {
      Group: {
        props: {
          defaultValue: "非受控时 `value` 的初始值",
          disabled: "为 `true` 时禁用复选框组",
          invalid: "为 `true` 时复选框组无效",
          maxSelectedValues: "可选值的最大数量",
          modelValue: "复选框组的受控值",
          name: "复选框组内输入字段的名称，用于表单提交",
          readOnly: "为 `true` 时复选框组只读",
        },
      },
      Root: {
        props: {
          size: "复选框尺寸，可为 `sm`、`md` 或 `lg`；勾选图标随之缩放",
          checked: "复选框的受控选中状态",
          defaultChecked: "复选框初始选中状态；无需控制选中状态时使用",
          disabled: "复选框是否禁用",
          form: "复选框所属表单的 id",
          id: "组件内部状态机的唯一标识",
          ids: "复选框内各元素的 id；便于组合使用",
          invalid: "复选框是否无效",
          name: "复选框输入字段的名称，用于表单提交",
          readOnly: "复选框是否只读",
          required: "复选框是否必填",
          value: "复选框 input 的值，用于表单提交",
        },
      },
    },
  },
  "checkbox-group": {
    description:
      'CheckboxGroup：复选框组，用一个标签管理多个答案。一组带标签的复选框纵向或横向排列，并绑定同一个数组。切换复选框会添加或移除它的值；组本身只提供语义（`role="group"`），复选框仍由状态机驱动。放进 `Field.Root` 后，组会接入字段上下文；Form 按名称传入的 invalid 和 disabled 状态会同时作用于每个复选框。',
    parts: {
      CheckboxGroup: {
        description:
          'CheckboxGroup：复选框组，用一个标签管理多个答案。一组带标签的复选框纵向或横向排列，并绑定同一个数组。切换复选框会添加或移除它的值；组本身只提供语义（`role="group"`），复选框仍由状态机驱动。放进 `Field.Root` 后，组会接入字段上下文；Form 按名称传入的 invalid 和 disabled 状态会同时作用于每个复选框。',
        props: {
          size: "复选框组统一的尺寸档位；写入各根元素的 data-size，供样式表调整",
        },
      },
    },
  },
  chip: {
    description: '计数徽标：显示数值，超过 `max` 时折叠为 "99+"。',
    parts: {
      Chip: {
        description: '计数徽标：显示数值，超过 `max` 时折叠为 "99+"。',
      },
    },
  },
  "client-only": {
    description:
      "ClientOnly：只在客户端 hydration 之后渲染子节点，用于服务端渲染页面中只能运行在浏览器的小部件。和 Ark 的其他 utility 一样无头，不提供视觉层。",
  },
  clipboard: {
    description:
      "Clipboard：剪贴板输入。值字段带发丝线，旁边是图标大小的复制触发器；复制确认后图标转为竹青色。部件：Root、Label、Control、Input、Trigger、Indicator、Context、HiddenInput。",
    parts: {
      Root: {
        props: {
          size: "值输入框和复制按钮的高度，可为 `sm`、`md` 或 `lg`",
          defaultValue: "初始复制到剪贴板的值；无需控制剪贴板值时使用",
          id: "组件内部状态机的唯一标识",
          ids: "剪贴板组件内各元素的 id；便于组合使用",
          modelValue: "剪贴板组件的 v-model 值",
          timeout: "复制超时时间",
          translations: "无障碍元素及其状态的本地化文案",
        },
      },
    },
  },
  collapsible: {
    description:
      "Collapsible：折叠面板。触发器落在纸面上，面板按状态机测得的高度淡入展开。部件：Root、Trigger、Content、Indicator。",
    parts: {
      Root: {
        props: {
          collapsedHeight: "内容折叠后的高度",
          collapsedWidth: "内容折叠后的宽度",
          defaultOpen: "折叠组件初始是否展开；无需控制展开状态时使用",
          disabled: "折叠组件是否禁用",
          id: "组件内部状态机的唯一标识",
          ids: "折叠组件内各元素的 id；便于组合使用",
          lazyMount: "是否延迟挂载",
          open: "折叠组件的受控展开状态",
          unmountOnExit: "离场时是否卸载",
        },
      },
    },
  },
  collection: {
    description:
      "Collection：供状态机组件使用的 list 和 tree collection，与各自的 namespace 导出一起提供。",
  },
  "color-picker": {
    description:
      "ColorPicker：颜色选择器。控件大小的色块显示当前颜色，展开后提供取色区域和通道滑块。部件：Root、Label、Control、Trigger、Positioner、Content、Area、AreaThumb、AreaBackground、ValueText、ValueSwatch、ChannelSlider、ChannelSliderLabel、ChannelSliderTrack、ChannelSliderThumb、ChannelSliderValueText、ChannelInput、TransparencyGrid、SwatchGroup、SwatchTrigger、SwatchIndicator、Swatch、EyeDropperTrigger、FormatTrigger、FormatSelect、HiddenInput、Context。",
    parts: {
      Root: {
        props: {
          size: "色样按钮的高度，可为 `sm`、`md` 或 `lg`",
          closeOnSelect: "选择色样后是否关闭取色器",
          defaultFormat: "初始颜色格式；无需控制取色器颜色格式时使用",
          defaultOpen: "取色器初始是否展开；无需控制展开状态时使用",
          defaultValue: "初始颜色值；无需控制取色器颜色值时使用",
          disabled: "取色器是否禁用",
          format: "取色器的受控颜色格式",
          id: "组件内部状态机的唯一标识",
          ids: "取色器内各元素的 id；便于组合使用",
          initialFocusEl: "取色器打开时的初始焦点元素",
          inline: "取色器是否内联",
          invalid: "取色器是否无效",
          modelValue: "取色器的 v-model 值",
          name: "表单输入字段的名称",
          open: "取色器的受控展开状态",
          openAutoFocus: "取色器打开时是否自动聚焦",
          positioning: "取色器的定位选项",
          readOnly: "取色器是否只读",
          required: "取色器是否必填",
        },
      },
      SwatchTrigger: {
        props: {
          disabled: "色样触发器是否禁用",
          value: "颜色值",
        },
      },
      Swatch: {
        props: {
          respectAlpha: "颜色是否包含 alpha 通道",
          value: "颜色值",
        },
      },
    },
  },
  combobox: {
    description:
      "Combobox：组合框。输入框沿用控件样式，匹配列表淡入展开为纸质浮层，选中行使用墨色平铺填充。部件：Root、Label、Control、Input、Trigger、ClearTrigger、Positioner、Content、List、Empty、Item、ItemText、ItemIndicator、ItemGroup、ItemGroupLabel。",
    parts: {
      Item: {
        props: {
          item: "要渲染的条目",
          persistFocus: "悬停移出后是否清除高亮",
        },
      },
      Root: {
        props: {
          size: "字段行高度，可为 `sm`、`md` 或 `lg`",
          allowCustomValue: "是否允许在输入框中输入自定义值",
          alwaysSubmitOnEnter:
            "是否跳过默认两步行为（先按 Enter 关闭组合框，再按 Enter 提交表单），让 Enter 直接提交表单；适合单字段自动补全表单",
          autoFocus: "挂载时是否自动聚焦输入框",
          closeOnSelect: "选中条目后是否关闭组合框",
          collection: "条目集合",
          composite: "组合框是否与标签页等复合组件组合使用",
          defaultHighlightedValue: "组合框初始高亮值；无需控制高亮值时使用",
          defaultInputValue: "组合框输入框初始值；无需控制输入值时使用",
          defaultOpen: "组合框初始是否展开；无需控制展开状态时使用",
          defaultValue: "组合框已选项初始值；无需控制已选值时使用",
          disabled: "组合框是否禁用",
          disableLayer: "是否禁止把该组件注册为可关闭层",
          form: "组合框关联的表单",
          highlightedValue: "组合框的受控高亮值",
          id: "组件内部状态机的唯一标识",
          ids: "组合框内各元素的 id；便于组合使用",
          inputBehavior:
            "组合框的自动补全行为：`autohighlight` 表示输入时高亮第一个获得焦点的条目；`autocomplete` 表示用方向键在列表框中导航时选中条目并更新输入框",
          inputValue: "组合框输入框的受控值",
          invalid: "组合框是否无效",
          loopFocus: "键盘导航是否在条目间循环",
          modelValue: "组合框的 v-model 值",
          multiple:
            "是否允许多选；`multiple` 为 `true` 时，`selectionBehavior` 会自动设为 `clear`，建议把已选项放在单独容器中渲染",
          name: "组合框输入框的 `name` 属性，用于表单提交",
          navigate: "用于导航到已选项的函数",
          open: "组合框的受控展开状态",
          openOnChange: "输入值变化时是否显示组合框弹层",
          openOnClick: "首次点击输入框时是否打开组合框弹层",
          openOnKeyPress: "按下方向键时是否打开组合框弹层",
          placeholder: "组合框输入框的占位文本",
          positioning: "组合框弹层的动态定位选项",
          readOnly: "组合框是否只读；只读时输入框不可编辑，但仍可交互",
          required: "组合框是否必填",
          scrollToIndexFn: "滚动到指定索引的函数",
          selectionBehavior:
            "选中条目后输入框的处理方式：`replace` 表示把选中项文本设为输入值；`clear` 表示清空输入值；`preserve` 表示保留输入值",
          translations: "无障碍元素及其状态的本地化文案",
        },
      },
      Trigger: {
        props: {
          focusable: "触发器是否可聚焦",
        },
      },
    },
  },
  command: {
    description:
      "Command：命令面板。页面顶部出现模态浮层，内含搜索字段和调用方传入的命令；命令按组显示，每行有按键提示。外壳使用 dialog 状态机，提供 scrim、焦点陷阱和 Escape；搜索由 combobox 状态机驱动自有列表。容器和列表都在浮层内，combobox 不再渲染单独弹层，状态机内容挂接到浮层列表。input 部件带有一个 `as never`：它的 prop 联合类型超出了 h() 的可解析范围（TS2590）。",
    parts: {
      Command: {
        description:
          "Command：命令面板。页面顶部出现模态浮层，内含搜索字段和调用方传入的命令；命令按组显示，每行有按键提示。外壳使用 dialog 状态机，提供 scrim、焦点陷阱和 Escape；搜索由 combobox 状态机驱动自有列表。容器和列表都在浮层内，combobox 不再渲染单独弹层，状态机内容挂接到浮层列表。input 部件带有一个 `as never`：它的 prop 联合类型超出了 h() 的可解析范围（TS2590）。",
      },
    },
  },
  comment: {
    description:
      "Comment：评论组件。头像插槽放在左侧，正文上方显示 `author` 和 `datetime` 组成的署名，默认插槽放内容，actions 插槽放一排回复操作。",
  },
  "config-provider": {
    description:
      "ConfigProvider：提供设计令牌层 `[data-density]` 选择器定义的四个密度档位。密度只压缩留白和控件高度，不牺牲可读性。",
    parts: {
      ConfigProvider: {
        description:
          "全局配置的声明式宿主。这个元素既承载设计令牌层属性（`[data-density]` 与 `[data-accent]` 可放在任意元素上），又通过 `useConfig` 把同一组值提供给后代，使交互行为（格式化、消息）和视觉主题共用一个配置来源。",
      },
    },
  },
  container: {
    description:
      "Container：版心容器。内容限制在指定行宽内并居中。尺寸对应排版行宽而不是断点；页面决定边缘，容器只决定一行文字的长度。",
    parts: {
      Container: {
        props: {
          size: "内容排版宽度，可为 `narrow`、`readable`、`wide` 或 `full`",
        },
      },
    },
  },
  "data-view": {
    description:
      "DataView：数据视图，同一份数据支持两种布局。调用方通过 item 插槽渲染每条记录，视图把记录排成列表或网格；指定页大小时，直接复用 pagination 家族的部件分页，而不是另写一套实现。",
    parts: {
      DataView: {
        description:
          "DataView：数据视图，同一份数据支持两种布局。调用方通过 item 插槽渲染每条记录，视图把记录排成列表或网格；指定页大小时，直接复用 pagination 家族的部件分页，而不是另写一套实现。",
        props: {
          layout: "数据视图布局，可为列表行或卡片网格",
          pageSize: "每页记录数；不设置则一次显示全部",
        },
      },
    },
  },
  "date-input": {
    description:
      "DateInput：日期输入。字段按日期段分段显示，聚焦的段使用墨色平铺填充。部件：Root、Label、Control、SegmentGroup、Segment、SegmentContext、HiddenInput。",
    parts: {
      Root: {
        props: {
          size: "分段字段高度，可为 `sm`、`md` 或 `lg`",
          allSegments: "是否根据粒度包含所有日期和时间分段",
          defaultPlaceholderValue: "初始占位日期值",
          defaultValue: "初始选中日期；无需控制选中日期时使用",
          disabled: "日期输入框是否禁用",
          form: "隐藏 input 关联的表单",
          format: "输入框中显示的日期格式",
          formatter: "格式化日期分段的函数",
          granularity: "日期输入框的粒度",
          hideTimeZone: "值为 `ZonedDateTime` 时是否隐藏时区分段",
          hourCycle: "格式化时间分段的小时制",
          id: "组件内部状态机的唯一标识",
          ids: "日期输入框内各元素的 id；便于组合使用",
          invalid: "日期输入框是否无效",
          locale: "格式化日期时使用的区域设置（BCP 47 语言标签）",
          max: "可选的最大日期",
          min: "可选的最小日期",
          modelValue: "日期输入框的 v-model 值",
          name: "隐藏 input 的 `name` 属性",
          placeholderValue: "用于生成占位分段的占位日期",
          readOnly: "日期输入框是否只读",
          required: "日期输入框是否必填",
          selectionMode:
            "日期输入框的选择模式：`single` 表示只能选择一个日期；`range` 表示可以选择日期范围",
          shouldForceLeadingZeros: "数字分段是否补前导零",
          timeZone: "使用的时区",
          translations: "本地化文案",
          value: "受控的选中日期",
        },
      },
    },
  },
  "date-picker": {
    description:
      "DatePicker：日期选择器。弹层带 elevation 淡入，选中的日期使用墨色平铺填充，范围中间的日期以切角弱化显示。部件：Root、Label、Control、Input、Trigger、ClearTrigger、Positioner、Content、View、ViewControl、ViewTrigger、RangeText、PrevTrigger、NextTrigger、Table*、MonthSelect、YearSelect、PresetTrigger。",
    parts: {
      Input: {
        props: {
          fixOnBlur: "失焦时是否修正输入值",
          index: "要聚焦的输入框索引",
        },
      },
      Root: {
        props: {
          size: "字段行高度，可为 `sm`、`md` 或 `lg`",
          closeOnSelect: "日期选择完成后是否关闭日历；选择模式为 `multiple` 时忽略",
          createCalendar:
            '根据日历标识创建 Calendar 对象的函数；用于支持波斯历、佛历、伊斯兰历等非公历，避免默认打包所有日历；示例：import { createCalendar } from "@internationalized/date" { locale: "fa-IR", createCalendar }',
          defaultFocusedValue: "初始焦点日期；无需控制日期选择器的焦点日期时使用",
          defaultOpen: "日期选择器初始是否展开；无需控制展开状态时使用",
          defaultValue: "初始选中日期；无需控制日期选择器的选中日期时使用",
          defaultView: "日历默认视图",
          disabled: "日历是否禁用",
          fixedWeeks: "日历是否固定为 6 周；固定时不随月份在 5 周和 6 周间变化",
          focusedValue: "受控的焦点日期",
          format: "输入框中显示的日期格式",
          id: "组件内部状态机的唯一标识",
          ids: "日期选择器内各元素的 id；便于组合使用",
          inline: "日期选择器是否内联",
          invalid: "日期选择器是否无效",
          isDateUnavailable: "判断日历中某个日期是否可选的函数",
          locale: "格式化日期时使用的区域设置（BCP 47 语言标签）",
          max: "可选的最大日期",
          maxSelectedDates: "最多可选日期数；仅在 `selectionMode` 为 `multiple` 时生效",
          maxView: "日历允许的最大视图",
          min: "可选的最小日期",
          minView: "日历允许的最小视图",
          modelValue: "日期选择器的 v-model 值",
          name: "输入框的 `name` 属性",
          numOfMonths: "显示的月份数",
          open: "日期选择器的受控展开状态",
          openOnClick: "点击输入框时是否打开日历",
          outsideDaySelectable: "可见范围外的日期是否可选",
          parse: "把输入内容解析回 DateValue 的函数",
          placeholder: "输入框的占位文本",
          positioning: "使用者提供的日期选择器内容定位选项",
          readOnly: "日历是否只读",
          required: "日期选择器是否必填",
          selectionMode:
            "日历的选择模式：`single` 表示只能选择一个日期；`multiple` 表示可以选择多个日期；`range` 表示可以选择日期范围",
          showWeekNumbers: "日视图中是否显示周数列",
          startOfWeek:
            "每周第一天：`0` 表示周日，`1` 表示周一，`2` 表示周二，`3` 表示周三，`4` 表示周四，`5` 表示周五，`6` 表示周六",
          timeZone: "使用的时区",
          translations: "本地化文案",
          view: "日历视图",
        },
      },
      ValueText: {
        props: {
          placeholder: "未选择日期时显示的文本",
          separator: "默认渲染时多个日期值之间的分隔符",
        },
      },
    },
  },
  "deferred-content": {
    description:
      "DeferredContent：延迟渲染内容。占位符接近视口前，插槽不进入 DOM；接近后挂载一次并保留。占位符由调用方通过 placeholder 插槽绘制，因此迟到内容不会带来无法预测的布局偏移。",
    parts: {
      DeferredContent: {
        description:
          "DeferredContent：延迟渲染内容。占位符接近视口前，插槽不进入 DOM；接近后挂载一次并保留。占位符由调用方通过 placeholder 插槽绘制，因此迟到内容不会带来无法预测的布局偏移。",
        props: {
          threshold: "内容挂载前占位元素需要达到的可见比例；0 表示任意像素可见，1 表示完整可见",
        },
      },
    },
  },
  descriptions: {
    description:
      "Descriptions：描述列表。term 和 detail 成对排在一个安静的网格中。水平布局相当于两列表格；垂直布局把每一对纵向堆叠，适合窄版心。",
    parts: {
      Descriptions: {
        props: {
          bordered: "是否显示边框",
          column: "每行键值对组数",
        },
      },
      DescriptionsItem: {
        props: {
          span: "该条目横跨的键值对组数",
        },
      },
    },
  },
  dialog: {
    description:
      "Dialog：对话框。面板带 elevation 淡入，背景遮罩淡入，嵌套浮层通过共享 z-index 阶梯堆叠。部件：Root、Trigger、Backdrop、Positioner、Content、Title、Description、CloseTrigger。",
    parts: {
      Root: {
        props: {
          "aria-label": "未渲染对话框标题时使用的可读标签",
          closeOnEscape: "按下 Esc 键时是否关闭对话框",
          closeOnInteractOutside: "点击外部时是否关闭对话框",
          defaultOpen: "对话框初始是否打开；无需控制打开状态时使用",
          defaultTriggerValue: "初始触发器值；无需控制触发器值时使用",
          finalFocusEl: "对话框关闭后聚焦的元素",
          id: "组件内部状态机的唯一标识",
          ids: "对话框内各元素的 id；便于组合使用",
          initialFocusEl: "对话框打开后聚焦的元素",
          modal: "是否阻止元素外部的指针交互，并隐藏其下方内容",
          open: "对话框的受控打开状态",
          persistentElements: "返回不应禁用 pointer-events、也不应触发关闭事件的常驻元素",
          preventScroll: "对话框打开时是否阻止背后的页面滚动",
          restoreFocus: "是否把焦点恢复到对话框打开前聚焦的元素",
          role: "对话框的 role",
          trapFocus: "对话框打开时是否把焦点限制在内部",
          triggerValue: "当前打开对话框的触发器值",
        },
      },
      Trigger: {
        props: {
          value: "触发器的标识值",
        },
      },
    },
  },
  dock: {
    description:
      "Dock：放大式程序坞。浮动栏中的图标朝指针方向放大。包装器逐项测量并写入 `--bs-dock-scale`；CSS 负责缓动追踪，因此不需要引入回弹引擎。",
    parts: {
      SDockRoot: {
        description:
          "Dock：放大式程序坞。浮动栏中的图标朝指针方向放大。包装器逐项测量并写入 `--bs-dock-scale`；CSS 负责缓动追踪，因此不需要引入回弹引擎。",
      },
      SDockItem: {
        description: "工具栏中的一个停靠位。插槽内容从底边开始放大，而不是从中心缩放。",
      },
    },
  },
  "download-trigger": {
    description:
      "DownloadTrigger：从普通元素触发内存数据的客户端下载，是保存按钮的无头版本。同时暴露组件底层的 composable，用于自定义触发器。",
  },
  drawer: {
    description:
      "Drawer：抽屉。整高面板从所在边缘滑入，并与边缘对齐，滑动位置由状态机的 translate 控制，顶部提供抓取条。部件：Root、Trigger、Backdrop、Positioner、Content、Grabber、GrabberIndicator、Title、Description、CloseTrigger、SwipeArea。",
    parts: {
      Root: {
        props: {
          closeOnEscape: "按下 Esc 键时是否关闭抽屉",
          closeOnInteractOutside: "点击外部时是否关闭抽屉",
          closeThreshold: "关闭抽屉的距离阈值",
          defaultOpen: "抽屉初始是否打开",
          defaultSnapPoint: "抽屉的默认吸附点",
          defaultTriggerValue: "初始触发器值；无需控制触发器值时使用",
          finalFocusEl: "抽屉关闭后聚焦的元素",
          id: "组件内部状态机的唯一标识",
          ids: "抽屉内各元素的 id；便于组合使用",
          initialFocusEl: "抽屉打开后聚焦的元素",
          modal: "是否阻止元素外部的指针交互，并隐藏其下方内容",
          open: "抽屉是否打开",
          preventDragOnScroll: "是否阻止在可滚动元素上拖拽",
          preventScroll: "抽屉打开时是否阻止背后的页面滚动",
          restoreFocus: "是否把焦点恢复到抽屉打开前聚焦的元素",
          role: "抽屉的 role",
          snapPoint: "当前启用的吸附点",
          snapPoints: "抽屉的吸附点",
          snapToSequentialPoints: "滑动时是否依次吸附到相邻吸附点",
          swipeDirection: "抽屉可滑动的方向",
          swipeVelocityThreshold: "关闭抽屉的速度阈值（像素/秒）",
          trapFocus: "抽屉打开时是否把焦点限制在内部",
          triggerValue: "当前打开抽屉的触发器值",
        },
      },
    },
  },
  "dynamic-input": {
    description:
      "DynamicInput：动态输入列表。每行一个 Input，带一个低调的移除按钮，末尾提供添加行。列表受控：每次编辑都会发出新的数组，父级数组是唯一数据源。删除不会少于 `min`，添加不会超过 `max`，且组始终保留一行；否则清空后的录入列表会让使用者无处输入。",
    parts: {
      DynamicInput: {
        description:
          "DynamicInput：动态输入列表。每行一个 Input，带一个低调的移除按钮，末尾提供添加行。列表受控：每次编辑都会发出新的数组，父级数组是唯一数据源。删除不会少于 `min`，添加不会超过 `max`，且组始终保留一行；否则清空后的录入列表会让使用者无处输入。",
        props: {
          modelValue: "每行的值；每个条目渲染一个 Input",
          min: "组件组保留的最少行数；达到下限时删除按钮不再可用",
          max: "组件组最多可达到的行数；达到上限后添加按钮不再可用",
          addLabel: "添加按钮显示的文本",
          size: "每行输入框和删除按钮使用的尺寸档位",
        },
      },
    },
  },
  editable: {
    description:
      "Editable：行内编辑文本。阅读时只显示文字，编辑时显示完整字段样式。部件：Root、Area、Label、Preview、Input、EditTrigger、SubmitTrigger、CancelTrigger、Control。Preview 把状态机的值渲染为文本（asChild 逃生口仍归 Ark 基础组件）。",
    parts: {
      Root: {
        props: {
          size: "编辑字段使用的控件高度档位",
          activationMode:
            '预览元素的激活模式：`"focus"` 表示聚焦预览时进入编辑模式，`"dblclick"` 表示双击预览时进入编辑模式，`"click"` 表示点击预览时进入编辑模式',
          autoResize: "可编辑组件是否随内容自动调整尺寸",
          defaultEdit: "可编辑组件是否默认进入编辑模式",
          defaultValue: "可编辑组件的初始值；适合不需要受控值的场景",
          disabled: "是否禁用可编辑组件",
          edit: "是否处于编辑模式",
          finalFocusEl: "可编辑组件关闭时接收焦点的元素",
          form: "底层 input 关联的表单",
          id: "组件内部状态机的唯一标识",
          ids: "可编辑组件各元素的 id，便于组合使用",
          invalid: "输入值是否无效",
          maxLength: "可编辑组件允许输入的最大字符数",
          modelValue: "可编辑组件的 v-model 值",
          name: "可编辑组件的 name 属性，用于表单提交",
          placeholder: "可编辑组件的占位文本",
          readOnly: "是否只读",
          required: "是否必填",
          selectOnFocus: "输入框获得焦点时是否选中文本",
          submitMode:
            '编辑模式下的提交触发方式：`"enter"` 表示按 `Enter` 提交，`"blur"` 表示失焦提交，`"none"` 表示不自动提交、需使用提交按钮，`"both"` 表示按 `Enter` 或输入框失焦时提交',
          translations: "可编辑组件的国际化文案",
        },
      },
    },
  },
  ellipsis: {
    description:
      "Ellipsis：文本截断。文本可截断为一行，或限制为 N 行。基础组件只负责截断；是否通过 title 或 tooltip 提供完整文本，由使用者决定。",
  },
  empty: {
    description:
      "Empty：空状态。Root 让列内容居中，Visual 放标识，Title 和 Description 放说明，Actions 放后续操作；这些部件可以按需组合。",
  },
  field: {
    description:
      "Field：表单字段。提供带字距的 label、边框加聚焦光晕的控件，以及低调的帮助文本。部件：Root、Label、Input、Textarea、Select、HelperText、ErrorText、RequiredIndicator。",
    parts: {
      Root: {
        props: {
          disabled: "是否禁用字段",
          id: "字段的 id",
          ids: "字段各部件的 id",
          invalid: "字段是否无效",
          readOnly: "字段是否只读",
          required: "字段是否必填",
          target: "标签指向的目标字段项值",
        },
      },
      Textarea: {
        props: {
          autoresize: "文本域是否自动调整高度",
        },
      },
    },
  },
  fieldset: {
    description:
      "Fieldset：字段组。宋体衬线 legend 位于一列字段上方。部件：Root、Legend、HelperText、ErrorText。",
    parts: {
      Root: {
        props: {
          disabled: "是否禁用字段集",
          id: "字段集的 id",
          invalid: "字段集是否无效",
        },
      },
    },
  },
  "file-upload": {
    description:
      "FileUpload：文件上传。虚线拖放区在拖过时出现浅色光感，已接受的文件显示为松散的发丝线条目。部件：Root、Label、Trigger、Dropzone、HiddenInput、ItemGroup、Item、ItemName、ItemSizeText、ItemPreview、ItemPreviewImage、ItemDeleteTrigger、ClearTrigger、Context。",
    parts: {
      Dropzone: {
        props: {
          disableClick: "是否禁用拖放区的 click 事件",
        },
      },
      ItemPreview: {
        props: {
          type: "要匹配的文件类型；默认匹配所有文件类型",
        },
      },
      Root: {
        props: {
          size: "触发器使用的控件高度档位",
          accept: "可接受的文件类型",
          acceptedFiles: "已接受文件的受控值",
          allowDrop: "是否允许在拖放区内拖放文件",
          capture: "拍摄媒体时使用的默认摄像头",
          defaultAcceptedFiles: "默认已接受的文件",
          directory: "是否接受目录；仅在 WebKit 浏览器中有效",
          disabled: "是否禁用文件输入框",
          id: "组件内部状态机的唯一标识",
          ids: "各元素的 id，便于组合使用",
          invalid: "文件输入框是否无效",
          locale: "当前语言环境，基于 BCP 47 标准",
          maxFiles: "文件数量上限",
          maxFileSize: "文件大小上限（字节）",
          minFileSize: "文件大小下限（字节）",
          name: "底层文件输入框的 name 属性",
          preventDocumentDrop: "是否阻止 document 上的 drop 事件",
          readOnly: "文件输入框是否只读",
          required: "文件输入框是否必填",
          transformFiles: "转换文件的函数",
          translations: "本地化提示文案",
          validate: "校验文件的函数",
        },
      },
    },
  },
  "float-button": {
    description: "FloatButton：浮动按钮。组内的展开状态从挂载点共享给各个部件。",
    parts: {
      FloatButtonRoot: {
        description:
          "悬浮动作组件同时覆盖 FAB 和 speed dial：Root 把组固定在页面角落并管理展开状态（受控时镜像 `open`），Trigger 切换展开，每个 Item 是圆形动作按钮，展开时名称显示在旁边。按钮复用共享样式，这里容器为圆形；组件只负责悬浮定位、展开和收起。",
        props: {
          open: "组的受控展开状态；未设置时由组自行维护，设置后触发器通过 `update:open` 回调同步",
          placement: "组停靠的角落",
          size: "整组按钮使用的尺寸档位",
        },
      },
      FloatButtonTrigger: {
        props: {
          label: "无障碍名称；控件只显示图标",
        },
      },
      FloatButtonItem: {
        props: {
          label: "操作名称；作为按钮的无障碍名称，组展开时也显示在按钮旁",
        },
      },
    },
  },
  "floating-panel": {
    description:
      "FloatingPanel：浮动面板。基于共享弹层容器，面板可拖拽、可调整大小，header 就是拖拽手柄。部件：Root、Trigger、Positioner、Content、Header、Title、Control、DragTrigger、StageTrigger、CloseTrigger、ResizeTrigger、Body。",
    parts: {
      ResizeTrigger: {
        props: {
          axis: "调整手柄的轴向",
        },
      },
      Root: {
        props: {
          allowOverflow: "拖拽时是否强制面板留在边界内",
          closeOnEscape: "按下 Escape 时是否关闭面板",
          defaultOpen: "面板的初始展开状态；适合不需要受控展开状态的场景",
          defaultPosition: "面板的初始位置；适合不需要受控位置的场景",
          defaultSize: "面板的默认尺寸",
          dir: "文档的书写方向",
          disabled: "是否禁用面板",
          draggable: "面板是否可拖拽",
          finalFocusEl: "面板关闭时接收焦点的元素",
          getAnchorPosition: "返回面板打开时初始位置的函数；提供后替代默认位置",
          getBoundaryEl: "面板边界元素；调整尺寸时可用于重新计算边界矩形",
          gridSize: "拖拽面板时的吸附网格",
          id: "组件内部状态机的唯一标识",
          ids: "浮动面板各元素的 id，便于组合使用",
          initialFocusEl: "面板打开时接收焦点的元素",
          lockAspectRatio: "面板是否锁定宽高比",
          maxSize: "面板的最大尺寸",
          minSize: "面板的最小尺寸",
          open: "面板的受控展开状态",
          persistRect: "关闭时是否保留面板尺寸和位置",
          position: "面板的受控位置",
          resizable: "面板是否可调整尺寸",
          restoreFocus: "面板关闭时是否把焦点还原到触发器",
          size: "面板的尺寸",
          strategy: "定位策略",
          translations: "浮动面板的国际化文案",
        },
      },
      StageTrigger: {
        props: {
          stage: "面板当前所处阶段",
        },
      },
    },
  },
  "focus-trap": {
    description:
      "FocusTrap：在子树内捕获焦点，供不属于 dialog 状态机但仍需要键盘边界的容器使用。和 Ark 的其他 utility 一样无头。",
  },
  form: {
    description: "Form：表单元素本身。拦截原生 submit 并把事件交给引擎，同时提供统一的网格和间距。",
    parts: {
      Form: {
        description:
          "Form：表单元素本身。拦截原生 submit 并把事件交给引擎，同时提供统一的网格和间距。",
        props: {
          form: "`useForm` 返回的表单引擎实例，管理表单值、校验和提交；可省略——无引擎时退化为布局容器与原生语义",
        },
      },
      FormField: {
        description:
          "表单栅格中的字段槽位，包含标签、控件和提示，也显示引擎为该 `name` 返回的错误；这些内容复用独立 Field 组件的样式。默认插槽接收引擎生成的字段对象（`value`、`handleChange`、`handleBlur`、full state），控件绑定所需的数据都在这里。",
        props: {
          form: "覆盖外层 `Form` 使用的引擎；适合单独组装的字段",
          name: "该字段值和错误信息在表单引擎中的键",
          label: "控件上方的标题",
          hint: "控件下方的提示文字；没有错误时显示",
          required: "是否为标签添加必填标记",
          invalid: "是否强制显示无效样式，不依赖表单引擎的校验结果",
          disabled: "是否禁用该插槽",
        },
      },
    },
  },
  format: {
    description:
      "Format：格式化组件。用 Intl 格式化数字、货币、字节和相对时间。部件：Number、Byte、Time、RelativeTime。",
    parts: {
      Byte: {
        props: {
          unit: "显示字节时使用的单位粒度",
          unitDisplay: "单位的显示方式",
          unitSystem: "格式化使用的单位制",
          value: "要格式化的字节数",
        },
      },
      Number: {
        props: {
          value: "要格式化的字节数",
        },
      },
      RelativeTime: {
        props: {
          localeMatcher:
            "区域设置匹配算法；详情见 [Intl 文档](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation)",
          numeric: "输出消息的格式",
          style: "国际化消息的长度",
          value: "要格式化的日期",
        },
      },
      Time: {
        props: {
          value: "要格式化的时间",
        },
      },
    },
  },
  frame: {
    description:
      "Frame：沙箱 iframe 容器。body 渲染默认插槽，`head` 插槽把 style 和 link 元素传送到 iframe 文档；子内容渲染的样式必须通过它传递。（React 包装器用 `head` prop 接收同样内容；两个框架的行为不一致，这是 Ark 的渲染方式决定的。）框架会测量内容并增高适配。容器边框和纸面由使用者提供，因为 iframe 没有 core 样式表可挂载的 anatomy 属性。",
  },
  grid: {
    description:
      "Grid：等宽轨道的对齐网格。轨道数量由列数决定；设置 `minChildWidth` 后，则按容器能放下多少轨道自动计算。",
  },
  highlight: {
    description:
      "Highlight：搜索命中高亮。命中文字使用 accent 的浅色背景，不是霓虹效果。组件渲染普通 `<mark>` 元素，外观由全文档的 mark 默认样式承担。部件。",
  },
  "hover-card": {
    description:
      "HoverCard：悬停卡片。预览卡片在普通 inline 链接上方淡入，不会抢走焦点。部件：Root、Trigger、Positioner、Content、Arrow、ArrowTip。",
    parts: {
      Root: {
        props: {
          closeDelay: "鼠标离开触发器或内容后，悬停卡片关闭的延迟时间",
          defaultOpen: "悬停卡片的初始展开状态；适合不需要受控展开状态的场景",
          defaultTriggerValue: "触发器的初始值；适合不需要受控触发器值的场景",
          disabled: "是否禁用悬停卡片",
          id: "组件内部状态机的唯一标识",
          ids: "悬停卡片各元素的 id，便于组合使用",
          open: "悬停卡片的受控展开状态",
          openDelay: "鼠标移入触发器后，悬停卡片打开的延迟时间",
          positioning: "用户传入的 popover 内容定位选项",
          triggerValue: "当前打开悬停卡片的触发器值",
        },
      },
      Trigger: {
        props: {
          value: "用于标识该触发器的值",
        },
      },
    },
  },
  icon: {
    description:
      "Icon：图标容器。用一个标准盒子让 inline svg 保持光学尺寸，并继承文字颜色；图标本身不携带颜色和尺寸。可以通过 `name` 从注册表取图标，也可以传入自定义图标。",
    parts: {
      Icon: {
        props: {
          size: "尺寸档位随周围字号变化；默认为 `inherit`，即图标所在文本的 `1em`",
          label: "无障碍名称；未设置时图标仅用于呈现，并从无障碍树中隐藏",
          name: "图标库中的字形；提供默认插槽时忽略该属性，插槽内容优先于图标库",
        },
      },
    },
  },
  image: {
    description:
      "Image：图片容器。源加载期间显示骨架，图片到达后淡入；源损坏时显示 fallback 插槽，若调用方没有提供，则显示占位图标。容器尺寸由使用者指定。",
  },
  "image-cropper": {
    description:
      "ImageCropper：图片裁切器。圆角容器承载照片，选区由细发丝线框出并有光照效果。部件：Root、Viewport、Image、Selection、Handle、Grid、Context。",
    parts: {
      Grid: {
        props: {
          axis: "要显示的网格线轴向",
        },
      },
      Handle: {
        props: {
          position: "手柄位置",
        },
      },
      Root: {
        props: {
          aspectRatio:
            "裁剪区域保持的宽高比（宽 / 高）；例如 `16 / 9` 会保持 `16:9`；未设置时，裁剪区域可自由调整尺寸",
          cropShape: "裁剪区域的形状",
          defaultFlip: "图片的初始翻转状态",
          defaultRotation: "图片的初始旋转角度（度）",
          defaultZoom: "图片的初始缩放倍数",
          fixedCropArea: "裁剪区域是否固定尺寸和位置",
          flip: "图片翻转的受控状态",
          ids: "图片裁剪器各元素的 id",
          initialCrop: "裁剪区域的初始矩形；未设置时根据视口尺寸和宽高比计算默认值",
          maxHeight: "裁剪区域的最大高度",
          maxWidth: "裁剪区域的最大宽度",
          maxZoom: "允许的最大缩放倍数",
          minHeight: "裁剪区域的最小高度",
          minWidth: "裁剪区域的最小宽度",
          minZoom: "允许的最小缩放倍数",
          nudgeStep: "键盘方向键每次微调的距离（像素）",
          nudgeStepCtrl: "按住 Ctrl/Cmd 时每次微调的距离（像素）",
          nudgeStepShift: "按住 Shift 时每次微调的距离（像素）",
          rotation: "图片旋转的受控角度（0 - 360）",
          translations: "无障碍元素及其状态使用的本地化文案",
          zoom: "图片缩放的受控级别",
          zoomSensitivity: "双指缩放的响应灵敏度",
          zoomStep: "滚轮每步应用的缩放量",
        },
      },
    },
  },
  "image-viewer": {
    description:
      "ImageViewer：图片查看器。图片显示在变暗的页面上，下方有小型工具栏。使用者可直接缩放，范围为 0.5 到 3 倍；旋转每次 90°，Escape 和 scrim 都能关闭，模态行为由 dialog 状态机处理。`open` 可以由调用方管理；未定义时由查看器自行维护。",
  },
  input: {
    description:
      "Input：单行文本输入。原生控件应用字段样式：边框、表面和聚焦光晕。单独使用时根据 `invalid` prop 显示状态；放进 `Field.Root` 后接入字段上下文，自动获得 label id、described-by 关联和 invalid 状态，这也是 Form 校验层的接入点。disabled 使用原生属性。",
    parts: {
      Input: {
        description:
          "Input：单行文本输入。原生控件应用字段样式：边框、表面和聚焦光晕。单独使用时根据 `invalid` prop 显示状态；放进 `Field.Root` 后接入字段上下文，自动获得 label id、described-by 关联和 invalid 状态，这也是 Form 校验层的接入点。disabled 使用原生属性。",
        props: {
          size: "输入框使用的控件高度档位",
          mask: '输入掩码：`9` 匹配数字，`a` 匹配字母，`*` 匹配数字或字母，其他字符按字面匹配；例如 `"999-99-9999"`、`"(999) 999-9999"`',
        },
      },
    },
  },
  "input-group": {
    description:
      "InputGroup：输入组，把附加内容和输入框合并成一个控件。Root 绘制唯一的发丝线并承载组的聚焦光晕；Addon 是内凹区域，用来放输入框前后的固定内容，例如 scheme、单位或低调按钮。放入 Input 或 Textarea 后，它们自己的边框和光晕让位给组；合并由样式表完成，包装器不添加视觉。",
  },
  "json-tree-view": {
    description:
      "JsonTreeView：JSON 树视图，复用 tree-view 的样式规则并调整作用域；value 节点按表格数据展示。部件：Root、Tree，以及 createJsonTreeCollection。",
    parts: {
      KeyNode: {
        props: {
          node: "要渲染的节点",
          showQuotes: "键名是否显示引号",
        },
      },
      Root: {
        props: {
          data: "树中展示的数据",
          defaultExpandedDepth: "默认展开的层级",
          quotesOnKeys: "键名是否显示引号",
        },
      },
    },
  },
  kbd: {
    description: "Kbd：键帽。以小号样式跟随它标注的文字排版。",
    parts: {
      Kbd: {
        description: "Kbd：键帽。以小号样式跟随它标注的文字排版。",
      },
    },
  },
  layout: {
    description:
      "Layout：应用布局骨架。Root、Header、Sider、Content、Footer 组成常见管理端结构，并使用纸墨表面。Root 是全高 grid；声明 `sider` 后，列方向会根据侧栏所在边缘调整。",
  },
  link: {
    description:
      "Link：链接。平时低调，悬停时颜色加深，聚焦时显示光晕，颜色使用 accent。下划线可始终显示、仅悬停时显示或不显示。",
    parts: {
      Link: {
        description:
          "Link：链接。平时低调，悬停时颜色加深，聚焦时显示光晕，颜色使用 accent。下划线可始终显示、仅悬停时显示或不显示。",
      },
    },
  },
  list: {
    description:
      'List：列表。Root 是列表容器，Item 是一行，Leading 放文字前的标识，Content 放标题和辅助说明，Actions 放操作。bordered 变体绘制发丝线；hoverable 变体让每一行都有悬停底色；调用方把某行设为可点击（`role="button"`）后，该行自行响应指针。',
    parts: {
      ListContent: {
        description:
          "列表行的文字区域。标题和描述分别使用具名插槽，默认插槽排在后面，用于放其他内容。",
      },
      ListRoot: {
        props: {
          bordered: "是否在行间显示发丝线",
          hoverable: "行悬停时是否显示浅色背景",
        },
      },
    },
  },
  listbox: {
    description:
      "Listbox：列表框。行内容保持低调，只有选中行使用 primary 平铺填充。部件：Root、Label、Input、Content、Empty、Item、ItemText、ItemIndicator、ItemGroup、ItemGroupLabel、ValueText；collection 位于共享 collection 模块。",
    parts: {
      Input: {
        props: {
          autoHighlight: "输入时是否自动高亮选项",
          keyboardPriority:
            "输入框键盘事件的优先级：`caret` 保留原生文本编辑行为，`navigate` 把支持的按键转发给列表框导航",
        },
      },
      Item: {
        props: {
          highlightOnHover: "悬停时是否高亮选项",
          item: "要渲染的列表选项",
        },
      },
      Root: {
        props: {
          size: "行和筛选字段使用的尺寸档位",
          collection: "选项集合",
          defaultHighlightedValue: "打开时默认高亮项的值；适合不需要受控高亮值的场景",
          defaultValue: "列表框的初始默认值；适合不需要受控值的场景",
          deselectable: "是否禁止空选择",
          disabled: "是否禁用列表框",
          disallowSelectAll: "按下 `meta+a` 时是否禁止全选",
          highlightedValue: "高亮项的受控值",
          id: "组件内部状态机的唯一标识",
          ids: "列表框各元素的 id，便于组合使用",
          loopFocus: "键盘导航是否在选项间循环",
          modelValue: "列表框的模型值",
          orientation: "列表框的排列方向",
          scrollToIndexFn: "滚动到指定索引的函数",
          selectionMode:
            "列表框的选择行为：`single` 只能选择一个选项，`multiple` 不按修饰键也能选择多个，`extended` 需要配合修饰键选择多个",
          selectOnHighlight: "选项高亮时是否选中",
          typeahead: "是否启用输入即查找",
        },
      },
    },
  },
  marquee: {
    description:
      "Marquee：跑马灯。方形 chip 排成一条横向长带，两端淡出而不是硬切断。部件：Root、Viewport、Content、Edge、Item。",
    parts: {
      Edge: {
        props: {
          side: "边缘渐变显示的一侧",
        },
      },
      Root: {
        props: {
          autoFill: "是否复制内容填满容器",
          defaultPaused: "跑马灯是否默认暂停",
          delay: "动画开始前的延迟时间（秒）",
          id: "组件内部状态机的唯一标识",
          ids: "跑马灯各元素的 id，便于组合使用",
          loopCount: "动画循环次数；`0` 表示无限循环",
          paused: "跑马灯是否暂停",
          pauseOnInteraction: "悬停或聚焦时是否暂停跑马灯",
          reverse: "是否反转动画方向",
          side: "跑马灯滚动的方向",
          spacing: "跑马灯项之间的间距",
          speed: "跑马灯动画速度（像素 / 秒）",
          translations: "本地化提示文案",
        },
      },
    },
  },
  masonry: {
    description:
      "Masonry：瀑布流。条目先沿每列向下排列，再到下一列，因此顺序按列优先。按行排列需要 grid masonry，浏览器还没有实现。",
  },
  mentions: {
    description:
      "Mentions：提及建议。候选内容显示为浮动卡片。锚点是虚拟的，来自宿主输入框的实时矩形，因此宿主可以保留自己的结构（textarea 放在宿主指定的位置），卡片仍指向正确位置。检测状态通过 `useMentions` 与宿主共享。",
    parts: {
      MentionsVessel: {
        description:
          "Mentions：提及建议。候选内容显示为浮动卡片。锚点是虚拟的，来自宿主输入框的实时矩形，因此宿主可以保留自己的结构（textarea 放在宿主指定的位置），卡片仍指向正确位置。检测状态通过 `useMentions` 与宿主共享。",
        props: {
          size: "宿主输入框的尺寸档位，让选项行与输入框保持一致",
        },
      },
      Mentions: {
        description:
          "@ 提及组件基于普通 textarea：当插入符前的文本以触发字符和已输入片段结尾时，会在锚定容器中显示匹配候选；选择候选后，片段会替换为 `trigger + label`，并通过 `update:modelValue` 返回整段文本，方向键移动候选，Enter 插入，Escape 关闭。输入框复用 `Field.Textarea`，自动获得字段能力（label id、invalid 状态、autoresize）；候选容器通过弹出层状态机锚定到整个字段而不是插入符坐标，因为常见字段尺寸下按插入符定位需要第二套定位系统，收益有限；保留自定义输入结构的组件（如 AI 提示输入）可不用这层外壳，直接接入 `useMentions` 和 `MentionsVessel`。",
        props: {
          size: "输入框使用的控件高度档位",
        },
      },
    },
  },
  menu: {
    description:
      "Menu：菜单。安静的纸质浮层带 elevation，行在悬停时出现光照，选中项使用墨色平铺填充。部件：Root、Trigger、ContextTrigger、Indicator、Positioner、Content、Item、ItemText、ItemIndicator、ItemGroup、ItemGroupLabel、TriggerItem、Separator、Arrow、ArrowTip。Ark 的 namespace 已冻结；展开 namespace 时会把成员复制成 data properties，使 Root 可以承担尺寸包装，Content 承担档位，其余仍使用 Ark 自身部件。",
    parts: {
      Item: {
        props: {
          closeOnSelect: "选中选项后是否关闭菜单",
          disabled: "是否禁用菜单项",
          value: "菜单项的唯一值",
          valueText: "选项的文本值，用于菜单输入即查找；未设置时使用菜单项的文本内容",
        },
      },
      Root: {
        props: {
          size: "菜单各行的控件高度档位",
          anchorPoint: "菜单定位点；可由上下文菜单触发器或按钮触发器设置",
          "aria-label": "菜单的无障碍标签",
          closeOnSelect: "选中选项时是否关闭菜单",
          composite: "菜单是否与组合框、标签页等复合组件组合使用",
          defaultHighlightedValue: "菜单项的初始高亮值；适合不需要受控高亮值的场景",
          defaultOpen: "菜单的初始展开状态；适合不需要受控展开状态的场景",
          defaultTriggerValue: "触发器的初始值；适合不需要受控触发器值的场景",
          highlightedValue: "菜单项的受控高亮值",
          id: "组件内部状态机的唯一标识",
          ids: "菜单各元素的 id，便于组合使用",
          loopFocus: "键盘导航是否循环",
          navigate: "选中项为锚点元素时用于导航到该项的函数",
          open: "菜单的受控展开状态",
          positioning: "用于动态定位菜单的选项",
          triggerValue: "当前打开菜单的触发器值",
          typeahead: "按下可打印字符时是否触发输入即查找导航",
        },
      },
      Trigger: {
        props: {
          value: "用于标识该触发器的值",
        },
      },
    },
  },
  menubar: {
    description:
      "Menubar：桌面风格菜单栏。一排低调 ghost 触发器各自打开与 menu 家族相同的浮层。触发器是我们自己的按钮，通过 `asChild` 挂到菜单状态机的触发器上；状态机保留触发器元素的行为（定位、焦点恢复、`data-state`），元素则带有 menubar 作用域。弹层保持 menu 部件不变，由 menu 样式表负责外观。键盘行为：触发器之间用 Tab 切换，不用方向键；跨菜单的方向键遍历不在本版本范围内。菜单打开后，方向键和 Escape 由状态机处理。",
    parts: {
      Menubar: {
        description:
          "Menubar：桌面风格菜单栏。一排低调 ghost 触发器各自打开与 menu 家族相同的浮层。触发器是我们自己的按钮，通过 `asChild` 挂到菜单状态机的触发器上；状态机保留触发器元素的行为（定位、焦点恢复、`data-state`），元素则带有 menubar 作用域。弹层保持 menu 部件不变，由 menu 样式表负责外观。键盘行为：触发器之间用 Tab 切换，不用方向键；跨菜单的方向键遍历不在本版本范围内。菜单打开后，方向键和 Escape 由状态机处理。",
      },
    },
  },
  meter: {
    description:
      "Meter：仪表，用于表示存量而不是任务进度，例如剩余墨粉量或水位。level 决定颜色：正常时使用 primary，达到阈值时使用固定语义色。",
    parts: {
      MeterRoot: {
        props: {
          value: "测量值；限制在 min 和 max 之间",
          level: "进度颜色级别；未超过阈值时为 primary，超过后使用对应等级",
          size: "轨道厚度档位",
        },
      },
    },
  },
  "navigation-menu": {
    description:
      "NavigationMenu：导航菜单。ghost 触发器组成菜单栏，primary 墨色指示条随当前项滑动，并打开共享弹层。部件：Root、List、Item、Trigger、Link、Content、ViewportPositioner、Viewport、Indicator、ItemIndicator、Arrow。",
    parts: {
      Item: {
        props: {
          disabled: "是否禁用导航项",
          value: "导航项的值",
        },
      },
      Root: {
        props: {
          closeDelay: "菜单关闭前的延迟时间",
          defaultValue: "导航菜单的默认值；适合不需要受控值的场景",
          disableClickTrigger: "是否禁用点击触发器",
          disableHoverTrigger: "是否禁用悬停触发器",
          disablePointerLeaveClose: "是否禁用指针离开时关闭菜单",
          id: "组件内部状态机的唯一标识",
          ids: "状态机中各元素的 id",
          openDelay: "菜单打开前的延迟时间",
          orientation: "导航菜单的排列方向",
          translations: "无障碍元素及其状态使用的本地化文案",
          value: "导航菜单的受控值",
        },
      },
      ViewportPositioner: {
        props: {
          align:
            "视口位置，写入 CSS 变量 `--viewport-x` 和 `--viewport-y`；`@defaultValue 'center'`",
        },
      },
    },
  },
  "number-input": {
    description:
      "NumberInput：数字输入。步进按钮和输入框合为一个控件，中间由发丝线分隔，数字使用等宽数字。部件：Root、Label、Control、Input、ValueText、IncrementTrigger、DecrementTrigger、Scrubber。",
    parts: {
      Root: {
        props: {
          size: "输入框和步进器使用的控件高度档位",
          allowMouseWheel: "是否允许鼠标滚轮改变数值",
          allowOverflow: "是否允许值超出 min/max 范围",
          clampValueOnBlur: "输入框失焦时是否把值限制回 min/max 范围",
          defaultValue: "输入框的初始值；适合不需要受控值的场景",
          disabled: "是否禁用数字输入框",
          focusInputOnChange: "数值变化时是否聚焦输入框",
          form: "输入元素关联的表单",
          formatOptions: "传给 `Intl.NumberFormat` 构造函数的选项",
          id: "组件内部状态机的唯一标识",
          ids: "数字输入框各元素的 id，便于组合使用",
          inputMode: "提示用户可能输入的数据类型，也决定移动设备显示的键盘类型",
          invalid: "数字输入框的值是否无效",
          largeStep: "按住 Shift 时每次增减的幅度",
          locale: "当前语言环境，基于 BCP 47 标准",
          max: "数字输入框的最大值",
          min: "数字输入框的最小值",
          modelValue: "数字输入框的 v-model 值",
          name: "数字输入框的 name 属性，用于表单提交",
          pattern: "用于校验 `<input>` 元素值的模式",
          readOnly: "数字输入框是否只读",
          required: "数字输入框是否必填",
          smallStep: "按住 Alt 时每次增减的幅度",
          spinOnPress: "按下增加或减少按钮时是否连续调整数值",
          step: "每次增减数值的幅度",
          translations: "无障碍元素及其状态使用的本地化文案",
        },
      },
    },
  },
  "order-list": {
    description:
      "OrderList：可排序列表。行可以通过拖柄或侧边箭头移动，组把新顺序作为值上报，模型就是顺序。拖拽使用原生 drag 事件，primary 墨色发丝线标记行将落入的位置；触屏则通过按钮排序。",
    parts: {
      OrderList: {
        description:
          "OrderList：可排序列表。行可以通过拖柄或侧边箭头移动，组把新顺序作为值上报，模型就是顺序。拖拽使用原生 drag 事件，primary 墨色发丝线标记行将落入的位置；触屏则通过按钮排序。",
        props: {
          modelValue: "按当前顺序排列的行；值的顺序就是行的顺序",
          options: "可显示的全部行，不保证顺序",
        },
      },
    },
  },
  "page-header": {
    description:
      "PageHeader：页头。包含 eyebrow、衬线标题、一行 description，以及与标题同基线的 actions。Heading 组合标题和 actions，其余内容在下方组合。",
  },
  pagination: {
    description:
      "Pagination：分页导航。部件：Root、Item（页码按钮）、Ellipsis、PrevTrigger、NextTrigger、FirstTrigger、LastTrigger。各 Item 带有 data-selected。",
    parts: {
      Root: {
        props: {
          size: "各分页按钮共用的控件高度档位",
          count: "数据项总数",
          defaultPage: "初始激活页码；适合不需要受控激活页码的场景",
          defaultPageSize: "每页数据项数量的初始值；适合不需要受控每页数量的场景",
          getPageUrl: '生成分页链接 href 属性的函数；仅在 `type` 为 `"link"` 时使用',
          id: "组件内部状态机的唯一标识",
          ids: "分页组件各元素的 id，便于组合使用",
          page: "当前激活页码的受控值",
          pageSize: "每页数据项数量的受控值",
          siblingCount: "激活页码两侧显示的页数",
          translations: "无障碍元素及其状态使用的本地化文案",
          type: "触发器元素的 type",
        },
      },
    },
  },
  "password-input": {
    description:
      "PasswordInput：密码输入。显示/隐藏按钮安静地停在字段边缘并原位切换，不产生位移或噪声。部件：Root、Label、Control、Input、Indicator、VisibilityTrigger。",
    parts: {
      Indicator: {
        props: {
          fallback: "密码隐藏时显示的替代内容",
        },
      },
      Root: {
        props: {
          size: "输入框和可见性切换按钮使用的控件高度档位",
          autoComplete: "输入框的 autocomplete 属性",
          defaultVisible: "密码是否默认可见",
          disabled: "是否禁用输入框",
          id: "组件内部状态机的唯一标识",
          ids: "密码输入框各元素的 id，便于组合使用",
          ignorePasswordManagers: "是否忽略密码管理器",
          invalid: "输入框是否无效",
          name: "输入框的 name 属性",
          readOnly: "输入框是否只读",
          required: "输入框是否必填",
          translations: "无障碍元素及其状态使用的本地化文案",
          visible: "密码是否可见",
        },
      },
    },
  },
  "pin-input": {
    description:
      "PinInput：验证码输入。每个字符占用一个方形格位，字符居中，数字等宽。部件：Root、Label、Control、Input、HiddenInput。",
    parts: {
      Root: {
        props: {
          size: "每个输入格使用的控件高度档位",
          autoFocus: "是否自动聚焦第一个输入框",
          autoSubmit: "全部输入格填满后是否自动提交所属表单",
          blurOnComplete: "值输入完成后是否让输入框失焦",
          count: "渲染的输入格数量，用于生成 SSR ARIA 属性；下一个大版本中将必填",
          defaultValue: "PIN 输入框的初始值；适合不需要受控值的场景",
          disabled: "是否禁用各个输入框",
          form: "底层 input 元素关联的表单",
          id: "组件内部状态机的唯一标识",
          ids: "PIN 输入框各元素的 id，便于组合使用",
          invalid: "PIN 输入框是否无效",
          mask: "为 `true` 时，按 `type=password` 的方式隐藏输入值",
          modelValue: "验证码输入框的 `v-model` 值",
          name: "输入元素的 `name` 属性，用于表单提交",
          otp: '为 `true` 时，PIN 输入组件让各字段使用 `autocomplete="one-time-code"`',
          pattern: "校验用户输入值的正则表达式",
          placeholder: "输入框的占位文本",
          readOnly: "PIN 输入框是否处于有效状态",
          required: "PIN 输入框是否必填",
          sanitizeValue: "校验前清理粘贴值的函数，可去除连字符、空格或其他格式字符",
          selectOnFocus: "输入框聚焦时是否选中输入值",
          translations: "无障碍元素及其状态的本地化文案",
          type: "验证码输入框允许的值类型",
        },
      },
    },
  },
  popconfirm: {
    description:
      "Popconfirm：确认气泡。触发器打开一个锚定的小浮层，显示消息和确认、取消两个操作。确认与取消由调用方处理，面板两种情况下都会关闭。默认插槽是触发器；只能给一个元素（如果是一组元素，先用 span 包住）。",
    parts: {
      Popconfirm: {
        description:
          "Popconfirm：确认气泡。触发器打开一个锚定的小浮层，显示消息和确认、取消两个操作。确认与取消由调用方处理，面板两种情况下都会关闭。默认插槽是触发器；只能给一个元素（如果是一组元素，先用 span 包住）。",
        props: {
          message: "读者要回答的问题",
        },
      },
    },
  },
  popover: {
    description:
      "Popover：气泡卡片。浮层带 elevation 淡入，通过细箭头锚定到触发器。部件：Root、Trigger、Anchor、Indicator、Positioner、Content、Title、Description、CloseTrigger、Arrow、ArrowTip。",
    parts: {
      Root: {
        props: {
          autoFocus: "打开 popover 时是否自动聚焦第一个可聚焦内容",
          closeOnEscape: "按 Escape 时是否关闭 popover",
          closeOnInteractOutside: "点击 popover 外部时是否关闭 popover",
          defaultOpen: "popover 渲染时的初始打开状态；不需要控制打开状态时使用",
          defaultTriggerValue: "触发器的初始值；不需要控制触发器值时使用",
          finalFocusEl: "popover 关闭时接收焦点的元素",
          id: "组件内部状态机的唯一标识",
          ids: "popover 各元素的 id，适合组合使用",
          initialFocusEl: "popover 打开时聚焦的元素",
          modal:
            "popover 是否为模态；为 `true` 时外部元素不可交互，屏幕阅读器只能看到 popover 内容，滚动被阻止，焦点限制在 popover 内",
          open: "popover 的受控打开状态",
          persistentElements: "返回常驻元素；这些元素保持 `pointer-events` 可用，也不触发关闭事件",
          portalled:
            "popover 是否通过 portal 渲染；无论内容的 DOM 位置如何，Tab 行为都由 portal 代理",
          positioning: "popover 内容的定位选项",
          restoreFocus: "popover 关闭后是否把焦点还给打开前聚焦的元素",
          translations: "无障碍元素及其状态的本地化文案",
          triggerValue: "当前打开 popover 的触发器值",
        },
      },
      Trigger: {
        props: {
          value: "标识该触发器的值",
        },
      },
    },
  },
  presence: {
    description:
      "Presence：让子组件的挂载与卸载配合 CSS 进出场动画。它实现 Ark “动画结束后再移除元素”的延迟卸载契约，也可用于我们自己的组合组件。",
  },
  progress: {
    description:
      "Progress：进度条。细发丝线轨道由 primary 墨色按状态机给定的速度填充。部件：Root、Label、ValueText、Track、Range、View、Circle、CircleTrack、CircleRange。",
    parts: {
      Root: {
        props: {
          size: "进度槽的厚度档位",
          defaultValue: "进度条渲染时的初始值；不需要控制进度条值时使用",
          formatOptions: "格式化值的选项",
          id: "组件内部状态机的唯一标识",
          ids: "进度条各元素的 id，适合组合使用",
          locale: "格式化值使用的区域设置",
          max: "进度条允许的最大值",
          min: "进度条允许的最小值",
          modelValue: "进度条的 `v-model` 值",
          orientation: "进度条的方向",
          translations: "本地化消息",
        },
      },
    },
  },
  "progress-group": {
    description: "ProgressGroup：进度条上的一个状态汇总。",
  },
  "qr-code": {
    description:
      "QrCode：二维码。图案用墨色印在页面上，可添加浅色角标和方形下载按钮。部件：Root、Frame、Pattern、Overlay、DownloadTrigger。",
    parts: {
      DownloadTrigger: {
        props: {
          fileName: "文件名",
          mimeType: "图像的 MIME 类型",
          quality: "图像质量",
        },
      },
      Root: {
        props: {
          defaultValue: "二维码渲染时要编码的初始值；不需要控制二维码值时使用",
          encoding: "二维码编码选项",
          id: "组件内部状态机的唯一标识",
          ids: "各元素的 id",
          modelValue: "二维码的 `v-model` 值",
          pixelSize: "二维码的像素尺寸",
        },
      },
    },
  },
  "radio-group": {
    description:
      "RadioGroup：单选组。圆形选项在选中后用 primary 墨色平铺填充，中心圆点保留纸色。部件：Root、Label、Item、ItemText、ItemControl、Indicator、ItemHiddenInput。",
    parts: {
      Root: {
        props: {
          size: "单选刻度盘的尺寸档位，选中的圆点随之变化",
          defaultValue: "渲染时选中单选项的初始值；不需要控制单选组值时使用",
          disabled: "为 `true` 时禁用单选组",
          form: "底层 `input` 关联的表单",
          id: "组件内部状态机的唯一标识",
          ids: "单选组件各元素的 id，适合组合使用",
          invalid: "单选组是否无效",
          modelValue: "单选组的 `v-model` 值",
          name: "单选组件 `input` 字段的 `name`，用于表单提交",
          orientation: "单选组的方向",
          readOnly: "复选框是否只读",
          required: "单选组是否必填",
        },
      },
    },
  },
  "rating-group": {
    description:
      "RatingGroup：评分组件。一排图标默认低调，点亮后使用 primary 色。部件：Root、Label、Control、Item、HiddenInput（另有 Context 和 ItemContext 渲染辅助）。",
    parts: {
      Root: {
        props: {
          size: "评分控件的尺寸档位",
          allowHalf: "是否允许半星",
          autoFocus: "是否自动聚焦评分组件",
          count: "评分项总数",
          defaultValue: "评分渲染时的初始值；不需要控制评分值时使用",
          disabled: "评分是否禁用",
          form: "底层 `input` 元素关联的表单",
          id: "组件内部状态机的唯一标识",
          ids: "评分各元素的 id，适合组合使用",
          modelValue: "评分组的 `v-model` 值",
          name: "评分元素的 `name` 属性，用于表单",
          readOnly: "评分是否只读",
          required: "评分是否必填",
          translations: "无障碍元素及其状态的本地化文案",
        },
      },
    },
  },
  result: {
    description:
      "Result：结果页。状态图标使用固定语义色，标题使用衬线字，补充内容提供后续操作；这些区块可以按需组合。",
    parts: {
      SResultIcon: {
        description:
          "结果图标。它包含四种状态图标，由根节点选择；这样图标始终与根节点声明的状态一致。",
      },
      SResultRoot: {
        props: {
          status: "操作返回的状态，用固定语义色呈现",
        },
      },
    },
  },
  "scroll-area": {
    description:
      "ScrollArea：滚动区域。用低调的墨色滚动条替代原生滚动条，悬停和滚动时显示。部件：Root、Viewport、Content、Scrollbar、Thumb、Corner。",
    parts: {
      Root: {
        props: {
          id: "组件内部状态机的唯一标识",
          ids: "滚动区域各元素的 id",
        },
      },
    },
  },
  "segment-group": {
    description:
      "SegmentGroup：分段控制。发丝线托盘中，一块墨色底板在选中项下方移动。部件：Root、Label、Indicator、Item、ItemText、ItemControl、ItemHiddenInput。",
    parts: {
      Root: {
        props: {
          size: "分段控件的尺寸档位；组件族保持紧凑规格，各档比全局阶梯低一级，默认 `md` 使用小尺寸高度",
          orientation: "分段控件的方向；底层状态机默认垂直堆叠，水平排列需要显式设置",
          defaultValue: "分段组首次渲染时的初始值；不需要控制分段组状态时使用",
          disabled: "为 `true` 时禁用分段组",
          form: "底层 `input` 关联的表单",
          id: "组件内部状态机的唯一标识",
          ids: "单选组件各元素的 id，适合组合使用",
          modelValue: "分段组的 `v-model` 值",
          name: "单选组件 `input` 字段的 `name`，用于表单提交",
          readOnly: "分段组是否只读",
        },
      },
    },
  },
  select: {
    description:
      "Select：选择器。触发器就是整个控件，列表淡入展开为纸质浮层，选中行使用墨色平铺填充。部件：Root、Label、Control、Trigger、ValueText、Indicator、ClearTrigger、HiddenSelect、Positioner、Content、List、Item、ItemText、ItemIndicator、ItemGroup、ItemGroupLabel。",
    parts: {
      Item: {
        props: {
          item: "要渲染的选项",
          persistFocus: "悬停移出时是否清除高亮状态",
        },
      },
      Root: {
        props: {
          size: "select 触发器的高度档位",
          autoComplete:
            "隐藏 `select` 的 `autocomplete` 属性，用于启用浏览器自动填充，例如省州字段用 `address-level1`",
          closeOnSelect: "选中选项后是否关闭 select",
          collection: "选项集合",
          composite: "select 是否与 tabs、combobox 等复合组件组合使用",
          defaultHighlightedValue: "select 打开时高亮项的初始值；不需要控制高亮值时使用",
          defaultOpen: "select 的打开状态是否受控",
          defaultValue: "select 渲染时的初始默认值；不需要控制 select 值时使用",
          deselectable: "是否点击已选项清空值；仅单选模式适用",
          disabled: "select 是否禁用",
          form: "底层 select 关联的表单",
          highlightedValue: "高亮项的受控键值",
          id: "组件内部状态机的唯一标识",
          ids: "select 各元素的 id，适合组合使用",
          invalid: "select 是否无效",
          loopFocus: "键盘导航是否在选项间循环",
          modelValue: "select 的模型值",
          multiple: "是否允许多选",
          name: "底层 select 的 `name` 属性",
          open: "select 菜单是否打开",
          positioning: "菜单的定位选项",
          readOnly: "select 是否只读",
          required: "select 是否必填",
          scrollToIndexFn: "滚动到指定索引的函数",
          translations: "无障碍元素及其状态的本地化文案",
        },
      },
    },
  },
  separator: {
    description:
      "Separator：分隔线组件，在区块之间提供命名的一条线。装饰性分隔线不带 separator 角色，因为页面没有它也能理解。",
  },
  "signature-pad": {
    description:
      "SignaturePad：签名板。低调的纸面字段内有一条引导发丝线，手写墨迹落在其上。部件：Root、Label、Control、Segment、SegmentPath、Guide、ClearTrigger、HiddenInput、Context。",
    parts: {
      Root: {
        props: {
          defaultPaths: "签名板的默认路径",
          disabled: "签名板是否禁用",
          drawing: "绘制选项",
          id: "组件内部状态机的唯一标识",
          ids: "签名板各元素的 id，适合组合使用",
          name: "签名板的 `name`，用于表单提交",
          paths: "签名板的受控路径",
          readOnly: "签名板是否只读",
          required: "签名板是否必填",
          translations: "签名板的本地化文案，用于国际化",
        },
      },
    },
  },
  skeleton: {
    description: "Skeleton：骨架屏。尺寸由外部指定，呼吸动画由组件提供。",
    parts: {
      Skeleton: {
        description: "Skeleton：骨架屏。尺寸由外部指定，呼吸动画由组件提供。",
      },
    },
  },
  slider: {
    description:
      "Slider：滑块。primary 墨色在内凹轨道上填充，手柄是纸色方点，刻度为发丝线。部件：Root、Label、ValueText、Control、Track、Range、Thumb、MarkerGroup、Marker、DraggingIndicator、HiddenInput。",
    parts: {
      Root: {
        props: {
          size: "滑块手柄的尺寸档位",
          "aria-label": "每个滑块手柄的 `aria-label`，用于提供可访问名称",
          "aria-labelledby": "为每个滑块手柄提供标签的元素 `id`，用于提供可访问名称",
          defaultValue: "滑块渲染时的初始值；不需要控制滑块值时使用",
          dir: "文档的文本书写方向",
          disabled: "滑块是否禁用",
          form: "底层 `input` 元素关联的表单",
          getAriaValueText: "返回滑块手柄人类可读值的函数",
          getRootNode: "在 iframe、Electron 等自定义环境中正确解析 `document` 的根节点",
          id: "组件内部状态机的唯一标识",
          ids: "滑块各元素的 id，适合组合使用",
          invalid: "滑块是否无效",
          largeStep: "按住 Shift 或按 Page Up/Page Down 时数值的增减量",
          max: "滑块最大值",
          min: "滑块最小值",
          minStepsBetweenThumbs: "多个滑块手柄之间允许的最小步数",
          modelValue: "滑块的 `v-model` 值",
          name: "每个滑块手柄关联的 `name`，用于表单",
          orientation: "滑块的方向",
          origin: "滑块范围的起点：`start` 适合绝对值，`center` 适合相对偏移",
          readOnly: "滑块是否只读",
          step: "滑块的步长",
          thumbAlignment:
            "滑块手柄相对轨道的对齐方式：`center` 可超出轨道边界，`contain` 保持在轨道边界内",
          thumbCollisionBehavior:
            "指针交互时滑块手柄相撞的行为：`none` 不能互相越过，`push` 相互推动，`swap` 交换位置",
          thumbSize: "滑块手柄尺寸",
        },
      },
    },
  },
  spinner: {
    description: "Spinner：加载指示。一段墨色弧线绕中心旋转。默认低调，只报告等待，不抢占注意力。",
    parts: {
      Spinner: {
        description:
          "Spinner：加载指示。一段墨色弧线绕中心旋转。默认低调，只报告等待，不抢占注意力。",
        props: {
          size: "加载图标的直径档位",
        },
      },
    },
  },
  "split-button": {
    description:
      "SplitButton：拆分按钮。主按钮触发 `click`，旁边的箭头打开同风格浮层；浮层中的条目会携带自己的值发出 `select`。箭头由菜单状态机的触发器通过 `asChild` 挂接我们的按钮；状态机保留元素行为（定位、焦点、`data-state`），按钮样式负责外观。弹层保持 menu 部件不变。",
    parts: {
      SplitButton: {
        description:
          "SplitButton：拆分按钮。主按钮触发 `click`，旁边的箭头打开同风格浮层；浮层中的条目会携带自己的值发出 `select`。箭头由菜单状态机的触发器通过 `asChild` 挂接我们的按钮；状态机保留元素行为（定位、焦点、`data-state`），按钮样式负责外观。弹层保持 menu 部件不变。",
        props: {
          label: "主操作的标签",
          items: "下拉菜单条目",
          variant: "主按钮和箭头的静止样式；箭头与主按钮保持同一个控件的整体感",
          tone: "两部分的用色；默认墨色，固定语义色表达各自含义",
          size: "主按钮和箭头共用的高度档位",
        },
      },
    },
  },
  splitter: {
    description:
      "Splitter：分割面板。面板沿一条发丝线分隔，小型纸色手柄响应用户拖动。部件：Root、Panel、ResizeTrigger、ResizeTriggerIndicator。",
    parts: {
      Root: {
        props: {
          defaultSize: "面板渲染时的初始尺寸；不需要控制面板尺寸时使用",
          id: "组件内部状态机的唯一标识",
          ids: "splitter 各元素的 id，适合组合使用",
          keyboardResizeBy: "使用键盘调整面板大小时每次改变的像素数",
          nonce: "注入 splitter 光标样式表使用的 nonce",
          orientation: "分隔器的方向，可为 `horizontal` 或 `vertical`",
          panels: "各面板的尺寸约束",
          registry: "支持多拖拽的 splitter 注册表",
          size: "受控的面板尺寸数据",
        },
      },
    },
  },
  spotlight: {
    description:
      "Spotlight：带动态光照的卡片。卡片边缘和表面会随指针位置受光。包装器只测量并写入几何数据，光照由样式表绘制的两层完成。",
    parts: {
      SSpotlight: {
        description:
          "Spotlight：带动态光照的卡片。卡片边缘和表面会随指针位置受光。包装器只测量并写入几何数据，光照由样式表绘制的两层完成。",
      },
    },
  },
  stack: {
    description:
      "Stack：按名称选择间距。命名档位映射到间距阶梯，相邻元素用一个设计令牌分隔，不使用临时 margin。",
    parts: {
      Stack: {
        description:
          "Stack：按名称选择间距。命名档位映射到间距阶梯，相邻元素用一个设计令牌分隔，不使用临时 margin。",
      },
    },
  },
  stat: {
    description:
      "Stat：统计数值。label 低调说明含义，数值用等宽数字清晰显示，变化量用固定语义色表示方向。",
    parts: {
      StatDelta: {
        description:
          "增减数值的方向由 `direction` prop 决定；使用方显式设置的 `data-direction` 属性优先。",
      },
    },
  },
  steps: {
    description:
      "Steps：步骤条，表示流程中的线性进度。部件：Root、List、Item、Trigger、Indicator、Separator、Content、PrevTrigger、NextTrigger、Progress。Indicator 和 Separator 带有 data-complete / data-current / data-incomplete。",
    parts: {
      Root: {
        props: {
          size: "步骤指示器共用的高度档位",
          count: "步骤总数",
          defaultStep: "stepper 渲染时的初始值；不需要控制 stepper 值时使用",
          id: "组件内部状态机的唯一标识",
          ids: "stepper 元素的自定义 id",
          isStepSkippable: "判断步骤能否跳过的函数",
          isStepValid: "判断步骤是否有效的函数",
          linear: "为 `true` 时 stepper 要求按顺序完成各步骤",
          orientation: "stepper 的方向",
          step: "stepper 的受控值",
        },
      },
    },
  },
  swap: {
    description:
      'Swap：两个内容互换位置，新内容以回弹曲线放大进场，旧内容缩小退场。部件：Root、Indicator（type="on" | "off"）、RootProvider。',
    parts: {
      Root: {
        props: {
          lazyMount: "是否启用懒挂载",
          swap: "swap 是否处于 `on` 状态",
          unmountOnExit: "退出时是否卸载",
        },
      },
    },
  },
  switch: {
    description:
      "Switch：开关。关闭时轨道呈纸面的内凹阴影，开启后用 primary 墨色平铺填充，手柄以回弹曲线滑动。部件：Root、Label、Control、Thumb、HiddenInput。",
    parts: {
      Root: {
        props: {
          size: "开关手柄的尺寸档位，轨道随之变化",
          checked: "switch 的受控选中状态",
          defaultChecked: "switch 渲染时的初始选中状态；不需要控制选中状态时使用",
          disabled: "switch 是否禁用",
          form: "switch 所属表单的 id",
          id: "组件内部状态机的唯一标识",
          ids: "switch 各元素的 id，适合组合使用",
          invalid: "为 `true` 时 switch 标记为无效",
          label: "无障碍元素及其状态的本地化文案",
          name: "switch 中 `input` 字段的 `name`，用于表单提交",
          readOnly: "switch 是否只读",
          required: "为 `true` 时 switch input 标记为必填",
          value: "复选框 input 的值，用于表单提交",
        },
      },
    },
  },
  table: {
    description:
      "Table：基于 TanStack Table v9 的一站式数据表。行是在 ARIA table 语义下的 CSS grid，因此排序、过滤、树展开、选择和分页由行模型管线提供时，吸顶表头、固定列、合并单元格和虚拟化窗口仍保持语义正确。",
  },
  tabs: {
    description:
      "Tabs：页签导航。部件：Root、List、Trigger、Content、Indicator（由状态机定位在列表线上的墨色指示条）。",
    parts: {
      Root: {
        props: {
          size: "标签行的高度档位",
          variant: "标签页样式：刻线式，或将选中项呈现为卡片",
          activationMode:
            "tabs 的激活模式，可为 `manual` 或 `automatic`：`manual` 在点击或按 `enter` 时激活，`automatic` 在获得焦点时激活",
          composite: "是否为复合组件",
          defaultValue: "tabs 渲染时的初始选中值；不需要控制选中值时使用",
          deselectable: "点击当前激活标签时是否取消选中",
          id: "组件内部状态机的唯一标识",
          ids: "tabs 各元素的 id，适合组合使用",
          loopFocus: "键盘导航是否从最后一个标签循环到第一个，反向同理",
          modelValue: "tabs 的 `v-model` 值",
          navigate: "点击标签时导航到所选标签的函数；标签触发器是锚点元素时有用",
          orientation:
            "tabs 的方向，可为 `horizontal` 或 `vertical`：`horizontal` 仅支持左右方向键，`vertical` 仅支持上下方向键",
          translations: "无障碍元素及其状态的本地化文案",
        },
      },
    },
  },
  "tags-input": {
    description:
      "TagsInput：标签输入。一个字段容器中，标签平时显示为低调墨色，编辑时只轻微提升色调。部件：Root、Label、Control、Input、ClearTrigger、Item、ItemPreview、ItemText、ItemInput、ItemDeleteTrigger、HiddenInput、Context。",
    parts: {
      Root: {
        props: {
          size: "标签输入框静止状态的高度档位",
          addOnPaste: "粘贴内容时是否添加标签",
          allowDuplicates: "是否允许重复标签",
          allowOverflow: "是否允许标签数量超过 `max`；超过后根元素会附加 `data-invalid`",
          autoFocus: "input 是否自动聚焦",
          blurBehavior:
            "标签输入失焦时的行为：`add` 把 input 值添加为新标签，`clear` 清空 input 值",
          defaultInputValue: "标签输入渲染时的初始值；不需要控制输入值时使用",
          defaultValue: "标签渲染时的初始值；不需要控制标签值时使用",
          delimiter: "触发添加标签的按键，也是粘贴时拆分标签的字符",
          disabled: "标签输入是否禁用",
          editable: "标签创建后能否按 `Enter` 或双击编辑",
          form: "底层 `input` 元素关联的表单",
          id: "组件内部状态机的唯一标识",
          ids: "标签输入各元素的 id，适合组合使用",
          inputValue: "标签输入的受控值",
          invalid: "标签输入是否无效",
          max: "标签数量上限",
          maxLength: "input 最大长度",
          modelValue: "标签输入的 `v-model` 值",
          name: "input 的 `name` 属性，用于表单提交",
          placeholder: "没有标签时 input 的占位文本",
          readOnly: "标签输入是否只读",
          required: "标签输入是否必填",
          sanitizeValue: "添加标签前清理标签值的函数",
          translations: "无障碍元素及其状态的本地化文案",
          validate: "返回能否添加标签的布尔值，可防止重复或无效标签值",
        },
      },
    },
  },
  terminal: {
    description:
      "Terminal：终端界面。上方是历史记录，下方是输入行。组件只负责读取输入和显示光标；每行输入以事件发出，调用方通过 lines prop 返回要显示的行，因此历史由调用方控制。",
    parts: {
      Terminal: {
        description:
          "Terminal：终端界面。上方是历史记录，下方是输入行。组件只负责读取输入和显示光标；每行输入以事件发出，调用方通过 lines prop 返回要显示的行，因此历史由调用方控制。",
        props: {
          lines: "终端记录，最早的行在前",
          prompt: "输入行开头的提示符",
        },
      },
    },
  },
  textarea: {
    description:
      "Textarea：多行文本输入。`<textarea>` 应用字段样式，高度由 rows 决定，并可在纵向调整。单独使用时根据 `invalid` prop 显示状态；放进 `Field.Root` 后接入字段上下文，自动获得 label id、described-by 关联和 invalid 状态。disabled 使用原生属性。",
    parts: {
      Textarea: {
        description:
          "Textarea：多行文本输入。`<textarea>` 应用字段样式，高度由 rows 决定，并可在纵向调整。单独使用时根据 `invalid` prop 显示状态；放进 `Field.Root` 后接入字段上下文，自动获得 label id、described-by 关联和 invalid 状态。disabled 使用原生属性。",
      },
    },
  },
  timeline: {
    description:
      "Timeline：时间线。Root 承载有序主线，Item 是一个时间点，Marker 是主线经过的节点，Content 是该时间点的内容；标记之间的发丝线由样式表绘制。",
    parts: {
      TimelineRoot: {
        description: "时间线容器，决定时间点纵向排列还是从左到右排列。",
      },
    },
  },
  timer: {
    description:
      "Timer：计时器。等宽数字避免跳动，操作触发器沿用控件样式。部件：Root、Area、Control、Item、Separator、ActionTrigger、Context。单位标签是普通内容，不是状态机部件。",
    parts: {
      Root: {
        props: {
          autoStart: "计时器是否自动启动",
          countdown: "计时器是否倒计时，每次 tick 递减计时值",
          id: "组件内部状态机的唯一标识",
          ids: "计时器部件的 id",
          interval: "更新计时器计数的间隔，单位毫秒",
          startMs: "计时器总时长，单位毫秒",
          targetMs: "计时器最小计数，单位毫秒",
          translations: "无障碍元素及其状态的本地化文案",
        },
      },
    },
  },
  toast: {
    description:
      "Toast：通知提示。每条通知使用弹层容器，类型决定标题的语义色，状态机的 translate 变量驱动滑动动画。部件：Toaster、Root、Title、Description、ActionTrigger、CloseTrigger，以及 createToaster。",
  },
  toc: {
    description:
      "Toc：目录导航。滚动区域旁是一列低调链接，一条 primary 墨色指示线标记当前位置。部件：Root、Title、List、Item、Link、Indicator。",
    parts: {
      Item: {
        props: {
          item: "目录项",
        },
      },
    },
  },
  toggle: {
    description: "Toggle：独立切换按钮。开启时使用墨色平铺填充。部件：Root、Indicator。",
    parts: {
      Root: {
        props: {
          defaultPressed: "toggle 的默认按压状态",
          disabled: "toggle 是否禁用",
          pressed: "toggle 的按压状态",
        },
      },
    },
  },
  "toggle-group": {
    description:
      "ToggleGroup：切换按钮组。发丝线托盘中，按下的项使用墨色平铺填充。部件：Root、Item。",
    parts: {
      Root: {
        props: {
          size: "切换项的高度档位",
          defaultValue: "toggle group 渲染时的初始选中值；不需要控制选中值时使用",
          deselectable: "toggle group 是否允许不选中任何项；`multiple` 为 `true` 时忽略",
          disabled: "toggle 是否禁用",
          id: "组件内部状态机的唯一标识",
          ids: "toggle 各元素的 id，适合组合使用",
          loopFocus: "焦点是否在 toggle group 内循环",
          modelValue: "toggle group 的 `v-model` 值",
          multiple: "是否允许同时选中多个切换项",
          orientation: "toggle group 的方向",
          rovingFocus: "是否用 roving tab index 管理焦点",
        },
      },
    },
  },
  toolbar: {
    description:
      "Toolbar：工具栏。前缘放起始工具，后缘放结束工具；工具栏本身带 toolbar 角色，辅助技术会把它读成一组命令。容器只提供框架，内部工具仍由调用方用自己的按钮和菜单实现。",
    parts: {
      Toolbar: {
        description:
          "Toolbar：工具栏。前缘放起始工具，后缘放结束工具；工具栏本身带 toolbar 角色，辅助技术会把它读成一组命令。容器只提供框架，内部工具仍由调用方用自己的按钮和菜单实现。",
        props: {
          label: "同页有多个工具栏时用于区分的可访问名称",
        },
      },
    },
  },
  tooltip: {
    description:
      "Tooltip：工具提示。它是最小的浮层：一小块紧凑的墨色内容在锚点上方淡入。部件：Root、Trigger、Positioner、Content、Arrow、ArrowTip。",
    parts: {
      Root: {
        props: {
          "aria-label": "tooltip 的自定义标签",
          closeDelay: "tooltip 的关闭延迟",
          closeOnClick: "点击时是否关闭 tooltip",
          closeOnEscape: "按 Escape 时是否关闭 tooltip",
          closeOnPointerDown: "pointerdown 时是否关闭 tooltip",
          closeOnScroll: "滚动时是否关闭 tooltip",
          defaultOpen: "tooltip 渲染时的初始打开状态；不需要控制打开状态时使用",
          defaultTriggerValue: "触发器的初始值；不需要控制触发器值时使用",
          disabled: "tooltip 是否禁用",
          id: "组件内部状态机的唯一标识",
          ids: "tooltip 各元素的 id，适合组合使用",
          interactive:
            "tooltip 内容是否可交互；此模式下，悬停内容时 tooltip 保持打开，参见 https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus",
          open: "tooltip 的受控打开状态",
          openDelay: "tooltip 的打开延迟",
          positioning: "popover 内容的定位选项",
          triggerValue: "当前打开 tooltip 的触发器值",
        },
      },
      Trigger: {
        props: {
          value: "标识该触发器的值",
        },
      },
    },
  },
  tour: {
    description:
      "Tour：引导。页面变暗，只有聚光区域保留聚焦光晕，锚定卡片使用共享弹层。部件：Root、Backdrop、Spotlight、Positioner、Content、Arrow、ArrowTip、Title、Description、ProgressText、Control、Actions、ActionTrigger、CloseTrigger，以及 useTour。",
  },
  transfer: {
    description:
      "Transfer：穿梭框。条目先留在源列表，使用者勾选后移动到目标列表，也可以按同样方式移回。`modelValue` 是目标列表的值数组；`data` 中其余内容留在左侧。`searchable` 会在每个面板中加入过滤输入框。",
    parts: {
      Transfer: {
        description:
          "Transfer：穿梭框。条目先留在源列表，使用者勾选后移动到目标列表，也可以按同样方式移回。`modelValue` 是目标列表的值数组；`data` 中其余内容留在左侧。`searchable` 会在每个面板中加入过滤输入框。",
      },
    },
  },
  "tree-select": {
    description:
      "TreeSelect：树形选择器。控件外观像输入框，下方浮层展示层级，点击叶节点即完成选择。仅支持单选：选中 label 显示在控件上，值保存在 `modelValue`。`filterable` 在浮层顶部加入过滤输入框；匹配项保留祖先节点，相关分支会展开。",
    parts: {
      TreeSelect: {
        description:
          "TreeSelect：树形选择器。控件外观像输入框，下方浮层展示层级，点击叶节点即完成选择。仅支持单选：选中 label 显示在控件上，值保存在 `modelValue`。`filterable` 在浮层顶部加入过滤输入框；匹配项保留祖先节点，相关分支会展开。",
        props: {
          size: "树选择框的尺寸档位，触发器高度和行规格随之变化",
        },
      },
    },
  },
  "tree-view": {
    description:
      "TreeView：树视图。行内容保持低调，选中状态用纸面上的光照表示；每个层级有一条发丝线缩进引导线，分支以回弹曲线展开。部件：Root、Label、Tree、NodeProvider、NodeContext、Branch、BranchControl、BranchTrigger、BranchIndicator、BranchText、BranchContent、BranchIndentGuide、Item、ItemText、ItemIndicator、NodeCheckbox、NodeRenameInput，以及 createTreeCollection。",
    parts: {
      NodeProvider: {
        props: {
          indexPath: "树节点的索引路径",
          node: "树节点",
        },
      },
      Root: {
        props: {
          size: "树行的尺寸档位，行内留白随之变化",
          canRename: "判断节点能否重命名的函数",
          checkedValue: "受控的选中节点值",
          collection: "树节点集合",
          defaultCheckedValue: "渲染时选中节点值的初始值；不需要控制选中节点值时使用",
          defaultExpandedValue: "渲染时展开节点值的初始值；不需要控制展开节点值时使用",
          defaultFocusedValue: "渲染时聚焦节点值的初始值；不需要控制聚焦节点值时使用",
          defaultSelectedValue: "渲染时已选节点值的初始值；不需要控制已选节点值时使用",
          expandedValue: "受控的展开节点值",
          expandOnClick: "点击分支时是否展开",
          focusedValue: "聚焦节点的 id",
          id: "组件内部状态机的唯一标识",
          ids: "树组件各元素的 id，适合组合使用",
          loadChildren: "加载节点子项的函数",
          selectedValue: "受控的已选节点值",
          selectionMode: "选择模式：`single` 只能选择一个节点，`multiple` 可选择多个节点",
          translations: "无障碍元素及其状态的本地化文案",
          typeahead: "是否支持输入即查找",
        },
      },
    },
  },
  typography: {
    description:
      "Typography：排版组件，为正文提供可按名称使用的文字层级。display 和 heading 使用宋体衬线，其余使用黑体。这里没有装饰，层级由字号、字重和留白构成。",
  },
  user: {
    description:
      "User：用户信息行。头像在文字前，名称和辅助说明在下方。头像直接复用 Avatar 组件，因此继承 Avatar 的所有尺寸和形状；这一行只负责排版文字。",
    parts: {
      User: {
        description:
          "User：用户信息行。头像在文字前，名称和辅助说明在下方。头像直接复用 Avatar 组件，因此继承 Avatar 的所有尺寸和形状；这一行只负责排版文字。",
        props: {
          name: "用户姓名，作为醒目的主行",
          description: "姓名下方的次要说明，如角色、头衔或地址",
          size: "头像尺寸，取头像自身尺寸阶梯中的一档",
        },
      },
    },
  },
  "virtual-list": {
    description:
      "VirtualList：虚拟列表，只挂载进入窗口的行。视口用按行高计算的占位元素维持滚动长度，行相对它定位；一万行列表在 DOM 中只占一个窗口，而不是全部行。固定行高让计算可靠，也不需要测量过程。",
    parts: {
      VirtualList: {
        description:
          "VirtualList：虚拟列表，只挂载进入窗口的行。视口用按行高计算的占位元素维持滚动长度，行相对它定位；一万行列表在 DOM 中只占一个窗口，而不是全部行。固定行高让计算可靠，也不需要测量过程。",
        props: {
          itemHeight: "每行占用的高度；固定行高时配置更简单",
          height: "列表滚动视口的高度",
        },
      },
    },
  },
  watermark: {
    description:
      "Watermark：水印层，显示在内容下方。canvas 先把文字绘制成一张图块（旋转、浅淡，并按屏幕像素密度保持清晰），标记层在默认插槽上重复平铺。prop 变化时水印会重绘，并且不接收指针事件。",
    parts: {
      Watermark: {
        description:
          "Watermark：水印层，显示在内容下方。canvas 先把文字绘制成一张图块（旋转、浅淡，并按屏幕像素密度保持清晰），标记层在默认插槽上重复平铺。prop 变化时水印会重绘，并且不接收指针事件。",
      },
    },
  },
  workflow: {
    description:
      "工作流画布：createWorkflowCanvas 把 X6 图挂载到任意元素，并让无头协议存储与每个手势（拖拽、连线、选中、撤销）保持同步。宿主通过 renderNode 把任意组件装进节点；执行器通过存储写回状态，画布只负责呈现。",
  },
};
