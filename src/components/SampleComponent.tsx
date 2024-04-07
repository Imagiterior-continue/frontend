import React from 'react'
import { Button } from '@chakra-ui/button'
// このコンポーネントは見本です。クリックされるとコンソールにメッセージが表示されます。

interface Props {
  text: string
  message: string
}

function SampleComponent ({ text, message }: Props): JSX.Element {
  return (
    <>
      <Button
        onClick={() => { console.log(message) }}
      >
        { text }
      </Button>
    </>
  )
}

export default SampleComponent
