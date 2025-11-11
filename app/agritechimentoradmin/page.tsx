"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminDashboard from "@/components/admin/dashboard"
import AdminLogin from "@/components/admin/login"
import { isAdminLoggedIn } from "@/lib/auth"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  // Check if admin is logged in on mount
  useState(() => {
    const loggedIn = isAdminLoggedIn()
    setIsLoggedIn(loggedIn)
  }, [])

  return (
    <div>
      {isLoggedIn ? (
        <AdminDashboard onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  )
}
