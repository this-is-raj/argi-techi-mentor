"use client";

import { useEffect, useState } from "react";
import AdminDashboard from "@/components/admin/dashboard";
import AdminLogin from "@/components/admin/login";
import { isAdminLoggedIn } from "@/lib/auth";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = isAdminLoggedIn();
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <AdminDashboard onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}
