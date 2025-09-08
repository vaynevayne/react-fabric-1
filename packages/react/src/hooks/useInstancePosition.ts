import { useEffect, useRef, useCallback, cloneElement, isValidElement, type ReactNode } from 'react'
import { util } from 'fabric'
import type { FabricObject } from 'fabric'
import { useStoreApi } from './useStore'

/**
 * 用于同步子元素位置与 Fabric.js 对象位置的 Hook
 * 直接操作 DOM 元素样式，避免频繁的 React 重渲染
 * 同时处理 ref 合并和 children 克隆
 * @param instance Fabric.js 对象实例
 * @param children 需要处理的子元素
 * @returns 处理后的 children
 */
export function useInstancePosition(instance: FabricObject | undefined, children: ReactNode) {
  const store = useStoreApi()
  const childElementRef = useRef<HTMLElement | null>(null)
  const lastPositionRef = useRef<string>('')

  const handleRef = useCallback(
    (node: any) => {
      childElementRef.current = node
      const currentRef = isValidElement(children) ? (children as any).ref : undefined
      if (currentRef) {
        if (typeof currentRef === 'function') {
          currentRef(node)
        } else if (currentRef) {
          currentRef.current = node
        }
      }
    },
    [children],
  )

  useEffect(() => {
    if (!instance) return

    const { canvas } = store.getState()
    if (!canvas) return

    const updatePosition = () => {
      if (!childElementRef.current) return

      const sceneCoords = instance.getCoords()
      const viewportCoords = sceneCoords.map(point => util.sendPointToPlane(point, canvas.viewportTransform, undefined))

      const newPosition = `${viewportCoords[0].x},${viewportCoords[0].y},${viewportCoords[2].x - viewportCoords[0].x},${viewportCoords[2].y - viewportCoords[0].y}`

      if (newPosition === lastPositionRef.current) return
      lastPositionRef.current = newPosition

      const element = childElementRef.current
      Object.assign(element.style, {
        position: 'absolute',
        left: `${viewportCoords[0].x}px`,
        top: `${viewportCoords[0].y}px`,
        width: `${viewportCoords[2].x - viewportCoords[0].x}px`,
        height: `${viewportCoords[2].y - viewportCoords[0].y}px`,
      })
    }

    canvas.on('after:render', updatePosition)
    updatePosition()

    return () => {
      canvas.off('after:render', updatePosition)
    }
  }, [instance, store])

  // 处理 children
  if (!isValidElement(children)) return null

  const childProps = children.props as any

  return cloneElement(children, {
    ...childProps,
    ref: handleRef,
    style: {
      position: 'absolute',
      ...childProps.style,
    },
  } as any)
}
