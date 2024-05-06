import React from 'react'
import FurnitureInfo from './display/FurnitureInfo'
import { AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/accordion'
import { Box, VStack } from '@chakra-ui/layout'

interface furniture_type {
  name: string
  size: number[]
  fileName: string
  imageSize: number[]
}

interface Props {
  title: string
  items: furniture_type[]
  addFurniture: (newFileName: string, newImageSize: number[]) => void
}

function FurnitureMenu ({ title, items, addFurniture }: Props): JSX.Element {
  const AllFurnitures: JSX.Element[] = items.map(({ name, size, fileName, imageSize }: furniture_type, index: number) => {
    return (
      <FurnitureInfo key={index} name={name} size={size} image={`/image_3D/${fileName}_3D.png`} onClick={() => { addFurniture(fileName, imageSize) }}/>
    )
  })
  return (
    <>
      <AccordionItem>
        <AccordionButton width='223px' bg='#F9F9F9' _hover={{ background: '#EEEEEE' }}>
          <Box as="span" flex='1' textAlign='left' fontSize='20px'>
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel bg='rgba(255,255,255,0.4)'>
          <VStack>
            {AllFurnitures}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </>
  )
}

export default FurnitureMenu