import React from 'react'
import { Text, HStack, Box } from '@chakra-ui/layout'
import { themeColor } from '../../Data/color'

interface Props {
  onClick: () => void
  icon: JSX.Element
  text: string
}

function IconLink ({ onClick, icon, text }: Props): JSX.Element {
  return (
    <>
      <HStack paddingX='15px' paddingY='3px' borderLeftWidth='3px' borderColor={themeColor.accentString} cursor='pointer' transition='.1s' _hover={{ bg: themeColor.accentHover }} onClick={onClick}>
        {icon}
        <Box display={{ base: 'none', md: 'block' }}>
          <Text textAlign='center' fontSize='16px' color={themeColor.accentString}>{text}</Text>
        </Box>
      </HStack>
    </>
  )
}

export default IconLink
