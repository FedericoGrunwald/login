import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";
import { API_URL } from "../auth/constants";

function PortalLayout({ children }) {
  const auth = useAuth();

  async function handleSignOut(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });

      if (response.ok) {
        auth.signOut();
      } else {
        const errorData = await response.json(); // Obtén más detalles del error si está disponible
        console.log("Error during signout:", errorData);
      }
    } catch (error) {
      console.log("Error during signout:", error);
    }
  }
  return (
    <>
      <header className="w-full h-14 bg-teal-100">
        <nav>
          <ul className="flex justify-start">
            <li className="font-bold m-4 text-white border-2 border-teal-500 bg-teal-400 rounded-lg hover:bg-teal-300 hover:border-teal-400">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="font-bold m-4 text-white border-2 border-teal-500 bg-teal-400 rounded-lg hover:bg-teal-300 hover:border-teal-400">
              <Link to="/me">Profile</Link>
            </li>
            <li className="font-bold m-4 text-white border-2 border-teal-500 bg-teal-400 rounded-lg hover:bg-teal-300 hover:border-teal-400">
              <Link to="/me">{auth.getUser()?.userName ?? ""}</Link>
            </li>
            <li className="font-bold m-4 text-white border-2 border-teal-400 bg-teal-500 rounded-lg hover:bg-red-600 hover:border-red-500">
              <a href="#" onClick={handleSignOut}>
                Sign out
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="ml-6">{children}</main>
    </>
  );
}
export default PortalLayout;
