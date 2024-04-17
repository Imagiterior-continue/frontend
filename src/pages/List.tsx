import React, { useEffect, useState } from 'react'
import { VStack, HStack, Spacer, Text, WrapItem, Box, Wrap, Link } from '@chakra-ui/layout'
import axios from 'axios'
import { baseURL } from '../Data/baseURL'
import RoomInfo from '../components/button/RoomButton'
import IconButton from '../components/button/IconButton'
import LogOutButton from '../components/button/LogoutButton'
import tempRoomList from '../Data/roomList.json'

interface room_type {
  name: string
  image: string
}

function List (): JSX.Element {
  // 一覧表示画面かどうか（falseのときは削除画面）
  const [isList, setIsList] = useState<boolean>(true)
  // 取得した部屋の情報
  const [roomList, setRoomList] = useState<any>([])

  useEffect(() => {
    // ユーザーIDの取得
    const query = new URLSearchParams(location.search)
    const userId = query.get('user_id')
    if (userId != null) {
      localStorage.setItem('user_id', userId)
    }
    // TODO: API接続出来たら消す
    setRoomList(tempRoomList)

    // 部屋情報の取得
    axios
      .get(
        baseURL +
          `user_layout/${localStorage.getItem('user_id')}`
      )
      .then((response) => {
        console.log(response.data)
        setRoomList(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // TODO:APIで取得したユーザー情報の形式を確認した後、見直したい
  const AllRooms: JSX.Element[] = roomList.map(({ name, image }: room_type, index: number) => {
    return (
      <WrapItem key={index}>
        <Link href='./design' style={{ textDecoration: 'none' }}>
          {isList ? <RoomInfo title={name} image={image} type='green'/> : <RoomInfo title={name} image={image} type='red'/>}
        </Link>
      </WrapItem>
    )
  })

  return (
    <>
      <VStack marginTop='10px' justify='center'>
        <HStack paddingRight='20px' w='100%' h='20px'>
          <Spacer/>
          <LogOutButton/>
        </HStack>
        <Text paddingY='30px' width='50%' fontSize='30px' textAlign='center' borderBottom='3px solid #999999'>
          {isList ? `${localStorage.getItem('user_id')}さんの部屋一覧` : '削除する部屋を選択してください'}
        </Text>
        <HStack width='50%'>
          <Spacer/>
          <Text textAlign='right' color='#FF3333' cursor='pointer' transition='.2s' _hover={{ color: '#FF0000' }} onClick={() => { setIsList(!isList) }}>部屋を削除する</Text>
        </HStack>
        <Box w='60%' marginTop='40px' marginBottom='40px'>
          <Wrap spacing='50px' justify='center'>
            {AllRooms}
          </Wrap>
        </Box>
        <Link href='/design'>
          <IconButton type='addRoom' event={() => { }}/>
        </Link>
      </VStack>
    </>
  )
}

export default List
