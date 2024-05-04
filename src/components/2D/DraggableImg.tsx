import React, { useState, useEffect } from 'react'
import { useInteractJS } from '../../hooks/useInteractJS'

interface Props {
  index: number
  fileName: string
  imageSize: number[]
  position: number[]
  rotation: number
  isEdited: boolean
  updateFurnitureList: (index: number, position: number[], rotation: number) => void
}

function DraggableImg (props: Props): JSX.Element {
  const interact = useInteractJS({ width: props.imageSize[props.rotation % 180 === 0 ? 0 : 1], height: props.imageSize[props.rotation % 180 === 0 ? 1 : 0], x: props.position[0] * 350 / 1.8, y: props.position[2] * 350 / 1.8, rotation: props.rotation })

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
  }, [props.isEdited])

  useEffect(() => {
    if (isClicking) {
      // eslint-disable-next-line
      props.updateFurnitureList(index, [interact.x * 1.8 / 350 as number, -0.5, interact.y * 1.8 /350 as number], interact.rotation as number)
    }
  }, [interact.x, interact.y, interact.rotation])
  // console.log(`x:${interact.x}, y:${interact.y}, rotate:${interact.rotate}, index:${index}`)

  return (
    <>
      <div style={{ ...interact.style }} ref={interact.ref} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <img src={`/image_2D/${props.fileName}_2D.png`} style={{ border: props.isEdited ? '4px solid #FF3333' : '0px solid #FF3333', borderRadius: '5px', transition: '.05s', userSelect: 'none' }}/>
      </div>
    </>
  )
}

export default DraggableImg
