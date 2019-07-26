import React from 'react'

import Modal from './Modal'

class ModalController extends React.Component {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true })
  };

  hideModal = () => {
    this.setState({ show: false })
  };

  render () {
    return (
      <React.Fragment>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <h1>Modal Title</h1>
          <p>Line 1</p>
          <p>Line 2</p>
        </Modal>
        <button type='button' onClick={this.showModal}>
          About Site
        </button>
      </React.Fragment>
    )
  }
}

export default ModalController
