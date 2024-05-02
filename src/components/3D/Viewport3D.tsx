import React from 'react'
import { OrbitControls, Environment, useEnvironment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import LoadModels from './LoadModels'
import type { furnitureType } from '../../type/furnitureType'

interface Props {
  furnitureList: furnitureType[]
}

function Viewport3D ({ furnitureList }: Props): JSX.Element {
  const ModelList: JSX.Element[] = furnitureList.map(({ fileName, position, rotation, size, imageSize }: any, index: number) => {
    return (
      <LoadModels key={index} url={`${fileName}.gltf`} position={position} rotation={[0, -(rotation * 0.01745329), 0]}/>
    )
  })
  const envMap = useEnvironment({ files: '/HDR/kloppenheim_07_puresky_1k.hdr' })
  return (
    <Canvas style={{ width: '700px', height: '700px' }}>
      <ambientLight />
      <OrbitControls />
      {ModelList}
      <LoadModels url={'floor.gltf'} position={[0, -0.5, 0]} rotation={[0, 0, 0]}/>
      { /* eslint-disable-next-line */ }
      <pointLight position={[10, 10, 10]} />
      <Environment map={envMap} blur={1.0} />
    </Canvas>
  )
}

export default Viewport3D
