import React from 'react'
import { Text, HStack, Box } from '@chakra-ui/layout'
import { Spacer, WrapItem, useDisclosure } from '@chakra-ui/react'
import { themeColor } from '../../Data/color'
import { TiThSmall } from 'react-icons/ti'
import Logo from './Logo'
import IconLink from './IconButton'
import UserInfo from './UserInfo'
import { FiLogOut } from 'react-icons/fi'
import ConfirmLeaveModal from '../Design/ConfirmLeaveModal'

interface Props {
  handleSignout: () => void
  checkUnsavedFurniture?: () => boolean
}

function Header ({ handleSignout, checkUnsavedFurniture }: Props): JSX.Element {
  // モーダルの管理を行う変数
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <HStack bg={themeColor.accent} w='100%' h='50px' paddingX={{ base: '5px', sm: '15px' }} position='fixed' top='0' left='0' zIndex={10}>
        <Box display={{ base: 'none', sm: 'block' }}>
          <Logo size={35} color='white'/>
        </Box>
        <Text fontFamily='Shippori Antique' marginLeft='3px' fontSize={{ base: '25px', sm: '25px' }} color={themeColor.accentString}>Imagiterior</Text>
        <Spacer />
        <UserInfo/>
        <IconLink onClick={checkUnsavedFurniture === undefined || !checkUnsavedFurniture() ? () => { window.location.href = '/list' } : onOpen} icon={<TiThSmall color={themeColor.accentString} size='22px'/>} text='部屋一覧' />
        <WrapItem onClick={handleSignout}>
          <IconLink onClick={() => { window.location.href = '/' }} icon={<FiLogOut color={themeColor.accentString} size='25px'/>} text='ログアウト'/>
        </WrapItem>
      </HStack>
      <ConfirmLeaveModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Header
