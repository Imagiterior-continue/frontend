import React from 'react'
import { HStack, Text } from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'

function SuccessToast (): JSX.Element {
  return (
    <>
      <HStack w='250px' bg='#309C82' paddingX='20px' paddingY='15px' rounded='3px' spacing='20px' >
        <FaCheckCircle size='30px' color='white' />
        <Text color='white' fontSize='16px'>保存に成功しました</Text>
      </HStack>
    </>
  )
}

export default SuccessToast
