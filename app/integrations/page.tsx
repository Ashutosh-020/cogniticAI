'use client'

import React from 'react'
import { useIntegrations } from './hooks/useIntegrations'
import SetupForm from './components/SetupForm'
import IntegrationCard from './components/integrationCard'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRightLeft, MousePointerClick, CheckCircle2 } from 'lucide-react'

export default function Integrations() {
    const {
        integrations, loading, setupMode, setSetupMode, setupData,
        setSetupData, setupLoading, setSetupLoading, fetchIntegrations,
        fetchSetupData, handleConnect, handleDisconnect, handleSetupSubmit
    } = useIntegrations()

    // Container animation for staggered children
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    if (loading) {
        return (
            <div className='min-h-screen bg-black flex items-center justify-center p-6'>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='relative flex h-12 w-12 items-center justify-center'>
                        <div className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20'></div>
                        <Sparkles className='relative h-6 w-6 text-blue-500 animate-pulse' />
                    </div>
                    <div className='text-gray-400 font-medium tracking-wide'>Syncing Workspace...</div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-black p-6 md:p-12 font-sans'>
            <div className='max-w-6xl mx-auto'>
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mb-12'
                >
                    <h1 className='text-3xl md:text-4xl font-bold mb-3'>
                        <span className='bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent'>Workspace</span>{' '}
                        <span className='bg-linear-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent'>Integrations</span>
                    </h1>
                    <p className='text-gray-400 text-lg max-w-2xl'>
                        Connect your favorite tools to automatically route action items and insights directly from your meetings.
                    </p>
                    {/* Tip / Prerequisite Notice */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className='mt-4 flex items-start gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-yellow-200'
                    >
                    <div className='mt-0.5'>
                        <Sparkles className='w-4 h-4 text-yellow-400' />
                    </div>
                    <div>
                        <span className='font-medium text-yellow-300'>Before connecting:</span>{' '}
                        Make sure you already have an account and an active workspace/site on the selected platform (e.g., Jira, Trello, Asana). 
                        Without an existing workspace, the integration may fail during authentication.
                    </div>
                    </motion.div>
                </motion.div>

                {/* Setup Modal Overlay */}
                <AnimatePresence>
                    {setupMode && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
                        >
                            <motion.div 
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                className='bg-[#0f1115] border border-gray-800 shadow-2xl shadow-blue-900/10 rounded-2xl p-6 max-w-md w-full mx-4 relative overflow-hidden'
                            >
                                {/* Decorative modal glow */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-blue-500 rounded-b-full shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                                
                                <h2 className='text-xl font-semibold text-white mb-6 flex items-center gap-2'>
                                    Setup {setupMode.charAt(0).toUpperCase() + setupMode.slice(1)}
                                </h2>

                                <SetupForm
                                    platform={setupMode}
                                    data={setupData}
                                    onSubmit={handleSetupSubmit}
                                    onCancel={() => {
                                        setSetupMode(null)
                                        setSetupData(null)
                                        window.history.replaceState({}, '', '/integrations')
                                    }}
                                    loading={setupLoading}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Integrations Grid */}
                <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16'
                >
                    {integrations.map((integration) => (
                        <IntegrationCard
                            key={integration.platform}
                            integration={integration}
                            onConnect={handleConnect}
                            onDisconnect={handleDisconnect}
                            onSetup={(platform) => {
                                setSetupMode(platform)
                                fetchSetupData(platform)
                            }}
                        />
                    ))}
                </motion.div>

                {/* How it Works Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className='bg-[#0f1115] rounded-2xl p-8 border border-gray-800 shadow-lg relative overflow-hidden'
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

                    <h3 className='text-xl font-bold text-white mb-8'>Workflow Automation</h3>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='flex flex-col gap-3'>
                            <div className='w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center'>
                                <ArrowRightLeft className='w-5 h-5 text-blue-400' />
                            </div>
                            <h4 className='text-white font-medium'>1. Connect Tools</h4>
                            <p className='text-sm text-gray-400 leading-relaxed'>Authenticate and link your preferred project management and communication platforms above.</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center'>
                                <MousePointerClick className='w-5 h-5 text-purple-400' />
                            </div>
                            <h4 className='text-white font-medium'>2. Configure Destinations</h4>
                            <p className='text-sm text-gray-400 leading-relaxed'>Set up specific channels, boards, or projects where you want meeting action items to land.</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center'>
                                <CheckCircle2 className='w-5 h-5 text-green-400' />
                            </div>
                            <h4 className='text-white font-medium'>3. One-Click Sync</h4>
                            <p className='text-sm text-gray-400 leading-relaxed'>During or after meetings, hover over extracted action items and instantly push them to your tools.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}