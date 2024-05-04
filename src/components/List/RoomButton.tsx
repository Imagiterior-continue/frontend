import React from 'react'
import { VStack, Text, Box } from '@chakra-ui/layout'
import type { furnitureType } from '../../type/furnitureType'
import RoomImg from './RoomImg'
import { themeColor } from '../../Data/color'

interface Props {
  title: string
  furnitureList: furnitureType[]
  onClick: () => void
}

function RoomInfo ({ title, furnitureList, onClick }: Props): JSX.Element {
  return (
    <>
      <VStack rounded='3px' spacing={0} bg={themeColor.main} _hover={{ shadow: '2xl' }} transition='.2s' cursor='pointer' onClick={onClick}>
        <Box width='200px' height='250px' position='absolute' rounded='3px' boxShadow='-10px 10px 30px rgba(0, 0, 0, 0.2)' />
        <Box width='200px' height='250px' position='absolute' rounded='3px' boxShadow='10px -10px 30px rgba(255, 255, 255, 0.7)' />
        <Text lineHeight='50px' height='50px' textAlign='center' fontSize='18px'>{ title }</Text>
        <RoomImg furnitureList={furnitureList}/>
      </VStack>
    </>
  )
}

export default RoomInfo
