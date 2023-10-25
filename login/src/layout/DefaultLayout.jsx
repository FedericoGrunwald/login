import { Children } from "react"
import { Link } from "react-router-dom"

function DefaultLayout({children}) {
  return (
    <>
    <header className="w-full h-14 bg-blue-100">
        <nav className="">
            <ul className="flex justify-start mt">
                <li className="m-4 bg-white rounded-lg font-bold border-2 border-blue-700">
                    <Link to="/"> Home</Link>
                </li>
                <li className="m-4 bg-white rounded-lg font-bold border-2 border-blue-700">
                    <Link to="/signup"> Signup</Link>
                </li>
            </ul>
        </nav>
    </header>
    <main className="flex justify-center mt-2">
        {children}
    </main>
    </>
  )
}
export default DefaultLayout