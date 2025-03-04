import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, ClipboardList, Users, UserCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary px-6 py-3 flex items-center">
        <img src="https://th.bing.com/th/id/OIP.vQ-RtPLJe56VdySfGnK0xwHaGb?w=197&h=180&c=7&r=0&o=5&pid=1.7" alt="Engineering Logo" className="h-12 w-12 mr-4" />
        <h1 className="text-2xl font-bold text-white">Engineering Shift Handover</h1>
      </header>

      <main className="flex-1 container max-w-6xl py-12 px-4 bg-cover bg-center" style={{ backgroundImage: "url(https://th.bing.com/th/id/OIP.5lShcC5rUqGrBlzVN8D7bQHaGL?w=227&h=184&c=7&r=0&o=5&pid=1.7)" }}>
        <section className="space-y-6 bg-white bg-opacity-70 p-6 rounded-lg">
          <h2 className="text-3xl font-bold tracking-tight">Welcome to the Engineering Shift Handover System</h2>
          <p className="text-muted-foreground text-lg">
            A centralized platform for engineering teams to document and track shift handovers, ensuring seamless
            communication between team members, leads, deputies, and the chief engineer.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Team Members</CardTitle>
                <CardDescription>Document your shift activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/login?role=team-member" passHref>
                  <Button className="w-full hover:bg-white hover:text-primary">
                    Team Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Team Leads</CardTitle>
                <CardDescription>Review and summarize team reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/login?role=team-lead" passHref>
                  <Button className="w-full hover:bg-white hover:text-primary">
                    Lead Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Chief</CardTitle>
                <CardDescription>Access consolidated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/login?role=management" passHref>
                  <Button className="w-full hover:bg-white hover:text-primary">
                    Chief Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Deputy</CardTitle>
                <CardDescription>Access and manage shift reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/login?role=deputy" passHref>
                  <Button className="w-full hover:bg-white hover:text-primary">
                    Deputy Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 px-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Engineering Department. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}