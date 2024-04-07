import React, { useEffect } from 'react'
import { VStack, Text, Box } from '@chakra-ui/layout'
import Logo from '../components/Logo'
import LoginButton from '../components/LoginButton'

interface Props {
  handleSignIn: () => void
}

function Login ({ handleSignIn }: Props): JSX.Element {
  useEffect(() => {
    if (localStorage.getItem('displayName') !== null && localStorage.getItem('displayName') !== '') {
      window.location.href = '/list'
    }
  }, [])

  return (
    <div>
      <VStack spacing='10px' marginY={20}>
        <Text fontSize='40px' fontWeight='bold'>Imagiterior</Text>
        <Logo size={200}/>
        <Box height='20px'/>
        <LoginButton handleSignIn={handleSignIn}/>
      </VStack>
    </div>
  )
}

export default Login
