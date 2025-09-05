import type { Group as BaseGroup } from 'fabric'
import { Path as BasePath } from 'fabric'
import { forwardRef, memo, useImperativeHandle, type ReactNode } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'
import { useInstancePosition } from '../../hooks/useInstancePosition'

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

  useImperativeHandle(ref, () => instance, [instance])

  return useInstancePosition(instance, children)
})

export default memo(Path)
