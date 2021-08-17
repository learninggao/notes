import React from 'react'
import { useDialog } from '../hooks/useDialog'
import { AddNoteDialog } from './addNoteDialog'

export const AddNoteTrigger = () => {
  const { hide, on, getToggleProps, getContainerProps } = useDialog()
  return (
    <>
      <div className="oreo-item" {...getToggleProps()}>
        Add Note
      </div>
      {on && (
        <AddNoteDialog getContainerProps={getContainerProps} hide={hide} />
      )}
    </>
  )
}
