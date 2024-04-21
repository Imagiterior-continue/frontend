import React, { useState, useEffect } from 'react'
import { useInteractJS } from '../../hooks/useInteractJS'

interface Props {
  index: number
  fileName: string
  imageSize: number[]
  updateInteriorInfo: (index: number, position: number[], rotation: number) => void
}

function DraggableImg (props: Props): JSX.Element {
  const interact = useInteractJS({ width: props.imageSize[0], height: props.imageSize[1] })
  // インデックス
  const [index, setIndex] = useState<number>(0)

  // クリックされているかどうか
  const [isClicking, setIsClicking] = useState(false)
  const handleMouseDown: () => void = () => {
    setIsClicking(true)
  }
  const handleMouseUp: () => void = () => {
    setIsClicking(false)
  }

  useEffect(() => {
    setIndex(props.index)
  }, [])

  useEffect(() => {
    if (isClicking) {
      // eslint-disable-next-line
      props.updateInteriorInfo(index, [interact.x * 1.8 / 350 as number, -0.5, interact.y * 1.8 /350 as number], interact.rotation as number)
    }
  }, [interact.x, interact.y, interact.rotation])
  // console.log(`x:${interact.x}, y:${interact.y}, rotate:${interact.rotate}, index:${index}`)

  return (
    <>
      <div style={{ ...interact.style }} ref={interact.ref} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <img src={`image_2D/${props.fileName}_2D.png`}/>
      </div>
    </>
  )
}

export default DraggableImg
