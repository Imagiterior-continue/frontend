import React from 'react'
import { VStack, Text, Button, Box, Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react'
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
    <VStack w='280px' h='160px'>
      <Text w='100%' paddingLeft='10px' fontSize='16px' borderLeft={`7px solid ${themeColor.accent}`}>部屋を保存</Text>
      <VStack w='280px' h='130px' bg={themeColor.main} rounded='3px' paddingX='5px'>
        <RoomForm initialValue={roomName} setName={setName} />
        <Box onClick={onClose}>
          <Button h='30px' w='70px' bg='#2B6B7A' _hover={{ bg: '#1F5461' }} marginBottom='5px' rounded='3px' color={themeColor.accentString} isDisabled={roomName === ''} onClick={saveLayout}>
            保存
          </Button>
        </Box>
      </VStack>
    </VStack>
  )
}

function SaveField ({ roomName, setName, saveLayout }: Props): JSX.Element {
  return (
    <>
      <Box display={{ base: 'none', '2xl': 'block' }}>
        <Content roomName={roomName} setName={setName} saveLayout={saveLayout}/>
      </Box>
      <Popover>
        <PopoverTrigger>
          <Button display={{ base: 'block', '2xl': 'none' }} bg={themeColor.main} _hover={{ bg: themeColor.main }} boxSize='40px' padding='5px' rounded='3px' boxShadow='xl'>
            <MdSaveAlt size='30px' color={themeColor.accentString}/>
          </Button>
        </PopoverTrigger>
        <PopoverContent display={{ base: 'block', '2xl': 'none' }} padding='10px' rounded='3px' boxShadow='xl'>
          <Content roomName={roomName} setName={setName} saveLayout={saveLayout}/>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default SaveField
