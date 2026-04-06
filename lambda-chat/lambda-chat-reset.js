import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})

const prisma = new PrismaClient({ adapter })

export const handler = async (event) => {
    try {
        const result = await prisma.user.updateMany({
            where: {
                subscriptionStatus: 'active'
            },
            data: {
                chatMessagesToday: 0
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'daily chat reset completed successfully',
                usersReset: result.count,
                timestamp: new Date().toISOString()
            })
        }

    } catch (error) {
        console.error('chat reset error:', error)

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'failed to reset the chat messages',
                details: error.message,
                timestamp: new Date().toISOString()
            })
        }
    }
}
