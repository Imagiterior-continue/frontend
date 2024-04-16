import React from 'react'
import { HStack, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'

function UserInfo (): JSX.Element {
  const src: string = ''

  return (
    <>
      <HStack width='220px'>
        <Image marginLeft='10px' boxSize='65px' rounded='full' src={src} objectFit='cover'/>
        <Text width='140px' textAlign='center' fontSize='20px'>{localStorage.getItem('user_id')}</Text>
      </HStack>
    </>
  )
}

export default UserInfo
