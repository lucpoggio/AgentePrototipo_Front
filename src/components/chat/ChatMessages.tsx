import React, { useRef, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import MessageBubble from './MessageBubble'
import type { Message } from '../../types'

interface ChatMessagesProps {
  messages: Message[]
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const { theme } = useTheme()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  if (!messages || messages.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          background: theme.colors.background,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.colors.textMuted,
            fontSize: '14px',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <span>No hay mensajes aún</span>
          <span style={{ fontSize: '13px', opacity: 0.7 }}>
            Escribí tu primer mensaje para comenzar
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        background: theme.colors.background,
        display: 'flex',
        flexDirection: 'column',
      }}
      ref={scrollRef}
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isUser={message.is_user}
        />
      ))}
    </div>
  )
}

export default ChatMessages
