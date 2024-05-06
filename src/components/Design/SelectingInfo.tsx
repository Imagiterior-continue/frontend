import React from 'react'
import { useDisclosure, HStack, VStack, Text, Button, Spacer, Box, Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from '@chakra-ui/modal'
import { Image } from '@chakra-ui/image'
import { FaRegTrashAlt } from 'react-icons/fa'
import type { furnitureType } from '../../type/furnitureType'
import { themeColor } from '../../Data/color'

interface Props {
  furniture: furnitureType | null
  onClick: () => void
}

interface ModalProps {
  name: string
  isOpen: boolean
  onClick: () => void
  onClose: () => void
}

function Content ({ furniture, onClick }: Props): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <VStack w='280px' h='150px'>
      <Text w='100%' paddingLeft='10px' fontSize='16px' borderLeft={`7px solid ${themeColor.accent}`}>選択中の家具</Text>
      <HStack bg={themeColor.main} rounded='3px' paddingX='15px' w='280px' h='130px' position='relative'>
        { furniture === null
          ? <Text w='100%' textAlign='center' fontSize='20px'>未選択</Text>
          : (
              <>
                <VStack spacing='10px' w='150px' position='absolute'>
                  <Text textAlign='center' fontSize='18px'>{furniture.name}</Text>
                  <Button h='30px' bg='rgba(0, 0, 0, 0)' _hover={{ bg: 'rgba(0, 0, 0, 0.08)' }} border='2px solid #FF2929' rounded='3px' color='#FF2929' onClick={onOpen}>
                    <FaRegTrashAlt size='20px' style={{ marginRight: '7px' }} />
                    削除
                  </Button>
                  <ModalOpen name={furniture.name} isOpen={isOpen} onClick={onClick} onClose={onClose} />
                </VStack>
                <Spacer />
                <Image boxSize='100px' src={`/image_3D/${furniture.fileName}_3D.png`} />
              </>
            )
        }
      </HStack>
    </VStack >
  )
}

function ModalOpen ({ name, isOpen, onClick, onClose }: ModalProps): JSX.Element {
  const handleClick: () => void = () => {
    onClick()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width='300px'>
        <ModalCloseButton />
        <ModalBody>
          <VStack marginTop='40px' marginBottom='30px'>
            <Text height='25px' color='red' fontSize='23px' textAlign='center' fontFamily='Noto Sans JP'>{name}</Text>
            <Text height='25px' marginBottom='10px' fontSize='20px' textAlign='center' fontFamily='Noto Sans JP'>を削除しますか？</Text>
            <HStack marginTop='20px' spacing='30px'>
              <Button width='80px' bg='#1BCC17' rounded='full' onClick={handleClick} fontFamily='Noto Sans JP'>
                はい
              </Button>
              <Button width='80px' bg='#FC3A51' rounded='full' onClick={onClose} fontFamily='Noto Sans JP'>
                いいえ
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
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
            <Button display={{ base: 'block', '2xl': 'none' }} bg={themeColor.main} _hover={{ bg: themeColor.main }} boxSize='40px' padding='5px' rounded='3px' boxShadow='xl'>
              <FaRegTrashAlt size='30px' color={themeColor.mainString} />
            </Button>
          </PopoverTrigger>
          <PopoverContent display={{ base: 'block', '2xl': 'none' }} rounded='3px' padding='10px' boxShadow='xl'>
            <Content furniture={furniture} onClick={onClick} />
          </PopoverContent>
      </Popover>
    </>
  )
}

export default SelectingFurniture
