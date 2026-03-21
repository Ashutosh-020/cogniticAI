'use client'

import { Button } from '@/components/ui/button'
import { SignUpButton, useUser } from '@clerk/nextjs'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CTASection() {
    const { isSignedIn } = useUser()
    return (
        <section className="relative overflow-hidden bg-black py-24">
            {/* Ambient Background Glow to draw the eye to the CTA */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                
                {/* HEADING */}
                <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                    Ready to{' '}
                    <span className="bg-linear-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                        revolutionize your meetings?
                    </span>
                </h2>
                
                {/* SUBHEADING */}
                <p className="mx-auto mb-10 max-w-2xl bg-linear-to-r from-gray-300 to-gray-500 bg-clip-text text-lg text-transparent drop-shadow-[0_0_15px_rgba(156,163,175,0.3)]">
                    Join thousands of teams already using Cognitic to save time, stay organized, and never miss a detail.
                </p>

                {/* CTA BUTTONS (Matching Hero UI exactly) */}
                <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    {isSignedIn ? (
                        // FIX: Removed asChild, wrapped Button in Link, added responsive widths
                        <Link href="/dashboard" className="w-full sm:w-auto">
                            <Button 
                                size="lg" 
                                className="group flex h-14 w-xxs mx-auto cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-blue-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.98] sm:w-auto"
                            >
                                <span>Go to Dashboard</span>
                                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    ) : (
                        <SignUpButton mode="modal">
                            <Button 
                                size="lg" 
                                className="group flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-blue-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.98] sm:w-auto"
                            >
                                <span>Start Your Free Trial</span>
                                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </SignUpButton>
                    )}
                </div>

                {/* SOCIAL PROOF / REVIEWS */}
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                    <div className="flex items-center gap-1 drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <span className="text-sm font-medium text-gray-400">
                        4.9/5 from 56+ reviews
                    </span>
                </div>

            </div>
        </section>
    )
}

export default CTASection