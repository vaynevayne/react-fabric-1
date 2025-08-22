import type { Group as BaseGroup } from 'fabric'
import { Rect as BaseRect } from 'fabric'

import { cloneElement, forwardRef, isValidElement, memo, useImperativeHandle, type ReactNode } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import { useChildrenPosition } from '../../hooks/useChildrenPosition'
import type { AllObjectEvents } from '../../types/object'

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

export default memo(Rect)
