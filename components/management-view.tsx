"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for demonstration
const mockTeamSummaries = [
  {
    id: 1,
    team: "Maintenance",
    lead: "Robert Chen",
    date: "2024-02-26",
    content:
      "All routine maintenance completed on schedule. Unit 2 bearing needs replacement within next 2 weeks. Parts ordered.",
    status: "normal",
  },
  {
    id: 2,
    team: "Operations",
    lead: "Lisa Wong",
    date: "2024-02-26",
    content:
      "Production targets met. Pressure valve on unit 4 malfunctioning - temporary fix in place but needs replacement parts urgently.",
    status: "high",
  },
  {
    id: 3,
    team: "IT Systems",
    lead: "David Miller",
    date: "2024-02-26",
    content:
      "Critical software update applied to all control systems. All units operating normally after restart. Security patches applied.",
    status: "normal",
  },
]

export function ManagementView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800"
      case "high":
        return "bg-amber-100 text-amber-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Management Dashboard</CardTitle>
          <CardDescription>Overview of all team summaries and critical issues</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summaries">
            <TabsList className="mb-4">
              <TabsTrigger value="summaries">Team Summaries</TabsTrigger>
              <TabsTrigger value="critical">Critical Issues</TabsTrigger>
              <TabsTrigger value="report">Generate Report</TabsTrigger>
            </TabsList>

            <TabsContent value="summaries">
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {mockTeamSummaries.map((summary) => (
                    <Card key={summary.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-lg">{summary.team} Team</h3>
                            <p className="text-sm text-muted-foreground">
                              Lead: {summary.lead} • {summary.date}
                            </p>
                          </div>
                          <Badge className={getStatusColor(summary.status)}>{summary.status.toUpperCase()}</Badge>
                        </div>
                        <p>{summary.content}</p>
                        <div className="flex justify-end mt-2">
                          <Button variant="outline" size="sm">
                            Add Note
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="critical">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-4">Critical Issues Requiring Attention</h3>
                  <ul className="space-y-2">
                    <li className="p-2 border rounded-md bg-red-50">
                      <div className="flex justify-between">
                        <span className="font-medium">Pressure valve on unit 4 malfunctioning</span>
                        <Badge className="bg-red-100 text-red-800">URGENT</Badge>
                      </div>
                      <p className="text-sm mt-1">
                        Temporary fix in place but needs replacement parts urgently. Operations team.
                      </p>
                    </li>
                    <li className="p-2 border rounded-md bg-amber-50">
                      <div className="flex justify-between">
                        <span className="font-medium">Unit 2 bearing needs replacement</span>
                        <Badge className="bg-amber-100 text-amber-800">SCHEDULED</Badge>
                      </div>
                      <p className="text-sm mt-1">
                        Parts ordered, replacement scheduled within 2 weeks. Maintenance team.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="report">
              <div className="space-y-4">
                <Textarea placeholder="Generate a comprehensive management report" className="min-h-[300px]" />
                <div className="flex justify-between">
                  <Button variant="outline">Save Draft</Button>
                  <Button>Generate Report</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

