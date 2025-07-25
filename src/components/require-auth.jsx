import { useEffect } from "react"
import { BarLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import { UrlState } from "@/context"


function RequireAuth({ children }) {
  const navigate = useNavigate()

  const { loading, isAuthenticated } = UrlState()

  useEffect(() => {
    if (!isAuthenticated && loading === false) navigate("/auth")
  }, [isAuthenticated, loading, navigate])

  if (loading) return <BarLoader width={"100%"} color="#36d7b7" />

  if (!isAuthenticated) return null

  return children;
}

export default RequireAuth

