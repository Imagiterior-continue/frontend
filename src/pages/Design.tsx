import React, { useState } from 'react'
import axios from 'axios'
import { VStack, HStack, Spacer, Center, Box } from '@chakra-ui/layout'
import SideBar from '../components/SideBar'
import BackButton from '../components/BackButton'
import LogOutButton from '../components/LogOutButton'
import RoomForm from '../components/RoomForm'
import IconButton from '../components/IconButton'
import ShowGuide from '../components/ShowGuide'
import DraggableImg from '../components/DraggableImg'
import type { interiorType } from '../type/InteriorType'
import Viewport3D from '../components/Viewport3D'

function Design (): JSX.Element {
  /* 部屋名の取得 */
  const [name, setName] = useState<string>('')
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

  const saveLayout: () => void = () => {
    axios
      .post(`http://127.0.0.1:8000/save_room_detail?user_id=user1&room_id=room1&room_name=${name}&furniture_list=${JSON.stringify(interiorsInfo)}`)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <SideBar addInteriors={addInteriors}/>
      <VStack marginLeft='15%' marginTop='20px' width='85%' height='100%'>
        <HStack width='97%' height='50px'>
          <BackButton/>
          <Spacer/>
          <IconButton type='save' event={ () => { saveLayout() } }/>
          <Box width='20px'/>
          <LogOutButton/>
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
          <ShowGuide/>
        </HStack>
      </VStack>
    </>
  )
}

export default Design
