import { Bot, Twitter, Github, Linkedin } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

function Footer() {
    return (
        <footer className="bg-black border-t border-gray-900 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6 xl:col-span-1">
                        <Link href="/" className="flex items-center space-x-3 group w-fit">
                            <span className="text-2xl font-semibold text-gray-300 tracking-tight">
                                Cognitic
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                            An AI-powered meeting assistant built for intelligent, distraction-free team collaborations.
                        </p>
                        <div className="flex space-x-5 pt-2">
                            <a href="https://www.linkedin.com/in/ashutosh-dubey-cs22/" className="text-gray-600 hover:text-gray-400 transition-colors">
                                <span className="sr-only">Twitter</span>
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="https://github.com/Ashutosh-020" className="text-gray-600 hover:text-gray-400 transition-colors">
                                <span className="sr-only">GitHub</span>
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-medium text-gray-300 tracking-wider">Platform</h3>
                                <ul role="list" className="mt-4 space-y-3">
                                    <li>
                                        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                                            Dashboard
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-medium text-gray-300 tracking-wider">Support</h3>
                                <ul role="list" className="mt-4 space-y-3">
                                    <li>
                                        <Link href="mailto:bey.ashutosh@gmail.com" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-1 md:gap-8">
                            <div className="xl:pl-12">
                                <h3 className="text-sm font-medium text-gray-300 tracking-wider">Legal</h3>
                                <ul role="list" className="mt-4 space-y-3">
                                    <li>
                                        <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                                            Terms & Conditions
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-600">
                        &copy; {new Date().getFullYear()} Cognitic. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-600">
                        Built for intelligent meetings.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
