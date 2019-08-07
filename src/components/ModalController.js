import React, { useState } from 'react'
import Modal from './Modal'

const ModalController = () => {
  const [show, setShow] = useState(false)

  const showModal = () => {
    setShow(true)
  }

  const hideModal = () => {
    setShow(false)
  }

  return (
    <React.Fragment>
      <Modal show={show} handleClose={hideModal}>
        <h1>Modal Title</h1>
        <p>Line 1</p>
        <p>Line 2</p>
      </Modal>
      <button type='button' onClick={showModal}>
          About Site
      </button>
    </React.Fragment>
  )
}

export default ModalController
