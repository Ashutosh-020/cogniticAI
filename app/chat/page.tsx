'use client'

import React from 'react'
import useChatAll from './hooks/useChatAll'
import ChatSuggestions from './components/ChatSuggestions'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import { motion } from 'framer-motion'

export default function Chat() {
    const {
        chatInput,
        setChatInput,
        messages,
        showSuggestions,
        isLoading,
        chatSuggestions,
        handleSendMessage,
        handleSuggestionClick,
        handleInputChange
    } = useChatAll()

    return (
        <div className='h-screen bg-black flex flex-col relative overflow-hidden font-sans'>
            {/* Subtle ambient background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-75 bg-blue-500/10 blur-[120px] pointer-events-none rounded-full" />

            <div className='flex-1 flex flex-col max-w-4xl mx-auto w-full relative z-10'>
                <div className='flex-1 p-4 sm:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent'>
                    {messages.length === 0 && showSuggestions ? (
                        <ChatSuggestions
                            suggestions={chatSuggestions}
                            onSuggestionClick={handleSuggestionClick}
                        />
                    ) : (
                        <ChatMessages
                            messages={messages}
                            isLoading={isLoading}
                        />
                    )}
                </div>

                <div className="bg-linear-to-t from-black via-black/90 to-transparent pt-6 pb-4 px-4 sm:px-6">
                    <ChatInput
                        chatInput={chatInput}
                        onInputChange={handleInputChange}
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    )
}