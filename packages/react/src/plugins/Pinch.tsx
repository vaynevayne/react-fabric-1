import { useEffect, useRef } from 'react'
import { useStoreApi } from '../hooks/useStore'
import Hammer from 'hammerjs'
import { Point } from 'fabric'

/**
 * 双指缩放（捏）
 * @param fabric
 * @returns
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
    /**
     * 双指缩放
     * @param e
     */
    const onPinchMove = (e: HammerInput) => {
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
      const point =
        e.srcEvent instanceof TouchEvent
          ? new Point(e.srcEvent.touches[0].clientX, e.srcEvent.touches[0].clientY)
          : new Point(e.srcEvent.offsetX, e.srcEvent.offsetY)
      canvas?.zoomToPoint(point, combinedZoom)
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
    if (!canvas) return

    const hammer = new Hammer(canvas.getSelectionElement())
    // 启用 pinch 事件识别器
    hammer.get('pinch').set({ enable: true })
    hammer.on('pinchmove', onPinchMove)
    hammer.on('pinchend', onPinchEnd)

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
