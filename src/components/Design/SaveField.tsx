import React from 'react'
import { VStack, Text, Button } from '@chakra-ui/react'
import RoomForm from './RoomForm'
import { themeColor } from '../../Data/color'

interface Props {
  roomName: string
  setName: React.Dispatch<React.SetStateAction<string>>
  saveLayout: () => void
}

function SaveField ({ roomName, setName, saveLayout }: Props): JSX.Element {
  return (
    <VStack w='330px' h='200px'>
      <div style={{ width: '100%' }}>
        <Text paddingLeft='10px' fontSize='18px' borderLeft={`7px solid ${themeColor.accent}`}>部屋を保存</Text>
      </div>
      <VStack w='330px' h='150px' bg={themeColor.main} rounded='5px' paddingX='5px'>
        <RoomForm initialValue={roomName} setName={setName} />
        <Button h='35px' w='70px' bg='#2B6B7A' _hover={{ bg: '#1F5461' }} marginTop='10px' rounded='5px' color={themeColor.accentString} isDisabled={roomName === ''} onClick={saveLayout}>
          保存
        </Button>
      </VStack>
    </VStack>
  )
}

export default SaveField