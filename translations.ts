export type Language = 'en' | 'zh';

export const translations = {
  en: {
    sidebar: {
      logo: "Logo",
      colors: "Color",
      typography: "Typography",
      motion: "Motion",
      components: "Components",
      language: "Language",
      juhuoColors: "Color"
    },
    landing: {
      brandGuidelines: "Brand Guidelines",
      logo: "Logo",
      colors: "Color",
      typography: "Typography",
      motion: "Motion",
      components: "Components",
      topviewLine: "TopView",
      juhuoLine: "Juhuo",
      juhuoColors: "Color"
    },
    components: {
      button: "Button"
    },
    logos: {
      title: "Logo",
      desc: "Official brand assets in horizontal and vertical formats.",
      downloadAll: "Download All"
    },
    colors: {
      title: "Color",
      desc: "Brand purple, supporting accents, and gradients.",
      purple: "Brand Purple",
      purpleDesc: "Primary brand scale. Purple 500 is #731DFB. Purple 400 is the Board slider / switch.",
      supporting: "Supporting Colors",
      supportingDesc: "Functional accents outside the purple and gray scales.",
      gradients: "Gradients",
      gradientsDesc: "Approved brand and product gradients.",
      accessibility: "Accessibility",
      accessibilityDesc: "Contrast standards for interface legibility.",
      bestPractice: "Recommended for primary text",
      incorrect: "Incorrect Examples",
      incorrectDesc: "Usage examples to avoid for brand consistency.",
      related: "Related Specs",
      comingSoon: "Coming soon",
      colorTokens: "Color tokens",
      colorTokensDesc: "Systematic color organization for developers."
    },
    juhuoColors: {
      title: "Color",
      desc: "Flame-inspired palette derived from the Juhuo logo — warm red-orange gradients for live content and trending media.",
      supporting: "Supporting Colors",
      supportingDesc: "Neutrals and brand gradients for visual balance.",
      accessibility: "Accessibility",
      accessibilityDesc: "Contrast standards for interface legibility on dark backgrounds.",
      bestPractice: "Recommended for primary text",
      incorrect: "Incorrect Examples",
      incorrectDesc: "Usage examples to avoid for brand consistency.",
      dontSubstitute: "Don't substitute Brand Flame",
      dontSubstituteDesc: "Always use the provided Juhuo Flame palette. Avoid generic reds or oranges that shift the brand warmth.",
      dontMuddyGradients: "Keep gradients warm and clean",
      dontMuddyGradientsDesc: "Gradients should stay within the red-orange-peach range. Avoid multi-hue or muddy transitions."
    },
    typography: {
      title: "Typography",
      desc: "Darker Grotesque for titles, Instrument Sans for body.",
      weights: "Weights",
      brandMarketing: "Titles",
      productUI: "Body",
      legacy: "Legacy",
      legacyBrand: "Brand (legacy)",
      legacyProduct: "Product (legacy)",
      downloadGoogleFonts: "Google Fonts"
    },
    motion: {
      title: "Motion",
      desc: "Not all interfaces need motion; it should serve experience goals, not just aesthetics.",
      spec: "Related Specs",
      heroSpec: "Hero Animation Spec",
      heroDesc: "GSAP specs for entrance sequences.",
      downloadSpec: "Download Spec",
      techSpecs: "Technical implementation guidelines.",
      principles: [
        { title: "Clear", desc: "Clarity over aesthetics." },
        { title: "Fast", desc: "Optimized for speed." },
        { title: "Consistent", desc: "Unified behavior." },
        { title: "Minimal", desc: "Essential movements only." }
      ]
    }
  },
  zh: {
    sidebar: {
      logo: "标志",
      colors: "颜色",
      typography: "字体",
      motion: "动效",
      components: "组件",
      language: "语言",
      juhuoColors: "颜色"
    },
    landing: {
      brandGuidelines: "品牌指南",
      logo: "标志",
      colors: "颜色",
      typography: "字体",
      motion: "动效",
      components: "组件",
      topviewLine: "TopView",
      juhuoLine: "聚火",
      juhuoColors: "颜色"
    },
    components: {
      button: "按钮"
    },
    logos: {
      title: "标志",
      desc: "官方品牌标志资产，包含横版与竖版配置。",
      downloadAll: "全部下载"
    },
    colors: {
      title: "颜色",
      desc: "品牌紫、辅助色与渐变。",
      purple: "品牌紫色色阶",
      purpleDesc: "品牌主色阶。Purple 500 为 #731DFB，Purple 400 为 Board 滑块 / 开关。",
      supporting: "辅助色",
      supportingDesc: "紫色与灰色之外的功能性强调色。",
      gradients: "渐变色",
      gradientsDesc: "已确认的品牌与产品渐变。",
      accessibility: "无障碍",
      accessibilityDesc: "界面易读性的对比度标准。",
      bestPractice: "建议作为主文本色",
      incorrect: "错误示例",
      incorrectDesc: "为保持品牌一致性，应避免使用的示例。",
      related: "相关规范",
      comingSoon: "即将推出",
      colorTokens: "颜色令牌",
      colorTokensDesc: "面向开发的系统化颜色管理。"
    },
    juhuoColors: {
      title: "颜色",
      desc: "源自聚火 Logo 的火焰色系——以暖红橙渐变传递热点内容与直播媒体的能量感。",
      supporting: "辅助色",
      supportingDesc: "中性色与品牌渐变，用于视觉平衡。",
      accessibility: "无障碍",
      accessibilityDesc: "暗色背景下的对比度标准。",
      bestPractice: "建议作为主文本色",
      incorrect: "错误示例",
      incorrectDesc: "为保持品牌一致性，应避免使用的示例。",
      dontSubstitute: "不要替代品牌火焰色",
      dontSubstituteDesc: "始终使用提供的聚火火焰色阶，避免使用偏离品牌暖感的通用红/橙色。",
      dontMuddyGradients: "保持渐变温暖纯净",
      dontMuddyGradientsDesc: "渐变应保持在红-橙-蜜桃色范围内，避免多色相或浑浊过渡。"
    },
    typography: {
      title: "字体",
      desc: "标题默认 Darker Grotesque，正文使用 Instrument Sans。",
      weights: "字重",
      brandMarketing: "标题",
      productUI: "正文",
      legacy: "旧字体",
      legacyBrand: "品牌（旧）",
      legacyProduct: "产品（旧）",
      downloadGoogleFonts: "Google Fonts"
    },
    motion: {
      title: "动效",
      desc: "不是所有界面都需要动效；动效应服务于体验目标，而非为了“好看”而加。",
      spec: "相关规范",
      heroSpec: "Hero 动画规范",
      heroDesc: "入场序列的 GSAP 技术参数。",
      downloadSpec: "下载规范",
      techSpecs: "技术实现指南。",
      principles: [
        { title: "清晰", desc: "清晰度优于美学。" },
        { title: "快速", desc: "响应迅速。" },
        { title: "一致", desc: "行为统一。" },
        { title: "极简", desc: "仅保留核心动作。" }
      ]
    }
  }
};
