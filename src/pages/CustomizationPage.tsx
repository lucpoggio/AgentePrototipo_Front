import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { TOKENS } from '../shared/theme'

interface PredefinedColor {
  name: string
  value: string
}

const predefinedColors: PredefinedColor[] = [
  { name: 'Violeta', value: '#5E5CE6' },
  { name: 'Azul', value: '#007AFF' },
  { name: 'Verde', value: '#34C759' },
  { name: 'Naranja', value: '#FF9500' },
  { name: 'Rojo', value: '#FF3B30' },
  { name: 'Rosa', value: '#FF2D55' },
]

const CustomizationPage: React.FC = () => {
  const { primaryColor, setPrimaryColor, isDarkMode, theme } = useTheme()

  const isPredefined = predefinedColors.some(
    (c) => c.value.toLowerCase() === primaryColor.toLowerCase()
  )

  return (
    <div style={{ padding: '40px', maxWidth: '720px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: theme.colors.textPrimary,
            marginBottom: '6px',
            letterSpacing: '-0.3px',
          }}
        >
          Personalización
        </h1>
        <p style={{ fontSize: '15px', color: theme.colors.textSecondary }}>
          Configurá el color principal de tu espacio de trabajo
        </p>
      </div>

      <div
        style={{
          background: theme.colors.surface,
          borderRadius: TOKENS.borderRadius.xl,
          padding: '28px',
          boxShadow: TOKENS.shadows.card,
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: theme.colors.textPrimary,
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Color Principal
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: primaryColor,
              border: `3px solid ${theme.colors.surface}`,
              boxShadow: `0 0 0 1px ${theme.colors.border}`,
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: theme.colors.textPrimary,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                letterSpacing: '0.5px',
              }}
            >
              {primaryColor.toUpperCase()}
            </div>
            <div style={{ fontSize: '13px', color: theme.colors.textMuted, marginTop: '2px' }}>
              Color seleccionado
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          {predefinedColors.map((color: PredefinedColor) => {
            const isSelected = primaryColor.toLowerCase() === color.value.toLowerCase()
            return (
              <button
                key={color.value}
                type="button"
                title={color.name}
                aria-label="Seleccionar color predefinido"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: color.value,
                  cursor: 'pointer',
                  border: isSelected
                    ? `3px solid ${primaryColor}`
                    : `3px solid ${theme.colors.surface}`,
                  boxShadow: isSelected
                    ? `0 0 0 2px ${primaryColor}40`
                    : `0 0 0 1px ${theme.colors.border}`,
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                  padding: 0,
                }}
                onClick={() => setPrimaryColor(color.value)}
              />
            )
          })}

          <button
            type="button"
            style={{
              position: 'relative',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              cursor: 'pointer',
              border: `3px dashed ${theme.colors.textMuted}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: theme.colors.textMuted,
              transition: 'all 0.15s ease',
              flexShrink: 0,
              overflow: 'hidden',
              background: 'transparent',
              padding: 0,
            }}
            title="Personalizado"
          >
            {!isPredefined && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: primaryColor,
                }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>+</span>
            <input
              type="color"
              aria-label="Selector de color personalizado"
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: 'pointer',
                width: '100%',
                height: '100%',
              }}
              value={primaryColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrimaryColor(e.target.value)}
            />
          </button>
        </div>

        <div
          style={{
            marginTop: '24px',
            padding: '14px 16px',
            background: theme.colors.background,
            borderRadius: TOKENS.borderRadius.medium,
            fontSize: '13px',
            color: theme.colors.textSecondary,
            lineHeight: '1.5',
            borderLeftWidth: '3px',
            borderLeftStyle: 'solid',
            borderLeftColor: primaryColor,
          }}
        >
          El color seleccionado se aplicará a botones, elementos activos y acentos en toda la
          aplicación.
        </div>

        <div
          style={{
            marginTop: '24px',
            padding: '14px 16px',
            background: theme.colors.background,
            borderRadius: TOKENS.borderRadius.medium,
            fontSize: '13px',
            color: theme.colors.textSecondary,
            lineHeight: '1.5',
            borderLeftWidth: '3px',
            borderLeftStyle: 'solid',
            borderLeftColor: primaryColor,
          }}
        >
          <strong style={{ color: theme.colors.textPrimary }}>Modo actual:</strong>{' '}
          {isDarkMode ? 'Oscuro' : 'Claro'}
        </div>
      </div>
    </div>
  )
}

export default CustomizationPage
