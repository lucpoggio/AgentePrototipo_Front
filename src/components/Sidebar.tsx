import React, { useCallback } from 'react'
import { useNavigation } from '../context/NavigationContext'
import { useTheme } from '../context/ThemeContext'
import { TOKENS } from '../shared/theme'
import type { Page } from '../types'

const getStyles = (theme: ReturnType<typeof useTheme>['theme']) => ({
  sidebar: {
    width: TOKENS.sidebarWidth,
    background: theme.colors.surface,
    borderRight: `1px solid ${theme.colors.border}`,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 100,
  },
  logoArea: {
    padding: '24px 20px 20px',
    borderBottom: `1px solid ${theme.colors.borderLight}`,
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: (primaryColor: string) => ({
    width: '32px',
    height: '32px',
    background: primaryColor,
    borderRadius: TOKENS.borderRadius.small,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: '#FFFFFF',
  }),
  logoText: {
    fontSize: '16px',
    fontWeight: '600',
    color: theme.colors.textPrimary,
    letterSpacing: '-0.2px',
  },
  logoSubtitle: {
    fontSize: '10px',
    fontWeight: '600',
    color: theme.colors.textMuted,
    letterSpacing: '1px',
    marginTop: '2px',
    marginLeft: '42px',
  },
  navSection: {
    flex: 1,
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  navItem: (isActive: boolean, primaryColor: string) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 14px',
    borderRadius: TOKENS.borderRadius.medium,
    cursor: 'pointer',
    transition: 'background 0.15s ease',
    background: isActive ? `${primaryColor}12` : 'transparent',
    color: isActive ? primaryColor : theme.colors.textSecondary,
    fontSize: '14px',
    fontWeight: isActive ? '600' : '500',
    fontFamily: "'Inter', 'SF Pro Display', sans-serif",
    border: 'none',
    textAlign: 'left',
    width: '100%',
  } as React.CSSProperties),
  navItemHover: {
    background: theme.colors.surfaceHover,
  },
  navIcon: {
    fontSize: '18px',
    width: '24px',
    textAlign: 'center',
    lineHeight: 1,
  },
  bottomSection: {
    padding: '16px 12px 24px',
    borderTop: `1px solid ${theme.colors.borderLight}`,
  },
  newChatBtn: (primaryColor: string) => ({
    width: '100%',
    padding: '12px 16px',
    background: primaryColor,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: TOKENS.borderRadius.medium,
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: "'Inter', 'SF Pro Display', sans-serif",
    transition: 'opacity 0.15s ease',
  }),
} as const)

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: 'home', label: 'Inicio', icon: '🏠' },
  { id: 'chat', label: 'Chat', icon: '💬' },
  { id: 'customization', label: 'Personalización', icon: '⚙️' },
]

const Sidebar: React.FC = () => {
  const { activePage, setActivePage } = useNavigation()
  const { primaryColor, theme } = useTheme()
  const styles = getStyles(theme)

  const handleNavClick = useCallback((page: Page) => {
    setActivePage(page)
  }, [setActivePage])

  const handleNewChat = useCallback(() => {
    setActivePage('chat')
  }, [setActivePage])

  return (
    <aside style={styles.sidebar} aria-label="Navegación principal">
      <div style={styles.logoArea}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon(primaryColor)}>◆</div>
          <span style={styles.logoText}>Demo</span>
        </div>
        <div style={styles.logoSubtitle}>AI ENTERPRISE</div>
      </div>

      <nav style={styles.navSection}>
        {navItems.map((item) => {
          const isActive = activePage === item.id
          return (
            <button
              key={item.id}
              type="button"
              style={styles.navItem(isActive, primaryColor)}
              onClick={() => handleNavClick(item.id)}
              aria-current={isActive ? 'page' : undefined}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = theme.colors.surfaceHover
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div style={styles.bottomSection}>
        <button
          type="button"
          style={styles.newChatBtn(primaryColor)}
          onClick={handleNewChat}
        >
          <span>+</span>
          <span>New Chat</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
