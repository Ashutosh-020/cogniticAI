import React from 'react'
import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
    id: number
    content: string
    isBot: boolean
    timestamp: Date
}

interface ChatMessagesProps {
    messages: Message[]
    isLoading: boolean
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
    return (
        <div className='space-y-8 pb-10 max-w-3xl mx-auto'>
            {messages.map((message, index) => (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    key={message.id} 
                    className={cn(
                        'flex w-full gap-4', 
                        message.isBot ? 'justify-start' : 'justify-end'
                    )}
                >
                    {/* Bot Avatar */}
                    {message.isBot && (
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                            <Bot className="w-5 h-5 text-blue-400" />
                        </div>
                    )}

                    <div className={cn(
                        'relative max-w-[85%]',
                        message.isBot 
                            ? 'text-gray-200' 
                            : 'bg-white/10 text-white px-5 py-3 rounded-2xl rounded-tr-sm border border-white/5'
                    )}>
                        {/* Rendering text with proper line breaks */}
                        <div className={cn('text-base leading-relaxed whitespace-pre-wrap', message.isBot ? 'pt-1.5' : '')}>
                            {message.content}
                        </div>
                    </div>
                </motion.div>
            ))}

            {isLoading && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex justify-start gap-4'
                >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className='flex items-center gap-2 pt-2.5'>
                        <div className="flex gap-1">
                            <motion.div className="w-1.5 h-1.5 bg-blue-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                            <motion.div className="w-1.5 h-1.5 bg-blue-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                            <motion.div className="w-1.5 h-1.5 bg-blue-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                        </div>
                        <span className='text-sm text-gray-500 font-medium ml-2'>Synthesizing meeting context...</span>
                    </div>
                </motion.div>
            )}
        </div>
    )
}