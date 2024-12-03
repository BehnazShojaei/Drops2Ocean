import { Link, Outlet } from "react-router-dom";

function NavBar() {
  return (
    <div id="NavBar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Log In</Link>
      </nav>
      {/* React Router will pass components into the <Outlet /> based on the path */}
      <Outlet />
    </div>
  );
}

export default NavBar;