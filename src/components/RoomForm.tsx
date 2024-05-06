import React from 'react'
import { FormControl, FormLabel, Input, Flex, Text } from '@chakra-ui/react'

interface Props {
  initialValue: string
  setName: React.Dispatch<React.SetStateAction<string>>
}

function RoomForm ({ initialValue, setName }: Props): JSX.Element {
  // 最大文字数
  const maxLength = 10

  return (
    <>
      <FormControl>
        <Flex align="center">
          <FormLabel fontSize='18px' paddingTop='5px'>部屋の名前</FormLabel>
          <Input
            width='500px'
            type='text'
            placeholder='ここに入力'
            value={initialValue}
            // onChange={handleInputChange}
            onChange={(e) => { setName(e.target.value) }}
            maxLength={maxLength}
          />
          <Text fontSize='16px' paddingLeft='5px'>
            {initialValue.length} / {maxLength}
          </Text>
        </Flex>
      </FormControl>
    </>
  )
}

export default RoomForm
