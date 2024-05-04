import React from 'react'
import { VStack, HStack, Text, Spacer } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'

interface Props {
  name: string
  size: number[]
  image: string
  onClick: () => void
}

function FurnitureInfo ({ name, size, image, onClick }: Props): JSX.Element {
  return (
    <HStack w='100%' h='100px' borderBottom='2px solid #FFFFFF' _hover={{ bg: 'rgba(0,0,0,0.1)' }} transition='.1s' cursor='pointer' onClick={onClick} position='relative'>
      <VStack position='absolute'>
        <Text w='100%' marginLeft='15px' textAlign='left' height='23px' fontSize='18px'>{name}</Text>
        <Text w='100%' marginLeft='15px' textAlign='left' fontSize='14px'>{size[0]}×{size[1]}×{size[2]}</Text>
      </VStack>
      <Spacer />
      <Image boxSize='100px' paddingRight='5px' objectFit='cover' src={image} />
    </HStack>
  )
}

export default FurnitureInfo
