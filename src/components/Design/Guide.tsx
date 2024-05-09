import React from 'react'
import { Text, Box } from '@chakra-ui/layout'
import { Popover, PopoverTrigger, PopoverContent, Image, useBreakpointValue } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { FaQuestion } from 'react-icons/fa6'

function Guide (): JSX.Element {
  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl' })
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button h='30px' bg='rgba(0, 0, 0, 0)' _hover={{ bg: 'rgba(0, 0, 0, 0)' }} >
            <Box border='2px solid #000000' bg='white' rounded='full' padding='3px'>
              <FaQuestion size='15px' color='#000000' />
            </Box>
            <Text marginLeft='10px' fontSize='14px' transition='.1s' _hover={{ color: '#555555' }}>使い方を見る</Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent width={{ base: '350px', md: '430px', lg: '500px' }} margin='20px' rounded='3px' boxShadow='0px 0px 100px #555555' border='10px solid white' >
          {breakpoint === '2xl' ? <Image src='/guide/guide_pc.png' objectFit='cover' /> : <Image src='/guide/guide_mobile.png' objectFit='cover' />}
        </PopoverContent>
      </Popover>
    </>
  )
}

export default Guide
