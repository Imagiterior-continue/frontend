import React, { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

interface Props {
  url: string
  position: number[]
  rotation: number[]
}

function LoadModels ({ url, position, rotation, ...props }: Props): JSX.Element {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/') // DRACOのデコーダーのパスを設定

  const { scene } = useLoader(GLTFLoader, `/models/${url}`, loader => {
    loader.setDRACOLoader(dracoLoader)
  })
  const copiedScene = useMemo(() => scene.clone(), [scene])

  return (
    <group>
      { /* eslint-disable-next-line */ }
      <primitive object={copiedScene} position={position} rotation={rotation} />
    </group>
  )
}

export default LoadModels
