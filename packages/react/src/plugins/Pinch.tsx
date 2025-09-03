import { useEffect, useRef } from 'react'
import { useStoreApi } from '../hooks/useStore'

import { Point } from 'fabric'

/**
 * 双指缩放（捏）插件
 *
 * 此组件提供触摸设备上的双指缩放功能。
 *
 * **依赖要求**：
 * 需要安装 hammerjs 来实现触摸手势识别：
 * ```bash
 * npm install hammerjs
 * # 如果使用 TypeScript，还需要安装类型定义
 * npm install @types/hammerjs
 * ```
 *
 * 如果没有安装 hammerjs，此组件会静默跳过初始化，不会影响其他功能。
 *
 * @returns null - 这是一个逻辑组件，不渲染任何UI
 */
const Pinch = () => {
  const store = useStoreApi()
  const { canvas } = store.getState()
  // 双指缩放记录
  const newManualZoomRef = useRef(1)

  /**
   * 注册时间
   */
  useEffect(() => {
    let hammer: HammerManager | null = null

    /**
     * 双指缩放
     * @param e
     */
    const onPinchMove = (e: any) => {
      const { canvas, manualZoom, fitZoom, minManualZoom, maxManualZoom } = store.getState()
      let newManualZoom = e.scale * manualZoom
      // 最小缩放限制
      if (newManualZoom <= minManualZoom) {
        newManualZoom = minManualZoom
      }
      // 最大缩放限制
      if (newManualZoom >= maxManualZoom) {
        newManualZoom = maxManualZoom
      }
      // 计算原图比例
      const combinedZoom = newManualZoom * fitZoom
      // 渲染更新
      canvas?.zoomToPoint(new Point(e.srcEvent.offsetX, e.srcEvent.offsetY), combinedZoom)
      // 记录手动缩放比例，onPinchEnd使用
      newManualZoomRef.current = newManualZoom
    }
    /**
     * 缩放结束
     */
    const onPinchEnd = () => {
      const { fitZoom } = store.getState()
      const combinedZoom = newManualZoomRef.current * fitZoom
      store.setState({
        manualZoom: newManualZoomRef.current,
        zoom: combinedZoom,
      })
    }

    // 初始化 Hammer.js
    const initialize = async () => {
      try {
        if (!canvas) return

        const selectionElement = canvas.getSelectionElement()
        if (!selectionElement) return

        // 动态导入 Hammer.js
        const HammerModule = await import('hammerjs')
        const Hammer = HammerModule.default
        hammer = new Hammer(selectionElement)
        // 启用 pinch 事件识别器
        hammer.get('pinch').set({ enable: true })
        hammer.on('pinchmove', onPinchMove)
        hammer.on('pinchend', onPinchEnd)
      } catch (error) {
        // hammerjs 未安装或导入失败，静默跳过
        console.warn('Pinch plugin disabled: hammerjs not found. Install hammerjs to enable touch gestures.', error)
      }
    }

    initialize()

    return () => {
      if (hammer) {
        hammer.off('pinchmove', onPinchMove)
        hammer.off('pinchend', onPinchEnd)
        hammer.destroy()
      }
    }
  }, [canvas, store])

  return null
}

export default Pinch
