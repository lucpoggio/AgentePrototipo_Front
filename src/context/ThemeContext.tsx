import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import type { ThemeContextType } from '../types'
import { lightTheme, darkTheme } from '../shared/themes'

const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [primaryColor, setPrimaryColorState] = useState<string>('#5E5CE6')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const stored = localStorage.getItem('app-primary-color')
    if (stored) {
      setPrimaryColorState(stored)
    }
  }, [])

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme-mode')
    if (storedTheme === 'dark') {
      setIsDarkMode(true)
    }
  }, [])

  const setPrimaryColor = useCallback((color: string) => {
    setPrimaryColorState(color)
    localStorage.setItem('app-primary-color', color)
  }, [])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const next = !prev
      localStorage.setItem('theme-mode', next ? 'dark' : 'light')
      return next
    })
  }, [])

  const theme = useMemo(() => {
    const baseTheme = isDarkMode ? darkTheme : lightTheme
    return {
      colors: {
        ...baseTheme.colors,
        primary: primaryColor,
        chatUserBg: primaryColor,
      },
    }
  }, [isDarkMode, primaryColor])

  return (
    <ThemeContext.Provider value={{ primaryColor, setPrimaryColor, isDarkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
