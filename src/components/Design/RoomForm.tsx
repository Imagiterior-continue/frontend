import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

interface Props {
  initialValue: string
  setName: React.Dispatch<React.SetStateAction<string>>
}

function RoomForm ({ initialValue, setName }: Props): JSX.Element {
  return (
    <>
      <FormControl>
        <FormLabel fontSize='15px' paddingTop='5px'>部屋名</FormLabel>
        <Input
          type='text'
          bg='white'
          _hover={{ bg: '#EEEEEE' }}
          placeholder='ここに入力'
          value={initialValue}
          onChange={(e) => { setName(e.target.value) }}
        />
      </FormControl>
    </>
  )
}

export default RoomForm
