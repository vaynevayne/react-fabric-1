import type { Group as BaseGroup } from 'fabric'
import { Line as BaseLine } from 'fabric'
import { forwardRef, memo, useImperativeHandle } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'

export type Handle = BaseLine | undefined

export type LineProps<T = unknown> = Partial<ConstructorParameters<typeof BaseLine>[1] & AllObjectEvents> & {
  group?: BaseGroup
  path?: string
} & T

const Line = forwardRef<Handle, LineProps>(({ group, x1, y1, x2, y2, ...props }, ref) => {
  const [listeners, attributes] = useSplitProps(props)

  const instance = useCreateObject({
    Constructor: BaseLine,
    param: [x1, y1, x2, y2],
    attributes,
    group,
    listeners,
  })

  useImperativeHandle(ref, () => instance, [instance])

  return null
})

export default memo(Line)
