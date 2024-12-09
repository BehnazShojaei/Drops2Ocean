import { Link, Outlet, useNavigate } from "react-router-dom";
import "../components/Navbar.css";
import { useAuth } from "../hooks/use-auth.js";


function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null }); // reset
    navigate("/");
  };


  return (
    <>
      <nav id="NavBar">
        <Link to="/contact">Contact</Link>
        <Link to="/">Drops2Ocean</Link>

        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>) : (
          <Link to="/login">Login</Link>

        )}
        {auth.token && <Link to="/newproject">Create a project</Link>}
      </nav>

      {/* Child components will render here */}
      <Outlet />
    </>
  );
}

export default NavBar;