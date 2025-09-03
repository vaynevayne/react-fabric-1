import { useEffect, useRef } from 'react'
import { util } from 'fabric'
import type { FabricObject } from 'fabric'
import { useStoreApi } from './useStore'

/**
 * 用于同步子元素位置与 Fabric.js 对象位置的 Hook
 * @param instance Fabric.js 对象实例
 * @returns childrenRef - 需要绑定到子元素的 ref
 */
export function useChildrenPosition<T extends HTMLElement = HTMLDivElement>(instance: FabricObject | undefined) {
  const childrenRef = useRef<T>(null)
  const store = useStoreApi()

  useEffect(() => {
    if (!instance) return

    const { canvas } = store.getState()

    const updatePosition = () => {
      if (!childrenRef.current || !canvas) return

      const sceneCoords = instance.getCoords()
      const viewportCoords = sceneCoords.map(point => util.sendPointToPlane(point, canvas.viewportTransform, undefined))

      const style = {
        position: 'absolute' as const,
        left: `${viewportCoords[0].x}px`,
        top: `${viewportCoords[0].y}px`,
        width: `${viewportCoords[2].x - viewportCoords[0].x}px`,
        height: `${viewportCoords[2].y - viewportCoords[0].y}px`,
      }

      Object.assign(childrenRef.current.style, style)
    }

    canvas?.on('after:render', updatePosition)

    // 初始化位置
    updatePosition()

    return () => {
      canvas?.off('after:render', updatePosition)
    }
  }, [instance, store])

  return childrenRef
}
