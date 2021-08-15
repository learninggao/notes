import React from 'react'
import { createPortal } from 'react-dom'
import { usePortal } from '../hooks/portalHook'

export const Portal: React.FC = ({ children }) => {
  const target = usePortal()
  return createPortal(children, target)
}
