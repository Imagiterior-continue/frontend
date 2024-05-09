// eslint-disable-line
import { useRef, useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import interact from 'interactjs'

type Partial<T> = {
  [P in keyof T]?: T[P]
}

const initPosition = {
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  rotation: 0,
  viewportSize: 700
}

export function useInteractJS (position: Partial<typeof initPosition>): any {
  // 引数で指定したpositionを初期値として、Stateを作る
  const [_position, setPosition] = useState<typeof initPosition>({
    ...initPosition,
    ...position
  })

  const interactRef = useRef<HTMLElement | null>(null)
  let { x, y, width, height, rotation, viewportSize } = _position

  const collisionDetection: () => void = () => {
    if (x < -(viewportSize / 2 - width / 2)) {
      x = -(viewportSize / 2 - width / 2)
    }
    if (x > viewportSize / 2 - width / 2) {
      x = viewportSize / 2 - width / 2
    }
    if (y < -(viewportSize / 2 - height / 2)) {
      y = -(viewportSize / 2 - height / 2)
    }
    if (y > viewportSize / 2 - height / 2) {
      y = viewportSize / 2 - height / 2
    }
  }

  const enable: () => void = () => {
    interact((interactRef?.current as unknown) as HTMLElement)
      // ドラッグでコンポーネントを動かすための処理を追加
      .draggable({
        inertia: false
      })
      .on('dragmove', event => {
        x += event.dx
        y += event.dy
        collisionDetection()
        setPosition({
          width,
          height,
          x,
          y,
          rotation,
          viewportSize
        })
      })
      .on('tap', event => {
        rotation += 90
        if (rotation >= 360) {
          rotation = 0
        }
        const temp = width
        width = height
        height = temp
        collisionDetection()
        setPosition({
          width,
          height,
          x,
          y,
          rotation,
          viewportSize
        })
      })
  }

  const disable: any = () => {
    if (interactRef?.current !== null) {
      interact((interactRef?.current as unknown) as HTMLElement).unset()
    }
  }

  useEffect(() => {
    enable()
    return disable
  }, [])

  return {
    ref: interactRef,
    style: {
      transform: `translate(${_position.x}px, ${_position.y}px) rotate(${rotation}deg) scale(${_position.viewportSize / 700})`,
      position: 'absolute' as CSSProperties['position']
    },
    x: _position.x,
    y: _position.y,
    rotation: _position.rotation
  }
}
