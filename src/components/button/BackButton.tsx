import React from 'react'
import { HStack, Text, Link } from '@chakra-ui/layout'
import { IoMdArrowRoundBack } from 'react-icons/io'

function BackButton (): JSX.Element {
  return (
    <>
      <Link href='/list'>
        <HStack>
          <IoMdArrowRoundBack size='25px'/>
          <Text fontSize='18px'>
            一覧へ戻る
          </Text>
        </HStack>
      </Link>
    </>
  )
}

export default BackButton
