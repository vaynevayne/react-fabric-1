import type { Group as BaseGroup } from 'fabric'
import { Path as BasePath } from 'fabric'
import { forwardRef, memo, useImperativeHandle } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'

export type Handle = BasePath | undefined

export type PathProps<T = unknown> = Partial<ConstructorParameters<typeof BasePath>[1] & AllObjectEvents> & {
  group?: BaseGroup
  path?: string
} & T

const Path = forwardRef<Handle, PathProps>(({ group, path = 'M 0 0', ...props }, ref) => {
  const [listeners, attributes] = useSplitProps(props)

  const instance = useCreateObject({
    Constructor: BasePath,
    param: path,
    attributes,
    group,
    listeners,
  })

  useImperativeHandle(ref, () => instance, [instance])

  return null
})

export default memo(Path)
