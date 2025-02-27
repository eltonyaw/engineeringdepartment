"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import DashboardLayout from "@/components/dashboard-layout"
import { HandoverList } from "@/components/handover-list"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DeputyDashboard() {
  const { toast } = useToast()
  const [reportData, setReportData] = useState({
    title: "",
    priority: "medium",
    content: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReportData({
      ...reportData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePriorityChange = (value: string) => {
    setReportData({
      ...reportData,
      priority: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    toast({
      title: "Report submitted",
      description: "Your report has been submitted to the Chief Engineer.",
    })

    // Reset form
    setReportData({
      title: "",
      priority: "medium",
      content: "",
    })
  }

  // Mock data for team lead summaries
  const teamLeadSummaries = [
    {
      id: "1",
      leadName: "Robert Wilson",
      teamName: "Electrical Division",
      title: "Daily Team Summary - Electrical Division",
      date: "2024-02-26",
      content:
        "All routine maintenance tasks completed. Network infrastructure updated with improved performance. Potential issue with circuit breaker panel 4 identified and scheduled for maintenance tomorrow.",
      status: "Unreviewed",
    },
    {
      id: "2",
      leadName: "Jennifer Lee",
      teamName: "Mechanical Division",
      title: "Daily Team Summary - Mechanical Division",
      date: "2024-02-26",
      content:
        "Completed preventative maintenance on all HVAC systems. Identified unusual vibration in cooling tower CT-3, scheduled for detailed inspection. All other systems operating normally.",
      status: "Unreviewed",
    },
    {
      id: "3",
      leadName: "David Martinez",
      teamName: "Instrumentation Division",
      title: "Daily Team Summary - Instrumentation Division",
      date: "2024-02-26",
      content:
        "Calibrated pressure transmitters in Area 2. Replaced faulty flow meter FM-103. Investigating intermittent signal issues with level sensors in Tank 7.",
      status: "Unreviewed",
    },
  ]

  // Mock data for previous reports
  const previousReports = [
    {
      id: "1",
      title: "Weekly Engineering Status Report",
      date: "2024-02-25",
      priority: "High",
      content:
        "Summary of critical issues across all divisions. Circuit breaker panel 4 maintenance completed successfully. Cooling tower CT-3 inspection revealed worn bearings, replacement parts ordered. Level sensor issues in Tank 7 resolved by replacing signal converter.",
      status: "Submitted",
    },
    {
      id: "2",
      title: "Critical Equipment Status Update",
      date: "2024-02-18",
      priority: "Medium",
      content:
        "All critical equipment operating within parameters. Scheduled maintenance activities for next week include main generator inspection and UPS system testing.",
      status: "Submitted",
    },
  ]

  const [selectedSummaries, setSelectedSummaries] = useState<string[]>([])

  const toggleSummarySelection = (id: string) => {
    setSelectedSummaries((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <DashboardLayout userRole="Deputy Engineer">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Deputy Engineer Dashboard</h1>

        <Tabs defaultValue="team-summaries">
          <TabsList>
            <TabsTrigger value="team-summaries">Team Lead Summaries</TabsTrigger>
            <TabsTrigger value="create-report">Create Report</TabsTrigger>
            <TabsTrigger value="previous-reports">Previous Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="team-summaries" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Lead Summaries</CardTitle>
                <CardDescription>
                  Review summaries from team leads and select important items for your report
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamLeadSummaries.map((summary) => (
                    <Card key={summary.id} className="border-l-4 border-l-green-500">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{summary.title}</CardTitle>
                            <CardDescription>
                              {summary.leadName} • {summary.teamName} • {summary.date}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`select-${summary.id}`}
                              checked={selectedSummaries.includes(summary.id)}
                              onCheckedChange={() => toggleSummarySelection(summary.id)}
                            />
                            <Label htmlFor={`select-${summary.id}`} className="text-sm">
                              Select for report
                            </Label>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{summary.content}</p>
                      </CardContent>
                      <CardFooter className="flex justify-end pt-0">
                        <Button variant="outline" size="sm">
                          Mark as Reviewed
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create-report" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Report for Chief Engineer</CardTitle>
                <CardDescription>
                  Compile key information from team lead summaries and add your own insights
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Report Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Engineering Status Report"
                        required
                        value={reportData.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={reportData.priority} onValueChange={handlePriorityChange}>
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {selectedSummaries.length > 0 && (
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Selected Team Summaries</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedSummaries.map((id) => {
                          const summary = teamLeadSummaries.find((s) => s.id === id)
                          return summary ? (
                            <li key={id} className="text-sm">
                              {summary.title} - {summary.teamName}
                            </li>
                          ) : null
                        })}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="content">Report Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Provide a comprehensive report for the Chief Engineer, highlighting critical issues, achievements, and recommendations"
                      rows={8}
                      required
                      value={reportData.content}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Submit Report</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="previous-reports" className="pt-4">
            <HandoverList handovers={previousReports} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

