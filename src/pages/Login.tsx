import React from 'react'
import { Center, VStack, HStack, Text, Box } from '@chakra-ui/layout'
import Logo from '../components/common/Logo'
import LoginButton from '../components/Login/LoginButton'

interface Props {
  handleSignIn: () => void
}

function Login ({ handleSignIn }: Props): JSX.Element {
  return (
    <Center h='100vh'>
      <VStack spacing='40px'>
        <HStack>
          <Logo size={80} color='black'/>
          <Text marginLeft='15px' color='black' fontSize={{ base: '40px', sm: '50px' }} fontWeight='bold' fontFamily='Shippori Antique'>Imagiterior</Text>
        </HStack>
        <LoginButton handleSignIn={handleSignIn}/>
        <Box height='200px'/>
      </VStack>
    </Center>
  )
}

export default Login
