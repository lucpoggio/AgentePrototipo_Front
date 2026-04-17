import React from 'react'
import Sidebar from './Sidebar'
import { useTheme } from '../context/ThemeContext'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode, toggleDarkMode, theme } = useTheme()

  const styles = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
      background: theme.colors.background,
      fontFamily: "'Inter', 'SF Pro Display', sans-serif",
    },
    mainContent: {
      flex: 1,
      marginLeft: '240px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    header: {
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 24px',
      background: theme.colors.surface,
      borderBottom: `1px solid ${theme.colors.border}`,
    },
    toggleButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: `1px solid ${theme.colors.border}`,
      background: theme.colors.surfaceHover,
      color: theme.colors.textPrimary,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      transition: 'all 0.2s ease',
    },
    content: {
      flex: 1,
      overflow: 'auto',
    },
  } as const

  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.mainContent}>
        <header style={styles.header}>
          <button
            style={styles.toggleButton}
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </header>
        <main style={styles.content}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
