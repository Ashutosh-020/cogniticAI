import {
  Home,
  IndianRupee,
  Layers3,
  Settings,
  Sparkles,
  Bot,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useUsage } from "../contexts/UsageContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Integrations", url: "/integrations", icon: Layers3 },
  { title: "Chat with AI", url: "/chat", icon: Bot },
  { title: "Pricing", url: "/pricing", icon: IndianRupee },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { usage, limits } = useUsage();

  const meetingProgress =
    usage && limits.meetings !== -1
      ? Math.min((usage.meetingsThisMonth / limits.meetings) * 100, 100)
      : 0;

  const chatProgress =
    usage && limits.chatMessages !== -1
      ? Math.min((usage.chatMessagesToday / limits.chatMessages) * 100, 100)
      : 0;

  const getUpgradeInfo = () => {
    if (!usage) return null;

    switch (usage.currentPlan) {
      case "free":
        return {
          title: "Upgrade to Gold",
          description: "Get 10 meetings per month and 30 daily chat messages",
          showButton: true,
        };
      case "gold":
        return {
          title: "Upgrade to Platinum",
          description: "Get 30 meetings per month and 100 daily chat messages",
          showButton: true,
        };
      case "platinum":
        return {
          title: "Upgrade to Diamond",
          description: "Get unlimited meetings and chat messages",
          showButton: true,
        };
      case "diamond":
        return {
          title: "You're on Diamond broski!",
          description: "Enjoying unlimited access to all features",
          showButton: false,
        };
      default:
        return {
          title: "Upgrade Your Plan",
          description: "Get access to more features",
          showButton: true,
        };
    }
  };

  const upgradeInfo = getUpgradeInfo();

  return (
    <Sidebar
      collapsible="none"
      className="h-screen border-r border-sidebar-border transition-all duration-300 ease-in-out"
    >
      {/* 1. PREMIUM HEADER */}
      <SidebarHeader className="border-b border-sidebar-border/60 bg-sidebar/50 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Premium Icon Container */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">
            <Sparkles className="h-5 w-5 text-white" strokeWidth={2} />
          </div>

          {/* Stacked Typography */}
          <div className="flex flex-col justify-center">
            <span className="bg-linear-to-br from-sidebar-foreground to-sidebar-foreground/60 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
              Cognitic
            </span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase leading-none tracking-widest text-sidebar-foreground/50">
              Workspace
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* 2. PREMIUM NAVIGATION LINKS */}
      <SidebarContent className="flex-1 px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="group relative flex w-full items-center justify-start gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-all duration-300 hover:bg-white/5 hover:text-white data-[active=true]:bg-linear-to-r data-[active=true]:from-indigo-500/15 data-[active=true]:to-purple-500/5 data-[active=true]:text-indigo-300 data-[active=true]:shadow-[inset_3px_0_0_0_rgba(99,102,241,1)]"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-data-[active=true]:text-indigo-400" />
                      <span>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 3. RICH TONE FOOTER */}
      <SidebarFooter className="mt-auto p-4">
        {usage && (
          <div className="relative mb-4 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/4 to-white/1 p-4 shadow-2xl backdrop-blur-md">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl"></div>

            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/50">
                Usage
              </span>
              <span className="rounded-sm bg-linear-to-r from-indigo-500 to-purple-600 px-1.5 py-0.5 text-[8px] font-bold tracking-widest text-white shadow-[0_0_15px_-3px_rgba(124,58,237,0.5)]">
                {usage.currentPlan.toUpperCase()}
              </span>
            </div>

            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-sidebar-foreground/80">Meetings</span>
                <span className="text-[11px] font-bold text-sidebar-foreground/90">
                  {usage.meetingsThisMonth} <span className="text-[10px] text-sidebar-foreground/40">/ {limits.meetings === -1 ? "∞" : limits.meetings}</span>
                </span>
              </div>
              {limits.meetings !== -1 ? (
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/40 shadow-inner">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-700 ease-out"
                    style={{ width: `${meetingProgress}%` }}
                  />
                </div>
              ) : (
                <div className="text-[10px] font-medium italic tracking-wide text-indigo-400/70">Unlimited Access</div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-sidebar-foreground/80">Chat Messages</span>
                <span className="text-[11px] font-bold text-sidebar-foreground/90">
                  {usage.chatMessagesToday} <span className="text-[10px] text-sidebar-foreground/40">/ {limits.chatMessages === -1 ? "∞" : limits.chatMessages}</span>
                </span>
              </div>
              {limits.chatMessages !== -1 ? (
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/40 shadow-inner">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-700 ease-out"
                    style={{ width: `${chatProgress}%` }}
                  />
                </div>
              ) : (
                <div className="text-[10px] font-medium italic tracking-wide text-indigo-400/70">Unlimited Access</div>
              )}
            </div>
          </div>
        )}

        {upgradeInfo && (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/4 to-white/1 p-4 shadow-2xl backdrop-blur-md">
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-sidebar-foreground/90">
                  {upgradeInfo.title}
                </p>
                <p className="text-xs text-sidebar-foreground/60 leading-relaxed">
                  {upgradeInfo.description}
                </p>
              </div>
              {upgradeInfo.showButton ? (
                <Link href="/pricing" className="block mt-2">
                  <Button className="group relative w-full overflow-hidden rounded-lg bg-linear-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-[0_0_20px_-5px_rgba(124,58,237,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.6)] cursor-pointer">
                    <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(150%)]">
                      <div className="relative h-full w-8 bg-white/20" />
                    </div>
                    <span className="relative flex items-center justify-center gap-2">
                      {upgradeInfo.title}
                    </span>
                  </Button>
                </Link>
              ) : (
                <div className="text-center py-2">
                  <span className="text-xs text-indigo-400 font-medium tracking-wide">
                    🎉 Thank you for your support!
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}