import React, { useEffect, useState } from 'react'
import { VStack, HStack, Spacer, Center, Box } from '@chakra-ui/layout'
import SideBar from '../components/SideBar'
import BackButton from '../components/button/BackButton'
import LogoutButton from '../components/button/LogoutButton'
import RoomForm from '../components/RoomForm'
import IconButton from '../components/button/IconButton'
import Guide from '../components/display/Guide'
import DraggableImg from '../components/2D/DraggableImg'
import type { furnitureType } from '../type/furnitureType'
import Viewport3D from '../components/3D/Viewport3D'
import { useToast } from '@chakra-ui/react'
import { db } from '../hooks/firebase'
import { doc, updateDoc } from 'firebase/firestore/lite'

interface Props {
  handleSignout: () => void
}

function Design ({ handleSignout }: Props): JSX.Element {
  // 未ログインのときはログイン画面に遷移
  useEffect(() => {
    if (localStorage.getItem('uid') === null) {
      window.location.href = '/nologin'
    }
  }, [])

  /* 部屋名 */
  const [name, setName] = useState<string>('')

  // 配置されている全ての家具の情報を保持する配列
  const [furnitureList, setFurnitureList] = useState<furnitureType[]>([])
  const [draggableImgs, setDraggableImgs] = useState<JSX.Element[]>([])
  const [target, setTarget] = useState<number>(0)

  const toast = useToast()

  /**
   * レイアウトを保存する
   */
  const saveLayout = async (): Promise<void> => {
    const uid = localStorage.getItem('uid')
    if (uid !== null) {
      const updateRef = doc(db, uid, 'room_id_1')
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
  }

  /**
   * 家具の追加を行う
   * @param newFileName 追加する家具の名前
   * @param newImageSize 追加する家具の画像サイズ
   */
  const addFurniture: (newFileName: string, newImageSize: number[]) => void = (newFileName: string, newImageSize: number[]) => {
    setFurnitureList((prev) => {
      const newFurniture: furnitureType = {
        fileName: newFileName,
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
      <SideBar addFurniture={addFurniture} />
      <VStack marginLeft='15%' marginTop='20px' width='85%' height='100%'>
        <HStack width='97%' height='50px'>
          <BackButton />
          <Spacer />
          <IconButton type='delete' event={() => { if (target !== -1) deleteFurniture() }} />
          <IconButton type='save' roomName = {name} event={saveLayout} />
          <Box width='20px' />
          <LogoutButton handleSignout={handleSignout} />
        </HStack>
        <HStack width='97%' marginTop='20px'>
          <Spacer />
          <VStack>
            <Center paddingLeft='40px' width='700px' height='50px'>
              <RoomForm setName={setName} />
            </Center>
            <Center width='700px' height='700px' bg='#ECECEC'>{draggableImgs}</Center>
          </VStack>
          <Spacer />
          <VStack>
            <HStack width='700px' height='50px' />
            <Viewport3D furnitureList={furnitureList} />
          </VStack>
          <Spacer />
        </HStack>
        <HStack width='97%'>
          <Guide />
        </HStack>
      </VStack>
    </>
  )
}

export default Design
