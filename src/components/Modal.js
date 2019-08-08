import React from 'react'
import './Modal.css'

const Modal = ({ handleClose, show, children }) => {
  return (
    <div className={'modal ' + (show ? '' : ' hide')}>
      <section className='modal-main'>
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  )
}

export default Modal
