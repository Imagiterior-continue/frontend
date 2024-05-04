import React from 'react'
import FurnitureInfo from './FurnitureInfo'
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
  addFurniture: (newFileName: string, newName: string, newImageSize: number[]) => void
}

function FurnitureMenu ({ title, items, addFurniture }: Props): JSX.Element {
  const AllFurnitures: JSX.Element[] = items.map(({ name, size, fileName, imageSize }: furniture_type, index: number) => {
    return (
      <FurnitureInfo key={index} name={name} size={size} image={`/image_3D/${fileName}_3D.png`} onClick={() => { addFurniture(fileName, name, imageSize) }}/>
    )
  })
  return (
    <>
      <AccordionItem width='100%'>
        <AccordionButton bg='#FFFFFF' h='40px' _hover={{ background: '#EEEEEE' }}>
          <Box as="span" flex='1' textAlign='left' fontSize='18px' color='#555555'>
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel bg='rgba(255,255,255,0.4)' padding={0}>
          <VStack w='100%' spacing={0}>
            {AllFurnitures}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </>
  )
}

export default FurnitureMenu
