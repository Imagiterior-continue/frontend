import React from 'react'
import { VStack, HStack, Text, Spacer } from '@chakra-ui/layout'
import { Popover, PopoverTrigger, PopoverContent, PopoverBody } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { BsHandIndex } from 'react-icons/bs'
import { RiDragMove2Line } from 'react-icons/ri'
import { LuMousePointerClick } from 'react-icons/lu'

interface GuideType {
  type: 'choose' | 'drag' | 'click'
}

function GuidePart ({ type }: GuideType): JSX.Element {
  return (
    <>
      <HStack width='250px'>
        <Spacer/>
        { type === 'choose' ? <BsHandIndex size='32px' style={{ marginRight: '5px' }}/> : type === 'drag' ? <RiDragMove2Line size='35px'/> : <LuMousePointerClick size='35px'/>}
        <Text width='260px' textAlign='left' fontSize='20px'>{type === 'choose' ? '左の一覧から選択' : type === 'drag' ? 'ドラッグで移動' : 'クリックで回転'}</Text>
        <Spacer/>
      </HStack>
    </>
  )
}

function Guide (): JSX.Element {
  return (
    <>
      <VStack width='200px' height='110px'>
        <Popover>
          <PopoverTrigger>
            <Button bg='#E4D4D4'>?</Button>
          </PopoverTrigger>
          <PopoverContent width='760px' marginLeft={420} marginTop={5}>
            <PopoverBody>
              <Text width='100%' paddingBottom='7px' paddingLeft='10px' marginBottom='7px' borderBottom='3px solid #EEEEEE' textAlign='left' fontSize='20px'>操作方法
              </Text>
              <HStack>
                <GuidePart type='choose' />
                <GuidePart type='drag' />
                <GuidePart type='click' />
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </VStack>
    </>
  )
}

export default Guide
