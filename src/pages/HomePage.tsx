import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { TOKENS } from '../shared/theme'

const HomePage: React.FC = () => {
  const { primaryColor, theme } = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 240px)',
        padding: '40px',
      }}
    >
      <div
        style={{
          background: theme.colors.surface,
          borderRadius: TOKENS.borderRadius.xl,
          padding: '60px',
          maxWidth: '520px',
          width: '100%',
          textAlign: 'center',
          boxShadow: TOKENS.shadows.hover,
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: TOKENS.borderRadius.xl,
            background: `${primaryColor}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            fontSize: '32px',
          }}
        >
          <span aria-hidden="true">✨</span>
        </div>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: theme.colors.textPrimary,
            marginBottom: '12px',
            letterSpacing: '-0.5px',
          }}
        >
          Bienvenido a la demo
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: theme.colors.textSecondary,
            lineHeight: '1.6',
            marginBottom: '32px',
          }}
        >
          Explorá las funcionalidades de Demo. Navegá entre las secciones para probar el chat, la
          personalización y más.
        </p>
        <div
          style={{
            width: '48px',
            height: '4px',
            borderRadius: '2px',
            background: primaryColor,
            margin: '0 auto',
          }}
        />
        <p
          style={{
            marginTop: '32px',
            fontSize: '13px',
            color: theme.colors.textMuted,
          }}
        >
          Seleccioná una opción del menú lateral para comenzar
        </p>
      </div>
    </div>
  )
}

export default HomePage
