import type { Group as BaseGroup } from 'fabric'
import { IText, util, Point } from 'fabric'
import { cloneElement, forwardRef, isValidElement, memo, useImperativeHandle, type ReactNode } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'
import { useChildrenPosition } from '../../hooks/useChildrenPosition'

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

export default memo(ITextBox)
