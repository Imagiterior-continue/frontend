import { Image } from '@chakra-ui/react'
import React from 'react'

interface Props {
  size: number
}

function Logo ({ size }: Props): JSX.Element {
  return (
    <>
      <Image
        boxSize={`${size}px`}
        objectFit='cover'
        src='/icon.png'
      />
    </>
  )
}

export default Logo
