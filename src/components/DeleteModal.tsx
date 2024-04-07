import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from '@chakra-ui/modal'
import { VStack, HStack, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

interface Props {
  name: string
  isOpen: boolean
  onClose: () => void
}

function DeleteModal ({ name, isOpen, onClose }: Props): JSX.Element {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent width='300px'>
          <ModalCloseButton />
          <ModalBody>
          <VStack marginTop='40px' marginBottom='30px'>
            <Text height='25px' color='red' fontSize='23px' textAlign='center' fontFamily='Noto Sans JP'>{name}</Text>
            <Text height='25px' marginBottom='10px' fontSize='20px' textAlign='center' fontFamily='Noto Sans JP'>を削除しますか？</Text>
            <HStack marginTop='20px' spacing='30px'>
            <Button width='80px' bg='#1BCC17' rounded='full' onClick={onClose} fontFamily='Noto Sans JP'>
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
    </>
  )
}

export default DeleteModal
