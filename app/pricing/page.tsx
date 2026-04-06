'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useUser } from '@clerk/nextjs'
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

const plans = [
    {
        id: 'gold',
        name: 'Gold',
        price: 35,
        priceId: 'price_1TJ0iVPINjV0PD26O1et6AyT',
        description: 'Perfect for people getting started',
        features: [
            '10 meetings per month',
            '30 AI chat messages per day',
            'Meeting transcripts and summaries',
            'Action items extraction',
            'Email Notifications'
        ],
        popular: false
    },
    {
        id: 'platinum',
        name: 'Platinum',
        price: 65,
        priceId: 'price_1TJ0jJPINjV0PD26U1YFJBYU',
        description: 'Perfect for people growing who need more power',
        features: [
            '30 meetings per month',
            '100 AI chat messages per day',
            'Meeting transcripts and summaries',
            'Action items extraction',
            'Email Notifications',
            'Priority Support'
        ],
        popular: true
    },
    {
        id: 'diamond',
        name: 'Diamond',
        price: 95,
        priceId: 'price_1TJ0kuPINjV0PD26q9OsBYYM',
        description: 'Perfect for people who need unlimited limits',
        features: [
            'Unlimited meetings per month',
            'Unlimited AI chat messages per day',
            'Meeting transcripts and summaries',
            'Action items extraction',
            'Email Notifications',
            'Priority Support'
        ],
        popular: false
    },
]

export default function Pricing() {
    const { user } = useUser()
    const [loading, setLoading] = useState<string | null>(null)

    const handleSubscribe = async (priceId: string, planName: string) => {
        if (!user) return

        setLoading(priceId)

        try {
            const response = await fetch('/api/stripe/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    priceId,
                    planName
                })
            })

            const data = await response.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error(data.error || 'Failed to create checkout session')
            }
        } catch (error) {
            console.error('subscription creation error:', error)
        } finally {
            setLoading(null)
        }
    }

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    }

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, ease: "easeOut" } 
        }
    }

    return (
        <div className='min-h-screen bg-black font-sans py-20 px-6'>
            <div className='max-w-6xl mx-auto'>
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='max-w-2xl mx-auto text-center mb-20'
                >
                    <h2 className='text-4xl md:text-5xl font-bold tracking-tight mb-6'>
                        <span className='text-white'>Choose Your </span>
                        <span className="bg-linear-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Subscription Plan
                        </span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Automatic summaries, action items, and intelligent insights for every meeting.
                        Scale your team's productivity without limits.
                    </p>
                </motion.div>

                {/* Pricing Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start pt-4' // Added pt-4 to prevent badge clipping at the top
                >
                    {plans.map((plan) => {
                        const isLoading = loading === plan.priceId

                        return (
                            <motion.div key={plan.id} variants={cardVariants} className="relative h-full flex flex-col group">
                                
                                {/* Fixed: Most Popular Badge is now OUTSIDE the Card component 
                                  so it doesn't get clipped by overflow-hidden
                                */}
                                {plan.popular && (
                                    <div className='absolute -top-5 inset-x-0 flex justify-center z-20'>
                                        <div className='flex items-center gap-1.5 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(37,99,235,0.6)] border border-blue-400/50'>
                                            <Sparkles className="w-3.5 h-3.5" />
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                {/* Ambient Glow strictly behind the card */}
                                {plan.popular && (
                                    <div className="absolute -inset-1 bg-blue-500/20 blur-2xl rounded-3xl -z-10 group-hover:bg-blue-500/30 transition-colors duration-500" />
                                )}

                                <Card
                                    className={cn(
                                        'relative flex flex-col h-full bg-[#0f1115] border transition-all duration-300',
                                        plan.popular 
                                            ? 'border-blue-500/50 bg-linear-to-b from-[#151923] to-[#0f1115]' // Richer gradient background for popular
                                            : 'border-gray-800 hover:border-gray-700 hover:bg-[#12141a]'
                                    )}
                                >
                                    <CardHeader className={cn('text-center pb-4 pt-8', plan.popular && 'pt-10')}>
                                        <CardTitle className='text-xl text-gray-200 mb-4 font-semibold tracking-wide'>
                                            {plan.name}
                                        </CardTitle>
                                        <div className='flex items-end justify-center gap-1'>
                                            <span className='font-bold text-5xl text-white tracking-tight'>${plan.price}</span>
                                            <span className='text-gray-500 mb-1.5 font-medium'>/mo</span>
                                        </div>
                                    </CardHeader>

                                    <CardDescription className='text-center w-10/12 mx-auto text-gray-400 text-sm h-10'>
                                        {plan.description}
                                    </CardDescription>

                                    <CardContent className='flex-1 mt-6'>
                                        <ul className='space-y-4'>
                                            {plan.features.map((feature, index) => (
                                                <li key={index} className='flex items-start gap-3'>
                                                    <div className={cn(
                                                        'mt-0.5 rounded-full p-0.5',
                                                        plan.popular ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-800 text-gray-400'
                                                    )}>
                                                        <CheckCircle2 className='shrink-0 h-4 w-4' />
                                                    </div>
                                                    <span className={cn(
                                                        'text-sm leading-tight pt-0.5',
                                                        plan.popular ? 'text-gray-200' : 'text-gray-400'
                                                    )}>
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>

                                    <CardFooter className="pt-6 pb-8">
                                        <Button
                                            className={cn(
                                                'w-full cursor-pointer h-12 rounded-xl font-semibold tracking-wide transition-all duration-300',
                                                plan.popular
                                                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:scale-[1.02]'
                                                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                            )}
                                            onClick={() => handleSubscribe(plan.priceId, plan.name)}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <Loader2 className='w-5 h-5 animate-spin' />
                                                    <span>Processing...</span>
                                                </div>
                                            ) : (
                                                `Subscribe to ${plan.name}`
                                            )}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )
                    })}
                </motion.div>
                
            </div>
        </div>
    )
}