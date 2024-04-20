import React, { useEffect, useState } from 'react'
import { VStack, HStack, Spacer, Center, Box } from '@chakra-ui/layout'
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
  /* 家具の管理用 */
  const [interiors, setInteriors] = useState<JSX.Element[]>([])
  const initialInteriorsInfo: interiorType[] = Array.from({ length: 15 }, (_, index) => ({
    fileName: '',
    position: [0, -0.5, 0],
    rotate: 0
  }))
  const [interiorsInfo, setInteriorsInfo] = useState<interiorType[]>(initialInteriorsInfo)

  const addInteriors: (fileName: string, imageSize: number[]) => void = (fileName: string, imageSize: number[]) => {
    if (interiors.length < 15) {
      setInteriors((prevInteriors) => [
        ...prevInteriors,
        <DraggableImg key={prevInteriors.length} fileName={fileName} imageSize={imageSize} interiors={interiors} addInteriorsInfo={addInteriorsInfo} updateInteriorsInfo={updateInteriorsInfo}/>
      ])
    }
  }

  const addInteriorsInfo: (index: number, fileName: string) => void = (index: number, fileName: string) => {
    setInteriorsInfo((prev) => {
      const newInteriorsInfo = [...prev]
      newInteriorsInfo[index].fileName = fileName
      return newInteriorsInfo
    })
  }

  const updateInteriorsInfo: (index: number, newPosition: number[], newRotate: number) => void = (index: number, newPosition: number[], newRotate: number) => {
    const newInteriorsInfo = [...interiorsInfo]
    newInteriorsInfo[index].position = newPosition
    newInteriorsInfo[index].rotate = newRotate
    setInteriorsInfo(newInteriorsInfo)
  }

  return (
    <>
      <SideBar addInteriors={addInteriors}/>
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
            <Center width='700px' height='700px' bg='#ECECEC'>{interiors}</Center>
          </VStack>
          <Spacer/>
          <VStack>
            <HStack width='700px' height='50px'/>
            <Viewport3D interiorsInfo={interiorsInfo}/>
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
