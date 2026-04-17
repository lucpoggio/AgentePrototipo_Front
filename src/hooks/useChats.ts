import { useState, useEffect, useCallback } from 'react'
import type { Chat, Message } from '../types'

export interface UseChatsReturn {
  chats: Chat[]
  loading: boolean
  error: string | null
  fetchChats: () => Promise<void>
  createChat: (message: string) => Promise<Chat | null>
  deleteChat: (chatId: string) => Promise<void>
  sendMessage: (message: string, chatId?: string | null) => Promise<{ chat: Chat; response: Message } | null>
}

function useChats(apiUrl: string): UseChatsReturn {
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchChats = useCallback(async () => {
    setError(null)
    try {
      const res = await fetch(`${apiUrl}/chats`)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      setChats(data.chats || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error fetching chats'
      console.error('Error fetching chats:', message)
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [apiUrl])

  const createChat = useCallback(async (message: string): Promise<Chat | null> => {
    setError(null)
    try {
      const res = await fetch(`${apiUrl}/chats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      await fetchChats()
      return data.chat as Chat
    } catch (err) {
      const messageText = err instanceof Error ? err.message : 'Unknown error creating chat'
      console.error('Error creating chat:', messageText)
      setError(messageText)
      return null
    }
  }, [apiUrl, fetchChats])

  const deleteChat = useCallback(async (chatId: string): Promise<void> => {
    setError(null)
    try {
      const res = await fetch(`${apiUrl}/chats/${chatId}`, { method: 'DELETE' })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      await fetchChats()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error deleting chat'
      console.error('Error deleting chat:', message)
      setError(message)
    }
  }, [apiUrl, fetchChats])

  const sendMessage = useCallback(async (
    message: string,
    chatId: string | null = null
  ): Promise<{ chat: Chat; response: Message } | null> => {
    setError(null)
    try {
      const res = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, chat_id: chatId }),
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      await fetchChats()
      return data as { chat: Chat; response: Message }
    } catch (err) {
      const messageText = err instanceof Error ? err.message : 'Unknown error sending message'
      console.error('Error sending message:', messageText)
      setError(messageText)
      return null
    }
  }, [apiUrl, fetchChats])

  useEffect(() => {
    const controller = new AbortController()
    fetchChats()
    return () => controller.abort()
  }, [fetchChats])

  return { chats, loading, error, fetchChats, createChat, deleteChat, sendMessage }
}

export default useChats
