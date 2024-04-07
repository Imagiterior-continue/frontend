import React from 'react'
import { VStack, HStack, Text } from '@chakra-ui/layout'
import Guide from './Guide'

function ShowGuide (): JSX.Element {
  return (
    <>
      <VStack width='760px' height='110px'>
        <Text width='100%' paddingBottom='7px' paddingLeft='10px' marginBottom='7px' borderBottom='3px solid #EEEEEE' textAlign='left' fontSize='20px'>操作方法</Text>
        <HStack width='95%' justifyItems='left'>
          <Guide type='choose'/>
          <Guide type='drag'/>
          <Guide type='click'/>
        </HStack>
      </VStack>
    </>
  )
}

export default ShowGuide
