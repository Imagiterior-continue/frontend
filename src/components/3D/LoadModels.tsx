import React, { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface Props {
  url: string
  position: number[]
  rotation: number[]
}

function LoadModels ({ url, position, rotation, ...props }: Props): JSX.Element {
  const { scene } = useLoader(GLTFLoader, `/models/${url}`)
  const copiedScene = useMemo(() => scene.clone(), [scene])

  return (
    <group>
      { /* eslint-disable-next-line */ }
      <primitive object={copiedScene} position={position} rotation={rotation} />
    </group>
  )
}

export default LoadModels
