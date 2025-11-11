const ADMIN_CREDENTIALS = {
  email: "harish258@gmail.com",
  password: "harish12@",
}

export function validateAdmin(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}

export function setAdminSession(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("adminToken", token)
  }
}

export function getAdminSession(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken")
  }
  return null
}

export function clearAdminSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminToken")
  }
}

export function isAdminLoggedIn(): boolean {
  return !!getAdminSession()
}
