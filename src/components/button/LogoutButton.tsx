import React from 'react'
import { HStack, Text, Link } from '@chakra-ui/layout'
import { FiLogOut } from 'react-icons/fi'

interface Props {
  handleSignout: () => void
}

function LogOutButton ({ handleSignout }: Props): JSX.Element {
  return (
    <>
      <Link href='/'>
        <HStack onClick={handleSignout}>
          <FiLogOut size='25px'/>
          <Text fontSize='18px'>
            ログアウト
          </Text>
        </HStack>
      </Link>
    </>
  )
}

export default LogOutButton
