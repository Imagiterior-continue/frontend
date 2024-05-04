import React from 'react'
import { Text, HStack } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

function UserInfo (): JSX.Element {
  return (
    <HStack marginX='30px'>
      <Image boxSize='40px' rounded='full' src={localStorage.getItem('photoURL') ?? ''} objectFit='cover'/>
      <Text textAlign='center' fontSize='20px' color='white'>{localStorage.getItem('displayName')}</Text>
    </HStack>
  )
}

export default UserInfo
