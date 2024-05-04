import React from 'react'
import { Button, HStack, Text } from '@chakra-ui/react'
import { FaGoogle } from 'react-icons/fa'
import { themeColor } from '../../Data/color'

interface Props {
  handleSignIn: () => void
}

function LoginButton ({ handleSignIn }: Props): JSX.Element {
  return (
    <>
      <Button padding='25px' bg={themeColor.accent} rounded='5px' _hover={{ bg: 'black' }} onClick={handleSignIn}>
         <HStack align="center" spacing='30px'>
          <FaGoogle size='30px' color='white' />
          <Text color='white' fontSize='18px' fontWeight='light' ml="2">Googleアカウントでログイン</Text>
        </HStack>
      </Button>
    </>
  )
}

export default LoginButton