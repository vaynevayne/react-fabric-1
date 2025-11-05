<div align="right">

<a href="README.md" style="background-color: #007bff; color: white; padding: 5px 10px; text-decoration: none; border-radius: 3px; font-weight: bold;">English</a>
<a href="README.zh.md" style="background-color: #6c757d; color: white; padding: 5px 10px; text-decoration: none; border-radius: 3px; margin-left: 5px;">中文</a>

</div>

# @cs-open/react-fabric

[![npm version](https://badge.fury.io/js/@cs-open%2Freact-fabric.svg)](https://badge.fury.io/js/@cs-open%2Freact-fabric)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern React Canvas drawing component library built on Fabric.js, providing powerful 2D graphics rendering, interaction, and animation capabilities.

## ✨ Core Features

### 🎯 Rich Graphic Components

- **Basic Shapes**: Rectangle, Circle, Ellipse, Line, Polygon, Path
- **Text Components**: Text, Editable Text, Textbox
- **Image Components**: Background Image, Regular Image
- **Group Components**: Group, Object Collection
- **Custom Controls**: Draggable Control Points, Toolbar

### 🖱️ Powerful Interaction Features

- **Auto Zoom**: Supports mouse wheel zooming, automatically adapts to container size
- **Pan Operation**: Supports drag to pan canvas view
- **Touch Support**: Full touch device support, including pinch zoom and drag
- **Selection System**: Multi-select, box selection, keyboard shortcut support
- **Drag Operation**: Object dragging, batch operations

### 📦 Responsive Design

- **Auto Adapt**: Canvas automatically fills parent container, responsive adjustment
- **Touch Optimization**: Touch interactions optimized for mobile devices
- **Cross-platform**: Supports desktop and mobile browsers

### 💻 Developer Friendly

- **TypeScript**: Full TypeScript type support
- **React Style**: Declarative API, conforms to React development practices
- **Event System**: Complete event callbacks, supports all Fabric.js events
- **State Management**: Built-in state management, supports controlled and uncontrolled modes

## ✨ Quick Start

### Installation

```bash
npm install @cs-open/react-fabric
# or
yarn add @cs-open/react-fabric
# or
pnpm add @cs-open/react-fabric
```

### Basic Usage

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

## 🎯 Core Features

### Auto Zoom and Pan

```tsx
import { ReactFabric, useReactFabric } from '@cs-open/react-fabric'

function CanvasWithControls() {
  const { zoomIn, zoomOut, resetViewport, zoom } = useReactFabric()

  return (
    <div>
      <div className="toolbar">
        <button onClick={zoomIn}>Zoom In</button>
        <button onClick={zoomOut}>Zoom Out</button>
        <button onClick={() => resetViewport()}>Reset</button>
        <span>Zoom: {Math.round(zoom * 100)}%</span>
      </div>

      <ReactFabric zoomable={true} panAble={true} minManualZoom={0.1} maxManualZoom={5}>
        {/* Your canvas content */}
      </ReactFabric>
    </div>
  )
}
```

### Touch Device Support

```tsx
import { ReactFabric, PluginPinch } from '@cs-open/react-fabric'
import { PluginPinch } from '@cs-open/react-fabric/plugins'

function TouchCanvas() {
  return (
    <ReactFabric>
      {/* Your canvas content */}
      <PluginPinch />
    </ReactFabric>
  )
}
```

### Background Image

```tsx
import { ReactFabric, BackgroundImage } from '@cs-open/react-fabric'

function CanvasWithBackground() {
  return (
    <ReactFabric defaultCentered>
      <BackgroundImage src="/path/to/image.jpg" scaleToFit />
      {/* Other graphic elements */}
    </ReactFabric>
  )
}
```

## 🔌 Plugin System

### Built-in Plugins

| Plugin           | Function       | Description                                 |
| ---------------- | -------------- | ------------------------------------------- |
| `PluginPinch`    | Touch Zoom     | Supports pinch zoom and drag operations     |
| `PluginFreeDraw` | Free Draw      | Hand-drawn paths and doodle features        |
| `PluginFreeRect` | Rectangle Draw | Interactive rectangle drawing tool          |
| `PluginFreeText` | Text Tool      | Click to add editable text                  |
| `PluginGridLine` | Grid Guide     | Display grid lines for alignment assistance |
| `PluginMask`     | Mask Effect    | Create mask and crop effects                |

### Using Plugins

```tsx
import { ReactFabric } from '@cs-open/react-fabric'
import { PluginPinch, PluginFreeDraw, PluginFreeRect, PluginGridLine } from '@cs-open/react-fabric/plugins'

function AdvancedCanvas() {
  return (
    <ReactFabric>
      {/* Touch support */}
      <PluginPinch />

      {/* Free draw */}
      <PluginFreeDraw
        onComplete={(path, { canvas }) => {
          console.log('Drawing completed:', path)
        }}
      />

      {/* Rectangle drawing tool */}
      <PluginFreeRect
        fill={'red'}
        onComplete={(rect, { canvas }) => {
          console.log('Rectangle drawing completed:', rect)
        }}
      />

      {/* Grid lines */}
      <PluginGridLine />
    </ReactFabric>
  )
}
```

## 📦 Component API

### ReactFabric Component

The main canvas container component, supports the following properties:

```tsx
interface ReactFabricProps {
  // Basic Properties
  width?: number
  height?: number
  className?: string
  style?: CSSProperties

  // Interaction Control
  zoomable?: boolean // Whether zoomable
  panAble?: boolean // Whether panable
  selection?: boolean // Whether selectable
  defaultSelection?: boolean // Default selection state
  defaultDraggable?: boolean // Default draggable state

  // Zoom Control
  manualZoom?: number // Manual zoom level
  minManualZoom?: number // Minimum zoom level
  maxManualZoom?: number // Maximum zoom level
  defaultCentered?: boolean // Whether background image is centered

  // Event Callbacks
  onMouseDown?: (e: FabricPublicEvent) => void
  onMouseMove?: (e: FabricPublicEvent) => void
  onMouseUp?: (e: FabricPublicEvent) => void
  onMouseWheel?: (e: FabricPublicEvent) => void
}
```

### Graphic Components

All graphic components support all properties and events of the corresponding Fabric.js objects:

```tsx
// Rectangle
<Rect
  left={100}
  top={100}
  width={200}
  height={100}
  fill="red"
  stroke="blue"
  strokeWidth={2}
  onModified={(e) => console.log('Rectangle modified', e.target)}
/>

// Circle
<Circle
  left={200}
  top={200}
  radius={50}
  fill="green"
  onSelected={() => console.log('Circle selected')}
/>

// Text
<Text
  left={100}
  top={300}
  text="Hello World"
  fontSize={24}
  fill="black"
  fontFamily="Arial"
/>

// Image
<Image
  left={300}
  top={300}
  src="/path/to/image.jpg"
  width={200}
  height={150}
/>
```

## 🎮 State Management

### useReactFabric Hook

```tsx
import { useReactFabric } from '@cs-open/react-fabric'

function Toolbar() {
  const {
    // State
    canvas,
    zoom,
    manualZoom,
    isDragging,
    selection,

    // Methods
    zoomIn,
    zoomOut,
    resetViewport,
    setZoomable,
    setSelection,
    setDraggable,
  } = useReactFabric()

  return (
    <div className="toolbar">
      <button onClick={zoomIn}>Zoom In</button>
      <button onClick={zoomOut}>Zoom Out</button>
      <button onClick={() => resetViewport()}>Reset</button>
      <span>Zoom: {Math.round(zoom * 100)}%</span>
    </div>
  )
}
```

### Cross-component State Access

ReactFabricProvider is a context provider that allows you to access the internal state of the flow from anywhere in the component tree, such as child components, or even outside the ReactFabric component. It is typically used at the top level of the application.
In this case, you may need to use the ReactFabricProvider component

```tsx
import { ReactFabricProvider, useReactFabric } from '@cs-open/react-fabric'

function App() {
  return (
    <ReactFabricProvider>
      <Toolbar />
      <ReactFabric>{/* Canvas content */}</ReactFabric>
    </ReactFabricProvider>
  )
}

function Toolbar() {
  const { zoomIn, zoomOut, resetViewport } = useReactFabric()
  // Can access state outside ReactFabric
}
```

## 🎨 Advanced Usage

### Controlled Mode

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

### Uncontrolled Mode

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

### DOM Integration

```tsx
import { ReactFabric, Rect } from '@cs-open/react-fabric'

function CanvasWithDOM() {
  return (
    <ReactFabric>
      <Rect left={100} top={100} width={200} height={100}>
        <div className="tooltip">This is a tooltip</div>
      </Rect>
    </ReactFabric>
  )
}
```

## 📋 Dependency Requirements

### Required Dependencies

```json
{
  "react": ">=17.0.0",
  "react-dom": ">=17.0.0",
  "fabric": "^6.6.1",
  "zustand": "^4.0.0 || ^5.0.0"
}
```

### Optional Dependencies

Some plugins require additional dependencies:

```bash
# Touch gesture support
npm install hammerjs
npm install @types/hammerjs  # TypeScript users

# Floating UI support (for DOM integration)
npm install @floating-ui/react
```

## 🤝 Contributing

Welcome to submit Issues and Pull Requests!

1. Fork this repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is open source under the [MIT](LICENSE) license.

## 🔗 Related Links

- [Fabric.js Official Documentation](http://fabricjs.com/)
- [React Official Documentation](https://reactjs.org/)
- [Project Homepage](https://cs-open.github.io/react-fabric/)
- [GitHub Repository](https://github.com/cs-open/react-fabric)

---

**Made with ❤️ by the CS-Open team**
