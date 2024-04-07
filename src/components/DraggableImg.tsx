import React, { useEffect, useState } from 'react'
import { useInteractJS } from '../hooks/useInteractJS'

interface Props {
  fileName: string
  imageSize: number[]
  interiors: JSX.Element[]
  addInteriorsInfo: (index: number, fileName: string) => void
  updateInteriorsInfo: (index: number, newPosition: number[], newRotate: number) => void
}

function DraggableImg ({ fileName, imageSize, interiors, addInteriorsInfo, updateInteriorsInfo }: Props): JSX.Element {
  const interact = useInteractJS({ width: imageSize[0], height: imageSize[1] })
  const [isClicking, setIsClicking] = useState(false)
  const handleMouseDown: () => void = () => {
    setIsClicking(true)
  }
  const handleMouseUp: () => void = () => {
    setIsClicking(false)
  }

  /* 配列のインデックスを保存 */
  const [index, setIndex] = useState<number>(0)

  /* indexの初期化と、配列に家具の情報を追加 */
  useEffect(() => {
    const newIndex = interiors.length
    setIndex(newIndex)
    addInteriorsInfo(newIndex, fileName)
  }, [])

  if (isClicking) {
    // eslint-disable-next-line
    updateInteriorsInfo(index, [interact.x * 1.8 / 350 as number, -0.5, interact.y * 1.8 /350 as number], interact.rotate as number)
  }
  // console.log(`x:${interact.x}, y:${interact.y}, rotate:${interact.rotate}, index:${index}`)
  return (
    <>
      <div key={interiors.length} style={{ ...interact.style }} ref={interact.ref} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <img src={`image_2D/${fileName}_2D.png`}/>
      </div>
    </>
  )
}

export default DraggableImg
