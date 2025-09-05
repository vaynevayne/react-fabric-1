import type { ImageProps as FabricImageProps, ObjectEvents, SerializedImageProps } from 'fabric'
import { FabricImage } from 'fabric'
import type { Group as BaseGroup } from 'fabric'
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, type ReactNode } from 'react'
import { useStoreApi } from '../../hooks/useStore'
import { useInstancePosition } from '../../hooks/useInstancePosition'

export type ImageProps = Partial<FabricImageProps> & {
  src: string
  group?: BaseGroup
  onLoad?: (imageSource: FabricImage<Partial<ImageProps>, SerializedImageProps, ObjectEvents>) => void
  children?: ReactNode
}

const Image = forwardRef<FabricImage | undefined, ImageProps>(({ group, src, onLoad, children, ...options }, ref) => {
  const instanceRef = useRef<FabricImage>()
  const onLoadRef = useRef(onLoad)
  const store = useStoreApi()
  const optionsRef = useRef(options)

  // 更新 onLoadRef
  useEffect(() => {
    onLoadRef.current = onLoad
    optionsRef.current = options
  })

  // 只在 src 改变时初始化 image
  useEffect(() => {
    const { canvas } = store.getState()
    if (!canvas?.getElement()) return

    const parent = group ?? canvas

    FabricImage.fromURL(src, { crossOrigin: 'anonymous' }).then(imageSource => {
      instanceRef.current = imageSource
      imageSource.set(optionsRef.current)
      onLoadRef.current?.(imageSource)
      parent.add(imageSource)
    })

    return () => {
      if (instanceRef.current) {
        parent?.remove(instanceRef.current)
      }
    }
  }, [src, store, group]) // 只包含初始化需要的依赖

  useImperativeHandle(ref, () => instanceRef.current)

  return useInstancePosition(instanceRef.current, children)
})

export default memo(Image)
