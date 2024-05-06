import React, { useEffect, useState } from 'react'
import { VStack, HStack, Spacer, Center, Box } from '@chakra-ui/layout'
import SideBar from '../components/SideBar'
import BackButton from '../components/button/BackButton'
import LogoutButton from '../components/button/LogoutButton'
import RoomForm from '../components/RoomForm'
import IconButton from '../components/button/IconButton'
import UserInfo from '../components/display/UserInfo'
import Guide from '../components/display/Guide'
import DraggableImg from '../components/2D/DraggableImg'
import type { furnitureType } from '../type/furnitureType'
import Viewport3D from '../components/3D/Viewport3D'
import { useToast, useDisclosure } from '@chakra-ui/react'
import { db } from '../hooks/firebase'
import { doc, updateDoc, getDoc } from 'firebase/firestore/lite'
import { useParams } from 'react-router-dom'
import type { roomType } from '../type/roomType'
import ConfirmLeaveModal from '../components/modal/ConfirmLeaveModal'

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

  // 保存された家具情報を保持する配列
  const [savedFurnitureList, setSavedFurnitureList] = useState<furnitureType[]>([])

  // 遷移先のURL
  const [path, setPath] = useState<string>('/')

  // モーダルの管理を行う変数
  const { isOpen, onOpen, onClose } = useDisclosure()

  /**
   * 未保存の家具があるかどうか
   * @returns bool: 1つでも違っていればtrue, 1つも違っていなければfalse
   */
  const checkUnsavedFurniture = (): boolean => {
    console.log(`furnitureList: ${JSON.stringify(furnitureList)}`)
    console.log(`savedFurnitur: ${JSON.stringify(savedFurnitureList)}`)
    // 1つでも違っていればtrue, 1つも違っていなければfalse
    if (furnitureList.length !== savedFurnitureList.length) {
      return true // furnitureListとsavedFurnitureListの長さが違っている場合、明らかにtrue
    }
    // 各furnitureListの要素とsavedFurnitureListの要素を比較
    return furnitureList.some((furniture, index) => {
      return JSON.stringify(furniture) !== JSON.stringify(savedFurnitureList[index])
    })
  }

  console.log(checkUnsavedFurniture())

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
      setSavedFurnitureList(data.furnitureList.map(item => {
        return { ...item }
      }))
    } catch (e) {
      console.error(e)
    }
  }

  // 未ログインのときはログイン画面に遷移
  useEffect(() => {
    if (localStorage.getItem('uid') === null) {
      window.location.href = '/nologin'
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
      setSavedFurnitureList(furnitureList.map(item => {
        return { ...item }
      }))
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
          <BackButton checkUnsavedFurniture={checkUnsavedFurniture} onOpen={onOpen} setPath={setPath}/>
          <Spacer/>
          <IconButton type='delete' event={ () => { if (target !== -1) deleteFurniture() } }/>
          <IconButton type='save' roomName = {name} event={() => { saveLayout().catch(e => { console.error(e) }) }}/>
          <Box width='20px'/>
          <UserInfo/>
          <Box width='20px' />
          <LogoutButton handleSignout={handleSignout}/>
        </HStack>
        <HStack width='97%' marginTop='20px'>
          <Spacer />
          <VStack>
            <Center paddingLeft='40px' width='700px' height='50px'>
              <RoomForm initialValue={name} setName={setName} />
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
      <ConfirmLeaveModal isOpen={isOpen} onClose={onClose} path={path} />
    </>
  )
}

export default Design
