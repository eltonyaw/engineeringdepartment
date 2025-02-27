"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"
import { TeamHandoverList } from "@/components/team-handover-list"
import { HandoverForm } from "@/components/handover-form"
import { TeamLeadSummary } from "@/components/team-lead-summary"
import { ManagementView } from "@/components/management-view"

export default function DashboardPage() {
  const [userRole, setUserRole] = useState("team-member") // For demo: team-member, team-lead, deputy, hod

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold">Shift Handover System</h1>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <UserNav />
          </nav>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center gap-2">
              {/* Role selector (for demo purposes) */}
              <select className="rounded-md border p-2" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                <option value="team-member">Team Member</option>
                <option value="team-lead">Team Lead</option>
                <option value="deputy">Deputy HOD</option>
                <option value="hod">Chief Engineer (HOD)</option>
              </select>
            </div>
          </div>

          <Tabs defaultValue="handovers" className="space-y-4">
            <TabsList>
              <TabsTrigger value="handovers">Handovers</TabsTrigger>
              {(userRole === "team-lead" || userRole === "deputy" || userRole === "hod") && (
                <TabsTrigger value="summaries">Summaries</TabsTrigger>
              )}
              {(userRole === "deputy" || userRole === "hod") && (
                <TabsTrigger value="management">Management View</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="handovers" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Create Handover</CardTitle>
                    <CardDescription>Document your shift activities and any issues encountered</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HandoverForm />
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Handovers</CardTitle>
                    <CardDescription>View recent handovers from your team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TeamHandoverList />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {(userRole === "team-lead" || userRole === "deputy" || userRole === "hod") && (
              <TabsContent value="summaries" className="space-y-4">
                <TeamLeadSummary />
              </TabsContent>
            )}

            {(userRole === "deputy" || userRole === "hod") && (
              <TabsContent value="management" className="space-y-4">
                <ManagementView />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
    </div>
  )
}

