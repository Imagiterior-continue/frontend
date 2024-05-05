import React from 'react'
import { Text, HStack, Box } from '@chakra-ui/layout'
import { themeColor } from '../../Data/color'

interface Props {
  link: string
  icon: JSX.Element
  text: string
}

function IconLink ({ link, icon, text }: Props): JSX.Element {
  return (
    <>
      <HStack paddingX='20px' paddingY='3px' borderLeftWidth='3px' borderColor={themeColor.accentString} cursor='pointer' transition='.1s' _hover={{ bg: themeColor.accentHover }} onClick={() => { window.location.href = link }}>
        {icon}
        <Box display={{ base: 'none', md: 'block' }}>
          <Text textAlign='center' fontSize='16px' color={themeColor.accentString}>{text}</Text>
        </Box>
      </HStack>
    </>
  )
}

export default IconLink
