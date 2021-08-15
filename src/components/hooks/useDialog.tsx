import { useState } from 'react'
import { callAll } from '../../helpers/callAll'

interface Clickable {
  onClick?: () => void
}

interface Closable {
  onClose?: () => void
}

interface CommonToggleProps {
  'aria-controls': string
}

type A = Clickable & Closable

export function useDialog<T extends A>() {
  const [on, setOn] = useState(false)
  const show = () => setOn(true)
  const hide = () => setOn(false)
  const toggle = () => setOn(!on)

  const getToggleProps = (props: T = {} as T): T & CommonToggleProps => {
    return {
      ...props,
      'aria-controls': 'target',
      onClick: callAll(props.onClick, show),
    }
  }

  const getContainerProps = (props: T = {} as T): T & { hide: () => void } => ({
    ...props,
    hide,
    onClick: callAll(props.onClick, toggle),
    onClose: callAll(props.onClose, hide),
  })

  return { getContainerProps, getToggleProps, hide, on }
}
