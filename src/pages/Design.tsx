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
  const [furnitureNum, setFurnitureNum] = useState<number>(0)
  const [draggableImgs, setDraggableImgs] = useState<JSX.Element[]>([])
  const [editedFurniture, setEditedFurniture] = useState<number>(0)

  /**
   * 家具の追加を行う
   * @param newFileName 追加する家具の名前
   * @param newImageSize 追加する家具の画像サイズ
   */
  const addFurniture: (newFileName: string, newImageSize: number[]) => void = (newFileName: string, newImageSize: number[]) => {
    setFurnitureList((prev) => {
      setFurnitureNum(furnitureNum + 1)
      const newFurniture: furnitureType = {
        fileName: newFileName,
        position: [0, -0.5, 0],
        rotation: 0,
        size: [1, 1, 1],
        imageSize: newImageSize
      }
      return [...prev, newFurniture]
    })
  }

  /**
   * 家具の情報の更新を行う
   * @param index 更新する家具のインデックス
   * @param position 位置
   * @param rotation 回転
   */
  const updateFurnitureList: (index: number, position: number[], rotation: number) => void = (index: number, position: number[], rotation: number) => {
    setFurnitureList((prev) => {
      const newFurnitureList: furnitureType[] = [...prev]
      newFurnitureList[index].position = position
      newFurnitureList[index].rotation = rotation
      return newFurnitureList
    })
    setEditedFurniture(index)
  }

  /**
   * 家具の削除を行う
   * @param index 削除する家具のインデックス
   */
  const deleteFurniture: (index: number) => void = (index: number) => {
    setFurnitureNum(furnitureNum - 1)
    setFurnitureList((prev) => {
      if (index === 0 && prev.length === 1) {
        return []
      } else {
        const newFurnitureList: furnitureType[] = [...prev].slice(index, 1)
        return newFurnitureList
      }
    })
  }

  // 家具の追加・削除後にdraggableImgsを更新する
  useEffect(() => {
    const newDraggableImgs: JSX.Element[] = furnitureList.map((item, index) => {
      return (
        <DraggableImg key={index} index={index} fileName={item.fileName} imageSize={item.imageSize} updateFurnitureList={updateFurnitureList}/>
      )
    })
    setDraggableImgs(newDraggableImgs)
  }, [furnitureNum])

  return (
    <>
      <SideBar addFurniture={addFurniture}/>
      <VStack marginLeft='15%' marginTop='20px' width='85%' height='100%'>
        <HStack width='97%' height='50px'>
          <BackButton/>
          <Spacer/>
          <IconButton type='delete' event={ () => { deleteFurniture(editedFurniture) } }/>
          <IconButton type='save' event={ () => { console.log(name) } }/>
          <Box width='20px'/>
          <LogoutButton handleSignout={handleSignout}/>
        </HStack>
        <HStack width='97%' marginTop='20px'>
          <Spacer/>
          <VStack>
            <Center paddingLeft='40px' width='700px' height='50px'>
              <RoomForm setName={setName} />
            </Center>
            <Center width='700px' height='700px' bg='#ECECEC'>{draggableImgs}</Center>
          </VStack>
          <Spacer/>
          <VStack>
            <HStack width='700px' height='50px'/>
            <Viewport3D furnitureList={furnitureList}/>
          </VStack>
          <Spacer/>
        </HStack>
        <HStack width='97%'>
          <Guide/>
        </HStack>
      </VStack>
    </>
  )
}

export default Design
