import React from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import { baseURL } from '../../Data/baseURL'

function LoginButton (): JSX.Element {
  return (
    <>
      <Button onClick={() => { window.location.href = baseURL + 'login' }}>
      <Flex align="center">
          <FcGoogle size='30px' />
          <Text ml="2">Googleアカウントでログイン</Text>
          <MdKeyboardArrowRight size='40px'/>
        </Flex>
      </Button>
    </>
  )
}

export default LoginButton
