import React from 'react'
import { Text, HStack } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

function UserInfo (): JSX.Element {
  return (
    <HStack marginX='20px'>
      <Image boxSize='30px' rounded='full' src={localStorage.getItem('photoURL') ?? ''} objectFit='cover'/>
      <Text textAlign='center' fontSize='18px' color='white'>{localStorage.getItem('displayName')}</Text>
    </HStack>
  )
}

export default UserInfo
