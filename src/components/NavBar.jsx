import { Link, Outlet } from "react-router-dom";
import "../components/Navbar.css";
import { useAuth } from "../hooks/use-auth.js";
import { clearToken } from "../api/utils/localStorageUtils.js";


function NavBar() {
  const { auth, setAuth } = useAuth();


  const handleLogout = () => {
    clearToken();
    setAuth({ token: null }); // reset
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

        {/* Conditional rendering for Login/Logout */}

        {auth.token ? (
          <>
            <Link to="/newproject">Create a project</Link>

            {/* <Link to="/pledge">Pledge</Link> */}
          </>
        ) :
          null
        }

      </nav>
      {/* React Router will pass components into the <Outlet /> based on the path */}
      <Outlet />
    </>

  );
}


export default NavBar;