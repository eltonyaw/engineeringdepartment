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
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export default function TeamLeadDashboard() {
  const { toast } = useToast()
  const [summaryData, setSummaryData] = useState({
    title: "",
    content: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSummaryData({
      ...summaryData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    toast({
      title: "Summary submitted",
      description: "Your team summary has been submitted to management.",
    })

    // Reset form
    setSummaryData({
      title: "",
      content: "",
    })
  }

  // Mock data for team handovers
  const teamHandovers = [
    {
      id: "1",
      memberName: "John Smith",
      title: "Maintenance on Pump Station 3",
      date: "2024-02-26",
      shift: "Evening",
      content:
        "Completed routine maintenance on Pump Station 3. Replaced worn bearings and conducted performance tests. All systems operating within normal parameters.",
      status: "Unreviewed",
    },
    {
      id: "2",
      memberName: "Sarah Johnson",
      title: "Network Infrastructure Update",
      date: "2024-02-26",
      shift: "Morning",
      content:
        "Updated network infrastructure in control room. Installed new switches and reconfigured routing tables. Improved network latency by approximately 15%.",
      status: "Unreviewed",
    },
    {
      id: "3",
      memberName: "Michael Chen",
      title: "Electrical System Inspection",
      date: "2024-02-26",
      shift: "Morning",
      content:
        "Conducted inspection of electrical systems in Building B. Identified potential issue with circuit breaker panel 4. Scheduled maintenance for tomorrow.",
      status: "Unreviewed",
    },
  ]

  // Mock data for previous summaries
  const previousSummaries = [
    {
      id: "1",
      title: "Daily Team Summary - Electrical Division",
      date: "2024-02-25",
      content:
        "All routine maintenance tasks completed. Network infrastructure updated with improved performance. Potential issue with circuit breaker panel 4 identified and scheduled for maintenance tomorrow.",
      status: "Submitted",
    },
    {
      id: "2",
      title: "Daily Team Summary - Electrical Division",
      date: "2024-02-24",
      content:
        "Completed all scheduled maintenance tasks. Replaced UPS batteries in server room. No critical issues to report.",
      status: "Submitted",
    },
  ]

  const [selectedHandovers, setSelectedHandovers] = useState<string[]>([])

  const toggleHandoverSelection = (id: string) => {
    setSelectedHandovers((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <DashboardLayout userRole="Team Lead">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Team Lead Dashboard</h1>

        <Tabs defaultValue="team-handovers">
          <TabsList>
            <TabsTrigger value="team-handovers">Team Handovers</TabsTrigger>
            <TabsTrigger value="create-summary">Create Summary</TabsTrigger>
            <TabsTrigger value="previous-summaries">Previous Summaries</TabsTrigger>
          </TabsList>

          <TabsContent value="team-handovers" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Handovers</CardTitle>
                <CardDescription>
                  Review handovers from your team members and select important items for your summary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamHandovers.map((handover) => (
                    <Card key={handover.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {handover.title}
                              <Badge variant="outline">{handover.shift}</Badge>
                            </CardTitle>
                            <CardDescription>
                              {handover.memberName} • {handover.date}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`select-${handover.id}`}
                              checked={selectedHandovers.includes(handover.id)}
                              onCheckedChange={() => toggleHandoverSelection(handover.id)}
                            />
                            <Label htmlFor={`select-${handover.id}`} className="text-sm">
                              Select for summary
                            </Label>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{handover.content}</p>
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

          <TabsContent value="create-summary" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Team Summary</CardTitle>
                <CardDescription>Summarize key points from team handovers for management review</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Summary Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Daily Team Summary - [Team Name]"
                      required
                      value={summaryData.title}
                      onChange={handleChange}
                    />
                  </div>

                  {selectedHandovers.length > 0 && (
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Selected Handovers</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedHandovers.map((id) => {
                          const handover = teamHandovers.find((h) => h.id === id)
                          return handover ? (
                            <li key={id} className="text-sm">
                              {handover.title} - {handover.memberName}
                            </li>
                          ) : null
                        })}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="content">Summary Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Provide a summary of key points, issues, and achievements from your team's handovers"
                      rows={8}
                      required
                      value={summaryData.content}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Submit Summary</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="previous-summaries" className="pt-4">
            <HandoverList handovers={previousSummaries} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

