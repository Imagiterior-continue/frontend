import { Image } from '@chakra-ui/react'
import React from 'react'

interface Props {
  size: number
  color: 'white' | 'black'
}

function Logo ({ size, color }: Props): JSX.Element {
  return (
    <>
      <Image
        boxSize={`${size}px`}
        objectFit='cover'
        src={color === 'white' ? '/icon/icon_white.svg' : '/icon/icon_black.svg'}
      />
    </>
  )
}

export default Logo
