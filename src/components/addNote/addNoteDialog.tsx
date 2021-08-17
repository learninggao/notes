import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

import { Modal } from '../modal/modal'

import './addNoteDialog.scss'

const noteSchema = yup.object({
  description: yup.string().notRequired(),
  level: yup.string().required(),
  noteType: yup.string().required(),
  title: yup.string().required(),
  url: yup.string().required(),
})

// type Note = yup.InferType<typeof noteSchema>
interface AddNoteDialogProps {
  getContainerProps: () => any
  hide: () => void
}

export const AddNoteDialog: React.FC<AddNoteDialogProps> = ({
  getContainerProps,
  hide,
}) => {
  return (
    <Modal title="New Note" className="add-note" {...getContainerProps()}>
      <Formik
        initialValues={{
          description: '',
          level: 'misc',
          noteType: 'link',
          title: '',
          url: '',
        }}
        validationSchema={noteSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          setSubmitting(false)
          hide()
        }}
      >
        {({ isSubmitting, values }) => {
          return (
            <Form>
              <div className="create-note">
                <div className="first-row">
                  <div className="control note-type">
                    <h3 className="note-label">Note Type</h3>
                    <div className="radio-controls">
                      <label className="radio">
                        <Field type="radio" name="noteType" value="link" />
                        Link
                      </label>
                      <label className="radio">
                        <Field type="radio" name="noteType" value="image" />
                        Image
                      </label>
                      <label className="radio">
                        <Field type="radio" name="noteType" value="code" />
                        Code
                      </label>
                      <label className="radio">
                        <Field type="radio" name="noteType" value="exercise" />
                        Exercise
                      </label>
                      <label className="radio">
                        <Field type="radio" name="noteType" value="snippet" />
                        Snippet
                      </label>
                    </div>
                  </div>

                  <div className="field inline">
                    <div className="control">
                      <label className="label">Level</label>
                      <div className="select">
                        <Field component="select" name="level">
                          <option value="misc">Misc</option>
                          <option value="basic">Basic</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <label className="label">Url</label>
                    <Field name="url" type="text" className="input" />
                    <span className="form-error">
                      <ErrorMessage className="form-error" name="url" />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">Title</label>
                    <Field name="title" type="text" className="input" />
                    <span className="form-error">
                      <ErrorMessage className="form-error" name="title" />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label htmlFor="" className="label">
                      Description
                    </label>
                    <Field
                      name="description"
                      component="textarea"
                      className="textarea"
                    />
                  </div>
                </div>
                <div className="form-control">
                  <button
                    className="button is-info"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </button>
                  <button className="button is-danger" onClick={hide}>
                    Cancel
                  </button>
                </div>
              </div>
              <pre>{JSON.stringify(values)}</pre>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}
