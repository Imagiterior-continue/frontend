import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, Button, Text, ModalCloseButton } from '@chakra-ui/react'

interface ConfirmLeaveModalProps {
  isOpen: boolean
  onClose: () => void
  onClick: () => void
}

const ConfirmLeaveModal: React.FC<ConfirmLeaveModalProps> = ({ isOpen, onClose, onClick }) => {
  const onConfirm = (): void => {
    onClose()
    onClick()
  }
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth='600px'>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" alignItems="left" justifyContent="center" padding='20px'>
            <Text fontSize="lg" marginTop="15px">このページを離れると、まだ保存していない変更が失われます。</Text>
            <Text fontSize="lg">続行してもよろしいですか？</Text>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
            いいえ
            </Button>
            <Button colorScheme='red' onClick={onConfirm}>
            はい
            </Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
    </>
  )
}

export default ConfirmLeaveModal
