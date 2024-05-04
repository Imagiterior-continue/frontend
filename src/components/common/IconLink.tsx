import React from 'react'
import { Text, HStack } from '@chakra-ui/layout'
import { themeColor } from '../../Data/color'

interface Props {
  link: string
  icon: JSX.Element
  text: string
}

function IconLink ({ link, icon, text }: Props): JSX.Element {
  return (
    <>
      <HStack paddingX='30px' paddingY='5px' borderLeftWidth='3px' borderColor={themeColor.accentString} cursor='pointer' transition='.1s' _hover={{ bg: themeColor.accentHover }} onClick={() => { window.location.href = link }}>
        {icon}
        <Text textAlign='center' fontSize='19px' color={themeColor.accentString}>{text}</Text>
      </HStack>
    </>
  )
}

export default IconLink
