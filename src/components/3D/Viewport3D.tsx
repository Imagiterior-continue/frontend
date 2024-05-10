import React, { Suspense } from 'react'
import { OrbitControls, PerspectiveCamera, ContactShadows, useProgress, Html } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import LoadModels from './LoadModels'
import type { furnitureType } from '../../type/furnitureType'
import { Box, VStack, Text } from '@chakra-ui/react'
import { themeColor } from '../../Data/color'

interface Props {
  furnitureList: furnitureType[]
  boxSize: number
}

function Loading (): JSX.Element {
  const { progress } = useProgress()
  return (
    <Html center>
      <VStack>
        <Box w='200px' h='15px' bg={`linear-gradient(90deg, ${themeColor.accent} 0 ${Math.floor(progress)}%, ${themeColor.main} ${Math.floor(progress)}% 100%)`} rounded='3px' />
        <Text style={{ color: themeColor.accent }}>{`${Math.floor(progress)}%`}</Text>
      </VStack>
    </Html>
  )
}

function Viewport3D ({ furnitureList, boxSize }: Props): JSX.Element {
  const ModelList: JSX.Element[] = furnitureList.map(({ fileName, position, rotation, size, imageSize }: any, index: number) => {
    return (
      <LoadModels key={index} url={`${fileName}.glb`} position={position} rotation={[0, -(rotation * 0.01745329), 0]}/>
    )
  })
  return (
    <Box boxSize={`${boxSize}px`}>
      <Canvas>
        <Suspense fallback={<Loading />}>
          { /* eslint-disable-next-line */ }
          <ambientLight intensity={1.1} />
          { /* eslint-disable-next-line */ }
          <directionalLight position={[0, 5, 0]} intensity={1} />
          <PerspectiveCamera makeDefault position={[0, 7, 5]} zoom={1.6} />
          <ContactShadows opacity={0.2} scale={15} blur={0} far={10} resolution={150} position={[0, -0.49, 0]} />
          <OrbitControls />
          {ModelList}
          <LoadModels url={'floor.glb'} position={[0, -0.5, 0]} rotation={[0, 0, 0]}/>
          { /* eslint-disable-next-line */ }
          <pointLight position={[10, 10, 10]} />
        </Suspense>
      </Canvas>
    </Box>
  )
}

export default Viewport3D
