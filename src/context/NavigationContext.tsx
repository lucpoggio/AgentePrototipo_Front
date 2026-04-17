import React, { createContext, useContext, useState, useCallback } from 'react'
import type { NavigationContextType, Page } from '../types'

const NavigationContext = createContext<NavigationContextType | null>(null)

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePageState] = useState<Page>('home')

  const setActivePage = useCallback((page: Page) => {
    setActivePageState(page)
  }, [])

  return (
    <NavigationContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
