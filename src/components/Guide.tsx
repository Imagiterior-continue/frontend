import React from 'react'
import { HStack, Text, Spacer } from '@chakra-ui/layout'
import { BsHandIndex } from 'react-icons/bs'
import { RiDragMove2Line } from 'react-icons/ri'
import { LuMousePointerClick } from 'react-icons/lu'

interface Props {
  type: 'choose' | 'drag' | 'click'
}

function Guide ({ type }: Props): JSX.Element {
  return (
    <>
      <HStack width='250px'>
        <Spacer/>
        { type === 'choose' ? <BsHandIndex size='32px' style={{ marginRight: '5px' }}/> : type === 'drag' ? <RiDragMove2Line size='35px'/> : <LuMousePointerClick size='35px'/>}
        <Text width='260px' textAlign='left' fontSize='20px'>{type === 'choose' ? '左の一覧から選択' : type === 'drag' ? 'ドラッグで移動' : 'クリックで回転'}</Text>
        <Spacer/>
      </HStack>
    </>
  )
}

export default Guide
