import React from 'react'
import { OrbitControls, Environment, useEnvironment, PerspectiveCamera } from '@react-three/drei'
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
  const envMap = useEnvironment({ files: '/HDR/kloppenheim_07_puresky_1k.hdr' })
  return (
    <Box boxSize={`${boxSize}px`}>
      <Canvas>
        <ambientLight />
        <PerspectiveCamera makeDefault position={[0, 7, 5]} zoom={1.6} />
        <OrbitControls />
        {ModelList}
        <LoadModels url={'floor.gltf'} position={[0, -0.5, 0]} rotation={[0, 0, 0]}/>
        { /* eslint-disable-next-line */ }
        <pointLight position={[10, 10, 10]} />
        <Environment map={envMap} blur={1.0} />
      </Canvas>
    </Box>
  )
}

export default Viewport3D
