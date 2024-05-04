import React from 'react'
import { HStack, Text } from '@chakra-ui/react'
import { MdError } from 'react-icons/md'

function ErrorToast (): JSX.Element {
  return (
    <>
      <HStack w='250px' bg='#FF2929' paddingX='20px' paddingY='15px' rounded='3px' spacing='10px' >
        <MdError size='30px' color='white' />
        <Text color='white' fontSize='16px'>保存に失敗しました</Text>
      </HStack>
    </>
  )
}

export default ErrorToast
