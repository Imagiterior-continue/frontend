import React from 'react'
import { VStack, Accordion, WrapItem, Text } from '@chakra-ui/react'
import FurnitureMenu from './FurnitureMenu'
import furnitures from '../../Data/furnitures.json'
import { themeColor } from '../../Data/color'

interface Props {
  addFurniture: (newFileName: string, newName: string, newImageSize: number[]) => void
}

function SideBar ({ addFurniture }: Props): JSX.Element {
  const AccordionItems: JSX.Element[] = furnitures.map(({ category, items }: any, index: number) => {
    return (
      <WrapItem key={index}>
       <FurnitureMenu title={category} items={items} addFurniture={addFurniture}/>
      </WrapItem>
    )
  })
  return (
    <>
      <VStack w='300px' h='100%' paddingBottom='10px' paddingX='2px' bg={themeColor.main} boxShadow='xl'>
        <Text marginTop='15px' fontSize='20px'>家具一覧</Text>
        <Accordion width='100%' allowToggle overflowY='scroll' sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
          {AccordionItems}
        </Accordion>
      </VStack>
    </>
  )
}

export default SideBar
