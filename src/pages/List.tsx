import React, { useEffect, useState } from 'react'
import { VStack, HStack, Spacer, Text, WrapItem, Box, Wrap, Link } from '@chakra-ui/layout'
import axios from 'axios'
import { baseURL } from '../Data/baseURL'
import RoomInfo from '../components/button/RoomButton'
import IconButton from '../components/button/IconButton'
import LogOutButton from '../components/button/LogoutButton'

interface room_type {
  name: string
  image: string
}

function List (): JSX.Element {
  const [roomList, setRoomList] = useState<any>([])

  useEffect(() => {
    // ユーザーIDの取得
    const query = new URLSearchParams(location.search)
    const userId = query.get('user_id')
    if (userId != null) {
      localStorage.setItem('user_id', userId)
    }

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
          <RoomInfo title={name} image={image} type='green'/>
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
        <Text paddingY='30px' width='50%' fontSize='30px' textAlign='center' borderBottom='3px solid #999999'>{localStorage.getItem('user_id')}さんの部屋一覧</Text>
        <HStack width='50%'>
          <Spacer/>
          <Link href='/delete' width='50%'>
            <Text textAlign='right' color='red'>部屋を削除する</Text>
          </Link>
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
