"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Toaster } from "@/components/ui/toaster"
import { ClipboardList, FileText, Home, LogOut, Menu, Settings, Users, UserCircle } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: string
}

export default function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Define navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ]

    if (userRole === "Team Member") {
      return [
        {
          title: "Dashboard",
          href: "/dashboard/team-member",
          icon: Home,
        },
        {
          title: "My Handovers",
          href: "/dashboard/team-member/handovers",
          icon: ClipboardList,
        },
        {
          title: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
        },
      ]
    } else if (userRole === "Team Lead") {
      return [
        {
          title: "Dashboard",
          href: "/dashboard/team-lead",
          icon: Home,
        },
        {
          title: "Team Handovers",
          href: "/dashboard/team-lead/handovers",
          icon: ClipboardList,
        },
        {
          title: "Team Members",
          href: "/dashboard/team-lead/members",
          icon: Users,
        },
        {
          title: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
        },
      ]
    } else if (userRole === "Deputy Engineer") {
      return [
        {
          title: "Dashboard",
          href: "/dashboard/deputy",
          icon: Home,
        },
        {
          title: "Team Summaries",
          href: "/dashboard/deputy/summaries",
          icon: FileText,
        },
        {
          title: "My Reports",
          href: "/dashboard/deputy/reports",
          icon: ClipboardList,
        },
        {
          title: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
        },
      ]
    } else if (userRole === "Chief Engineer") {
      return [
        {
          title: "Dashboard",
          href: "/dashboard/chief",
          icon: Home,
        },
        {
          title: "Deputy Reports",
          href: "/dashboard/chief/reports",
          icon: FileText,
        },
        {
          title: "Department Overview",
          href: "/dashboard/chief/overview",
          icon: Users,
        },
        {
          title: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
        },
      ]
    }

    return baseItems
  }

  const navItems = getNavItems()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 sm:max-w-xs">
            <nav className="grid gap-2 text-lg font-medium">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary ${
                    pathname === item.href ? "bg-muted font-medium text-primary" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ClipboardList className="h-6 w-6" />
            <span>Engineering Handover</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <nav className="hidden md:flex gap-4 md:gap-2 lg:gap-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <UserCircle className="h-5 w-5" />
            <span>{userRole}</span>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Link>
          </Button>
        </div>
      </header>
      <div className="flex-1 bg-muted/40">
        <div className="container py-6 md:py-10">{children}</div>
      </div>
      <Toaster />
    </div>
  )
}

