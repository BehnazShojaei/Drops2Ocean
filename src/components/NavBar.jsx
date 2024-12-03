import { Link, Outlet } from "react-router-dom";
import "/src/components/Navbar.css";
import { useAuth } from "../hooks/use-auth.js";



function NavBar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };
  return (
    <>
      <nav id="NavBar">
        <Link to="/contact">Contact</Link>
        <Link to="/">Home</Link>
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>) : (
          <Link to="/login">Login</Link>
        )}

      </nav>
      {/* React Router will pass components into the <Outlet /> based on the path */}
      <Outlet />
    </>

  );
}

export default NavBar;