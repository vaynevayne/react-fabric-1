import type { Group as BaseGroup } from 'fabric'
import { Path as BasePath } from 'fabric'
import { cloneElement, forwardRef, isValidElement, memo, useImperativeHandle, type ReactNode } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'
import { useChildrenPosition } from '../../hooks/useChildrenPosition'

export type Handle = BasePath | undefined

export type PathProps<T = unknown> = Partial<ConstructorParameters<typeof BasePath>[1] & AllObjectEvents> & {
  group?: BaseGroup
  path?: string
  children?: ReactNode

} & T

const Path = forwardRef<Handle, PathProps>(({ group, path = 'M 0 0', children, ...props }, ref) => {
  const [listeners, attributes] = useSplitProps(props)

  const instance = useCreateObject({
    Constructor: BasePath,
    param: path,
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

export default memo(Path)
