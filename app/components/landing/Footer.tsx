import { Bot } from 'lucide-react'
import React from 'react'

function Footer() {
    return (
        <footer className='border-t border-gray-800 bg-black/80 backdrop-blur-md py-6'>
            <div className='max-w-6xl mx-auto px-4'>
                
                <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                    
                    {/* Logo */}
                    <div className='flex items-center space-x-3 group'>
                        <div className='w-9 h-9 bg-gray-800/80 border border-gray-700 rounded-lg flex items-center justify-center group-hover:border-blue-500/40 transition'>
                            <Bot className='w-5 h-5 text-gray-300 group-hover:text-blue-400 transition' />
                        </div>
                        <span className='text-xl font-semibold text-white tracking-tight'>
                            Cognitic
                        </span>
                    </div>

                    {/* Copyright */}
                    <div className='text-gray-500 text-sm text-center md:text-right'>
                        © {new Date().getFullYear()} Cognitic. Built for intelligent meetings.
                    </div>

                </div>

            </div>
        </footer>
    )
}

export default Footer