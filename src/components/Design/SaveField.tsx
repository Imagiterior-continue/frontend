import React from 'react'
import { VStack, Text, Button, Box, useDisclosure, Modal, ModalOverlay, ModalContent, Center } from '@chakra-ui/react'
import RoomForm from './RoomForm'
import { themeColor } from '../../Data/color'
import { MdSaveAlt } from 'react-icons/md'

interface Props {
  roomName: string
  setName: React.Dispatch<React.SetStateAction<string>>
  saveLayout: () => void
  onClose?: () => void
}

function Content ({ roomName, setName, saveLayout, onClose }: Props): JSX.Element {
  return (
    <VStack w='280px' h='150px'>
      <Text w='100%' paddingLeft='10px' fontSize='16px' borderLeft={`7px solid ${themeColor.accent}`}>部屋を保存</Text>
      <VStack w='280px' h='130px' bg={themeColor.main} rounded='5px' paddingX='5px'>
        <RoomForm initialValue={roomName} setName={setName} />
        <Box onClick={onClose}>
          <Button h='30px' w='70px' bg='#2B6B7A' _hover={{ bg: '#1F5461' }} marginTop='5px' rounded='5px' color={themeColor.accentString} isDisabled={roomName === ''} onClick={saveLayout}>
            保存
          </Button>
        </Box>
      </VStack>
    </VStack>
  )
}

function SaveField ({ roomName, setName, saveLayout }: Props): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box display={{ base: 'none', '2xl': 'block' }}>
        <Content roomName={roomName} setName={setName} saveLayout={saveLayout}/>
      </Box>
      <Button display={{ base: 'block', '2xl': 'none' }} bg={themeColor.accent} _hover={{ bg: themeColor.accent }} boxSize='50px' padding='5px' rounded='5px' boxShadow='xl' onClick={onOpen}>
        <MdSaveAlt size='40px' color={themeColor.accentString}/>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent w='300px' h='300p' bg='white'>
          <Center>
            <Content roomName={roomName} setName={setName} saveLayout={saveLayout} onClose={onClose}/>
          </Center>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SaveField
