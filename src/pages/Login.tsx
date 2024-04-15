import React from 'react'
import { VStack, Text, Box } from '@chakra-ui/layout'
import Logo from '../components/Logo'
import LoginButton from '../components/LoginButton'

function Login (): JSX.Element {
  return (
    <div>
      <VStack spacing='10px' marginY={20}>
        <Text fontSize='40px' fontWeight='bold'>Imagiterior</Text>
        <Logo size={200}/>
        <Box height='20px'/>
        <LoginButton/>
      </VStack>
    </div>
  )
}

export default Login
