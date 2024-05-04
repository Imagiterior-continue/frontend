import React, { useState, useEffect } from 'react'
import { useInteractJS } from '../../hooks/useInteractJS'
import { viewportSize } from '../../Data/viewportSize'

interface Props {
  index: number
  fileName: string
  imageSize: number[]
  position: number[]
  rotation: number
  isEdited: boolean
  updateFurnitureList: (index: number, position: number[], rotation: number) => void
  viewportSize: number
}

function DraggableImg (props: Props): JSX.Element {
  const interact = useInteractJS({ width: props.imageSize[props.rotation % 180 === 0 ? 0 : 1] * viewportSize / 700, height: props.imageSize[props.rotation % 180 === 0 ? 1 : 0] * viewportSize / 700, x: props.position[0] * props.viewportSize / 3.6, y: props.position[2] * viewportSize / 3.6, rotation: props.rotation, viewportSize: props.viewportSize })

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
      props.updateFurnitureList(index, [interact.x * 3.6 / props.viewportSize as number, -0.5, interact.y * 3.6 /props.viewportSize as number], interact.rotation as number)
    }
  }, [interact.x, interact.y, interact.rotation])
  // console.log(`x:${interact.x}, y:${interact.y}, rotate:${interact.rotate}, index:${index}`)

  return (
    <>
      <div style={{ ...interact.style }} ref={interact.ref} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <img
          src={`/image_2D/${props.fileName}_2D.png`}
          style={{ border: props.isEdited ? '4px solid #FF3333' : '0px solid #FF3333', borderRadius: '3px', transition: '.05s', userSelect: 'none' }}/>
      </div>
    </>
  )
}

export default DraggableImg
