import React, { useEffect, useState } from 'react'
import { VStack, HStack, Spacer, Center, Box, WrapItem } from '@chakra-ui/layout'
import SideBar from '../components/SideBar'
import BackButton from '../components/button/BackButton'
import LogoutButton from '../components/button/LogoutButton'
import RoomForm from '../components/RoomForm'
import IconButton from '../components/button/IconButton'
import Guide from '../components/display/Guide'
import DraggableImg from '../components/2D/DraggableImg'
import type { interiorType } from '../type/InteriorType'
import Viewport3D from '../components/3D/Viewport3D'

interface Props {
  handleSignout: () => void
}

function Design ({ handleSignout }: Props): JSX.Element {
  // 未ログインのときはログイン画面に遷移
  useEffect(() => {
    if (localStorage.getItem('uid') === null) {
      window.location.href = '/'
    }
  }, [])

  /* 部屋名の取得 */
  const [name, setName] = useState<string>('')
  console.log(name)

  // 配置されている全ての家具の情報を保持する配列
  const [interiorInfo, setInteriorInfo] = useState<interiorType[]>([])
  const [interiorNum, setInteriorNum] = useState<number>(0)
  const [draggableImgs, setDraggableImgs] = useState<JSX.Element[]>([])

  /**
   * 家具の追加を行う
   * @param newFileName 追加する家具の名前
   * @param newImageSize 追加する家具の画像サイズ
   */
  const addInteriorInfo: (newFileName: string, newImageSize: number[]) => void = (newFileName: string, newImageSize: number[]) => {
    setInteriorInfo((prev) => {
      setInteriorNum(interiorNum + 1)
      const newInterior: interiorType = {
        fileName: newFileName,
        position: [0, -0.5, 0],
        rotation: 0,
        size: [1, 1, 1],
        imageSize: newImageSize
      }
      return [...prev, newInterior]
    })
  }

  /**
   * 家具の情報の更新を行う
   * @param index 更新する家具のインデックス
   * @param position 位置
   * @param rotation 回転
   */
  const updateInteriorInfo: (index: number, position: number[], rotation: number) => void = (index: number, position: number[], rotation: number) => {
    setInteriorInfo((prev) => {
      const newInteriorInfo: interiorType[] = [...prev]
      newInteriorInfo[index].position = position
      newInteriorInfo[index].rotation = rotation
      return newInteriorInfo
    })
  }

  // 新しく家具が配置されたらdraggableImgsを更新する
  useEffect(() => {
    const newDraggableImgs: JSX.Element[] = interiorInfo.map((item, index) => {
      return (
        <WrapItem key={index}>
          <DraggableImg index={index} fileName={item.fileName} imageSize={item.imageSize} updateInteriorInfo={updateInteriorInfo}/>
        </WrapItem>
      )
    })
    setDraggableImgs(newDraggableImgs)
  }, [interiorNum])

  return (
    <>
      <SideBar addInteriorInfo={addInteriorInfo}/>
      <VStack marginLeft='15%' marginTop='20px' width='85%' height='100%'>
        <HStack width='97%' height='50px'>
          <BackButton/>
          <Spacer/>
          <IconButton type='save' event={ () => { console.log('ここで保存') } }/>
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
            <Viewport3D interiorInfo={interiorInfo}/>
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
