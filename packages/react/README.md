# @cs-open/react-fabric

React 组件库，基于 Fabric.js 构建，提供强大的 Canvas 绘图功能。

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
import { Canvas, Rect, Text } from '@cs-open/react-fabric'

function App() {
  return (
    <Canvas width={800} height={600}>
      <Rect left={100} top={100} width={200} height={100} fill="red" />
      <Text left={150} top={150} text="Hello Fabric!" fontSize={20} fill="white" />
    </Canvas>
  )
}

export default App
```

## 插件系统

### 内置插件

- **Pinch**: 触摸设备双指缩放支持
- **FreeDraw**: 自由绘制工具
- **FreeRect**: 自由矩形绘制工具
- **FreeText**: 自由文本工具
- **GridLine**: 网格线辅助工具
- **Mask**: 遮罩效果
- **Pinch**: 触摸手势支持

### 使用插件

```tsx
import { Canvas } from '@cs-open/react-fabric'
import { Pinch, FreeDraw } from '@cs-open/react-fabric/plugins'

function App() {
  return (
    <Canvas width={800} height={600}>
      {/* 你的画布内容 */}
      <Pinch />
      <FreeDraw />
    </Canvas>
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

DOM control

```jsx
<Rect>
  <div className="w-full h-full bg-red-500">
    <EvaluatesHtml
      type="right"
      pageSize={pageSize}
      allSentences={allSentences}
      isPaperFront={isPaperFront}
      fontSizeMemo={fontSizeMemo / 1.2}
      singleColumnLeft={singleColumnLeft}
    />
  </div>
</Rect>
```

## 许可证

MIT
