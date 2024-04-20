import React from 'react'
import { HStack, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'

function UserInfo (): JSX.Element {
  const src: string = localStorage.getItem('photoURL') ?? ''
  return (
    <>
      <HStack width='220px'>
        <Image marginLeft='10px' boxSize='65px' rounded='full' src={src} objectFit='cover'/>
        <Text width='140px' textAlign='center' fontSize='20px'>{localStorage.getItem('displayName')}</Text>
      </HStack>
    </>
  )
}

export default UserInfo
