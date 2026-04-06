import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

interface ChatSuggestionsProps {
    suggestions: string[]
    onSuggestionClick: (suggestion: string) => void
}

export default function ChatSuggestions({ suggestions, onSuggestionClick }: ChatSuggestionsProps) {
    
    // Explicitly typed as Variants to fix the TS error
    const container: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    }

    return (
        <div className='flex flex-col items-center justify-center h-full min-h-[60vh] max-w-3xl mx-auto'>
            
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='text-center mb-10'
            >
                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className='text-2xl font-bold text-white mb-3'>
                    How can I help with your meetings?
                </h2>
                <p className='text-gray-400 text-lg'>
                    I analyze your transcripts and action items to give you instant answers.
                </p>
            </motion.div>

            <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'
            >
                {suggestions.map((suggestion, index) => (
                    <motion.button
                        variants={item}
                        key={index}
                        onClick={() => onSuggestionClick(suggestion)}
                        className='group relative flex items-start gap-4 p-5 bg-[#0f1115] border border-gray-800 rounded-2xl hover:border-blue-500/50 hover:bg-[#12141a] transition-all duration-300 text-left cursor-pointer'
                    >
                        <div className='text-sm text-gray-300 group-hover:text-gray-100 leading-relaxed pr-6'>
                            "{suggestion}"
                        </div>
                        
                        <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </motion.button>
                ))}
            </motion.div>

        </div>
    )
}