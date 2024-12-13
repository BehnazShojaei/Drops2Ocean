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
      {/* Left side */}

      <nav id="NavBar">
        <Link to="/">Drops2Ocean</Link>
        <div>    {/* Right side */}

          {auth.token ? (
            <Link to="/" onClick={handleLogout}>
              Log Out
            </Link>) : (
            <Link to="/login">Login</Link>

          )}
          {auth.token && <Link to="/newproject">Create a project</Link>}

          <Link to="/" onClick={() => {
            navigate("/");
            setTimeout(() => {
              const element = document.getElementById("project-list");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }, 100); // Wait to ensure the homepage is rendered
          }}>
            Featured Projects
          </Link>

          {/* link to the featured project there is a div in homepage called project list I want to navigate there */}
          {/* <div id="project-list"></div> */}
          <Link to="/contact">Contact</Link>
        </div>
      </nav>


      <Outlet />
    </>
  );
}

export default NavBar;