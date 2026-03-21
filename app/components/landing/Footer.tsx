import { Bot } from 'lucide-react'
import React from 'react'

function Footer() {
    return (
        <footer className='border-t border-gray-800 bg-black/80 backdrop-blur-md py-6'>
            <div className='max-w-7xl mx-auto px-4'>
                
                <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                    
                    {/* Logo */}
                    <div className='flex items-center space-x-3 group'>
                        <span className='text-xl font-semibold text-gray-500 tracking-tight'>
                            Cognitic
                        </span>
                    </div>

                    {/* Copyright */}
                    <div className='text-gray-500 text-lg text-center md:text-right'>
                        © {new Date().getFullYear()} Cognitic. Built for intelligent meetings.
                    </div>

                </div>

            </div>
        </footer>
    )
}

export default Footer