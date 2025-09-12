# @cs-open/react-fabric

React 组件库，基于 Fabric.js 构建，提供强大的 Canvas 绘图功能。
<img width="1770" height="1478" alt="img_v3_02h1_4c0d27e2-f335-4e98-8f46-dd8c504f319g" src="https://github.com/user-attachments/assets/02ff8152-bad3-4e99-82db-13eefc5413b0" />

## 安装

```bash
npm install @cs-open/react-fabric
# 或者
yarn add @cs-open/react-fabric
# 或者
pnpm add @cs-open/react-fabric
```

### 可选依赖

某些插件需要额外的依赖才能正常工作：

#### Pinch 插件（触摸手势支持）

```bash
npm install hammerjs
# 如果使用 TypeScript，还需要安装类型定义
npm install @types/hammerjs
```

**注意**：如果没有安装 `hammerjs`，Pinch 插件会自动禁用，不会影响其他功能。

## 使用示例

```tsx
import React from 'react'
import { ReactFabric, Rect, Text } from '@cs-open/react-fabric'

function App() {
  return (
    <ReactFabric>
      <Rect left={100} top={100} width={200} height={100} fill="red" />
      <Text left={150} top={150} text="Hello Fabric!" fontSize={20} fill="white" />
    </ReactFabric>
  )
}

export default App
```

每个组件接受对应 fabric.js 类的所有属性和事件, 事件名转换为react的驼峰形式:
如: `after:render` -> `onAfterRender`
ReactFabric 等价于 Canvas组件, 接受fabric.canvas 类的属性
有完善的 ts 支持

宽高会自动撑满父容器的宽高,且自动 resize

## 插件系统

### 内置插件

- **PluginPinch**: 触摸设备双指缩放支持
- **PluginFreeDraw**: 自由绘制工具
- **PluginFreeRect**: 自由矩形绘制工具
- **PluginFreeText**: 自由文本工具
- **PluginGridLine**: 网格线辅助工具
- **PluginMask**: 遮罩效果
- **PluginPinch**: 触摸手势支持

### 使用插件

```tsx
import { ReactFabric } from '@cs-open/react-fabric'
import { PluginPinch, PluginFreeRect } from '@cs-open/react-fabric/plugins'

function App() {
  return (
    <ReactFabric>
      {/* 你的画布内容 */}
      <Pinch />
      <PluginFreeDraw />
      <PluginFreeRect
        onComplete={async (nextRect, { canvas }) => {
          console.log('nextRect', nextRect)
        }}
      />
    </ReactFabric>
  )
}
```

## 故障排除

### Pinch 插件不工作

如果触摸手势功能不工作，请确保：

1. 已安装 `hammerjs`：

   ```bash
   npm install hammerjs
   ```

2. 检查控制台是否有相关警告信息

3. 确保在触摸设备上测试

### 其他问题

如果遇到其他问题，请检查：

1. 所有必需依赖是否正确安装
2. 浏览器控制台是否有错误信息
3. 确保使用兼容的浏览器版本

### 受控模式

```tsx
import React from 'react'
import { ReactFabric, Rect, Text } from '@cs-open/react-fabric'

function App() {
  const [rect, setRect] = useState({ left: 100, top: 100, width: 200, height: 100, fill: 'red' })
  return (
    <ReactFabric>
      <Rect {...rect} onModified={e => setRect(e.target)} />
    </ReactFabric>
  )
}

export default App
```

### 非受控模式

支持以下属性

```
const UNCONTROLLED_PROPS = [
  'left',
  'top',
  'width',
  'height',
  'scaleX',
  'scaleY',
  'angle',
  'points',
  'path',
  'originX',
  'originY',
]
```

针对被 `Group` 包裹的组件, 推荐使用非受控模式,因为Group 有自己的坐标系 会修改其子元素的属性

```tsx
import React from 'react'
import { ReactFabric, Rect, Text } from '@cs-open/react-fabric'

function App() {
  return (
    <ReactFabric>
      <Group
        onModified={({ target }) => {
          const group = target as unknown as FabricGroup
          const objects = group.getObjects()
          const coords = objects[0].getCoords()
          console.log('rect的信息', coords)
        }}
      >
        <Rect defaultLeft={100} defaultTop={100} defaultWidth={100} defaultHeight={100} />
      </Group>
    </ReactFabric>
  )
}

export default App
```

### DOM control

支持使用 dom 作为 children 内容, 实现诸如 tooltip 等效果,推荐结合 [floating-ui](https://floating-ui.com/) 实现

```jsx
<Rect>
  <div className="w-full h-full bg-red-500">click me</div>
</Rect>
```

### 状态管理

`ReactFabric` 的子组件, 可使用 `useReactFabric` 访问相关的状态

```jsx
const Toolbar = () => {
  const { setMinManualZoom, setMaxManualZoom, reset, setDefaultSelection, canvas } = useReactFabric()
  return <div>Toolbar</div>
}

const Main = () => {
  return (
    <ReactFabric>
      <BackgroundImage scaleToFit src={imgBaseURL + currentSrc} />
      <Toolbar />
    </ReactFabric>
  )
}
```

### 跨组件访问状态

如需要在 `ReactFabric` 组件外部访问内部的状态, 可使用 `ReactFabricProvider` + `useReactFabric` 的组合

```jsx
const Toolbar = () => {
  const { setMinManualZoom, setMaxManualZoom, reset, setDefaultSelection, canvas } = useReactFabric()
  return <div>Toolbar</div>
}

const Main = () => {
  return (
    <ReactFabricProvider>
      <ReactFabric>
        <BackgroundImage scaleToFit src={imgBaseURL + currentSrc} />
      </ReactFabric>
      <Toolbar />
    </ReactFabricProvider>
  )
}
```

## 许可证

MIT

### 发布到 npm 步骤:

pnpm run changeset // 修改 changeset.md
全选 changed & unchanged enter
不选 enter major
不选 enter minor
Summary 随便写
desired changeset ? true
pnpm run version-packages // 修改 package.json 的 version
pnpm install // 修改 lock 文件
git add .
git commit -m 'chore(core): version bump'
git push
提交pr到main
通过 github action 自动发布到 npm
