import React, { useEffect, useState } from 'react'
import { VStack, Text, WrapItem, Box, Wrap } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/react'
import RoomButton from '../components/List/RoomButton'
import type { roomType } from '../type/roomType'
import { db } from '../hooks/firebase'
import { getDoc, doc } from 'firebase/firestore/lite'
import Header from '../components/common/Header'
import { themeColor } from '../Data/color'

interface Props {
  handleSignout: () => void
}

function List ({ handleSignout }: Props): JSX.Element {
  const [roomList, setRoomList] = useState<roomType[]>([])

  /**
   * 全ての部屋データを取得する
   */
  const fetchRoomList = async (): Promise<void> => {
    try {
      const uid: string = localStorage.getItem('uid') ?? ''
      const tempList: roomType[] = []
      for (let i = 1; i < 4; i++) {
        const docSnap = await getDoc(doc(db, uid, `room_id_${i}`))
        const data: roomType = docSnap.data() as roomType
        tempList.push(data)
      }
      setRoomList(tempList)
    } catch (e) {
      console.error(e)
    }
  }

  // 未ログインのときはログイン画面に遷移
  useEffect(() => {
    if (localStorage.getItem('uid') === null) {
      window.location.href = '/nologin'
    }
    fetchRoomList().catch((error) => {
      console.error(error)
    })
  }, [])

  const AllRooms: JSX.Element[] = roomList.map(({ roomName, furnitureList }: roomType, index: number) => {
    return (
      <WrapItem key={index}>
        <RoomButton title={roomName} furnitureList={furnitureList} onClick={() => { window.location.href = `/design/room_id_${index + 1}` }}/>
      </WrapItem>
    )
  })

  return (
    <>
      <Header handleSignout={handleSignout} />
      <VStack marginTop='100px' justify='center'>
        <Text paddingBottom='20px' width='50%' fontSize='25px' textAlign='center' borderBottomWidth='3px' borderColor={themeColor.main}>
          {`${localStorage.getItem('displayName')}さんの部屋一覧`}
        </Text>
        <Text marginBottom='50px' fontSize='18px' color='#4A4747'>編集する部屋を選択してください</Text>
        <Box w='80%' marginBottom='40px'>
          <Wrap spacing='50px' justify='center'>
            {AllRooms.length === 0 ? <Spinner size='xl' borderWidth='4px' /> : AllRooms}
          </Wrap>
        </Box>
      </VStack>
    </>
  )
}

export default List
