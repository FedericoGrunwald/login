import { useAuth } from "../auth/AuthProvider"

function Dashboard() {
  const auth = useAuth()
  return (
    <div>Dashboard de {auth.getUser()?.name || ""}</div>
  )
}
export default Dashboard