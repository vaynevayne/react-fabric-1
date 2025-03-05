import type { Group as BaseGroup } from 'fabric'
import { Ellipse as BaseEllipse } from 'fabric'
import { forwardRef, memo, useImperativeHandle } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'

export type EllipseProps<T = unknown> = Partial<BaseEllipse & AllObjectEvents> & {
  group?: BaseGroup
  defaultLeft?: number
  defaultTop?: number
  defaultWidth?: number
  defaultHeight?: number
} & T

const Ellipse = forwardRef<BaseEllipse | undefined, EllipseProps>(({ group, ...props }, ref) => {
  const [listeners, attributes, defaultValues] = useSplitProps(props)

  const instance = useCreateObject({
    Constructor: BaseEllipse,
    defaultValues,
    attributes,
    group,
    listeners,
  })

  useImperativeHandle(ref, () => instance, [instance])

  return null
})

export default memo(Ellipse)
