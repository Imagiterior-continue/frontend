import React from 'react'
import { Image } from '@chakra-ui/image'

interface Props {
  fileName: string
  imageSize: number[]
  position: number[]
  rotation: number
}

function FurnitureImg ({ fileName, imageSize, position, rotation }: Props): JSX.Element {
  return (
    <>
      <Image
        position='absolute'
        width={`${imageSize[0] * 0.2857}px`}
        height={`${imageSize[1] * 0.2857}px`}
        transform={`translate(${position[0] * 100 / 1.8}px, ${position[2] * 100 / 1.8}px) rotate(${rotation}deg)`}
        objectFit='cover'
        src={`/image_2D/${fileName}_2D.png`}
        userSelect='none'
      />
    </>
  )
}

export default FurnitureImg
