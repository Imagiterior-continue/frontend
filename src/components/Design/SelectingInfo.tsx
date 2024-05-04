import React from 'react'
import { HStack, VStack, Text, Button, Spacer } from '@chakra-ui/react'
import { Image } from '@chakra-ui/image'
import { FaRegTrashAlt } from 'react-icons/fa'
import type { furnitureType } from '../../type/furnitureType'
import { themeColor } from '../../Data/color'

interface Props {
  furniture: furnitureType | null
  onClick: () => void
}

function SelectingFurniture ({ furniture, onClick }: Props): JSX.Element {
  return (
    <VStack w='330px' h='200px'>
      <div style={{ width: '100%' }}>
        <Text paddingLeft='10px' fontSize='18px' borderLeft={`7px solid ${themeColor.accent}`}>選択中の家具</Text>
      </div>
      <HStack bg={themeColor.main} rounded='5px' paddingX='15px' w='330px' h='150px' position='relative'>
        { furniture === null
          ? <Text w='100%' textAlign='center' fontSize='20px'>未選択</Text>
          : (
              <>
                <VStack spacing='10px' w='150px' position='absolute'>
                  <Text textAlign='center' fontSize='18px'>{furniture.name}</Text>
                  <Button h='35px' bg='rgba(0, 0, 0, 0)' _hover={{ bg: 'rgba(0, 0, 0, 0.08)' }} border='3px solid #FF2929' rounded='5px' color='#FF2929' onClick={onClick}>
                    <FaRegTrashAlt size='20px' style={{ marginRight: '7px' }} />
                    削除
                  </Button>
                </VStack>
                <Spacer />
                <Image boxSize='140px' src={`/image_3D/${furniture.fileName}_3D.png`} />
              </>
            )
        }
      </HStack>
    </VStack>
  )
}

export default SelectingFurniture
