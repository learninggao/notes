import React, { useEffect } from 'react'
import cn from 'classnames'
import './home.scss'
import { useAppDispatch, useAppSelector } from '../../../state/reduxHooks'
import { fetchNotesForTopic, fetchTopics } from '../../../state/actions'
import { AddTopic } from '../../addTopic/addTopic'
import { AddNoteTrigger } from '../../addNote/addNoteTrigger'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { topics, activeTopicId, activeNoteId } = useAppSelector((state) => ({
    activeNoteId: state.note.activeNoteId,
    activeTopicId: state.topic.activeTopicId,
    topics: state.topic.list,
  }))

  const { notes } = useAppSelector((state) => ({
    notes: state.note.list,
  }))

  useEffect(() => {
    dispatch(fetchTopics())
  }, [dispatch])

  useEffect(() => {
    if (activeTopicId > 0) {
      dispatch(fetchNotesForTopic(activeTopicId))
    }
  }, [activeTopicId, dispatch])

  return (
    <div className="container">
      <div className="main-wrapper">
        <div className="side-navigationpanel">
          <div className="side-nav-wrapper">
            <div className="main-head">head </div>
            <div className="main-area">
              <div className="oreo-section topic">
                <div className="oreo-body">
                  <div className="oreo-item-wrapper">
                    {topics.map((topic) => (
                      <div
                        key={topic.id}
                        className={cn('oreo-item topic', {
                          active: topic.id === activeTopicId,
                        })}
                      >
                        {topic.topicName}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="oreo-foot">
                  <div className="foot-item-wrapper">
                    <AddTopic />
                  </div>
                </div>
              </div>
              <div className="oreo-section notes">
                <div className="oreo-body">
                  <div className="oreo-item-wrapper">
                    {notes.map((note) => (
                      <div
                        key={note.id}
                        className={cn('oreo-item note', {
                          active: note.id === activeNoteId,
                        })}
                      >
                        <div className="note-item">
                          <div className="primary-info">
                            <span className="note-title">{note.title}</span>
                            <span className="note-type">{note.type}</span>
                          </div>
                          <div className="secondary-info">
                            <div className="note-description">
                              {note.description}
                            </div>
                            <div className="tags-wrapper">
                              {note.tags.length > 0 &&
                                note.tags.map((tag, index) => (
                                  <a key={index} className="tag-item">
                                    {`#${tag}`}
                                  </a>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="oreo-foot">
                  <div className="foot-item-wrapper">
                    <AddNoteTrigger />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
