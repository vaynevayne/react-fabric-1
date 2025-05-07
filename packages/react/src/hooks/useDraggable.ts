import type { Canvas, FabricObject, TPointerEvent, TPointerEventInfo } from 'fabric'
import { shallow } from 'zustand/shallow'
import { useEffect, useRef } from 'react'
import type { ReactFabricState } from '../types/store'
import { useStore, useStoreApi } from './useStore'

const selector = (s: ReactFabricState) => ({
  canvas: s.canvas,
  draggable: s.draggable,
})

const stageObject = (object: FabricObject) => {
  const raw = object.get('selectable')
  object.set('selectable', false)

  return () => {
    object.set('selectable', raw)
  }
}

const stage = (canvas: Canvas | null) => {
  if (!canvas) return () => { }
  const objects = canvas.getObjects()

  const unStagedList = objects.map(object => {
    return stageObject(object)
  })

  return () => {
    unStagedList.forEach(fn => fn())
  }
}

const useDraggable = () => {
  const store = useStoreApi()
  const { canvas, draggable } = useStore(selector, shallow)
  const lastPosXRef = useRef(0)
  const lastPosYRef = useRef(0)
  const isDraggingRef = useRef(false)

  useEffect(() => {
    if (!draggable) return
    const unStaged = stage(canvas)

    const onMouseDown = ({ e }: TPointerEventInfo<TPointerEvent>) => {
      // @ts-expect-error 触摸屏拿不到clintX
      const touch = e.changedTouches?.[0]
      isDraggingRef.current = true
      // @ts-expect-error 触摸屏拿不到clintX
      lastPosXRef.current = e.clientX ?? touch?.clientX
      // @ts-expect-error 触摸屏拿不到clintX
      lastPosYRef.current = e.clientY ?? touch?.clientY
    }

    const onMouseMove = ({ e }: TPointerEventInfo<MouseEvent>) => {
      if (isDraggingRef.current && canvas) {
        var vpt = canvas.viewportTransform
        // @ts-expect-error 触摸屏拿不到clintX
        const touch = e.changedTouches?.[0]
        vpt[4] += (e.clientX ?? touch?.clientX) - lastPosXRef.current!
        vpt[5] += (e.clientY ?? touch?.clientY) - lastPosYRef.current!
        canvas.requestRenderAll()
        lastPosXRef.current = e.clientX ?? touch?.clientX
        lastPosYRef.current = e.clientY ?? touch?.clientY
      }
    }

    const onMouseUp = (_: TPointerEventInfo<TPointerEvent>) => {
      if (canvas) {
        canvas.setViewportTransform(canvas.viewportTransform)
        isDraggingRef.current = false
      }
    }

    canvas?.on('mouse:down', onMouseDown)
    canvas?.on('mouse:move', onMouseMove)
    canvas?.on('mouse:up', onMouseUp)

    return () => {
      unStaged()
      canvas?.off('mouse:down', onMouseDown)
      canvas?.off('mouse:move', onMouseMove)
      canvas?.off('mouse:up', onMouseUp)
    }
  }, [canvas, draggable, store])

  return null
}

export default useDraggable
