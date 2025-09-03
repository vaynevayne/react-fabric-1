import type { Group as BaseGroup } from 'fabric'
import { Polyline as BasePolyline } from 'fabric'
import { cloneElement, forwardRef, isValidElement, memo, useImperativeHandle, type ReactNode } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'
import { useChildrenPosition } from '../../hooks/useChildrenPosition'

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

  const childrenRef = useChildrenPosition<HTMLDivElement>(instance)

  useImperativeHandle(ref, () => instance, [instance])

  return children ? (
    <>
      {isValidElement(children)
        ? cloneElement(children, {
            ...(children.props as any),
            ref: childrenRef,
          } as any)
        : null}
    </>
  ) : null
})

export default memo(Polyline)
