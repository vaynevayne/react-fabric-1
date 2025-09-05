import type { Group as BaseGroup } from 'fabric'
import { Ellipse as BaseEllipse } from 'fabric'
import { forwardRef, memo, useImperativeHandle, type ReactNode } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'
import { useInstancePosition } from '../../hooks/useInstancePosition'

export type EllipseProps<T = unknown> = Partial<BaseEllipse & AllObjectEvents> & {
  group?: BaseGroup
  defaultLeft?: number
  defaultTop?: number
  defaultWidth?: number
  defaultHeight?: number
  children?: ReactNode
} & T

const Ellipse = forwardRef<BaseEllipse | undefined, EllipseProps>(({ group, children, ...props }, ref) => {
  const [listeners, attributes, defaultValues] = useSplitProps(props)

  const instance = useCreateObject({
    Constructor: BaseEllipse,
    defaultValues,
    attributes,
    group,
    listeners,
  })
  useImperativeHandle(ref, () => instance, [instance])

  return useInstancePosition(instance, children)
})

export default memo(Ellipse)
