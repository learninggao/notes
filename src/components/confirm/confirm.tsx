import React from 'react'
import { useDialog } from '../hooks/useDialog'
import { Modal } from '../modal/modal'

interface ConfirmProps {
  message?: string
}

export const Confirm: React.VFC<ConfirmProps> = ({ message = '' }) => {
  const { on, getToggleProps, getContainerProps } = useDialog()

  return (
    <>
      <button className="button" {...getToggleProps({})}>
        Show
      </button>
      {on && (
        <Modal title="hello" {...getContainerProps({})}>
          <p>{message || 'Are you sure?'}</p>
        </Modal>
      )}
    </>
  )
}
