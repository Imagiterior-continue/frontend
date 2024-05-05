import React from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import LoadModels from './LoadModels'
import type { furnitureType } from '../../type/furnitureType'
import { Box } from '@chakra-ui/react'

interface Props {
  furnitureList: furnitureType[]
  boxSize: number
}

function Viewport3D ({ furnitureList, boxSize }: Props): JSX.Element {
  const ModelList: JSX.Element[] = furnitureList.map(({ fileName, position, rotation, size, imageSize }: any, index: number) => {
    return (
      <LoadModels key={index} url={`${fileName}.gltf`} position={position} rotation={[0, -(rotation * 0.01745329), 0]}/>
    )
  })
  return (
    <Box boxSize={`${boxSize}px`}>
      <Canvas>
        <OrbitControls />
        {ModelList}
        <LoadModels url={'floor.gltf'} position={[0, -0.5, 0]} rotation={[0, 0, 0]}/>
        { /* eslint-disable-next-line */ }
        <pointLight position={[10, 10, 10]} />
        <Environment preset='sunset' blur={0.7} background />
      </Canvas>
    </Box>
  )
}

export default Viewport3D
