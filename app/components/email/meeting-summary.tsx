import {
    Body, Container, Head, Html, Preview, Section, Text, Button, Hr
} from '@react-email/components'

interface MeetingSummaryEmailProps {
    userName: string
    meetingTitle: string
    summary: string
    actionItems: Array<{
        id: number
        text: string
    }>
    meetingId: string
    meetingDate: string
}

export function MeetingSummaryEmailNew({
    userName,
    meetingTitle,
    summary,
    actionItems,
    meetingId,
    meetingDate
}: MeetingSummaryEmailProps) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cognitic.app'

    return (
        <Html>
            <Head />
            <Preview>Meeting Summary: {meetingTitle}</Preview>
            <Body style={bodyStyle}>
                <Container style={containerStyle}>
                    
                    {/* Brand Header */}
                    <Section style={brandHeaderStyle}>
                        <Text style={brandTextStyle}>Cognitic</Text>
                    </Section>

                    {/* Main Header */}
                    <Section style={headerStyle}>
                        <Text style={headerTitleStyle}>
                            Meeting Intelligence Ready
                        </Text>
                        <Text style={headerSubtitleStyle}>
                            {meetingTitle}
                        </Text>
                    </Section>

                    <Section style={contentStyle}>
                        <Text style={greetingStyle}>
                            Hi {userName},
                        </Text>

                        <Text style={dateStyle}>
                            Your meeting from <strong>{meetingDate}</strong> has been successfully processed by Cognitic AI. Here are your key insights.
                        </Text>

                        {/* Summary Section */}
                        <Section style={summaryContainerStyle}>
                            <Text style={sectionTitleStyle}>
                                <span style={{ color: '#3b82f6', marginRight: '8px' }}>✦</span> Executive Summary
                            </Text>
                            <Text style={summaryTextStyle}>
                                {summary}
                            </Text>
                        </Section>

                        {/* Action Items Section */}
                        <Section style={actionItemsContainerStyle}>
                            <Text style={sectionTitleStyle}>
                                <span style={{ color: '#8b5cf6', marginRight: '8px' }}>✓</span> Action Items
                            </Text>
                            {actionItems.length > 0 ? (
                                actionItems.map((item) => (
                                    <Section key={item.id} style={actionItemRowStyle}>
                                        <Text style={actionItemBulletStyle}>•</Text>
                                        <Text style={actionItemStyle}>{item.text}</Text>
                                    </Section>
                                ))
                            ) : (
                                <Text style={noActionItemsStyle}>
                                    No immediate action items detected.
                                </Text>
                            )}
                        </Section>

                        {/* Mobile-friendly Button */}
                        <Section style={buttonContainerStyle}>
                            <Button
                                href={`${baseUrl}/meeting/${meetingId}`}
                                style={buttonStyle}
                            >
                                View Full Transcript & Details
                            </Button>
                        </Section>

                    </Section>

                    <Hr style={hrStyle} />
                    
                    {/* Footer */}
                    <Section style={footerStyle}>
                        <Text style={footerTextStyle}>
                            Automated securely by <strong>Cognitic AI</strong>
                        </Text>
                        <Text style={footerLinksStyle}>
                            <a href={`${baseUrl}/settings`} style={footerLink}>Preferences</a> • <a href={`${baseUrl}/support`} style={footerLink}>Support</a>
                        </Text>
                    </Section>

                </Container>
            </Body>
        </Html>
    )
}

// Mobile-optimized font stack emphasizing Android (Roboto) and iOS (-apple-system)
const fontStack = 'system-ui, -apple-system, Roboto, "Segoe UI", Helvetica, Arial, sans-serif'

const bodyStyle = {
    margin: '0',
    padding: '20px 0',
    fontFamily: fontStack,
    backgroundColor: '#000000', // Deep black background for email client
}

const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#0f1115', // Cognitic signature deep charcoal
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #1f2937', // Subtle gray-800 border
}

const brandHeaderStyle = {
    padding: '24px 24px 0 24px',
    textAlign: 'center' as const,
}

const brandTextStyle = {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    margin: '0',
    background: 'linear-gradient(to right, #60a5fa, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}

const headerStyle = {
    padding: '20px 24px 24px 24px',
    textAlign: 'center' as const,
    borderBottom: '1px solid #1f2937'
}

const headerTitleStyle = {
    color: '#f3f4f6',
    margin: '0',
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
}

const headerSubtitleStyle = {
    color: '#9ca3af',
    margin: '8px 0 0 0',
    fontSize: '15px',
    fontWeight: '500',
}

const contentStyle = {
    padding: '24px', // Reduced from 30px for better Android edge-to-edge reading
}

const greetingStyle = {
    color: '#f3f4f6',
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 12px 0'
}

const dateStyle = {
    color: '#9ca3af',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0 0 24px 0'
}

const summaryContainerStyle = {
    backgroundColor: '#15181e',
    borderLeft: '4px solid #3b82f6', // Blue accent
    borderRight: '1px solid #1f2937',
    borderTop: '1px solid #1f2937',
    borderBottom: '1px solid #1f2937',
    padding: '20px',
    margin: '0 0 24px 0',
    borderRadius: '8px'
}

const actionItemsContainerStyle = {
    backgroundColor: '#15181e',
    borderLeft: '4px solid #8b5cf6', // Purple accent for contrast
    borderRight: '1px solid #1f2937',
    borderTop: '1px solid #1f2937',
    borderBottom: '1px solid #1f2937',
    padding: '20px',
    margin: '0 0 32px 0',
    borderRadius: '8px'
}

const sectionTitleStyle = {
    color: '#ffffff',
    margin: '0 0 16px 0',
    fontSize: '16px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px'
}

const summaryTextStyle = {
    color: '#d1d5db',
    lineHeight: '1.7',
    margin: '0',
    fontSize: '15px'
}

const actionItemRowStyle = {
    display: 'table',
    width: '100%',
    marginBottom: '12px'
}

const actionItemBulletStyle = {
    display: 'table-cell',
    color: '#8b5cf6',
    width: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
}

const actionItemStyle = {
    display: 'table-cell',
    color: '#d1d5db',
    lineHeight: '1.6',
    margin: '0',
    fontSize: '15px'
}

const noActionItemsStyle = {
    color: '#6b7280',
    fontStyle: 'italic',
    lineHeight: '1.6',
    margin: '0',
    fontSize: '15px'
}

const buttonContainerStyle = {
    textAlign: 'center' as const,
    margin: '32px 0 16px 0'
}

const buttonStyle = {
    backgroundColor: '#2563eb', // Solid color is safer for email clients than gradients
    color: '#ffffff',
    padding: '14px 24px', // Taller padding makes it easier to tap on Android
    textDecoration: 'none',
    borderRadius: '8px',
    display: 'inline-block',
    fontWeight: '600',
    fontSize: '16px',
    width: '100%', // Forces button to span nicely on mobile devices
    maxWidth: '300px',
    textAlign: 'center' as const,
}

const hrStyle = {
    borderColor: '#1f2937',
    margin: '0'
}

const footerStyle = {
    backgroundColor: '#0f1115',
    padding: '24px',
    textAlign: 'center' as const
}

const footerTextStyle = {
    color: '#6b7280',
    fontSize: '13px',
    margin: '0 0 8px 0'
}

const footerLinksStyle = {
    color: '#4b5563',
    fontSize: '12px',
    margin: '0'
}

const footerLink = {
    color: '#9ca3af',
    textDecoration: 'none'
}

export default MeetingSummaryEmailNew