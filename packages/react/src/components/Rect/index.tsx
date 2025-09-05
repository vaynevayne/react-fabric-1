import type { Group as BaseGroup } from 'fabric'
import { Rect as BaseRect } from 'fabric'
import { forwardRef, memo, useImperativeHandle, type ReactNode } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'
import { useInstancePosition } from '../../hooks/useInstancePosition'

export type RectProps<T = unknown> = Partial<BaseRect & AllObjectEvents> & {
  group?: BaseGroup
  defaultLeft?: number
  defaultTop?: number
  defaultWidth?: number
  defaultHeight?: number
  children?: ReactNode
} & T

const Rect = forwardRef<BaseRect | undefined, RectProps>(({ group, children, ...props }, ref) => {
  const [listeners, attributes, defaultValues] = useSplitProps(props)

  const instance = useCreateObject({
    Constructor: BaseRect,
    defaultValues,
    attributes,
    group,
    listeners,
  })

  useImperativeHandle(ref, () => instance, [instance])

  return useInstancePosition(instance, children)
})

export default memo(Rect)
