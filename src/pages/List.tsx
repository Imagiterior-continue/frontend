import React, { useEffect, useState } from 'react'
import { VStack, HStack, Spacer, Text, WrapItem, Box, Wrap } from '@chakra-ui/layout'
import RoomButton from '../components/button/RoomButton'
import LogoutButton from '../components/button/LogoutButton'
import type { roomType } from '../type/roomType'
import { db } from '../hooks/firebase'
import { getDoc, doc } from 'firebase/firestore/lite'

interface Props {
  handleSignout: () => void
}

function List ({ handleSignout }: Props): JSX.Element {
  // TODO: 部屋の表示ができるようになったら削除する
  const tempURL = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhDl2-L1_SRV6R8sk3vPCGtO5vy8LEnpUSoaoEnCXBuItx89ag78Q3MxM6HtkUixlwiYw1cSK50-P0veLIMXpbT_w-wjcpxSeH7JDOe7r_oNeMe8bX_VsydNAj90vBr1Hm-PhR2V-UJ3O2pAkUmhU4d4mg_qMGlg5r7CmzKiZ_yJzQk24lR5acOGYVX6w/s845/pop_shinsyakaijin_murisuruna.png'

  // 取得した部屋の情報
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

  // TODO: APIで取得したユーザー情報の形式を確認した後、見直したい
  const AllRooms: JSX.Element[] = roomList.map(({ roomName, furnitureList }: roomType, index: number) => {
    return (
      <WrapItem key={index}>
        <RoomButton title={roomName} image={tempURL} type='green' onClick={() => { window.location.href = `/design/room_id_${index + 1}` }}/>
      </WrapItem>
    )
  })

  return (
    <>
      <VStack marginTop='10px' justify='center'>
        <HStack paddingRight='20px' w='100%' h='20px'>
          <Spacer/>
          <LogoutButton handleSignout={handleSignout}/>
        </HStack>
        <Text paddingY='30px' width='50%' fontSize='30px' textAlign='center' borderBottom='3px solid #999999'>
          {`${localStorage.getItem('displayName')}さんの部屋一覧`}
        </Text>
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
