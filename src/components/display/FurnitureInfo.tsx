import React from 'react'
import { VStack, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'

interface Props {
  name: string
  size: number[]
  image: string
  onClick: () => void
}

function FurnitureInfo ({ name, size, image, onClick }: Props): JSX.Element {
  return (
    <>
      <VStack width='190px' height='190px' transition='.2s' _hover={{ bg: 'rgba(0,0,0,0.1)' }} cursor='pointer' onClick={onClick}>
        <Text height='23px' width='90%' fontSize='18px'>{name}</Text>
        <Text width='90%' fontSize='15px'>{size[0]}×{size[1]}×{size[2]}</Text>
        <Image boxSize='120px' objectFit='cover' src={image} />
      </VStack>
    </>
  )
}

export default FurnitureInfo
