import React, { useEffect } from 'react'
import './home.scss'
import { useAppDispatch, useAppSelector } from '../../../state/reduxHooks'
import { fetchNotesForTopic, fetchTopics } from '../../../state/actions'
import { AddTopic } from '../../addTopic/addTopic'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { topics, activeTopicId } = useAppSelector((state) => ({
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
                      <div key={topic.id} className="oreo-item">
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
                      <div key={note.id} className="oreo-item">
                        {note.title}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="oreo-foot">
                  <div className="foot-item-wrapper">
                    <div className="oreo-item">Add Topic</div>
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
