"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Mock data for demonstration
const mockTeamHandovers = [
  {
    id: 1,
    title: "Morning Shift - Maintenance",
    author: "Jane Smith",
    content: "Completed routine maintenance on units 1-3. Unit 2 showing signs of wear on the main bearing.",
    priority: "normal",
    selected: false,
  },
  {
    id: 2,
    title: "Afternoon Shift - Equipment Issue",
    author: "Mike Johnson",
    content: "Pressure valve on unit 4 malfunctioning. Temporary fix applied, needs replacement parts.",
    priority: "high",
    selected: false,
  },
  {
    id: 3,
    title: "Night Shift - System Update",
    author: "Sarah Williams",
    content: "Critical software update applied to control systems. All units operating normally after restart.",
    priority: "critical",
    selected: false,
  },
]

export function TeamLeadSummary() {
  const [handovers, setHandovers] = useState(mockTeamHandovers)
  const [summary, setSummary] = useState("")

  const toggleHandoverSelection = (id: number) => {
    setHandovers(handovers.map((h) => (h.id === id ? { ...h, selected: !h.selected } : h)))
  }

  const generateSummary = () => {
    const selectedHandovers = handovers.filter((h) => h.selected)
    let generatedSummary = "Team Summary:\n\n"

    selectedHandovers.forEach((h) => {
      generatedSummary += `- ${h.title} (${h.priority.toUpperCase()}): ${h.content}\n`
    })

    setSummary(generatedSummary)
  }

  const submitSummary = () => {
    // In a real app, you would save the summary here
    alert("Summary submitted successfully!")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800"
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
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Team Handovers</CardTitle>
          <CardDescription>Select important items to include in your summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {handovers.map((handover) => (
              <div key={handover.id} className="flex items-start space-x-2 border p-3 rounded-md">
                <Checkbox
                  id={`handover-${handover.id}`}
                  checked={handover.selected}
                  onCheckedChange={() => toggleHandoverSelection(handover.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Label htmlFor={`handover-${handover.id}`} className="font-medium">
                      {handover.title}
                    </Label>
                    <Badge className={getPriorityColor(handover.priority)}>{handover.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">By {handover.author}</p>
                  <p className="text-sm mt-1">{handover.content}</p>
                </div>
              </div>
            ))}
            <Button onClick={generateSummary} className="w-full">
              Generate Summary
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Lead Summary</CardTitle>
          <CardDescription>Edit and submit your summary for management review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Generate a summary from selected handovers or write your own"
              className="min-h-[300px]"
            />
            <Button onClick={submitSummary} className="w-full">
              Submit Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

