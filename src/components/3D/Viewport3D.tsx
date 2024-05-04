import React from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import LoadModels from './LoadModels'
import type { furnitureType } from '../../type/furnitureType'
import { viewportSize } from '../../Data/viewportSize'

interface Props {
  furnitureList: furnitureType[]
}

function Viewport3D ({ furnitureList }: Props): JSX.Element {
  const ModelList: JSX.Element[] = furnitureList.map(({ fileName, position, rotation, size, imageSize }: any, index: number) => {
    return (
      <LoadModels key={index} url={`${fileName}.gltf`} position={position} rotation={[0, -(rotation * 0.01745329), 0]}/>
    )
  })
  return (
    <Canvas style={{ width: viewportSize, height: viewportSize }}>
        <OrbitControls />
        {ModelList}
        <LoadModels url={'floor.gltf'} position={[0, -0.5, 0]} rotation={[0, 0, 0]}/>
        { /* eslint-disable-next-line */ }
        <pointLight position={[10, 10, 10]} />
        <Environment preset='sunset' blur={0.7} background />
    </Canvas>
  )
}

export default Viewport3D
