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
  rotation: 0
}

export function useInteractJS (position: Partial<typeof initPosition>): any {
  // 引数で指定したpositionを初期値として、Stateを作る
  const [_position, setPosition] = useState<typeof initPosition>({
    ...initPosition,
    ...position
  })

  const interactRef = useRef<HTMLElement | null>(null)
  let { x, y, width, height, rotation } = _position

  const collisionDetection: () => void = () => {
    if (x < -(350 - width / 2)) {
      x = -(350 - width / 2)
    }
    if (x > 350 - width / 2) {
      x = 350 - width / 2
    }
    if (y < -(350 - height / 2)) {
      y = -(350 - height / 2)
    }
    if (y > 350 - height / 2) {
      y = 350 - height / 2
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
        // ドラッグ後の座標をstateに保存する
        setPosition({
          width,
          height,
          x,
          y,
          rotation
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
          rotation
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
    // 返り値にCSSのスタイルを追加する。このスタイルを動かしたいコンポーネントに適用することで、コンポーネントが実際に動くようになる
    style: {
      transform: `translate(${_position.x}px, ${_position.y}px) rotate(${rotation}deg)`,
      position: 'absolute' as CSSProperties['position']
    },
    x: _position.x,
    y: _position.y,
    rotation: _position.rotation
  }
}
