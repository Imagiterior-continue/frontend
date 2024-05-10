import React, { useState, useEffect } from 'react'
import { useInteractJS } from '../../../hooks/useInteractJS'

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
  const interact = useInteractJS({ width: props.imageSize[props.rotation % 180 === 0 ? 0 : 1] * props.viewportSize / 700, height: props.imageSize[props.rotation % 180 === 0 ? 1 : 0] * props.viewportSize / 700, x: props.position[0] * props.viewportSize / 3.6, y: props.position[2] * props.viewportSize / 3.6, rotation: props.rotation, viewportSize: props.viewportSize })

  const [index, setIndex] = useState<number>(0)

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

  return (
    <>
      <div style={{ ...interact.style, touchAction: 'none' }} ref={interact.ref} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchEnd={handleMouseUp}>
        <img
          src={`/image_2D/${props.fileName}_2D.png`}
          style={{ border: props.isEdited ? '4px solid #FF3333' : '0px solid #FF3333', borderRadius: '3px', transition: '.05s', userSelect: 'none' }}/>
      </div>
    </>
  )
}

export default DraggableImg
