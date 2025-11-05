# @cs-open/react-fabric

[![npm version](https://badge.fury.io/js/@cs-open%2Freact-fabric.svg)](https://badge.fury.io/js/@cs-open%2Freact-fabric)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个基于 Fabric.js 构建的现代化 React Canvas 绘图组件库，提供强大的 2D 图形绘制、交互和动画功能。

A modern React Canvas drawing component library built on Fabric.js, providing powerful 2D graphics rendering, interaction, and animation capabilities.

## ✨ 核心特性 / Core Features

### 🎯 丰富的图形组件 / Rich Graphic Components

- **基础图形 / Basic Shapes**: 矩形、圆形、椭圆、线条、多边形、路径 / Rectangle, Circle, Ellipse, Line, Polygon, Path
- **文本组件 / Text Components**: 文本、可编辑文本、文本框 / Text, Editable Text, Textbox
- **图像组件 / Image Components**: 背景图片、普通图片 / Background Image, Regular Image
- **组合组件 / Group Components**: 分组、对象集合 / Group, Object Collection
- **自定义控件 / Custom Controls**: 可拖拽控制点、工具栏 / Draggable Control Points, Toolbar

### 🖱️ 强大的交互功能 / Powerful Interaction Features

- **自动缩放 / Auto Zoom**: 支持鼠标滚轮缩放，自动适应容器大小 / Supports mouse wheel zooming, automatically adapts to container size
- **平移操作 / Pan Operation**: 支持拖拽平移画布视图 / Supports drag to pan canvas view
- **触摸支持 / Touch Support**: 完整的触摸设备支持，包括双指缩放和拖拽 / Full touch device support, including pinch zoom and drag
- **选择系统 / Selection System**: 多选、框选、键盘快捷键支持 / Multi-select, box selection, keyboard shortcut support
- **拖拽操作 / Drag Operation**: 对象拖拽、批量操作 / Object dragging, batch operations

### 📦 响应式设计 / Responsive Design

- **自动适配 / Auto Adapt**: 画布自动撑满父容器，响应式调整 / Canvas automatically fills parent container, responsive adjustment
- **触摸优化 / Touch Optimization**: 专为移动设备优化的触摸交互 / Touch interactions optimized for mobile devices
- **跨平台 / Cross-platform**: 支持桌面端和移动端浏览器 / Supports desktop and mobile browsers

### 💻 开发者友好 / Developer Friendly

- **TypeScript**: 完整的 TypeScript 类型支持 / Full TypeScript type support
- **React 风格 / React Style**: 声明式 API，符合 React 开发习惯 / Declarative API, conforms to React development practices
- **事件系统 / Event System**: 完整的事件回调，支持所有 Fabric.js 事件 / Complete event callbacks, supports all Fabric.js events
- **状态管理 / State Management**: 内置状态管理，支持受控和非受控模式 / Built-in state management, supports controlled and uncontrolled modes

## ✨ 快速开始 / Quick Start

### 安装 / Installation

```bash
npm install @cs-open/react-fabric
# 或者 / or
yarn add @cs-open/react-fabric
# 或者 / or
pnpm add @cs-open/react-fabric
```

### 基础用法 / Basic Usage

```tsx
import React from 'react'
import { ReactFabric, Rect, Text, Circle } from '@cs-open/react-fabric'

function App() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFabric>
        <Rect left={100} top={100} width={200} height={100} fill="red" stroke="blue" strokeWidth={2} />
        <Circle left={300} top={150} radius={50} fill="green" />
        <Text left={150} top={250} text="Hello Fabric!" fontSize={20} fill="white" />
      </ReactFabric>
    </div>
  )
}

export default App
```

## 🎯 核心功能 / Core Features

### 自动缩放与平移 / Auto Zoom and Pan

```tsx
import { ReactFabric, useReactFabric } from '@cs-open/react-fabric'

function CanvasWithControls() {
  const { zoomIn, zoomOut, resetViewport, zoom } = useReactFabric()

  return (
    <div>
      <div className="toolbar">
        <button onClick={zoomIn}>放大 / Zoom In</button>
        <button onClick={zoomOut}>缩小 / Zoom Out</button>
        <button onClick={() => resetViewport()}>重置 / Reset</button>
        <span>
          缩放: {Math.round(zoom * 100)}% / Zoom: {Math.round(zoom * 100)}%
        </span>
      </div>

      <ReactFabric zoomable={true} panAble={true} minManualZoom={0.1} maxManualZoom={5}>
        {/* 你的画布内容 / Your canvas content */}
      </ReactFabric>
    </div>
  )
}
```

### 触摸设备支持 / Touch Device Support

```tsx
import { ReactFabric, PluginPinch } from '@cs-open/react-fabric'
import { PluginPinch } from '@cs-open/react-fabric/plugins'

function TouchCanvas() {
  return (
    <ReactFabric>
      {/* 你的画布内容 / Your canvas content */}
      <PluginPinch />
    </ReactFabric>
  )
}
```

### 背景图片 / Background Image

```tsx
import { ReactFabric, BackgroundImage } from '@cs-open/react-fabric'

function CanvasWithBackground() {
  return (
    <ReactFabric defaultCentered>
      <BackgroundImage src="/path/to/image.jpg" scaleToFit />
      {/* 其他图形元素 / Other graphic elements */}
    </ReactFabric>
  )
}
```

## 🔌 插件系统 / Plugin System

### 内置插件 / Built-in Plugins

| 插件 / Plugin    | 功能 / Function           | 描述 / Description                                               |
| ---------------- | ------------------------- | ---------------------------------------------------------------- |
| `PluginPinch`    | 触摸缩放 / Touch Zoom     | 支持双指缩放和拖拽操作 / Supports pinch zoom and drag operations |
| `PluginFreeDraw` | 自由绘制 / Free Draw      | 手绘路径和涂鸦功能 / Hand-drawn paths and doodle features        |
| `PluginFreeRect` | 矩形绘制 / Rectangle Draw | 交互式矩形绘制工具 / Interactive rectangle drawing tool          |
| `PluginFreeText` | 文本工具 / Text Tool      | 点击添加可编辑文本 / Click to add editable text                  |
| `PluginGridLine` | 网格辅助 / Grid Guide     | 显示网格线辅助对齐 / Display grid lines for alignment assistance |
| `PluginMask`     | 遮罩效果 / Mask Effect    | 创建遮罩和裁剪效果 / Create mask and crop effects                |

### 使用插件 / Using Plugins

```tsx
import { ReactFabric } from '@cs-open/react-fabric'
import { PluginPinch, PluginFreeDraw, PluginFreeRect, PluginGridLine } from '@cs-open/react-fabric/plugins'

function AdvancedCanvas() {
  return (
    <ReactFabric>
      {/* 触摸支持 / Touch support */}
      <PluginPinch />

      {/* 自由绘制 / Free draw */}
      <PluginFreeDraw
        onComplete={(path, { canvas }) => {
          console.log('绘制完成:', path)
          console.log('Drawing completed:', path)
        }}
      />

      {/* 矩形绘制工具 / Rectangle drawing tool */}
      <PluginFreeRect
        fill={'red'}
        onComplete={(rect, { canvas }) => {
          console.log('矩形绘制完成:', rect)
          console.log('Rectangle drawing completed:', rect)
        }}
      />

      {/* 网格线 / Grid lines */}
      <PluginGridLine />
    </ReactFabric>
  )
}
```

## 📦 组件 API / Component API

### ReactFabric 组件 / ReactFabric Component

主要的画布容器组件，支持以下属性：

The main canvas container component, supports the following properties:

```tsx
interface ReactFabricProps {
  // 基础属性 / Basic Properties
  width?: number
  height?: number
  className?: string
  style?: CSSProperties

  // 交互控制 / Interaction Control
  zoomable?: boolean // 是否可缩放 / Whether zoomable
  panAble?: boolean // 是否可平移 / Whether panable
  selection?: boolean // 是否可选择 / Whether selectable
  defaultSelection?: boolean // 默认选择状态 / Default selection state
  defaultDraggable?: boolean // 默认拖拽状态 / Default draggable state

  // 缩放控制 / Zoom Control
  manualZoom?: number // 手动缩放倍数 / Manual zoom level
  minManualZoom?: number // 最小缩放倍数 / Minimum zoom level
  maxManualZoom?: number // 最大缩放倍数 / Maximum zoom level
  defaultCentered?: boolean // 背景图是否居中 / Whether background image is centered

  // 事件回调 / Event Callbacks
  onMouseDown?: (e: FabricPublicEvent) => void
  onMouseMove?: (e: FabricPublicEvent) => void
  onMouseUp?: (e: FabricPublicEvent) => void
  onMouseWheel?: (e: FabricPublicEvent) => void
}
```

### 图形组件 / Graphic Components

所有图形组件都支持对应的 Fabric.js 对象的所有属性和事件：

All graphic components support all properties and events of the corresponding Fabric.js objects:

```tsx
// 矩形 / Rectangle
<Rect
  left={100}
  top={100}
  width={200}
  height={100}
  fill="red"
  stroke="blue"
  strokeWidth={2}
  onModified={(e) => console.log('矩形被修改', e.target)}
  onModified={(e) => console.log('Rectangle modified', e.target)}
/>

// 圆形 / Circle
<Circle
  left={200}
  top={200}
  radius={50}
  fill="green"
  onSelected={() => console.log('圆形被选中')}
  onSelected={() => console.log('Circle selected')}
/>

// 文本 / Text
<Text
  left={100}
  top={300}
  text="Hello World"
  fontSize={24}
  fill="black"
  fontFamily="Arial"
/>

// 图片 / Image
<Image
  left={300}
  top={300}
  src="/path/to/image.jpg"
  width={200}
  height={150}
/>
```

## 🎮 状态管理 / State Management

### useReactFabric Hook

```tsx
import { useReactFabric } from '@cs-open/react-fabric'

function Toolbar() {
  const {
    // 状态 / State
    canvas,
    zoom,
    manualZoom,
    isDragging,
    selection,

    // 方法 / Methods
    zoomIn,
    zoomOut,
    resetViewport,
    setZoomable,
    setSelection,
    setDraggable,
  } = useReactFabric()

  return (
    <div className="toolbar">
      <button onClick={zoomIn}>放大 / Zoom In</button>
      <button onClick={zoomOut}>缩小 / Zoom Out</button>
      <button onClick={() => resetViewport()}>重置 / Reset</button>
      <span>
        缩放: {Math.round(zoom * 100)}% / Zoom: {Math.round(zoom * 100)}%
      </span>
    </div>
  )
}
```

### 跨组件状态访问 / Cross-component State Access

ReactFabricProvider 是一个上下文提供程序，允许您从组件树中的任何位置访问流的内部状态，例如子组件，甚至在 ReactFabric 之外 元件。它通常用于应用程序的顶层。
在这种情况下，您可能需要使用 ReactFabricProvider 组件

ReactFabricProvider is a context provider that allows you to access the internal state of the flow from anywhere in the component tree, such as child components, or even outside the ReactFabric component. It is typically used at the top level of the application.
In this case, you may need to use the ReactFabricProvider component

```tsx
import { ReactFabricProvider, useReactFabric } from '@cs-open/react-fabric'

function App() {
  return (
    <ReactFabricProvider>
      <Toolbar />
      <ReactFabric>{/* 画布内容 / Canvas content */}</ReactFabric>
    </ReactFabricProvider>
  )
}

function Toolbar() {
  const { zoomIn, zoomOut, resetViewport } = useReactFabric()
  // 可以在 ReactFabric 外部访问状态 / Can access state outside ReactFabric
}
```

## 🎨 高级用法 / Advanced Usage

### 受控模式 / Controlled Mode

```tsx
import { useState } from 'react'
import { ReactFabric, Rect } from '@cs-open/react-fabric'

function ControlledCanvas() {
  const [rect, setRect] = useState({
    left: 100,
    top: 100,
    width: 200,
    height: 100,
    fill: 'red',
  })

  return (
    <ReactFabric>
      <Rect {...rect} onModified={e => setRect(e.target)} />
    </ReactFabric>
  )
}
```

### 非受控模式 / Uncontrolled Mode

```tsx
import { ReactFabric, Rect, Group } from '@cs-open/react-fabric'

function UncontrolledCanvas() {
  return (
    <ReactFabric>
      <Group>
        <Rect defaultLeft={100} defaultTop={100} defaultWidth={100} defaultHeight={100} fill="blue" />
      </Group>
    </ReactFabric>
  )
}
```

### DOM 集成 / DOM Integration

```tsx
import { ReactFabric, Rect } from '@cs-open/react-fabric'

function CanvasWithDOM() {
  return (
    <ReactFabric>
      <Rect left={100} top={100} width={200} height={100}>
        <div className="tooltip">这是一个提示框 / This is a tooltip</div>
      </Rect>
    </ReactFabric>
  )
}
```

## 📋 依赖要求 / Dependency Requirements

### 必需依赖 / Required Dependencies

```json
{
  "react": ">=17.0.0",
  "react-dom": ">=17.0.0",
  "fabric": "^6.6.1",
  "zustand": "^4.0.0 || ^5.0.0"
}
```

### 可选依赖 / Optional Dependencies

某些插件需要额外的依赖：

Some plugins require additional dependencies:

```bash
# 触摸手势支持 / Touch gesture support
npm install hammerjs
npm install @types/hammerjs  # TypeScript 用户 / TypeScript users

# 浮动 UI 支持（用于 DOM 集成）/ Floating UI support (for DOM integration)
npm install @floating-ui/react
```

## 🤝 贡献 / Contributing

欢迎提交 Issue 和 Pull Request！

Welcome to submit Issues and Pull Requests!

1. Fork 本仓库 / Fork this repository
2. 创建特性分支 / Create feature branch (`git checkout -b feature/AmazingFeature`)
3. 提交更改 / Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 / Push to branch (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request / Open Pull Request

## 📄 许可证 / License

本项目基于 [MIT](LICENSE) 许可证开源。

This project is open source under the [MIT](LICENSE) license.

## 🔗 相关链接 / Related Links

- [Fabric.js 官方文档](http://fabricjs.com/) / [Fabric.js Official Documentation](http://fabricjs.com/)
- [React 官方文档](https://reactjs.org/) / [React Official Documentation](https://reactjs.org/)
- [项目主页](https://cs-open.github.io/react-fabric/) / [Project Homepage](https://cs-open.github.io/react-fabric/)
- [GitHub 仓库](https://github.com/cs-open/react-fabric) / [GitHub Repository](https://github.com/cs-open/react-fabric)

---

**Made with ❤️ by the CS-Open team**
