import { useState } from 'react'
import {
  ReactFabric,
  BackgroundImage,
  Rect,
  type RectProps,
  useReactFabric,
  ReactFabricProvider,
  Control,
  Text,
  // PluginGridLine,
} from '@cs-open/react-fabric'
import './Canvas.css'

export default function Counter() {
  const [rects, setRects] = useState<RectProps[]>([
    { left: 0, top: 0, width: 100, height: 100, fill: 'transparent', strokeWidth: 10, stroke: 'red' },
  ])

  const [open, setOpen] = useState(true)
  return (
    <>
      <ReactFabricProvider>
        <Toolbar />
        <ReactFabric defaultCentered style={{ border: '1px solid black' }}>
          <BackgroundImage src="/react-fabric/bg.png" scaleToFit />
          {rects.map((rect, index) => (
            <Control
              key={index}
              closeOnOutsideClick={false}
              open={open}
              Content={
                <div>
                  <button onClick={() => setOpen(false)}>点击 关闭 </button>
                </div>
              }
            >
              <Rect
                key={index}
                {...rect}
                onModified={({ target }) => {
                  setRects(prevRects => prevRects.map((rect, idx) => (idx === index ? { ...rect, ...target } : rect)))
                }}
                onMousedown={() => {
                  setOpen(true)
                }}
              />
            </Control>
          ))}
          <Text text="red" />
          {/* <PluginGridLine></PluginGridLine> */}
        </ReactFabric>
      </ReactFabricProvider>
    </>
  )
}

const Toolbar = () => {
  const { resetViewport, zoomIn, zoomOut, manualZoom, canvas } = useReactFabric()
  return (
    <div>
      <button onClick={() => resetViewport()}>重置</button>
      <button onClick={zoomIn}>放大</button>
      <span> {Math.round(manualZoom * 100)}%</span>
      <button onClick={zoomOut}>缩小</button>
      <button
        onClick={() => {
          console.log('canvas', canvas)
        }}
      >
        canvas
      </button>
    </div>
  )
}
