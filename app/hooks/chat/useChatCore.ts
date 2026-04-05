import { useUsage } from "@/app/contexts/UsageContext"
import { useState } from "react"

export interface ChatMessage {
    id: number
    content: string
    isBot: boolean
    timestamp: Date
}

interface UseChatCoreOptions {
    apiEndpoint: string
    getRequestBody: (input: string) => any
}

export function useChatCore({
    apiEndpoint,
    getRequestBody,
}: UseChatCoreOptions) {
    const [chatInput, setChatInput] = useState('')
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [showSuggestions, setShowSuggestions] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const { canChat, incrementChatUsage } = useUsage()

    const handleSendMessage = async () => {
        if (!chatInput.trim() || isLoading) {
            return
        }

        if (!canChat) {
            return
        }

        setShowSuggestions(false)
        setIsLoading(true)

        const currentInput = chatInput
        setChatInput('')

        setMessages((prev) => {
            const nextId = (prev.reduce((m, x) => Math.max(m, x.id), 0) || 0) + 1
            return [
                ...prev,
                {
                    id: nextId,
                    content: currentInput,
                    isBot: false,
                    timestamp: new Date(),
                },
            ]
        })

        const appendBot = (content: string) => {
            setMessages((prev) => {
                const nextId = (prev.reduce((m, x) => Math.max(m, x.id), 0) || 0) + 1
                return [
                    ...prev,
                    {
                        id: nextId,
                        content,
                        isBot: true,
                        timestamp: new Date(),
                    },
                ]
            })
        }

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(getRequestBody(currentInput))
            })

            const data = await response.json()

            if (response.ok) {
                appendBot(data.answer || data.response || '')
                void incrementChatUsage()
            } else {
                if (data.upgradeRequired) {
                    appendBot(
                        `${data.error} Upgrade to a pro plan to continue using this feature.`
                    )
                } else {
                    appendBot(
                        data.error || 'An error occurred while processing your request.'
                    )
                }
            }

        } catch (error) {
            console.error('chat error:', error)
            appendBot(
                'Could not connect to the server. Please check your connection and try again.'
            )
        } finally {
            setIsLoading(false)
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        if (!canChat) {
            return
        }

        setShowSuggestions(false)
        setChatInput(suggestion)
    }

    const handleInputChange = (value: string) => {
        setChatInput(value)

        if (value.length > 0 && showSuggestions) {
            setShowSuggestions(false)
        }
    }

    return {
        chatInput,
        setChatInput,
        messages,
        setMessages,
        showSuggestions,
        setShowSuggestions,
        isLoading,
        setIsLoading,
        handleSendMessage,
        handleSuggestionClick,
        handleInputChange,
        canChat
    }
}