import React from 'react'
import { Text, Box } from '@chakra-ui/layout'
import { Popover, PopoverTrigger, PopoverContent, Image } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { FaQuestion } from 'react-icons/fa6'

function Guide (): JSX.Element {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button bg='rgba(0, 0, 0, 0)' _hover={{ bg: 'rgba(0, 0, 0, 0)' }} >
            <Box border='2px solid #000000' bg='white' rounded='full' padding='3px'>
              <FaQuestion size='25px' color='#000000' />
            </Box>
            <Text marginLeft='10px' fontSize='18px' transition='.1s' _hover={{ color: '#555555' }}>使い方を見る</Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent width='760px' margin='20px' rounded='5px' boxShadow='0px 0px 100px #555555' border='10px solid white' >
          <Image src='/guide/guide.png' objectFit='cover' />
        </PopoverContent>
      </Popover>
    </>
  )
}

export default Guide
