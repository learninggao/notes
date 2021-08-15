import React, { useRef, useState } from 'react'
import { fetchCreateTopic } from '../../state/actions'
import { useAppDispatch } from '../../state/reduxHooks'
import { useDialog } from '../hooks/useDialog'
import { Modal } from '../modal/modal'
import './addTopic.scss'

export const AddTopic = () => {
  const dispatch = useAppDispatch()
  const { on, getToggleProps, getContainerProps, hide } = useDialog()
  const [errors, setErrors] = useState([] as string[])
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmit = () => {
    const value = inputRef.current?.value
    if (!value) {
      setErrors(['A value is needed'])
      return false
    } else {
      dispatch(fetchCreateTopic(value))
      hide()
    }
  }

  return (
    <>
      <div className="oreo-item" {...getToggleProps()}>
        Add Topic
      </div>

      {on && (
        <Modal
          className="add-topic"
          title="Topic Name"
          showFooter
          {...getContainerProps({
            onClick: onSubmit,
            onClose: () => setErrors([]),
          })}
        >
          <div className="field">
            <label className="label">Enter a topic name:</label>
            <div className="control">
              <input type="text" className="input" ref={inputRef} />
            </div>
            {errors.length !== 0 && (
              <p className="error-message">There is something wrong</p>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}
