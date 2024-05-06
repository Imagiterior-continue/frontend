import React from 'react'
import { VStack, Text } from '@chakra-ui/layout'
import ToLoginButton from '../components/common/ToLoginButton'

function NoMatch (): JSX.Element {
  return (
    <div>
      <VStack spacing='10px' marginY={20}>
        <Text marginBottom='15px' fontSize='20px'>このページは存在しません</Text>
        <ToLoginButton />
      </VStack>
    </div>
  )
}

export default NoMatch
