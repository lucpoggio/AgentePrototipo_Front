import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import type { Message } from '../../types'

interface MessageBubbleProps {
  message: Message
  isUser: boolean
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser }) => {
  const { theme } = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '12px',
      }}
    >
      <div>
        <div
          style={{
            maxWidth: '70%',
            padding: '12px 16px',
            borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
            background: isUser ? theme.colors.chatUserBg : theme.colors.chatAiBg,
            color: isUser ? '#FFFFFF' : theme.colors.textPrimary,
            border: isUser ? 'none' : `1px solid ${theme.colors.chatAiBorder}`,
            fontSize: '14px',
            lineHeight: '1.5',
            wordWrap: 'break-word',
            boxShadow: isUser ? '0 2px 8px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          {message.text}
        </div>
        <div
          style={{
            fontSize: '11px',
            color: theme.colors.textMuted,
            marginTop: '4px',
            textAlign: isUser ? 'right' : 'left',
            padding: isUser ? '0 4px 0 0' : '0 0 0 4px',
          }}
        >
          {message.time}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
