import * as path from "path";
import * as fs from 'fs'
import { prisma } from "@/lib/db";
import { randomUUID } from "crypto";
import 'dotenv/config'

async function seedMeetings() {
    try {
        const dataPath = path.join(__dirname, 'data')

        const transcript1 = JSON.parse(fs.readFileSync(path.join(dataPath, 'transcripts', 'transcript1.json'), 'utf8'))
        const transcript2 = JSON.parse(fs.readFileSync(path.join(dataPath, 'transcripts', 'transcript2.json'), 'utf8'))
        const transcript3 = JSON.parse(fs.readFileSync(path.join(dataPath, 'transcripts', 'transcript3.json'), 'utf8'))

        const summaryData = JSON.parse(fs.readFileSync(path.join(dataPath, 'summaries.json'), 'utf8'))
        const actionItems = JSON.parse(fs.readFileSync(path.join(dataPath, 'action-items.json'), 'utf8'))
        const titles = JSON.parse(fs.readFileSync(path.join(dataPath, 'title.json'), 'utf8'))

        const userId = 'user_3B8SBHQahYXfwJw0s2VjAiYJeVG'
        const recordingUrl = 'https://meetingbot1.s3.eu-north-1.amazonaws.com/test-audio.mp3'

        const now = new Date()
        const startTime = new Date(now.getTime() - 30 * 60 * 1000)
        const endTime = new Date(now.getTime() - 5 * 60 * 1000)

        const meetings = [
            {
                transcript: transcript1,
                title: titles[0].title,
                description: titles[0].description
            },
            {
                transcript: transcript2,
                title: titles[1].title,
                description: titles[1].description
            },
            {
                transcript: transcript3,
                title: titles[2].title,
                description: titles[2].description
            }
        ]

        for (let i = 0; i < meetings.length; i++) {
            const meeting = meetings[i]

            await prisma.meeting.create({
                data: {
                    userId: userId,
                    title: meeting.title,
                    description: meeting.description,
                    meetingUrl: 'https://meet.google.com/jmz-ojtp-rty',
                    startTime: startTime,
                    endTime: endTime,

                    calendarEventId: randomUUID(),
                    isFromCalendar: true,

                    botScheduled: true,
                    botSent: true,
                    botId: randomUUID(),
                    botJoinedAt: startTime,

                    meetingEnded: true,
                    transcriptReady: true,
                    transcript: meeting.transcript,
                    recordingUrl: recordingUrl,

                    summary: summaryData.summary,
                    actionItems: actionItems,
                    processed: true,
                    processedAt: endTime,
                    emailSent: true,
                    emailSentAt: endTime,
                    ragProcessed: false
                }
            })
        }
    } catch (error) {
        console.error('error seeding meetings bruh', error)
    }
}

seedMeetings()

// This script is used to seed the database with some sample meetings data for testing and development purposes
// It reads transcript, summary, action items, and title data from JSON files in the data directory and creates meeting records in the database using Prisma
// You can run this script using ts-node or compile it to JavaScript and run it with Node.js
// Make sure to adjust the file paths and userId as needed before running the script
// Note: This script assumes that the database schema is already set up and that the Prisma client is properly configured to connect to the database
// Also, be cautious when running this script as it will create records in your database. You may want to run it in a development environment or use a test database to avoid polluting your production data.
// To run the script, you can use the following command in your terminal:
// npx ts-node scripts/seed-meetings.ts
// Make sure you have ts-node installed globally or as a dev dependency in your project to run TypeScript files directly.
// After running the script, you should see the new meeting records in your database, and you can use them for testing and development of your application features related to meetings, transcripts, summaries, and action items.
// If you want to customize the data being seeded, you can modify the JSON files in the data directory or change the structure of the meetings array in the script to include different data as needed.
// Remember to handle any errors that may occur during the seeding process, such as issues with file reading or database connectivity, and ensure that your database is properly backed up before running any seeding scripts to prevent accidental data loss.