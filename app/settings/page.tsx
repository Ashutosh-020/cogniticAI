'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignOutButton, useAuth, useUser } from '@clerk/nextjs'
import { Bot, LogOut, Save, Upload, User, Sparkles, ShieldAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Settings() {
    const { user } = useUser()
    const { userId } = useAuth()
    const [botName, setBotName] = useState('Cognitic Bot')
    const [botImageUrl, setBotImageUrl] = useState<string | null>(null)
    const [userPlan, setUserPlan] = useState('free')
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        if (userId) {
            fetchBotSettings()
        }
    }, [userId])

    const fetchBotSettings = async () => {
        try {
            const response = await fetch('/api/user/bot-settings')
            if (response.ok) {
                const data = await response.json()
                setBotName(data.botName || 'Cognitic Bot')
                setBotImageUrl(data.botImageUrl || null)
                setUserPlan(data.plan || 'free')
            }
        } catch (error) {
            console.error('error fetching bot settings:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleBotNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBotName(e.target.value)
        setHasChanges(true)
    }

    // TS Error 1 Fixed: Explicitly typed the event
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await fetch('/api/upload/bot-avatar', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (response.ok) {
                setBotImageUrl(data.url)
                setHasChanges(true)
            } else {
                console.error('image uploaded failed:', data.error)
            }
        } catch (error) {
            console.error('image uploaded failed:', error)
        } finally {
            setIsUploading(false)
        }
    }

    const saveBotSettings = async () => {
        setIsSaving(true)
        try {
            const response = await fetch('/api/user/bot-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    botName,
                    botImageUrl
                })
            })

            if (response.ok) {
                setHasChanges(false)
            }
        } catch (error) {
            console.error('error saving bot settings:', error)
        } finally {
            setIsSaving(false)
        }
    }

    const getPlanDisplayName = (plan: string) => {
        switch (plan.toLowerCase()) {
            case 'free': return 'Free Tier'
            case 'gold': return 'Gold Tier'
            case 'platinum': return 'Platinum Tier'
            case 'diamond': return 'Diamond Tier'
            default: return 'Invalid Plan'
        }
    }

    const getPlanColor = (plan: string) => {
        return plan.toLowerCase() === 'free'
            ? 'bg-gray-500/10 text-gray-400 border-gray-500/20'
            : 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
    }

    // TS Error 2 Fixed: Explicitly set type to Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }
    
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    }

    if (isLoading) {
        return (
            <div className='min-h-screen bg-black flex items-center justify-center p-6'>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='relative flex h-12 w-12 items-center justify-center'>
                        <div className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20'></div>
                        <Sparkles className='relative h-6 w-6 text-blue-500 animate-pulse' />
                    </div>
                    <div className='text-gray-400 font-medium tracking-wide'>Loading Settings...</div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-black p-6 md:p-12 font-sans'>
            <div className='max-w-3xl mx-auto'>
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mb-10'
                >
                    <h1 className='text-3xl md:text-4xl font-bold mb-3'>
                        <span className='bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent'>Workspace</span>{' '}
                        <span className='bg-linear-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent'>Settings</span>
                    </h1>
                    <p className='text-gray-400 text-lg'>
                        Manage your personal profile and customize your AI meeting assistant.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-8"
                >
                    {/* Profile Card */}
                    <motion.div variants={itemVariants} className='relative bg-[#0f1115] rounded-2xl p-6 border border-gray-800 shadow-xl overflow-hidden group'>
                        {/* Decorative background glow */}
                        <div className='absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-500/10 transition-colors duration-500'></div>
                        
                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10'>
                            <div className='flex items-center gap-5'>
                                <div className='w-16 h-16 rounded-2xl shrink-0 overflow-hidden ring-1 ring-white/10 bg-black/50 p-1'>
                                    {user?.imageUrl ? (
                                        <img src={user.imageUrl} alt="profile" className='w-full h-full rounded-xl object-cover' />
                                    ) : (
                                        <div className='w-full h-full bg-blue-500/10 rounded-xl flex items-center justify-center'>
                                            <User className='h-8 w-8 text-blue-400' />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h2 className='text-xl font-semibold text-white tracking-tight'>
                                        {user?.fullName || 'Cognitic User'}
                                    </h2>
                                    <p className='text-sm text-gray-400 mt-0.5'>
                                        {user?.primaryEmailAddress?.emailAddress || 'No email attached'}
                                    </p>
                                </div>
                            </div>
                            
                            <div className='flex flex-col items-start sm:items-end gap-2'>
                                <span className='text-xs font-semibold uppercase tracking-wider text-gray-500'>Current Plan</span>
                                <span className={cn(`text-xs font-medium px-3 py-1.5 rounded-full border`, getPlanColor(userPlan))}>
                                    {getPlanDisplayName(userPlan)}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bot Customization Card */}
                    <motion.div variants={itemVariants} className='bg-[#0f1115] rounded-2xl p-6 md:p-8 border border-gray-800 shadow-xl'>
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-800/50">
                            <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                <Bot className="w-5 h-5 text-purple-400" />
                            </div>
                            <h3 className='text-xl font-semibold text-white'>AI Assistant Customization</h3>
                        </div>

                        <div className='space-y-8'>
                            {/* Bot Name Input */}
                            <div>
                                <Label htmlFor='bot-name' className='block text-sm font-medium text-gray-300 mb-2'>
                                    Assistant Display Name
                                </Label>
                                <Input
                                    id='bot-name'
                                    type='text'
                                    value={botName}
                                    onChange={handleBotNameChange}
                                    placeholder='e.g. Cognitic AI'
                                    className='bg-black/50 border-gray-700 text-white placeholder:text-gray-600 focus-visible:ring-blue-500/50 h-11'
                                />
                                <p className='text-xs text-gray-500 mt-2'>This is the name your AI will use when joining meetings.</p>
                            </div>

                            {/* Bot Avatar Upload */}
                            <div>
                                <Label htmlFor='bot-image-upload' className='block text-sm font-medium text-gray-300 mb-3'>
                                    Assistant Avatar
                                </Label>
                                <div className='flex items-center gap-6'>
                                    <div className='relative w-17 h-17 bg-black/50 rounded-2xl border border-gray-700 flex items-center justify-center overflow-hidden shrink-0'>
                                        {isUploading && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-sm">
                                                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                            </div>
                                        )}
                                        {botImageUrl ? (
                                            <img src={botImageUrl} alt='Bot Avatar' className='w-full h-full object-cover' />
                                        ) : (
                                            <Bot className='h-8 w-8 text-gray-500' />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <Input
                                            type='file'
                                            id='bot-image-upload'
                                            accept='image/*'
                                            onChange={handleImageUpload}
                                            disabled={isUploading}
                                            className='hidden'
                                        />
                                        <Label
                                            htmlFor='bot-image-upload'
                                            className={cn(
                                                'inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 hover:text-white transition-all cursor-pointer font-medium text-sm',
                                                isUploading && 'opacity-50 cursor-not-allowed'
                                            )}
                                        >
                                            <Upload className='h-4 w-4' />
                                            {isUploading ? 'Uploading Image...' : 'Choose New Avatar'}
                                        </Label>
                                        <p className='text-xs text-gray-500 mt-2.5'>
                                            Recommended size: 256x256px. Supported formats: JPG, PNG.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button with Animation */}
                            <AnimatePresence>
                                {hasChanges && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <Button
                                            onClick={saveBotSettings}
                                            disabled={isSaving}
                                            className='w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-900/20'
                                        >
                                            {isSaving ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <Save className='h-4 w-4' />
                                            )}
                                            {isSaving ? 'Saving Configuration...' : 'Save Changes'}
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Danger Zone / Logout */}
                    <motion.div variants={itemVariants} className='pt-8'>
                        <div className="border border-red-900/30 bg-red-950/10 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <ShieldAlert className="w-5 h-5 text-red-500" />
                                <h3 className='text-lg font-semibold text-red-500'>Account Access</h3>
                            </div>
                            <p className="text-sm text-gray-400 mb-6">
                                Sign out of your Cognitic workspace. You will need to log back in to access your meeting intelligence and integrations.
                            </p>
                            <SignOutButton>
                                <Button
                                    variant='outline'
                                    className='bg-transparent border-red-900/50 text-red-800 hover:bg-red-500/10 hover:text-red-500 hover:border-red-800 transition-all rounded-xl px-6 cursor-pointer'
                                >
                                    <LogOut className='h-4 w-4 mr-2' />
                                    Sign Out Securely
                                </Button>
                            </SignOutButton>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    )
}