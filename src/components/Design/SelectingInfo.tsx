import React from 'react'
import { HStack, VStack, Text, Button, Spacer, Box, Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react'
import { Image } from '@chakra-ui/image'
import { FaRegTrashAlt } from 'react-icons/fa'
import type { furnitureType } from '../../type/furnitureType'
import { themeColor } from '../../Data/color'

interface Props {
  furniture: furnitureType | null
  onClick: () => void
}

function Content ({ furniture, onClick }: Props): JSX.Element {
  return (
    <VStack w='280px' h='150px'>
      <Text w='100%' paddingLeft='10px' fontSize='16px' borderLeft={`7px solid ${themeColor.accent}`}>選択中の家具</Text>
      <HStack bg={themeColor.main} rounded='5px' paddingX='15px' w='280px' h='130px' position='relative'>
        { furniture === null
          ? <Text w='100%' textAlign='center' fontSize='20px'>未選択</Text>
          : (
              <>
                <VStack spacing='10px' w='150px' position='absolute'>
                  <Text textAlign='center' fontSize='18px'>{furniture.name}</Text>
                  <Button h='30px' bg='rgba(0, 0, 0, 0)' _hover={{ bg: 'rgba(0, 0, 0, 0.08)' }} border='2px solid #FF2929' rounded='5px' color='#FF2929' onClick={onClick}>
                    <FaRegTrashAlt size='20px' style={{ marginRight: '7px' }} />
                    削除
                  </Button>
                </VStack>
                <Spacer />
                <Image boxSize='100px' src={`/image_3D/${furniture.fileName}_3D.png`} />
              </>
            )
        }
      </HStack>
    </VStack>
  )
}

function SelectingFurniture ({ furniture, onClick }: Props): JSX.Element {
  return (
    <>
      <Box display={{ base: 'none', '2xl': 'block' }}>
        <Content furniture={furniture} onClick={onClick}/>
      </Box>
      <Popover>
        <PopoverTrigger>
            <Button display={{ base: 'block', '2xl': 'none' }} bg={themeColor.accent} _hover={{ bg: themeColor.accent }} boxSize='50px' padding='5px' rounded='5px' boxShadow='xl'>
              <FaRegTrashAlt size='40px' color={themeColor.accentString}/>
            </Button>
          </PopoverTrigger>
          <PopoverContent display={{ base: 'block', '2xl': 'none' }} padding='10px' boxShadow='xl'>
            <Content furniture={furniture} onClick={onClick}/>
          </PopoverContent>
      </Popover>
    </>
  )
}

export default SelectingFurniture
