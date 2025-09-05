import { cloneElement, isValidElement, type CSSProperties } from 'react'

export const childrenWithPosition = ({
  children,
  position,
}: {
  children: React.ReactNode
  position: CSSProperties
}) => {
  return isValidElement(children)
    ? cloneElement(children, {
        ...(children.props as any),
        style: Object.assign({}, position, children.props.style),
      } as any)
    : null
}
