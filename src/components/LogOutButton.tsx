import React from 'react'
import { HStack, Text, Link } from '@chakra-ui/layout'
import { FiLogOut } from 'react-icons/fi'

interface Props {
  handleSignOut: () => void
}

function LogOutButton ({ handleSignOut }: Props): JSX.Element {
  return (
    <>
      <Link href='/'>
        <HStack onClick={handleSignOut}>
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
