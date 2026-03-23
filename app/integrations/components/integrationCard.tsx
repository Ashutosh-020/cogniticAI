import React from 'react'
import { Integration } from '../hooks/useIntegrations'
import Image from 'next/image'
import { CheckCircle2, ExternalLink, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface IntegrationCardProps {
    integration: Integration
    onConnect: (platform: string) => void
    onDisconnect: (platform: string) => void
    onSetup: (platform: string) => void
}

const itemVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.4, ease: "easeOut" } 
    }
}

export default function IntegrationCard({
    integration,
    onConnect,
    onDisconnect,
    onSetup
}: IntegrationCardProps) {
    return (
        <motion.div 
            variants={itemVariant}
            className={cn(
                'group relative flex flex-col justify-between rounded-xl p-6 transition-all duration-300',
                'bg-[#0f1115] border hover:-translate-y-1 hover:shadow-xl',
                integration.connected 
                    ? 'border-gray-700 hover:border-blue-500/50 hover:shadow-blue-900/20' 
                    : 'border-gray-800 hover:border-gray-600'
            )}
        >
            {/* Subtle top glow if connected */}
            {integration.connected && (
                <div className="absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}

            <div>
                <div className='flex items-start justify-between mb-5'>
                    <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 relative shrink-0 bg-white/5 p-2 rounded-xl border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300'>
                            <Image
                                src={integration.logo}
                                alt={`${integration.name} logo`}
                                fill
                                className='object-contain p-1.5'
                            />
                        </div>
                        <div>
                            <h3 className='font-semibold text-white text-lg tracking-tight'>{integration.name}</h3>
                            {integration.connected && (
                                <div className='flex items-center gap-1.5 mt-1'>
                                    <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                                    <span className='text-xs font-medium text-green-400'>Connected</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <p className='text-sm text-gray-400 mb-6 leading-relaxed'>
                    {integration.description}
                </p>

                {integration.connected && integration.platform !== 'google-calendar' && (integration.boardName || integration.projectName || integration.channelName) && (
                    <div className='mb-6 p-3 bg-black/40 border border-gray-800 rounded-lg backdrop-blur-sm'>
                        <div className='text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold'>Routing Destination</div>
                        <div className='text-sm font-medium text-blue-100 flex items-center gap-2'>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {integration.platform === 'slack' && integration.channelName && `#${integration.channelName}`}
                            {integration.platform === 'trello' && integration.boardName}
                            {integration.platform === 'jira' && integration.projectName}
                            {integration.platform === 'asana' && integration.projectName}
                        </div>
                    </div>
                )}

                {integration.connected && integration.platform === 'google-calendar' && (
                    <div className='mb-6 p-3 bg-black/40 border border-gray-800 rounded-lg backdrop-blur-sm'>
                        <div className='text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold'>Status</div>
                        <div className='text-sm font-medium text-blue-100 flex items-center gap-2'>
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Live Auto-Sync Enabled
                        </div>
                    </div>
                )}
            </div>

            <div className='flex gap-3 pt-4 border-t border-gray-800/50 mt-auto'>
                {integration.connected ? (
                    <>
                        <Button
                            variant="outline"
                            onClick={() => onDisconnect(integration.platform)}
                            className='flex-1 border-gray-700 bg-transparent text-gray-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all duration-300 cursor-pointer'
                            type='button'
                        >
                            Disconnect
                        </Button>
                        {integration.platform !== 'google-calendar' && (
                            <Button
                                variant="outline"
                                onClick={() => onSetup(integration.platform)}
                                className='px-4 border-gray-700 bg-transparent text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300 cursor-pointer'
                                type='button'
                            >
                                <Settings className='h-4 w-4' />
                            </Button>
                        )}
                    </>
                ) : (
                    <Button
                        onClick={() => onConnect(integration.platform)}
                        className='w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 font-semibold cursor-pointer'
                        type='button'
                    >
                        Connect Workspace
                        <ExternalLink className='h-4 w-4 opacity-70' />
                    </Button>
                )}
            </div>
        </motion.div>
    )
}