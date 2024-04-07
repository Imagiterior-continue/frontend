import React from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import LoadModels from './LoadModels'
import type { interiorType } from '../type/InteriorType'

interface Props {
  interiorsInfo: interiorType[]
}

function Viewport3D ({ interiorsInfo }: Props): JSX.Element {
  var nonEmptyInteriorsInfo: interiorType[] = []
  if (interiorsInfo.length !== 0) {
    nonEmptyInteriorsInfo = interiorsInfo.filter(item => item.fileName !== '')
  }
  const ModelList: JSX.Element[] = nonEmptyInteriorsInfo.map(({ fileName, position, rotate }: any, index: number) => {
    return (
      <LoadModels key={index} url={`${fileName}.gltf`} position={position} rotation={[0, -(rotate * 0.01745329), 0]}/>
    )
  })
  return (
    <Canvas style={{ width: '700px', height: '700px' }}>
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
