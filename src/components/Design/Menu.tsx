import React from 'react'
import { VStack, Accordion, WrapItem, Text, Drawer, DrawerOverlay, DrawerContent, Button, useDisclosure } from '@chakra-ui/react'
import FurnitureMenu from './FurnitureMenu'
import furnitures from '../../Data/furnitures.json'
import { themeColor } from '../../Data/color'
import { MdOutlineAddCircleOutline } from 'react-icons/md'

interface Props {
  addFurniture: (newFileName: string, newName: string, newImageSize: number[]) => void
}

function Menu ({ addFurniture }: Props): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const AccordionItems: JSX.Element[] = furnitures.map(({ category, items }: any, index: number) => {
    return (
      <WrapItem key={index}>
       <FurnitureMenu title={category} items={items} addFurniture={addFurniture}/>
      </WrapItem>
    )
  })
  return (
    <>
      <VStack display={{ base: 'none', '2xl': 'block' }} w='250px' h='100%' paddingBottom='10px' paddingX='2px' bg={themeColor.main} boxShadow='xl'>
        <Text paddingTop='15px' marginBottom='10px' textAlign='center' fontSize='18px'>家具一覧</Text>
        <Accordion width='100%' allowToggle overflowY='scroll' sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
          {AccordionItems}
        </Accordion>
      </VStack>
      <Button display={{ base: 'block', '2xl': 'none' }} bg={themeColor.main} _hover={{ bg: themeColor.main }} boxSize='40px' padding='3px' rounded='3px' boxShadow='xl' onClick={onOpen}>
        <MdOutlineAddCircleOutline size='34px' color={themeColor.mainString}/>
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
        <DrawerOverlay />
        <DrawerContent display={{ base: 'block', '2xl': 'none' }} w='250px' padding='10px'>
          <Accordion width='100%' allowToggle overflowY='scroll' sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
            {AccordionItems}
          </Accordion>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Menu
