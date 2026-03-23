"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Play,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const { isSignedIn } = useUser();

  return (
    <>
      <nav className="border-b border-white/20 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="group flex items-center gap-2 sm:gap-3 transition-transform duration-300 hover:opacity-90"
              >
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-purple-500/40">
                  <Sparkles
                    className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                    strokeWidth={2}
                  />
                </div>
                <span className="bg-linear-to-br from-white to-white/60 bg-clip-text text-lg sm:text-xl font-extrabold tracking-tight text-transparent">
                  Cognitic
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {isSignedIn ? (
                <Link href="/dashboard">
                  <Button className="group h-8 sm:h-10 cursor-pointer rounded-xl border-none bg-blue-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-md shadow-blue-900/20 transition-all duration-300 hover:bg-blue-700 active:scale-[0.95]">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button
                      variant="outline"
                      className="group h-9 sm:h-10 cursor-pointer rounded-xl border-gray-700 bg-transparent px-3 sm:px-5 text-sm font-semibold text-gray-300 transition-all duration-300 hover:bg-gray-800 hover:text-white active:scale-[0.95]"
                    >
                      Sign In
                    </Button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <Button className="group h-9 sm:h-10 cursor-pointer rounded-xl border-none bg-blue-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-md shadow-blue-900/20 transition-all duration-300 hover:bg-blue-700 active:scale-[0.95]">
                      Get Started
                    </Button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative py-16 sm:py-20 px-4 bg-black overflow-hidden flex flex-col items-center justify-center">
        {/* Decorative Border Lines from Reference */}
        <div className="absolute inset-y-0 left-0 h-full w-px bg-white/10 z-10 hidden md:block">
          <div className="absolute top-0 h-40 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="absolute inset-y-0 right-0 h-full w-px bg-white/10 z-10 hidden md:block">
          <div className="absolute h-40 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px w-full bg-white/10 z-10">
          <div className="absolute mx-auto h-px w-40 bg-linear-to-r from-transparent via-blue-500 to-transparent" />
        </div>

        {/* Sparkles Background */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        {/* Optional Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-1" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            className="group relative mx-auto flex w-fit items-center justify-center rounded-full px-3 py-1.5 sm:px-4 sm:py-1.5 shadow-[inset_0_-8px_10px_#3b82f61f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#3b82f63f] mb-6 sm:mb-8"
          >
            <span
              className={cn(
                "absolute inset-0 block w-full animate-gradient rounded-[inherit] bg-linear-to-r from-[#3b82f6]/50 via-[#1d4ed8]/50 to-[#3b82f6]/50 bg-size-300%_100% p-px",
              )}
              style={{
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "subtract",
                WebkitClipPath: "padding-box",
              }}
            />
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-blue-400" />
            <hr className="mx-2 h-3 sm:h-4 w-px shrink-0 bg-neutral-500" />
            <AnimatedGradientText className="text-xs sm:text-sm font-medium text-gray-300">
              AI-Powered Meeting Assistant
            </AnimatedGradientText>
            <ChevronRight className="ml-1 w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            {"Transform Your Meetings with".split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 sm:mr-3 inline-block"
              >
                {word}
              </motion.span>
            ))}
            <br className="hidden sm:block" />
            <motion.span
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: 4 * 0.1, // Delays slightly to match the end of the previous words
                ease: "easeInOut",
              }}
              className="bg-linear-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent inline-block sm:mt-2"
            >
              Cognitic
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 px-2 bg-linear-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(156,163,175,0.3)]"
          >
            Say goodbye to manual note-taking and hello to effortless meeting
            summaries, action items, and insights with Cognitic's AI-powered
            assistant.
            <br className="hidden sm:block" />
            Never miss important details again.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="mb-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto sm:max-w-none"
          >
            {isSignedIn ? (
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group flex h-12 sm:h-14 w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-blue-600 px-6 sm:px-8 text-sm sm:text-base font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.98]"
                >
                  <span>Dashboard</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <div className="w-full sm:w-auto">
                <SignUpButton mode="modal">
                  <Button
                    size="lg"
                    className="group flex h-12 sm:h-14 w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-blue-600 px-6 sm:px-8 text-sm sm:text-base font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.98]"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </SignUpButton>
              </div>
            )}

            <Button
              variant="outline"
              size="lg"
              className="group flex h-12 sm:h-14 w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-xl border-gray-700 bg-transparent px-6 sm:px-8 text-sm sm:text-base font-semibold text-gray-300 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800 hover:text-white active:scale-[0.98]"
            >
              <Play className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" />
              <span>Watch Demo</span>
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-500"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-400 w-4 h-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-400 w-4 h-4" />
              <span>Setup in 2 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-400 w-4 h-4" />
              <span>Free forever plan</span>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
              <Image
                priority
                src="/hero-Image.png"
                alt="Hero Image"
                className="aspect-video h-auto w-full object-cover"
                height={1000}
                width={1000}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
