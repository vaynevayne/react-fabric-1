import type { Canvas, Path } from 'fabric'
import { PencilBrush } from 'fabric'
import { useEffect } from 'react'
import { useStoreApi } from '../hooks/useStore'

export type PluginFreeDrawProps = Partial<Path> & {
    onComplete: (path: Path, { canvas }: { canvas: Canvas }) => void
}

const PluginFreeDraw = ({ onComplete }: PluginFreeDrawProps) => {
    const store = useStoreApi()

    useEffect(() => {
        const { canvas } = store.getState()
        if (!canvas) return

        canvas.isDrawingMode = true
        canvas.freeDrawingBrush = new PencilBrush(canvas)
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = 'red'
            canvas.freeDrawingBrush.width = 2
        }

        canvas.on('path:created', handlePathCreated)

        return () => {
            canvas.isDrawingMode = false
            canvas.off('path:created', handlePathCreated)
        }
    }, [store, onComplete])

    const handlePathCreated = (opt: { path: Path }) => {
        const { path } = opt
        const { canvas } = store.getState()
        if (!canvas) return

        const cleanup = () => {
            canvas?.remove(path)
            canvas?.requestRenderAll()
        }

        Promise.resolve(
            onComplete(path, {
                canvas: canvas,
            }),
        ).finally(cleanup)
    }

    return null
}

export default PluginFreeDraw
