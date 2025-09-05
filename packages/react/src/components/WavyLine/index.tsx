/* eslint-disable prefer-const */
import type { Group as BaseGroup } from 'fabric'
import { Line as BaseLine, Point } from 'fabric'
import { forwardRef, memo, useImperativeHandle, type ReactNode } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'
import { useInstancePosition } from '../../hooks/useInstancePosition'

interface UniqueLineProps {
  x1: number
  x2: number
  y1: number
  y2: number
}

class WavyLineClass extends BaseLine {
  static type = 'wavyLine'

  constructor(points: any, options = {}) {
    super(points, options)
  }

  _render(ctx: any) {
    /** 参考 Line 源码改造，可能不完整 https://github.com/fabricjs/fabric.js/blob/e114448a1bce9b68a3e1bba337bc0c83a35c1aa5/src/shapes/Line.ts#L29 */
    ctx.beginPath()

    const p = this.calcLinePoints()
    const point = this.pointOnLine(this.point(p.x2, p.y2))
    this.wavy(this.point(p.x1, p.y1), point, ctx)
    ctx.lineWidth = this.strokeWidth
    const origStrokeStyle = ctx.strokeStyle
    ctx.strokeStyle = this.stroke ?? ctx.fillStyle
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.stroke && this._renderStroke(ctx)
    ctx.strokeStyle = origStrokeStyle
  }

  point(x: any, y: any) {
    return {
      x: x,
      y: y,
    }
  }

  wavy(from: any, to: any, ctx: any) {
    const wavyWidth = 4 * 3
    let cx = 0,
      cy = 0,
      fx = from.x,
      fy = from.y,
      tx = to.x,
      ty = to.y,
      i = 0,
      step = 1,
      waveOffsetLength = 0,
      ang = Math.atan2(ty - fy, tx - fx),
      distance = Math.sqrt((fx - tx) * (fx - tx) + (fy - ty) * (fy - ty)),
      amplitude = -1 * 2,
      f = (Math.PI * distance) / wavyWidth
    for (i; i <= distance; i += step) {
      waveOffsetLength = Math.sin((i / distance) * f) * amplitude
      cx = from.x + Math.cos(ang) * i + Math.cos(ang - Math.PI / 2) * waveOffsetLength
      cy = from.y + Math.sin(ang) * i + Math.sin(ang - Math.PI / 2) * waveOffsetLength

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      i > 0 ? ctx.lineTo(cx, cy) : ctx.moveTo(cx, cy)
    }
  }

  pointOnLine(point1: any) {
    const x3 = point1.x,
      y3 = point1.y
    return new Point(x3, y3)
  }

  calcLinePoints(): UniqueLineProps {
    const { x1: _x1, x2: _x2, y1: _y1, y2: _y2, width, height } = this
    const xMult = _x1 <= _x2 ? -1 : 1,
      yMult = _y1 <= _y2 ? -1 : 1,
      x1 = (xMult * width) / 2,
      y1 = (yMult * height) / 2,
      x2 = (xMult * -width) / 2,
      y2 = (yMult * -height) / 2

    return {
      x1,
      x2,
      y1,
      y2,
    }
  }

  toObject(propertiesToInclude = []) {
    const obj = super.toObject(propertiesToInclude)
    return { ...obj } as any
  }
}

export type WavyLineProps<T = unknown> = Partial<ConstructorParameters<typeof BaseLine>[1] & AllObjectEvents> & {
  group?: BaseGroup
  path?: string
  children?: ReactNode
} & T

const WavyLine = forwardRef<BaseLine | undefined, WavyLineProps>(
  ({ group, x1, y1, x2, y2, children, ...props }, ref) => {
    const [listeners, attributes] = useSplitProps(props)

    const instance = useCreateObject({
      Constructor: WavyLineClass,
      param: [x1, y1, x2, y2],
      attributes,
      group,
      listeners,
    })

    useImperativeHandle(ref, () => instance, [instance])

    return useInstancePosition(instance, children)
  },
)

export default memo(WavyLine)
