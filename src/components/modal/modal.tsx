import React from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'
import { usePortal } from '../hooks/portalHook'
import './modal.scss'

export type ModalType = 'default' | 'confirm'

interface ModalProps {
  className?: string
  footer?: JSX.Element
  handleClose: () => void
  handleConfirm?: () => boolean
  title: string
}

export const Modal: React.FC<ModalProps> = ({
  children,
  className = '',
  handleClose,
  title,
  footer,
}) => {
  const target = usePortal()

  return createPortal(
    <div className="modal is-active screens">
      <div className="modal-background"></div>
      <div className={cn('modal-card', className)}>
        <header className="modal-card-head bulma-modal-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleClose}
          ></button>
        </header>
        <section className="modal-card-body">{children}</section>
        {footer}
      </div>
    </div>,
    target
  )
}
