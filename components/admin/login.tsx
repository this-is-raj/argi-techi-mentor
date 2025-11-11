"use client"

import type React from "react"

import { useState } from "react"
import { validateAdmin, setAdminSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AdminLogin({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (validateAdmin(email, password)) {
      setAdminSession("admin-token-" + Date.now())
      onLoginSuccess()
    } else {
      setError("Invalid email or password")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Agro TechieMentor</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full"
            />
          </div>

          {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</div>}

          <Button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">Demo Credentials: harish258@gmail.com / harish12@</p>
      </Card>
    </div>
  )
}
