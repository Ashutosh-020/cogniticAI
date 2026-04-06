import { useUsage } from '@/app/contexts/UsageContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Sparkles, AlertCircle } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
    chatInput: string
    onInputChange: (value: string) => void
    onSendMessage: () => void
    isLoading: boolean
}

export default function ChatInput({
    chatInput,
    onInputChange,
    onSendMessage,
    isLoading
}: ChatInputProps) {
    const { canChat, usage, limits } = useUsage()

    return (
        <div className='w-full max-w-3xl mx-auto'>
            {!canChat && usage && (
                <div className='mb-4 p-3 bg-red-950/30 border border-red-900/50 rounded-xl flex items-center justify-center gap-2 backdrop-blur-sm shadow-lg'>
                    <AlertCircle className='w-4 h-4 text-red-500' />
                    <p className='text-sm text-red-400'>
                        Daily limit reached ({usage.chatMessagesToday}/{limits.chatMessages} messages).
                        <a href="/pricing" className='text-white font-medium hover:underline ml-1'>Upgrade Plan</a>
                    </p>
                </div>
            )}

            <div className={cn(
                'relative flex items-center bg-[#0f1115] border rounded-2xl shadow-xl transition-all duration-300',
                chatInput.length > 0 ? 'border-blue-500/50 shadow-blue-900/10' : 'border-gray-800'
            )}>
                <div className="pl-4 pr-2 flex items-center pointer-events-none">
                    <Sparkles className={cn("w-5 h-5 transition-colors duration-300", chatInput.length > 0 ? "text-blue-500" : "text-gray-600")} />
                </div>
                
                <Input
                    type='text'
                    value={chatInput}
                    onChange={e => onInputChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
                    placeholder={canChat ? 'Ask about action items, deadlines, or meeting insights...' : 'Daily chat limit reached.'}
                    className='flex-1 border-0 bg-transparent text-gray-200 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 px-2 h-14 text-base'
                    disabled={isLoading || !canChat}
                />

                <div className="pr-2 cursor-pointer">
                    <Button
                        onClick={onSendMessage}
                        disabled={isLoading || !canChat || chatInput.trim() === ''}
                        size="icon"
                        className={cn(
                            'h-10 w-10 ml-2 rounded-xl transition-all duration-300',
                            chatInput.trim().length > 0 && canChat && !isLoading
                                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/20'
                                : 'bg-white/5 text-gray-300 hover:bg-white/5'
                        )}
                    >
                        <Send className='h-4 w-4 ml-0.5' />
                    </Button>
                </div>
            </div>
            
            <div className="text-center mt-3">
                <p className="text-xs text-gray-600">Cognitic AI can make mistakes. Consider verifying important meeting details.</p>
            </div>
        </div>
    )
}