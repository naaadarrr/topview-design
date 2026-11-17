export type HomepageGraySwatch = {
  hex: string;
  usage: { en: string; zh: string };
};

export type HomepageGrayGroup = {
  id: 'shell' | 'rail' | 'modules' | 'preview';
  swatches: HomepageGraySwatch[];
};

/** Existing homepage hardcoded dark/gray colors only. Not tokens. Not merged. Not invented. */
export const HOMEPAGE_GRAY_GROUPS: HomepageGrayGroup[] = [
  {
    id: 'shell',
    swatches: [
      {
        hex: '#0E0E13',
        usage: {
          en: 'HomePageClient whole-page fallback; category Tab focus-ring outer.',
          zh: 'HomePageClient 整页回退底；分类 Tab 焦点环外圈。',
        },
      },
      {
        hex: '#101010',
        usage: {
          en: 'Homepage main canvas; left-rail selected state; Community top bar (often /95) and list left/right fades.',
          zh: '首页主画布；左栏选中态；Community 顶栏（常带 /95）以及列表左右渐隐。',
        },
      },
    ],
  },
  {
    id: 'rail',
    swatches: [
      {
        hex: '#131313',
        usage: {
          en: 'Left sidebar and Home Left Dock column background.',
          zh: '左侧栏与 Home Left Dock 列背景。',
        },
      },
      {
        hex: '#232323',
        usage: {
          en: 'Left-rail right border; Dock stroke.',
          zh: '左栏右边框；Dock 描边。',
        },
      },
      {
        hex: '#1A1A1A',
        usage: {
          en: 'Dock popover; sidebar menu ground (often /95).',
          zh: 'Dock 弹出层；侧栏菜单底（常带 /95）。',
        },
      },
      {
        hex: '#1D1D1D',
        usage: {
          en: 'User-menu plan/quota card.',
          zh: '用户菜单中的套餐 / 配额卡片。',
        },
      },
      {
        hex: '#141414',
        usage: {
          en: 'Sidebar progress-bar track.',
          zh: '侧栏进度条轨道。',
        },
      },
      {
        hex: '#242424',
        usage: {
          en: 'Sidebar raised surface, avatar ground, menu tooltip; Quick Starts input focus.',
          zh: '侧栏凸起表面、头像底、菜单 tooltip；Quick Starts 输入框焦点态。',
        },
      },
      {
        hex: '#2F2F2F',
        usage: {
          en: 'Dock hover/emphasis fill; sidebar secondary-item hover.',
          zh: 'Dock 悬停 / 强调填充；侧栏次要项悬停。',
        },
      },
      {
        hex: '#2A2A2A',
        usage: {
          en: 'Dock skeleton placeholder bars.',
          zh: 'Dock 骨架占位条。',
        },
      },
      {
        hex: '#8A8A8A',
        usage: {
          en: 'Dock/sidebar default icon color; Film Studio supporting copy.',
          zh: 'Dock / 侧栏默认图标色；Film Studio 辅助文案。',
        },
      },
      {
        hex: '#A0A0A0',
        usage: {
          en: 'Sidebar unselected text.',
          zh: '侧栏未选中文本。',
        },
      },
      {
        hex: '#D4D4D4',
        usage: {
          en: 'Sidebar nav text/icon (default).',
          zh: '侧栏导航文本 / 图标（默认）。',
        },
      },
      {
        hex: '#E3E3E3',
        usage: {
          en: 'Dock/sidebar primary text; icon hover.',
          zh: 'Dock / 侧栏主文本；图标悬停。',
        },
      },
    ],
  },
  {
    id: 'modules',
    swatches: [
      {
        hex: '#1B1B1B',
        usage: {
          en: 'Homepage main input/conversation module surface; sidebar item hover.',
          zh: '首页主输入 / 对话模块表面；侧栏条目悬停。',
        },
      },
      {
        hex: '#181818',
        usage: {
          en: 'Input-area container, session-mode menu, some hint bars (often paired with border #353537).',
          zh: '输入区容器、会话模式菜单、部分提示条（常与描边 #353537 成对出现）。',
        },
      },
      {
        hex: '#1C1C1D',
        usage: {
          en: 'Another input-area state; asset-library popover.',
          zh: '另一种输入区状态；素材库弹出层。',
        },
      },
      {
        hex: '#1C1C1C',
        usage: {
          en: 'Quick Starts popover solid ground and input default ground.',
          zh: 'Quick Starts 弹出层实底与输入默认底。',
        },
      },
      {
        hex: '#171717',
        usage: {
          en: 'Canvas featured-skill bar/bubble. Same hex as the already-locked micro-glass daily card; recorded here only as a homepage usage.',
          zh: 'Canvas 精选技能条 / 气泡。与已锁定的微 glass daily 卡片同色值，这里只记录为首页用法。',
        },
      },
      {
        hex: '#353537',
        usage: {
          en: 'Common stroke for the input area and upload button.',
          zh: '输入区与上传按钮的常用描边。',
        },
      },
      {
        hex: '#272729',
        usage: {
          en: 'Selected session mode; some cards / disabled buttons.',
          zh: '选中的会话模式；部分卡片 / 禁用按钮。',
        },
      },
      {
        hex: '#3A3A3C',
        usage: {
          en: 'Session-mode hover/active; some disabled controls.',
          zh: '会话模式悬停 / 激活；部分禁用控件。',
        },
      },
      {
        hex: '#3E3E47',
        usage: {
          en: 'Template-card and tool-card hover.',
          zh: '模板卡与工具卡悬停。',
        },
      },
      {
        hex: '#303030',
        usage: {
          en: 'Small tooltip / menu item; some preview hover.',
          zh: '小 tooltip / 菜单项；部分预览悬停。',
        },
      },
      {
        hex: '#434343',
        usage: {
          en: 'Preview card, filter chip, hint-bar stroke.',
          zh: '预览卡、筛选芯片、提示条描边。',
        },
      },
    ],
  },
  {
    id: 'preview',
    swatches: [
      {
        hex: '#090A0A',
        usage: {
          en: 'Film Studio module shell.',
          zh: 'Film Studio 模块外壳。',
        },
      },
      {
        hex: '#080808',
        usage: {
          en: 'Asset/preview thumbnail ground.',
          zh: '素材 / 预览缩略图底。',
        },
      },
      {
        hex: '#0D0D0D',
        usage: {
          en: 'Video Style dialog preview ground.',
          zh: 'Video Style 对话框预览底。',
        },
      },
      {
        hex: '#0F0F0F',
        usage: {
          en: 'Template-list sticky bar; some preview hover.',
          zh: '模板列表粘性栏；部分预览悬停。',
        },
      },
      {
        hex: '#0A0A0A',
        usage: {
          en: 'Preview phone frame; also dark text on white buttons.',
          zh: '预览手机外框；也用作白底按钮上的深色文字。',
        },
      },
      {
        hex: '#000000',
        usage: {
          en: 'Case-preview canvas. Some uses are a CSS mask only, not a fill.',
          zh: '案例预览画布。部分用法只作为 CSS mask，不是填色。',
        },
      },
      {
        hex: '#111111',
        usage: {
          en: 'Occasional overlay/popover ground.',
          zh: '偶尔用作遮罩 / 弹出层底。',
        },
      },
      {
        hex: '#1A1A1C',
        usage: {
          en: 'Video Style large dialog shell.',
          zh: 'Video Style 大对话框外壳。',
        },
      },
      {
        hex: '#202020',
        usage: {
          en: 'Upload-card hover; user-menu shadow ground.',
          zh: '上传卡悬停；用户菜单阴影底。',
        },
      },
      {
        hex: '#111214',
        usage: {
          en: 'Drama hint-bar text on white buttons.',
          zh: 'Drama 提示条在白底按钮上的文字色。',
        },
      },
    ],
  },
];
