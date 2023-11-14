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
      }else {
        const errorData = await response.json(); // Obtén más detalles del error si está disponible
        console.log("Error during signout:", errorData);
      }
    } catch (error) {
      console.log("Error during signout:", error);
    }
  }
  return (
    <>
      <header className="w-full h-20">
        <nav>
          <ul className="flex justify-start">
            <li className="m-4 bg-white rounded-lg font-bold border-2 border-blue-700">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="m-4 bg-white rounded-lg font-bold border-2 border-blue-700">
              <Link to="/me">Profile</Link>
            </li>
            <li className="m-4 bg-white rounded-lg font-bold border-2 border-blue-700">
              <Link to="/me">{auth.getUser()?.userName ?? ""}</Link>
            </li>
            <li className="m-4 bg-white rounded-lg font-bold border-2 border-blue-700">
              <a href="#" onClick={handleSignOut}>
                Sign out
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main  className="ml-6">{children}</main>
    </>
  );
}
export default PortalLayout;
