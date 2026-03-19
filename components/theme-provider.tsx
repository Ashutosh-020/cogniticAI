"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// This component is a wrapper around the NextThemesProvider from the next-themes library
// It allows us to provide a theme context to our application and manage the theme state
// We can use it in our _app.tsx file to wrap our entire application and provide the theme context to all components
// We can also pass additional props to the NextThemesProvider if needed, such as defaultTheme, attribute, etc.