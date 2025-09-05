import type { Group as BaseGroup } from 'fabric'
import { IText, util, Point } from 'fabric'
import { forwardRef, memo, useImperativeHandle, type ReactNode } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'
import { useInstancePosition } from '../../hooks/useInstancePosition'

export type ITextProps<T = unknown> = Partial<ConstructorParameters<typeof IText>[1] & AllObjectEvents> & {
  group?: BaseGroup
  text: string
  children?: ReactNode
} & T

IText.prototype.set({
  _getNonTransformedDimensions() {
    // Object dimensions
    return new Point(this.width, this.height).scalarAdd(this.padding)
  },
  _calculateCurrentDimensions() {
    // Controls dimensions
    return util.transformPoint(this._getTransformedDimensions(), this.getViewportTransform(), true)
  },
})

const ITextBox = forwardRef<IText | undefined, ITextProps>(({ group, text, children, ...props }, ref) => {
  const [listeners, attributes] = useSplitProps(props)

  const instance = useCreateObject({
    Constructor: IText,
    param: text,
    attributes,
    group,
    listeners,
  })

  useImperativeHandle(ref, () => instance, [instance])

  return useInstancePosition(instance, children)
})

export default memo(ITextBox)
