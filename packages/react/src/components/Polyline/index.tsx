import type { Group as BaseGroup } from 'fabric'
import { Polyline as BasePolyline } from 'fabric'
import { forwardRef, memo, useImperativeHandle, type ReactNode } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'
import { useInstancePosition } from '../../hooks/useInstancePosition'

export type PolylineProps<T = unknown> = Partial<ConstructorParameters<typeof BasePolyline>[1] & AllObjectEvents> & {
  group?: BaseGroup
  path?: string
  children?: ReactNode
} & T

const Polyline = forwardRef<BasePolyline | undefined, PolylineProps>(({ group, points, children, ...props }, ref) => {
  const [listeners, attributes] = useSplitProps(props)

  const instance = useCreateObject({
    Constructor: BasePolyline,
    param: points,
    attributes,
    group,
    listeners,
  })

  useImperativeHandle(ref, () => instance, [instance])

  return useInstancePosition(instance, children)
})

export default memo(Polyline)
