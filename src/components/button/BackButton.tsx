import React from 'react'
import { HStack, Text, Link } from '@chakra-ui/layout'
import { IoMdArrowRoundBack } from 'react-icons/io'

interface BackButtonProps {
  checkUnsavedFurniture: () => boolean
  onOpen: () => void // モーダルを表示する関数
  setPath: (path: string) => void
}

function BackButton ({ checkUnsavedFurniture, onOpen, setPath }: BackButtonProps): JSX.Element {
  return (
    <>
      <Link onClick={() => {
        // 未保存の家具があればモーダルを表示
        if (checkUnsavedFurniture()) {
          setPath('/list') // 保存せずに遷移する先のurlをセット
          onOpen() // モーダルを表示
        } else {
          window.location.href = '/list' // 保存済みの場合
        }
      }}>
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
