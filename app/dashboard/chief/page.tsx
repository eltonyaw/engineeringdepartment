"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, FileText } from "lucide-react"

export default function ChiefDashboard() {
  // Mock data for deputy reports
  const deputyReports = [
    {
      id: "1",
      deputyName: "Emily Rodriguez",
      title: "Weekly Engineering Status Report",
      date: "2024-02-26",
      priority: "High",
      content:
        "Summary of critical issues across all divisions. Circuit breaker panel 4 maintenance completed successfully. Cooling tower CT-3 inspection revealed worn bearings, replacement parts ordered. Level sensor issues in Tank 7 resolved by replacing signal converter.",
      status: "Unread",
    },
    {
      id: "2",
      deputyName: "Thomas Anderson",
      title: "Monthly Equipment Performance Review",
      date: "2024-02-26",
      priority: "Medium",
      content:
        "Overall equipment effectiveness at 92%, up 3% from last month. Preventative maintenance program showing positive results with reduced unplanned downtime. Recommend accelerating replacement schedule for aging pumps in Area 4.",
      status: "Unread",
    },
  ]

  // Mock data for all department handovers (for overview)
  const allHandovers = [
    {
      id: "1",
      type: "Team Member",
      name: "John Smith",
      team: "Electrical",
      title: "Maintenance on Pump Station 3",
      date: "2024-02-26",
      shift: "Evening",
      priority: "Normal",
    },
    {
      id: "2",
      type: "Team Lead",
      name: "Robert Wilson",
      team: "Electrical",
      title: "Daily Team Summary - Electrical Division",
      date: "2024-02-26",
      shift: "Day",
      priority: "Normal",
    },
    {
      id: "3",
      type: "Deputy",
      name: "Emily Rodriguez",
      team: "Operations",
      title: "Weekly Engineering Status Report",
      date: "2024-02-26",
      shift: "Day",
      priority: "High",
    },
    {
      id: "4",
      type: "Team Member",
      name: "Sarah Johnson",
      team: "Mechanical",
      title: "Network Infrastructure Update",
      date: "2024-02-26",
      shift: "Morning",
      priority: "Normal",
    },
    {
      id: "5",
      type: "Team Lead",
      name: "Jennifer Lee",
      team: "Mechanical",
      title: "Daily Team Summary - Mechanical Division",
      date: "2024-02-26",
      shift: "Day",
      priority: "Normal",
    },
  ]

  // Mock data for critical issues
  const criticalIssues = [
    {
      id: "1",
      title: "Cooling Tower CT-3 Bearing Failure",
      description:
        "Worn bearings detected during inspection. Replacement parts ordered with expected delivery in 2 days.",
      status: "In Progress",
      reporter: "Jennifer Lee",
      date: "2024-02-26",
    },
    {
      id: "2",
      title: "Circuit Breaker Panel 4 Maintenance",
      description: "Scheduled maintenance completed. All systems functioning normally.",
      status: "Resolved",
      reporter: "Robert Wilson",
      date: "2024-02-25",
    },
  ]

  return (
    <DashboardLayout userRole="Chief Engineer">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Chief Engineer Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Handovers</CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+8% from previous day</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Critical Issues</CardTitle>
              <CardDescription>Requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-500">2</div>
              <p className="text-xs text-muted-foreground">-1 from previous day</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Unread Reports</CardTitle>
              <CardDescription>From deputies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">2</div>
              <p className="text-xs text-muted-foreground">Updated just now</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="deputy-reports">
          <TabsList>
            <TabsTrigger value="deputy-reports">Deputy Reports</TabsTrigger>
            <TabsTrigger value="critical-issues">Critical Issues</TabsTrigger>
            <TabsTrigger value="all-handovers">All Handovers</TabsTrigger>
          </TabsList>

          <TabsContent value="deputy-reports" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Deputy Engineer Reports</CardTitle>
                <CardDescription>Review reports submitted by your deputy engineers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deputyReports.map((report) => (
                    <Card
                      key={report.id}
                      className={`border-l-4 ${report.priority === "High" ? "border-l-red-500" : "border-l-amber-500"}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {report.title}
                              <Badge variant={report.priority === "High" ? "destructive" : "outline"}>
                                {report.priority}
                              </Badge>
                            </CardTitle>
                            <CardDescription>
                              {report.deputyName} • {report.date}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">{report.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{report.content}</p>
                      </CardContent>
                      <CardContent className="flex justify-end gap-2 pt-0">
                        <Button variant="outline" size="sm">
                          Mark as Read
                        </Button>
                        <Button size="sm">View Details</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="critical-issues" className="pt-4">
            <div className="space-y-4">
              {criticalIssues.map((issue) => (
                <Alert key={issue.id} variant={issue.status === "Resolved" ? "default" : "destructive"}>
                  <div className="flex items-start">
                    {issue.status === "Resolved" ? (
                      <CheckCircle2 className="h-4 w-4 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-4 w-4 mt-0.5" />
                    )}
                    <div className="ml-3 w-full">
                      <div className="flex justify-between items-start">
                        <AlertTitle>{issue.title}</AlertTitle>
                        <Badge variant={issue.status === "Resolved" ? "outline" : "destructive"}>{issue.status}</Badge>
                      </div>
                      <AlertDescription className="mt-1">
                        {issue.description}
                        <div className="mt-2 text-xs text-muted-foreground">
                          Reported by {issue.reporter} on {issue.date}
                        </div>
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all-handovers" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>All Department Handovers</CardTitle>
                <CardDescription>Overview of all handovers across the engineering department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 bg-muted p-3 text-sm font-medium">
                    <div>Type</div>
                    <div>Name</div>
                    <div>Team</div>
                    <div className="col-span-2">Title</div>
                    <div>Date</div>
                  </div>
                  {allHandovers.map((handover) => (
                    <div key={handover.id} className="grid grid-cols-6 border-t p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {handover.type}
                      </div>
                      <div>{handover.name}</div>
                      <div>{handover.team}</div>
                      <div className="col-span-2 flex items-center">
                        {handover.title}
                        {handover.priority === "High" && (
                          <Badge variant="destructive" className="ml-2">
                            High
                          </Badge>
                        )}
                      </div>
                      <div>{handover.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

