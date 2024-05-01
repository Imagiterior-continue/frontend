import React from 'react'
import { VStack, Text } from '@chakra-ui/layout'
import type { furnitureType } from '../../type/furnitureType'
import RoomImg from '../display/RoomImg'

interface Props {
  title: string
  furnitureList: furnitureType[]
  type: 'green' | 'red'
  onClick: () => void
}

function RoomInfo ({ title, furnitureList, type, onClick }: Props): JSX.Element {
  return (
    <>
      <VStack padding='10px' rounded='5px' bg={ type === 'green' ? '#C5E8BF' : '#E8BFBF' } _hover={{ shadow: '2xl' }} transition='.2s' cursor='pointer' onClick={onClick}>
        <Text fontSize='20px'>{ title }</Text>
        <RoomImg furnitureList={furnitureList}/>
      </VStack>
    </>
  )
}

export default RoomInfo
