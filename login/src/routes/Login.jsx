import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider.jsx'
import DefaultLayout from '../layout/DefaultLayout.jsx'
import {useState} from 'react'

function Login() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const auth = useAuth()

  if(auth.isAuthenticated){
    return <Navigate to="/dashboard" />
  }
  return (
    <>
    <DefaultLayout>
      <form className="w-72 h-full flex flex-col border-2 border-blue-700 rounded-lg bg-blue-500">
      <h1 className="flex justify-center font-bold bg-white rounded-lg">Login</h1>
      <label className="font-bold text-white">User Name</label>
      <input className="font-bold text-white border-2 border-white rounded-lg bg-blue-700" 
      type='text'
      value={userName}
      onChange={(e) => setUserName(e.target.value)} />
      <br/>
      <label className="font-bold text-white">Password</label>
      <input className="font-bold text-white border-2 border-white rounded-lg bg-blue-700" 
      type='password'
      value={password}
      onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button className="flex justify-center font-bold text-white border-2 border-white rounded-lg bg-blue-700">Login</button>
    </form>
    </DefaultLayout>
    </>
  )
}
export default Login