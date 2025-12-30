# Hero Section 动画技术规范文档

本文档详细描述了官网首页 Hero 区域（首屏）的入场动画与交互规范。请前端开发人员基于 **GSAP (GreenSock Animation Platform)** 进行实现。

## 1. 概述与设计目标

*   **风格**: 现代、流畅、具有层级感。
*   **核心逻辑**: 元素按阅读顺序依次入场，通过透明度、位移和缩放的组合，引导用户视线从标语 -> 标题 -> 核心交互区（Chat Interface）。
*   **性能**: 使用 `transform` 和 `opacity` 属性，确保由 GPU 合成，避免重排重绘。

## 2. 技术依赖

*   **核心库**: `gsap` (v3.12+)
*   **插件**: `ScrollTrigger` (可选，用于后续滚动交互，Hero 入场主要依赖 Timeline)

## 3. 入场动画序列 (Entrance Sequence)

动画应在页面 DOM 加载完成 (`DOMContentLoaded`) 后立即触发。

**时间轴总览:**

| 顺序 | 元素 |类名 | 动画效果 | 持续时间 | 延迟/偏移 | 缓动函数 (Ease) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 标语 | `.hero-tagline` | Fade In + Slide Up (30px) | 1.0s | 0s (Start) | `power3.out` |
| 2 | 大标题 | `.hero-title` | Fade In + Slide Up (40px) | 1.0s | `-=0.8s` (与上个动画重叠) | `power3.out` |
| 3 | 对话框 | `.hero-chat-interface` | Fade In + Slide Up (40px) + Scale (0.95 → 1) | 1.0s | `-=0.6s` (与上个动画重叠) | `back.out(1.2)` |

### 详细参数说明

#### 3.1. 标语 (Tagline)
*   **初始状态**: `opacity: 0`, `y: 30`
*   **结束状态**: `opacity: 1`, `y: 0`
*   **说明**: 最先出现，轻微上浮。

#### 3.2. 主标题 (Main Title)
*   **初始状态**: `opacity: 0`, `y: 40`
*   **结束状态**: `opacity: 1`, `y: 0`
*   **说明**: 紧随标语出现。由于字体较大，位移距离稍大 (40px) 以体现重量感。

#### 3.3. 核心交互区 (Chat Interface)
*   **初始状态**: `opacity: 0`, `y: 40`, `scale: 0.95`
*   **结束状态**: `opacity: 1`, `y: 0`, `scale: 1`
*   **说明**: 这是页面的视觉重心。除了淡入上浮外，加入了 **缩放 (Scale)** 和 **回弹 (Back Ease)** 效果，使其出现时有一种“弹出”或“落地”的物理质感，更加生动。

## 4. 微交互 (Micro-interactions)

除了入场动画，元素在鼠标悬停时应有以下反馈：

### 4.1. 工具按钮 (`.tool-btn`)
*   **Trigger**: Hover
*   **效果**:
    *   背景色变亮 (`#3a3a3c`)
    *   文字变白
    *   边框颜色加深
*   **过渡**: `0.2s ease`

### 4.2. 发送按钮 (`.send-btn`)
*   **Trigger**: Hover
*   **效果**:
    *   **放大**: `scale(1.05)`
    *   **光晕**: `box-shadow: 0 0 15px rgba(78, 64, 243, 0.5)`
*   **过渡**: `0.2s ease`

## 5. 无障碍与响应式 (A11y & Responsive)

### 5.1. 减弱动画 (Reduced Motion)
当用户系统开启“减弱动态效果”时 (`prefers-reduced-motion: reduce`)，应**禁用**所有位移和缩放效果，仅保留纯粹的 **透明度淡入 (Fade In)**。

*   **逻辑**:
    ```javascript
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        // 仅执行 opacity: 0 -> 1
        gsap.to([".hero-tagline", ".hero-title", ".hero-chat-interface"], { opacity: 1, duration: 0.5 });
    }
    ```

### 5.2. 初始隐藏
为防止动画加载前元素闪烁，建议在 CSS 中设置初始状态：
```css
.hero-tagline, .hero-title, .hero-chat-interface {
    opacity: 0;
    /* 尽量不要在 CSS 写 transform，交给 GSAP 处理以避免冲突，除非作为 fallback */
}
```

## 6. 参考代码 (GSAP Implementation)

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // 检查减弱动画偏好
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // 初始化时间轴
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (!prefersReducedMotion) {
        // 标准完整动画
        heroTl
        // 1. 标语
        .fromTo(".hero-tagline", 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 1 }
        )
        // 2. 标题 (提前 0.8s 开始)
        .fromTo(".hero-title", 
            { opacity: 0, y: 40 }, 
            { opacity: 1, y: 0, duration: 1 }, 
            "-=0.8"
        )
        // 3. 对话框 (提前 0.6s 开始，带回弹)
        .fromTo(".hero-chat-interface", 
            { opacity: 0, scale: 0.95, y: 40 }, 
            { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.2)" }, 
            "-=0.6"
        );
    } else {
        // 减弱模式：仅淡入
        heroTl.to([".hero-tagline", ".hero-title", ".hero-chat-interface"], { 
            opacity: 1, 
            duration: 0.5 
        });
    }
});
```


