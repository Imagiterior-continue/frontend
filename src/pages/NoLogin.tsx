import React from 'react'
import { VStack, Text } from '@chakra-ui/layout'
import ToLoginButton from '../components/button/ToLoginButton'

function NoLogin (): JSX.Element {
  return (
    <div>
      <VStack spacing='10px' marginY={20}>
        <Text marginBottom='15px' fontSize='30px' fontWeight='bold'>ログインしてください</Text>
        <Text marginBottom='30px' fontSize='18px'>認証が必要です。ログイン画面からGoogleアカウントでログインしてください。</Text>
        <ToLoginButton />
      </VStack>
    </div>
  )
}

export default NoLogin
