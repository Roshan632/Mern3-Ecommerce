import { useEffect, useState, type ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { APIWITHTOKEN } from "../../http"

interface AdminRouteProps {
  children: ReactNode
}

type AccessState = "checking" | "allowed" | "denied"

function AdminRoute({ children }: AdminRouteProps) {
  const location = useLocation()
  const [access, setAccess] = useState<AccessState>("checking")

  useEffect(() => {
    let active = true
    const token = localStorage.getItem("tokenHoYo")

    if (!token) {
      setAccess("denied")
      return () => { active = false }
    }

    APIWITHTOKEN.get("/auth/me")
      .then((response) => {
        if (active) setAccess(response.data?.data?.role === "admin" ? "allowed" : "denied")
      })
      .catch(() => {
        if (active) setAccess("denied")
      })

    return () => { active = false }
  }, [])

  if (access === "checking") {
    return <div className="flex min-h-screen items-center justify-center text-gray-600">Verifying admin access...</div>
  }

  if (access === "denied") {
    const hasToken = Boolean(localStorage.getItem("tokenHoYo"))
    return <Navigate to={hasToken ? "/" : "/login"} replace state={{ from: location }} />
  }

  return <>{children}</>
}

export default AdminRoute
