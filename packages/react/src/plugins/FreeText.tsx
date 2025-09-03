import type { Canvas, ITextProps, TPointerEvent, TPointerEventInfo } from 'fabric'
import { IText } from 'fabric'
import { useEffect, useRef } from 'react'
import { useStoreApi } from '../hooks/useStore'

export type PluginFreeTextProps = Partial<IText> & {
    options?: Partial<ITextProps>
    onComplete: (text: IText, { canvas }: { canvas: Canvas }) => void
}

const PluginFreeText = ({ options, onComplete }: PluginFreeTextProps) => {
    const store = useStoreApi()
    const textRef = useRef<IText | null>(null)

    useEffect(() => {
        const { canvas } = store.getState()
        if (!canvas) return

        const handleMouseDown = (opt: TPointerEventInfo<TPointerEvent>) => {
            const activeObject = canvas.getActiveObject()
            if (activeObject) {
                return
            }

            const { x: currentX, y: currentY } = canvas.getScenePoint(opt.e)
            const defaultOptions = {
                fontSize: 24,
                left: currentX,
                top: currentY,
                fill: 'red',
                stroke: 'red',
                borderColor: '#FFFF00',
                editingBorderColor: '#FFFF00',
                selectable: true,
                editable: true,
                _controlsVisibility: {
                    mtr: false,
                    mr: false,
                    mt: false,
                    mb: false,
                    ml: false,
                },
            }
            textRef.current = new IText('请输入文字', {
                ...defaultOptions,
                ...options,
            })
            canvas.add(textRef.current)
            canvas.setActiveObject(textRef.current)
            canvas.remove(textRef.current)
            onComplete(textRef.current, {
                canvas: canvas,
            })
            // textRef.current.on('editing:exited', () => {
            //   console.log('textRef.current', textRef.current)
            // })
        }

        canvas.on('mouse:down', handleMouseDown)

        return () => {
            canvas.off('mouse:down', handleMouseDown)
        }
    }, [store, onComplete])

    return null
}

export default PluginFreeText
