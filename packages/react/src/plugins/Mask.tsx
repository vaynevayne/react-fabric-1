import { Rect } from 'fabric'
import { useEffect, useRef } from 'react'
import { useStoreApi } from '../hooks/useStore'

export type PluginMaskProps = {
    defaultFill?: boolean // 是否默认没有选择对象时，蒙层遮住整个图片
    fullness?: boolean // 是否完全遮住
}

/** 聚焦对象时蒙层；边界是背景图片 */
const PluginMask = (props: PluginMaskProps) => {
    const { defaultFill = false, fullness = false } = props
    const store = useStoreApi()
    const { canvas } = store.getState()
    const maskRectRef = useRef<Rect | null>(null)

    const initMaskRect = () => {
        return new Rect({
            left: 0,
            top: 0,
            fill: 'rgba(0,0,0,0.2)' /** 半透明灰色 */,
            selectable: false,
            evented: false,
            excludeFromExport: true /** toJSON 不存在，getObjects 存在 */,
            isMask: true,
        })
    }

    const renderDefaultMask = () => {
        if (!canvas?.backgroundImage) return

        if (maskRectRef.current) {
            maskRectRef.current.set({
                clipPath: null,
            })
            canvas.requestRenderAll()
        } else {
            maskRectRef.current = initMaskRect()
            maskRectRef.current.set({
                width: canvas.backgroundImage?.width,
                height: canvas.backgroundImage?.height,
            })
            canvas.add(maskRectRef.current)
            canvas.moveObjectTo(maskRectRef.current, -999)
        }
    }

    useEffect(() => {
        if (fullness) renderDefaultMask()
    }, [fullness])

    useEffect(() => {
        if (!canvas) return
        if (defaultFill) renderDefaultMask()

        const renderMask = (e: any) => {
            const { selected } = e
            const target = selected[0]
            if (!canvas || !target) return
            if (!target.get('showMark')) return

            /** 必须加上以下参数，才能裁切成功 */
            target.inverted = true
            target.absolutePositioned = true
            /** 从未触发过时，初始化蒙层 */
            if (!maskRectRef.current) {
                maskRectRef.current = initMaskRect()
                setTimeout(() => {
                    if (!maskRectRef.current) return
                    maskRectRef.current.set({
                        width: canvas.backgroundImage?.width,
                        height: canvas.backgroundImage?.height,
                        clipPath: target,
                    })
                    canvas.add(maskRectRef.current)
                    canvas.moveObjectTo(maskRectRef.current, -999)
                }, 100)
            } else {
                maskRectRef.current.set({
                    width: canvas.backgroundImage?.width || maskRectRef.current.width,
                    height: canvas.backgroundImage?.height || maskRectRef.current.height,
                    clipPath: target,
                })
                canvas.requestRenderAll()
            }
        }

        /** 第一次是点击触发 created，切换另一个框是触发 updated */
        canvas.on('selection:created', renderMask)
        canvas.on('selection:updated', renderMask)

        return () => {
            if (maskRectRef.current) {
                canvas.remove(maskRectRef.current)
                maskRectRef.current = null
            }
            canvas.off('selection:created', renderMask)
            canvas.off('selection:updated', renderMask)
            canvas.requestRenderAll()
        }
    }, [canvas])

    return <></>
}

export default PluginMask
