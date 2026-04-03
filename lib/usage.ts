import { prisma } from "./db"

interface PlanLimits {
    meetings: number
    chatMessages: number
}

// Must match app/contexts/UsageContext.tsx PLAN_LIMITS (gold / platinum / diamond).
// Legacy keys kept for existing DB values.
const PLAN_LIMITS: Record<string, PlanLimits> = {
    free: { meetings: 0, chatMessages: 0 },
    gold: { meetings: 10, chatMessages: 30 },
    platinum: { meetings: 30, chatMessages: 100 },
    diamond: { meetings: -1, chatMessages: -1 },
}

export async function canUserSendBot(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!user) {
        return { allowed: false, reason: 'User not found' }
    }

    if (user.currentPlan === 'free' || user.subscriptionStatus === 'expired') {
        return { allowed: false, reason: 'Unlock meeting bots by upgrading your plan.' }
    }

    const limits = PLAN_LIMITS[user.currentPlan]

    if (!limits) {
        console.error(`❌ Unknown plan: ${user.currentPlan}`)
        return { allowed: false, reason: 'Invalid subscription plan' }
    }

    if (limits.meetings !== -1 && user.meetingsThisMonth >= limits.meetings) {
        return { allowed: false, reason: `You've reached your monthly limit of ${limits.meetings} meetings` }
    }

    return { allowed: true }
}

export async function canUserChat(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) {
        return { allowed: false, reason: 'user not found' }
    }

    if (user.currentPlan === 'free' || user.subscriptionStatus === 'expired') {
        return { allowed: false, reason: 'Upgrade now to unlock powerful AI chat capabilities.' }
    }

    const limits = PLAN_LIMITS[user.currentPlan]

    if (!limits) {
        return { allowed: false, reason: 'Invalid subscription plan' }
    }

    if (limits.chatMessages !== -1 && user.chatMessagesToday >= limits.chatMessages) {
        return { allowed: false, reason: `You've reached your daily limit of ${limits.chatMessages} messages` }
    }

    return { allowed: true }
}

export async function incrementMeetingUsage(userId: string) {
    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            meetingsThisMonth: {
                increment: 1
            }
        }
    })
}

export async function incrementChatUsage(userId: string) {
    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            chatMessagesToday: {
                increment: 1
            }
        }
    })
}

export function getPlanLimits(plan: string): PlanLimits {
    return PLAN_LIMITS[plan] || PLAN_LIMITS.free
}
