import { memo } from 'react'
import Path from '../Path'
import Text from '../Text'
import Rect from '../Rect'
import Line from '../Line'
import IText from '../IText'

export type ObjectsProps = {
  objects: { type: string; [index: string]: any }[]
}

const Objects = ({ objects }: ObjectsProps) => {
  const components = {
    rect: Rect,
    path: Path,
    text: Text,
    line: Line,
    'i-text': Text,
    itext: IText,
  }

  if (!objects) return null
  return (
    <>
      {objects?.map(({ type, ...options }) => {
        const Component = components[type.toLowerCase() as keyof typeof components]
        if (!Component) {
          return null
        }
        return <Component {...(options as any)} />
      })}
    </>
  )
}

export default memo(Objects)
