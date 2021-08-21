import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import cn from 'classnames'
import './tagBox.scss'
import { Portal } from '../portal/Portal'
import { useAppDispatch, useAppSelector } from '../../state/reduxHooks'
import { typeTag } from '../../state/reducers/tagReducer'
import {
  fetchAddExistingTagToNote,
  fetchAddNewTag,
  fetchRemoveTagFromNote,
} from '../../state/actions'

export interface TagBoxProps {
  currentTags: string[]
  noteId: number
}

export const TagBox: React.VFC<TagBoxProps> = ({
  currentTags = [],
  noteId,
}) => {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionBoxRef = useRef<HTMLDivElement>(null)
  const tagBoxRef = useRef<HTMLDivElement>(null)
  const [tag, setTag] = useState('')
  const [position, setPosition] = useState({ left: 0, top: 0, width: 0 })

  const dispatch = useAppDispatch()

  const filteredTags = useAppSelector((state) => state.tag.filteredList)

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      event.stopImmediatePropagation()
      if (
        !tagBoxRef.current?.contains(event.target as Node) &&
        !suggestionBoxRef.current?.contains(event.target as Node)
      ) {
        setFocused(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  useLayoutEffect(() => {
    if (!inputRef.current) return
    const { left, top, width, height } =
      inputRef.current.getBoundingClientRect()
    setPosition({ left, top: top + height + 5, width })
  }, [noteId, currentTags])

  return (
    <div className={cn('tag-box', { focused })} ref={tagBoxRef}>
      <div className="wrap">
        <div className="tags-wrap">
          {currentTags.map((tag) => (
            <button
              key={tag}
              className="content-tag"
              onClick={() => {
                dispatch(fetchRemoveTagFromNote({ noteId, tag }))
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        <input
          ref={inputRef}
          onFocus={() => {
            setFocused(true)
            dispatch(typeTag(''))
          }}
          value={tag}
          onChange={(evt) => {
            setTag(evt.target.value)
            dispatch(typeTag(evt.target.value))
          }}
          placeholder="Add tags..."
          className="tag-input"
        ></input>
        {focused && filteredTags.length > 0 && (
          <Portal>
            <div
              className="suggestion-box"
              style={{
                ...position,
                position: 'absolute',
              }}
              ref={suggestionBoxRef}
            >
              <ul>
                {filteredTags.map(([tag, bool]) =>
                  currentTags.includes(tag) ? null : (
                    <li
                      className="suggestion-item"
                      key={tag}
                      onClick={() => {
                        if (!bool) {
                          dispatch(fetchAddExistingTagToNote({ noteId, tag }))
                          setTag('')
                        } else {
                          dispatch(fetchAddNewTag({ noteId, tag }))
                          setTag('')
                        }
                      }}
                    >
                      <span className="name">{tag}</span>
                      {bool && <span className="misc">New Tag</span>}
                    </li>
                  )
                )}
              </ul>
            </div>
          </Portal>
        )}
      </div>
    </div>
  )
}
