export type Language = 'en' | 'zh';

export const translations = {
  en: {
    sidebar: {
      logo: "Logo",
      colors: "Color",
      typography: "Typography",
      motion: "Motion",
      language: "Language"
    },
    landing: {
      brandGuidelines: "Brand Guidelines",
      logo: "Logo",
      colors: "Color",
      typography: "Typography",
      motion: "Motion"
    },
    logos: {
      title: "Logo",
      desc: "Official brand assets in horizontal and vertical formats.",
      downloadAll: "Download All"
    },
    colors: {
      title: "Color",
      desc: "Brand and functional color palettes.",
      supporting: "Supporting Colors",
      supportingDesc: "Palette for visual balance and interface clarity.",
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
    typography: {
      title: "Typography",
      desc: "Outfit for branding, Inter for interface.",
      weights: "Weights",
      brandMarketing: "Brand",
      productUI: "Product",
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
      language: "语言"
    },
    landing: {
      brandGuidelines: "品牌指南",
      logo: "标志",
      colors: "颜色",
      typography: "字体",
      motion: "动效"
    },
    logos: {
      title: "标志",
      desc: "官方品牌标志资产，包含横版与竖版配置。",
      downloadAll: "全部下载"
    },
    colors: {
      title: "颜色",
      desc: "品牌主色与功能性色阶。",
      supporting: "辅助色",
      supportingDesc: "用于视觉平衡与界面清晰度的色系。",
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
    typography: {
      title: "字体",
      desc: "Outfit 用于品牌识别，Inter 用于产品界面。",
      weights: "字重",
      brandMarketing: "品牌",
      productUI: "产品",
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
