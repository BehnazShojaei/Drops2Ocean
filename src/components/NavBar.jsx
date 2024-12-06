import { Link, Outlet } from "react-router-dom";
import "../components/Navbar.css";
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
        <Link to="/">Drops2Ocean</Link>
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>) : (
          <Link to="/login">Login</Link>

        )}


        {auth.token ? (
          <>
            <Link to="/createproject">Create a project</Link>
            <Link to="/pledge">Pledge</Link>
          </>
        ) :
          null
        }

        {/* // make create project in homepage and make a pledge */}
      </nav>
      {/* React Router will pass components into the <Outlet /> based on the path */}
      <Outlet />
    </>

  );
}

export default NavBar;