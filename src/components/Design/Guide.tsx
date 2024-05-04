import React from 'react'
import { Text, Spacer, Box } from '@chakra-ui/layout'
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, OrderedList, ListItem } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { FaQuestion } from 'react-icons/fa6'

interface GuideType {
  text: string
}

function GuidePart ({ text }: GuideType): JSX.Element {
  return (
    <>
      <ListItem>
        <Spacer/>
        <Text textAlign='left' fontSize='20px'>{text}</Text>
        <Spacer/>
      </ListItem>
    </>
  )
}

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
        <PopoverContent width='760px' marginLeft={420} marginTop={5}>
          <PopoverBody>
            <OrderedList>
              <GuidePart text='家具をクリックして配置' />
              <GuidePart text='ドラッグで移動・クリックで回転' />
              <GuidePart text='名前を入力して保存' />
            </OrderedList>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default Guide
