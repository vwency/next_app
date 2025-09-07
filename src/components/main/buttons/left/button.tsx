import React, { FC } from 'react'
import '@/styles/mainlayout/buttons/left/index.scss'
import ModalContent from '../../content/modal'
import { useModal } from '@/hooks'

const LeftButtonMain: FC = () => {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <button className="main__button__left" onClick={openModal} type="button">
        Смотреть
      </button>

      <ModalContent isOpen={isOpen} onClose={closeModal}>
        <h2 id="modal-title">Черное окно</h2>
        <p>Содержимое модального окна</p>
      </ModalContent>
    </>
  )
}

export default LeftButtonMain
