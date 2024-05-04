import React from 'react'
import { HStack, Text } from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'

function SuccessToast (): JSX.Element {
  return (
    <>
      <HStack w='280px' bg='#309C82' paddingX='20px' paddingY='20px' rounded='3px' spacing='10px' >
        <FaCheckCircle size='35px' color='white' />
        <Text color='white' fontSize='20px'>保存に成功しました</Text>
      </HStack>
    </>
  )
}

export default SuccessToast
