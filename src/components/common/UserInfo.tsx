import React from 'react'
import { Text, HStack, Box } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { themeColor } from '../../Data/color'

function UserInfo (): JSX.Element {
  return (
    <HStack marginX='20px'>
      <Image boxSize='30px' rounded='full' src={localStorage.getItem('photoURL') ?? '/no_image.png'} objectFit='cover'/>
      <Box display={{ base: 'none', md: 'block' }}>
        <Text textAlign='center' fontSize='18px' color={themeColor.accentString}>{localStorage.getItem('displayName')}</Text>
      </Box>
    </HStack>
  )
}

export default UserInfo
