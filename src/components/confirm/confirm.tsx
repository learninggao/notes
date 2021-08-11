import React from 'react'
import { Modal } from '../modal/modal'

interface ConfirmProps {
  message?: string
  confirmHandler: () => void
  cancelHandler: () => void
}

export const Confirm: React.VFC<ConfirmProps> = ({
  message = '',
  cancelHandler,
  confirmHandler,
}) => {
  return (
    <Modal
      className="confirm"
      title="Confirm"
      handleClose={cancelHandler}
      footer={
        <section className="modal-card-foot">
          <button
            className="button is-success is-light is-outlined"
            onClick={() => {
              confirmHandler()
              cancelHandler()
            }}
          >
            Confirm
          </button>
          <button
            className="button is-danger is-light is-outlined"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </section>
      }
    >
      <p>{message || 'Are you sure?'}</p>
    </Modal>
  )
}
