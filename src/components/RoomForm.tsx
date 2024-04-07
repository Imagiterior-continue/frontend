import React from 'react'
import { FormControl, FormLabel, Input, Flex } from '@chakra-ui/react'

interface Props {
  setName: React.Dispatch<React.SetStateAction<string>>
}

function RoomForm ({ setName }: Props): JSX.Element {
  return (
    <>
      <FormControl>
      <Flex align="center">
      <FormLabel fontSize='18px' paddingTop='5px'>部屋の名前</FormLabel>
      <Input
        width='500px'
        type='text'
        placeholder='ここに入力'
        onChange={(e) => { setName(e.target.value) }}
      />
      </Flex>
    </FormControl>
    </>
  )
}

export default RoomForm
