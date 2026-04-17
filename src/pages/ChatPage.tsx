import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'
import { TOKENS } from '../shared/theme'
import { API_URL } from '../shared/config'
import type { Chat } from '../types'
import useChats from '../hooks/useChats'
import { ChatMessages, ChatInput } from '../components/chat'

const ChatPage: React.FC = () => {
  const { primaryColor, theme } = useTheme()
  const { chats, loading, error, fetchChats, sendMessage } = useChats(API_URL)
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [isSending, setIsSending] = useState<boolean>(false)

  useEffect(() => {
    fetchChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedChat = useMemo(
    () => chats.find((c) => c.id === selectedChatId) || null,
    [chats, selectedChatId]
  )

  const formatTime = useCallback((iso: string | undefined): string => {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }, [])

  const handleSend = useCallback(
    async (messageText: string) => {
      if (!messageText.trim()) return

      setIsSending(true)
      try {
        const result = await sendMessage(messageText, selectedChatId)

        // If no chat was selected, select the newly created chat
        if (!selectedChatId && result?.chat?.id) {
          setSelectedChatId(result.chat.id)
        }
      } catch (err) {
        console.error('Error sending message:', err)
      } finally {
        setIsSending(false)
      }
    },
    [selectedChatId, sendMessage]
  )

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 0px)', background: theme.colors.background }}>
      {/* Left Panel - Recent Conversations */}
      <div
        style={{
          width: TOKENS.leftPanelWidth,
          background: theme.colors.surface,
          borderRight: `1px solid ${theme.colors.border}`,
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: '18px 16px',
            borderBottom: `1px solid ${theme.colors.borderLight}`,
            fontSize: '13px',
            fontWeight: '600',
            color: theme.colors.textPrimary,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Conversaciones Recientes
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          {loading && (
            <div style={{ padding: '16px', fontSize: '13px', color: theme.colors.textMuted }}>
              Cargando...
            </div>
          )}
          {!loading && chats.length === 0 && (
            <div style={{ padding: '16px', fontSize: '13px', color: theme.colors.textMuted }}>
              No hay conversaciones
            </div>
          )}
          {!loading &&
            chats.map((chat: Chat) => {
              const isActive = chat.id === selectedChatId
              return (
                <button
                  key={chat.id}
                  type="button"
                  style={{
                    padding: '12px 14px',
                    borderRadius: TOKENS.borderRadius.medium,
                    cursor: 'pointer',
                    marginBottom: '4px',
                    background: isActive ? `${primaryColor}12` : 'transparent',
                    color: isActive ? primaryColor : theme.colors.textSecondary,
                    transition: 'background 0.15s ease',
                    border: 'none',
                    textAlign: 'left',
                    width: '100%',
                    fontFamily: "'Inter', 'SF Pro Display', sans-serif",
                    fontSize: '14px',
                  }}
                  onClick={() => setSelectedChatId(chat.id)}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginBottom: '2px',
                    }}
                  >
                    {chat.title || 'Sin título'}
                  </div>
                  <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>
                    {formatTime(chat.updated_at)}
                  </div>
                </button>
              )
            })}
        </div>
      </div>

      {/* Center Panel - Chat Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          background: theme.colors.surface,
        }}
      >
        {error && (
          <div
            style={{
              padding: '12px 20px',
              background: theme.colors.error,
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '500',
              borderBottom: `1px solid ${theme.colors.error}`,
            }}
          >
            {error}
          </div>
        )}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: `1px solid ${theme.colors.borderLight}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '15px', fontWeight: '600', color: theme.colors.textPrimary }}>
              {selectedChat ? selectedChat.title || 'Sin título' : 'Chat'}
            </div>
          </div>
          <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>
            {selectedChat
              ? `${selectedChat.messages?.length || 0} mensajes`
              : 'Seleccioná una conversación'}
          </div>
        </div>

        {!selectedChat ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.textMuted,
              fontSize: '14px',
              background: theme.colors.background,
            }}
          >
            Seleccioná una conversación o empezá una nueva
          </div>
        ) : (
          <ChatMessages messages={selectedChat.messages} />
        )}

        <div
          style={{
            padding: '16px 20px',
            borderTop: `1px solid ${theme.colors.borderLight}`,
            background: theme.colors.surface,
          }}
        >
          <ChatInput onSend={handleSend} disabled={isSending} />
        </div>
      </div>

      {/* Right Panel - Context Panel */}
      <div
        style={{
          width: TOKENS.rightPanelWidth,
          background: theme.colors.surface,
          borderLeft: `1px solid ${theme.colors.border}`,
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: '18px 16px',
            borderBottom: `1px solid ${theme.colors.borderLight}`,
            fontSize: '13px',
            fontWeight: '600',
            color: theme.colors.textPrimary,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Contexto
        </div>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              background: theme.colors.background,
              borderRadius: TOKENS.borderRadius.large,
              padding: '16px',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: theme.colors.textPrimary,
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>●</span> Live Execution
            </div>
            <div style={{ fontSize: '13px', color: theme.colors.textSecondary, lineHeight: '1.5' }}>
              Esta sección mostrará información en tiempo real sobre la ejecución de agentes y
              herramientas vinculadas al chat.
            </div>
          </div>

          <div
            style={{
              background: theme.colors.background,
              borderRadius: TOKENS.borderRadius.large,
              padding: '16px',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: theme.colors.textPrimary,
                marginBottom: '4px',
              }}
            >
              Estadísticas
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: `1px solid ${theme.colors.border}`,
              }}
            >
              <span style={{ fontSize: '13px', color: theme.colors.textSecondary }}>Mensajes</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: theme.colors.textPrimary }}>
                {selectedChat?.messages?.length || 0}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: `1px solid ${theme.colors.border}`,
              }}
            >
              <span style={{ fontSize: '13px', color: theme.colors.textSecondary }}>Agentes</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: theme.colors.textPrimary }}>
                —
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: `1px solid ${theme.colors.border}`,
              }}
            >
              <span style={{ fontSize: '13px', color: theme.colors.textSecondary }}>
                Herramientas
              </span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: theme.colors.textPrimary }}>
                —
              </span>
            </div>
          </div>

          <div
            style={{
              background: theme.colors.background,
              borderRadius: TOKENS.borderRadius.large,
              padding: '16px',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: theme.colors.textPrimary,
                marginBottom: '8px',
              }}
            >
              Notas
            </div>
            <div style={{ fontSize: '13px', color: theme.colors.textSecondary, lineHeight: '1.5' }}>
              El panel derecho se completará con datos contextuales en futuras iteraciones.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
