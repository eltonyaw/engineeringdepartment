"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for demonstration
const mockHandovers = [
  {
    id: 1,
    title: "Morning Shift - Maintenance",
    author: "Jane Smith",
    date: "2024-02-26",
    time: "08:00",
    priority: "normal",
  },
  {
    id: 2,
    title: "Afternoon Shift - Equipment Issue",
    author: "Mike Johnson",
    date: "2024-02-25",
    time: "16:00",
    priority: "high",
  },
  {
    id: 3,
    title: "Night Shift - System Update",
    author: "Sarah Williams",
    date: "2024-02-25",
    time: "00:00",
    priority: "critical",
  },
  {
    id: 4,
    title: "Morning Shift - Regular Operations",
    author: "Tom Davis",
    date: "2024-02-24",
    time: "08:00",
    priority: "low",
  },
]

export function TeamHandoverList() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
      case "normal":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "high":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {mockHandovers.map((handover) => (
          <Card key={handover.id} className="cursor-pointer hover:bg-muted/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{handover.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {handover.author} • {handover.date} {handover.time}
                  </p>
                </div>
                <Badge className={getPriorityColor(handover.priority)}>
                  {handover.priority.charAt(0).toUpperCase() + handover.priority.slice(1)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

