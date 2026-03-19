'use client'

import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./app-sidebar";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { isSignedIn } = useAuth()

    const showSidebar = pathname !== "/" && !(pathname.startsWith("/meeting/") && !isSignedIn)

    if (!showSidebar) {
        return <div className="min-h-screen">{children}</div>
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex h-screen w-full">
                <AppSidebar />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}

// This component is used to conditionally render the sidebar based on the current route and authentication status.
// It checks if the user is on the home page or a meeting page without being signed in, and only renders the sidebar if those conditions are not met.
// The usePathname hook is used to get the current route, and the useAuth hook is used to check if the user is signed in.
// If the sidebar should be shown, it wraps the children in a layout that includes the AppSidebar and a main content area. Otherwise, 
// it just renders the children in a full-screen layout.
// This allows for a cleaner user experience by hiding the sidebar on certain pages where it may not be relevant or necessary, such as the landing page or meeting pages for unauthenticated users.