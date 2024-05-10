import React from 'react'
import FurnitureInfo from './FurnitureInfo'
import { AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/accordion'
import { Box, VStack } from '@chakra-ui/layout'
import { themeColor } from '../../Data/color'

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
      <AccordionItem width='100%' borderRadius='3px' marginBottom='3px'>
        {({ isExpanded }) => (
          <>
            <AccordionButton bg={`linear-gradient(90deg, white 0 80%, ${isExpanded ? themeColor.accent : themeColor.base} 80% 100%)`} h='40px' _hover={{ bg: `linear-gradient(90deg, #EEEEEE 0 80%, ${isExpanded ? themeColor.accentHover : themeColor.baseHover} 80% 100%)` }}>
              <Box as="span" flex='1' textAlign='left' fontSize='18px' color='#555555'>
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel padding={0}>
              <VStack w='100%' marginTop='3px' spacing='3px'>
                {AllFurnitures}
              </VStack>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </>
  )
}

export default FurnitureMenu
