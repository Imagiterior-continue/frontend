import React, { useEffect, useState } from 'react'
import { VStack, HStack, Spacer, Text, WrapItem, Box, Wrap } from '@chakra-ui/layout'
import { useDisclosure } from '@chakra-ui/hooks'
import RoomButton from '../components/button/RoomButton'
import LogoutButton from '../components/button/LogoutButton'
import DeleteModal from '../components/modal/DeleteModal'
import tempRoomList from '../Data/roomList.json'

interface Props {
  handleSignout: () => void
}

interface room_type {
  name: string
  image: string
}

function List ({ handleSignout }: Props): JSX.Element {
  // 一覧表示画面かどうか（falseのときは削除画面）
  const [isList, setIsList] = useState<boolean>(true)
  // 取得した部屋の情報
  const [roomList, setRoomList] = useState<any>([])
  // 削除確認モーダル用
  const { isOpen, onOpen, onClose } = useDisclosure()

  // 未ログインのときはログイン画面に遷移
  useEffect(() => {
    if (localStorage.getItem('uid') === null) {
      window.location.href = '/nologin'
    }
    // TODO: API接続出来たら消す
    setRoomList(tempRoomList)
  }, [])

  // TODO: APIで取得したユーザー情報の形式を確認した後、見直したい
  const AllRooms: JSX.Element[] = roomList.map(({ name, image }: room_type, index: number) => {
    return (
      <WrapItem key={index}>
        {isList ? <RoomButton title={name} image={image} type='green' onClick={() => { window.location.href = '/design' }}/> : <RoomButton title={name} image={image} type='red' onClick={onOpen}/>}
      </WrapItem>
    )
  })

  return (
    <>
      <DeleteModal name={'削除する部屋名'} isOpen={isOpen} onClose={onClose}/>
      <VStack marginTop='10px' justify='center'>
        <HStack paddingRight='20px' w='100%' h='20px'>
          <Spacer/>
          <LogoutButton handleSignout={handleSignout}/>
        </HStack>
        <Text paddingY='30px' width='50%' fontSize='30px' textAlign='center' borderBottom='3px solid #999999'>
          {isList ? `${localStorage.getItem('displayName')}さんの部屋一覧` : '削除する部屋を選択してください'}
        </Text>
        <HStack width='50%'>
          <Spacer/>
          <Text textAlign='right' color={isList ? '#FF3333' : '#70D74C'} cursor='pointer' transition='.2s' _hover={{ color: isList ? '#FF0000' : '#70D74C' }} onClick={() => { setIsList(!isList) }}>
            {isList ? '部屋を削除する' : '部屋を編集する'}
          </Text>
        </HStack>
        <Box w='60%' marginTop='40px' marginBottom='40px'>
          <Wrap spacing='50px' justify='center'>
            {AllRooms}
          </Wrap>
        </Box>
      </VStack>
    </>
  )
}

export default List
