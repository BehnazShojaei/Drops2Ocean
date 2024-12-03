import { Link, Outlet } from "react-router-dom";
import "/src/components/Navbar.css";



function NavBar() {
  return (
    <>
      <nav id="NavBar">
        <Link to="/contact">Contact</Link>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
      {/* React Router will pass components into the <Outlet /> based on the path */}
      <Outlet />
    </>

  );
}

export default NavBar;