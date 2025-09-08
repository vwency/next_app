import React, { FC } from 'react'
import '@/styles/mainlayout/buttons/left/index.scss'
import ModalWithGallery from '../../content/MainModal/ModalWithData/ModalWithGallery'
import { useModal } from '@/hooks'

const LeftButtonMain: FC = () => {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <button className="main__button__left" onClick={openModal} type="button">
        Смотреть
      </button>

      <ModalWithGallery isOpen={isOpen} onClose={closeModal} />
    </>
  )
}

export default LeftButtonMain
