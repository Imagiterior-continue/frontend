import React from 'react'
import { Center } from '@chakra-ui/layout'
import type { furnitureType } from '../../type/furnitureType'
import FurnitureImg from './FurnitureImg'

interface Props {
  furnitureList: furnitureType[]
}

function RoomImg ({ furnitureList }: Props): JSX.Element {
  return (
    <>
      <Center width='200px' height='200px' bg='#ECECEC'>
        {furnitureList.map((furniture, index) => (
          <FurnitureImg
            key={index}
            fileName={furniture.fileName}
            imageSize={furniture.imageSize}
            position={furniture.position}
            rotation={furniture.rotation}
          />
        ))}
        </Center>
    </>
  )
}

export default RoomImg
