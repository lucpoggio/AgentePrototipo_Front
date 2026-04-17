import React, { useState, useCallback } from 'react'
import { useTheme } from '../../context/ThemeContext'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
  const { primaryColor, theme } = useTheme()
  const [value, setValue] = useState('')

  const handleSend = useCallback(() => {
    if (!value.trim() || disabled) return
    onSend(value.trim())
    setValue('')
  }, [value, disabled, onSend])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <style>{
        `.chat-input-textarea::placeholder {
          color: ${theme.colors.textMuted};
          opacity: 1;
        }`
      }</style>
      {disabled && (
        <div
          style={{
            fontSize: '12px',
            color: theme.colors.textMuted,
            marginBottom: '6px',
            fontStyle: 'italic',
          }}
        >
          Escribiendo...
        </div>
      )}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
        <textarea
          className="chat-input-textarea"
          style={{
            flex: 1,
            resize: 'none',
            padding: '12px 14px',
            borderRadius: '14px',
            border: `1px solid ${theme.colors.border}`,
            fontSize: '14px',
            fontFamily: "'Inter', 'SF Pro Display', sans-serif",
            minHeight: '24px',
            maxHeight: '120px',
            outline: 'none',
            color: theme.colors.textPrimary,
            background: theme.colors.inputBackground,
            lineHeight: '1.5',
          }}
          placeholder="Escribí un mensaje..."
          rows={1}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Escribir mensaje"
        />
        <button
          type="button"
          style={{
            padding: '12px 22px',
            background: disabled ? theme.colors.border : primaryColor,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontFamily: "'Inter', 'SF Pro Display', sans-serif",
            transition: 'opacity 0.15s ease, background 0.15s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            opacity: disabled ? 0.7 : 1,
          }}
          onClick={handleSend}
          disabled={disabled}
        >
          Enviar
        </button>
      </div>
    </div>
  )
}

export default ChatInput
