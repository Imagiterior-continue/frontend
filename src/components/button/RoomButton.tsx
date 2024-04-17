import React from 'react'
import { VStack, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'

interface Props {
  title: string
  image: any
  type: 'green' | 'red'
  onClick: () => void
}

function RoomInfo ({ title, image, type, onClick }: Props): JSX.Element {
  return (
    <>
      <VStack padding='10px' rounded='5px' bg={ type === 'green' ? '#C5E8BF' : '#E8BFBF' } _hover={{ bg: type === 'green' ? '#B6D8B0' : '#E2A3A3' }} transition='.2s' cursor='pointer' onClick={onClick}>
        <Text fontSize='20px'>{ title }</Text>
        <Image src={image} alt='floor plan' w='200px' h='200px'/>
      </VStack>
    </>
  )
}

export default RoomInfo
