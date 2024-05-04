import React, { useEffect, useState } from 'react'
import { VStack, HStack, Center } from '@chakra-ui/layout'
import SideBar from '../components/Design/SideBar'
import Guide from '../components/Design/Guide'
import DraggableImg from '../components/2D/DraggableImg'
import type { furnitureType } from '../type/furnitureType'
import Viewport3D from '../components/3D/Viewport3D'
import { useToast } from '@chakra-ui/react'
import { db } from '../hooks/firebase'
import { doc, updateDoc, getDoc } from 'firebase/firestore/lite'
import { useParams } from 'react-router-dom'
import type { roomType } from '../type/roomType'
import Header from '../components/common/Header'
import SelectingFurniture from '../components/Design/SelectingInfo'
import SaveField from '../components/Design/SaveField'

interface Props {
  handleSignout: () => void
}

function Design ({ handleSignout }: Props): JSX.Element {
  const urlParams = useParams<string>()
  const toast = useToast()

  /* 部屋名 */
  const [name, setName] = useState<string>('')

  // 配置されている全ての家具の情報を保持する配列
  const [furnitureList, setFurnitureList] = useState<furnitureType[]>([])
  const [draggableImgs, setDraggableImgs] = useState<JSX.Element[]>([])
  const [target, setTarget] = useState<number>(-1)

  /**
   * 部屋データを取得する
   */
  const fetchRoomData = async (): Promise<void> => {
    try {
      const uid: string = localStorage.getItem('uid') ?? ''
      const docSnap = await getDoc(doc(db, uid, urlParams.room_id ?? ''))
      const data: roomType = docSnap.data() as roomType
      setName(data.roomName)
      setFurnitureList(data.furnitureList)
    } catch (e) {
      console.error(e)
    }
  }

  // 未ログインのときはログイン画面に遷移
  useEffect(() => {
    if (localStorage.getItem('uid') === null) {
      window.location.href = '/nologin'
    }
    if (urlParams.room_id !== 'room_id_1' && urlParams.room_id !== 'room_id_2' && urlParams.room_id !== 'room_id_3') {
      window.location.href = '/nomatch'
    }
    fetchRoomData().catch((error) => {
      console.error(error)
    })
  }, [])

  /**
   * 配置された家具の情報をデータベースに保存する
   */
  const saveLayout = async (): Promise<void> => {
    const uid: string = localStorage.getItem('uid') ?? ''
    const updateRef = doc(db, uid, urlParams.room_id ?? '')
    await updateDoc(updateRef, {
      roomName: name,
      furnitureList
    }).then(() => {
      toast(
        {
          colorScheme: 'green',
          title: '保存しました',
          status: 'success',
          duration: 6000,
          isClosable: true,
          position: 'top'
        }
      )
    }).catch((error) => {
      console.error('エラーが発生しました: ', error)
      toast(
        {
          colorScheme: 'red',
          title: '保存に失敗しました',
          status: 'error',
          duration: 6000,
          isClosable: true,
          position: 'top'
        }
      )
    })
  }

  /**
   * 家具の追加を行う
   * @param newFileName 追加する家具の名前
   * @param newImageSize 追加する家具の画像サイズ
   */
  const addFurniture: (newFileName: string, newName: string, newImageSize: number[]) => void = (newFileName, newName, newImageSize) => {
    setFurnitureList((prev) => {
      const newFurniture: furnitureType = {
        fileName: newFileName,
        name: newName,
        position: [0, -0.5, 0],
        rotation: 0,
        size: [1, 1, 1],
        imageSize: newImageSize
      }
      return [...prev, newFurniture]
    })
    setTarget(furnitureList.length)
    setDraggableImgs([])
  }

  /**
   * 家具の情報の更新を行う
   * @param index 更新する家具のインデックス
   * @param position 位置
   * @param rotation 回転
   */
  const updateFurnitureList: (index: number, position: number[], rotation: number) => void = (index: number, position: number[], rotation: number) => {
    setTarget(index)
    setFurnitureList((prev) => {
      const newFurnitureList: furnitureType[] = [...prev]
      newFurnitureList[index].position = position
      newFurnitureList[index].rotation = rotation
      return newFurnitureList
    })
  }

  /**
   * 家具の削除を行う
   * @param index 削除する家具のインデックス
   */
  const deleteFurniture: () => void = () => {
    const deleteItem: furnitureType = furnitureList[target]
    const newFurnitureList: furnitureType[] = [...furnitureList].filter(i => i !== deleteItem)
    setFurnitureList(newFurnitureList)
    setTarget(-1)
    setDraggableImgs([])
  }

  // 家具の追加・削除後にdraggableImgsを更新する
  useEffect(() => {
    const newDraggableImgs: JSX.Element[] = furnitureList.map((item, index) => {
      return (
        <DraggableImg key={index} index={index} fileName={item.fileName} imageSize={item.imageSize} position={item.position} rotation={item.rotation} updateFurnitureList={updateFurnitureList} isEdited={index === target} />
      )
    })
    setDraggableImgs(newDraggableImgs)
  }, [furnitureList.length, target])

  return (
    <>
      <Header handleSignout={handleSignout} />
      <HStack spacing={0} w='100%' h='100vh' paddingTop='60px'>
        <SideBar addFurniture={addFurniture} />
        <VStack width='100%' height='100%'>
          <div style={{ width: '100%', marginTop: '10px' }}>
            <Guide />
          </div>
          <HStack w='100%' alignItems='start' paddingLeft='20px' paddingTop='20px' spacing='20px'>
            <SelectingFurniture furniture={ target === -1 ? null : furnitureList[target] } onClick={ () => { if (target !== -1) deleteFurniture() } } />
            <SaveField roomName={name} setName={setName} saveLayout={() => { saveLayout().catch(e => { console.error(e) }) }} />
          </HStack>
          <div style={{ width: '100%' }}>
          <HStack width='100%' marginTop='10px' paddingLeft='20px' spacing='20px'>
            <Center width='700px' height='700px' bg='#ECECEC'>{draggableImgs}</Center>
            <Viewport3D furnitureList={furnitureList} />
          </HStack>
          </div>
          <HStack width='97%'>
          </HStack>
        </VStack>
      </HStack>
    </>
  )
}

export default Design
