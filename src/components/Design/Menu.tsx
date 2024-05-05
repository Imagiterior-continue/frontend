import React from 'react'
import { VStack, Accordion, WrapItem, Text, Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'
import FurnitureMenu from './FurnitureMenu'
import furnitures from '../../Data/furnitures.json'
import { themeColor } from '../../Data/color'
import { MdOutlineAddCircleOutline } from 'react-icons/md'

interface Props {
  addFurniture: (newFileName: string, newName: string, newImageSize: number[]) => void
}

function Menu ({ addFurniture }: Props): JSX.Element {
  const AccordionItems: JSX.Element[] = furnitures.map(({ category, items }: any, index: number) => {
    return (
      <WrapItem key={index}>
       <FurnitureMenu title={category} items={items} addFurniture={addFurniture}/>
      </WrapItem>
    )
  })
  return (
    <>
      <VStack display={{ base: 'none', '2xl': 'block' }} w='300px' h='100%' paddingBottom='10px' paddingX='2px' bg={themeColor.main} boxShadow='xl'>
        <Text paddingTop='15px' marginBottom='10px' textAlign='center' fontSize='18px'>家具一覧</Text>
        <Accordion width='100%' allowToggle overflowY='scroll' sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
          {AccordionItems}
        </Accordion>
      </VStack>
      <Popover>
        <PopoverTrigger>
          <Button display={{ base: 'block', '2xl': 'none' }} bg={themeColor.main} _hover={{ bg: themeColor.main }} boxSize='40px' padding='3px' rounded='3px' boxShadow='xl'>
            <MdOutlineAddCircleOutline size='34px' color={themeColor.accentString}/>
          </Button>
        </PopoverTrigger>
        <PopoverContent display={{ base: 'block', '2xl': 'none' }} padding='10px' rounded='3px' boxShadow='xl'>
          <Accordion width='100%' allowToggle overflowY='scroll' sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
            {AccordionItems}
          </Accordion>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default Menu
