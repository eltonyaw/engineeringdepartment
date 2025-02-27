"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HandoverForm() {
  const [formData, setFormData] = useState({
    title: "",
    tasks_completed: "",
    ongoing_tasks: "",
    issues: "",
    priority: "normal",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the handover data here
    console.log("Handover submitted:", formData)
    alert("Handover submitted successfully!")

    // Reset form
    setFormData({
      title: "",
      tasks_completed: "",
      ongoing_tasks: "",
      issues: "",
      priority: "normal",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Handover Title</Label>
        <Input
          id="title"
          placeholder="Brief summary of your shift"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tasks_completed">Tasks Completed</Label>
        <Textarea
          id="tasks_completed"
          placeholder="List the tasks you completed during your shift"
          value={formData.tasks_completed}
          onChange={(e) => handleChange("tasks_completed", e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ongoing_tasks">Ongoing Tasks</Label>
        <Textarea
          id="ongoing_tasks"
          placeholder="List any tasks that are still in progress"
          value={formData.ongoing_tasks}
          onChange={(e) => handleChange("ongoing_tasks", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="issues">Issues & Concerns</Label>
        <Textarea
          id="issues"
          placeholder="Document any issues or concerns that need attention"
          value={formData.issues}
          onChange={(e) => handleChange("issues", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority Level</Label>
        <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        Submit Handover
      </Button>
    </form>
  )
}

