import React from 'react'
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react'

interface Props {
  initialValue: string
  setName: React.Dispatch<React.SetStateAction<string>>
}

function RoomForm ({ initialValue, setName }: Props): JSX.Element {
  const maxLength = 10
  return (
    <>
      <FormControl>
        <FormLabel fontSize='14px' paddingTop='5px' lineHeight='14px'>部屋名</FormLabel>
        <Input
          h='35px'
          type='text'
          bg='white'
          _hover={{ bg: '#EEEEEE' }}
          placeholder='ここに入力'
          value={initialValue}
          onChange={(e) => { setName(e.target.value) }}
          maxLength={10}
        />
        <Text align='right' fontSize='12px'>
          {initialValue.length} / {maxLength}
        </Text>
      </FormControl>
    </>
  )
}

export default RoomForm
