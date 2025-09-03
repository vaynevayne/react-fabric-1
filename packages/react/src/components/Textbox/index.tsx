import type { Group as BaseGroup } from 'fabric'
import { Textbox as FabricTextbox, util, Point } from 'fabric'
import { cloneElement, forwardRef, isValidElement, memo, useImperativeHandle, type ReactNode } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'
import { useChildrenPosition } from '../../hooks/useChildrenPosition'

export type TextboxProps<T = unknown> = Partial<ConstructorParameters<typeof FabricTextbox>[1] & AllObjectEvents> & {
  group?: BaseGroup
  text: string
  children?: ReactNode
} & T

FabricTextbox.prototype.set({
  _getNonTransformedDimensions() {
    // Object dimensions
    return new Point(this.width, this.height).scalarAdd(this.padding)
  },
  _calculateCurrentDimensions() {
    // Controls dimensions
    return util.transformPoint(this._getTransformedDimensions(), this.getViewportTransform(), true)
  },
})

const Textbox = forwardRef<FabricTextbox | undefined, TextboxProps>(({ group, text, children, ...props }, ref) => {
  const [listeners, attributes] = useSplitProps(props)

  const instance = useCreateObject({
    Constructor: FabricTextbox,
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

export default memo(Textbox)
