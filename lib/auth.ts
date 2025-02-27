// This is a mock authentication service
// In a real application, this would connect to a database and use proper authentication

interface User {
  id: string
  name: string
  email: string
  role: string
}

// Mock user database
const users: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "team@example.com",
    role: "team-member",
  },
  {
    id: "2",
    name: "Robert Wilson",
    email: "lead@example.com",
    role: "team-lead",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "deputy@example.com",
    role: "deputy",
  },
  {
    id: "4",
    name: "James Johnson",
    email: "chief@example.com",
    role: "chief",
  },
]

export async function signIn(email: string, password: string): Promise<User> {
  // In a real app, this would verify credentials against a database
  // For demo purposes, we'll just check if the email exists in our mock database
  // and ignore the password

  const user = users.find((u) => u.email === email)

  if (!user) {
    // For demo purposes, return the team member user if email doesn't match any user
    return users[0]
  }

  return user
}

export async function getCurrentUser(): Promise<User | null> {
  // In a real app, this would check the session/token
  // For demo purposes, we'll just return a mock user
  return users[0]
}

export function isAuthenticated(): boolean {
  // In a real app, this would check if the user is authenticated
  return true
}

export function hasRole(role: string): boolean {
  // In a real app, this would check if the current user has the specified role
  return true
}

