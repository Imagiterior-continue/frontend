import React, { useState } from 'react'
import { Text, HStack, Box } from '@chakra-ui/layout'
import { Spacer, useDisclosure } from '@chakra-ui/react'
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [func, setFunc] = useState<() => void>(() => {})

  /**
   * レイアウトの保存状態に応じてモーダルを表示する
   * @param type 'list' or 'logout'
   */
  const onClick: (type: 'list' | 'logout') => void = (type) => {
    if (checkUnsavedFurniture === undefined || !checkUnsavedFurniture()) {
      if (type === 'list') {
        window.location.href = '/list'
      } else {
        handleSignout()
      }
    } else {
      if (type === 'list') {
        setFunc(() => () => { window.location.href = '/list' })
      } else {
        setFunc(() => handleSignout)
      }
      onOpen()
    }
  }

  return (
    <>
      <HStack bg={themeColor.accent} w='100%' h='50px' paddingX={{ base: '5px', sm: '15px' }} position='fixed' top='0' left='0' zIndex={10}>
        <Box display={{ base: 'none', sm: 'block' }}>
          <Logo size={35} color='white'/>
        </Box>
        <Text fontFamily='Shippori Antique' marginLeft='3px' fontSize={{ base: '25px', sm: '25px' }} color={themeColor.accentString}>Imagiterior</Text>
        <Spacer />
        <UserInfo/>
        <IconLink onClick={() => { onClick('list') }} icon={<TiThSmall color={themeColor.accentString} size='22px'/>} text='部屋一覧' />
        <IconLink onClick={() => { onClick('logout') }} icon={<FiLogOut color={themeColor.accentString} size='25px'/>} text='ログアウト'/>
      </HStack>
      <ConfirmLeaveModal isOpen={isOpen} onClose={onClose} onClick={func} />
    </>
  )
}

export default Header
