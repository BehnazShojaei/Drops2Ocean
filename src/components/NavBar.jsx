import { Link, Outlet } from "react-router-dom";
import "/src/components/Navbar.css";



function NavBar() {
  return (
    <div id="NavBar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </nav>
      {/* React Router will pass components into the <Outlet /> based on the path */}
      <Outlet />
    </div>
  );
}

export default NavBar;