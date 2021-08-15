import React from 'react'
import cn from 'classnames'
import './modal.scss'
import { Portal } from '../portal/Portal'
import { callAll } from '../../helpers/callAll'

export type ModalType = 'default' | 'confirm'

interface ModalProps {
  className?: string
  onClose?: () => void
  onClick?: () => void
  showFooter?: boolean
  title: string
}

export const Modal: React.FC<ModalProps> = ({
  children,
  className = '',
  onClick,
  onClose,
  showFooter = false,
  title,
}) => {
  return (
    <Portal>
      <div className="modal is-active screens">
        <div className="modal-background"></div>
        <div className={cn('modal-card', className)}>
          <header className="modal-card-head bulma-modal-head">
            <p className="modal-card-title">{title}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={onClose}
            ></button>
          </header>
          <section className="modal-card-body">{children}</section>
          {showFooter && (
            <section className="modal-card-foot">
              {onClick && (
                <button
                  className="button is-success is-light is-outlined"
                  onClick={callAll(onClick, onClose)}
                >
                  Confirm
                </button>
              )}
              {onClose && (
                <button
                  className="button is-danger is-light is-outlined"
                  onClick={onClose}
                >
                  Cancel
                </button>
              )}
            </section>
          )}
        </div>
      </div>
    </Portal>
  )
}
