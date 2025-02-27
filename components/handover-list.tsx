import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Handover {
  id: string
  title: string
  date: string
  content: string
  status?: string
  shift?: string
  priority?: string
}

interface HandoverListProps {
  handovers: Handover[]
}

export function HandoverList({ handovers }: HandoverListProps) {
  return (
    <div className="space-y-4">
      {handovers.map((handover) => (
        <Card key={handover.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{handover.title}</CardTitle>
                <CardDescription>
                  {handover.date}
                  {handover.shift && ` • ${handover.shift} Shift`}
                  {handover.priority && (
                    <Badge variant={handover.priority === "High" ? "destructive" : "outline"} className="ml-2">
                      {handover.priority}
                    </Badge>
                  )}
                </CardDescription>
              </div>
              {handover.status && <Badge variant="secondary">{handover.status}</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{handover.content}</p>
            <div className="flex justify-end mt-4">
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

