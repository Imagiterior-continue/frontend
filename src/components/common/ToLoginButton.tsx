import React from 'react'
import { Button } from '@chakra-ui/button'
import { Text, Link } from '@chakra-ui/layout'
import { IoMdArrowRoundBack } from 'react-icons/io'

function ToLoginButton (): JSX.Element {
  return (
    <>
      <Link href='/'>
        <Button w='200px' h='45px' rounded='3px' bg='rgba(0, 0, 0, 0)' _hover={{ bg: 'rgba(0, 0, 0, 0.1)' }} border='3px solid black'>
          <IoMdArrowRoundBack size='25px'/>
          <Text fontSize='18px'>
            ログイン画面へ
          </Text>
        </Button>
      </Link>
    </>
  )
}

export default ToLoginButton
