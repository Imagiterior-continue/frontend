import React from 'react'
import { Button } from '@chakra-ui/button'
import { Text } from '@chakra-ui/layout'
import { FaPlus, FaArrowRotateRight } from 'react-icons/fa6'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoIosSave } from 'react-icons/io'
import { CgShapeSquare } from 'react-icons/cg'
import { PiCubeBold } from 'react-icons/pi'

interface Props {
  type: 'addRoom' | 'delete' | 'rotate' | 'save' | 'to2D' | 'to3D'
  roomName?: string
  event: () => void
}

function IconButton ({ type, roomName, event }: Props): JSX.Element {
  return (
    <>
      <Button
        height='40px'
        paddingLeft='20px'
        paddingRight='25px'
        rounded='full'
        bg={ type === 'delete' ? '#FF5D39' : type === 'rotate' ? '#55C1FE' : '#70D74C' }
        onClick={ event }
        isDisabled = {roomName === ''}
      >
        { type === 'addRoom' ? <FaPlus size='25px'/> : type === 'delete' ? <FaRegTrashAlt size='25px'/> : type === 'rotate' ? <FaArrowRotateRight size='25px'/> : type === 'save' ? <IoIosSave size='25px'/> : type === 'to2D' ? <CgShapeSquare size='25px'/> : <PiCubeBold size='25px'/> }
        <Text marginLeft='13px' fontSize='20px'>
          { type === 'addRoom' ? '部屋を追加する' : type === 'delete' ? '削除' : type === 'rotate' ? '回転' : type === 'save' ? '保存' : type === 'to2D' ? '2Dに変換' : '3Dに変換' }
        </Text>
      </Button>
    </>
  )
}

export default IconButton
