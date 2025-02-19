import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Here we import out pages
import HomePage from "./pages/homepage/HomePage.jsx";
import ProjectPage from "./pages/projectpage/ProjectPage.jsx";
import LoginPage from "./pages/userpage/LoginPage.jsx";
import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import NotFoundPage from "./pages/homepage/NotFoundPage.jsx";
import MakePledgeForm from "./components/PledgeForm.jsx";
import NewProjectPage from "./pages/projectpage/NewProjectPage.jsx";
import UserProfile from "./components/UserProfile.jsx"
import SignupPage from "./pages/userpage/SignupPage.jsx";

// Here we create our router and tell it whats pages to render at what path
const router = createBrowserRouter([
  // These are the three routes!
  {
    path: "/",
    // Putting our NavBar as the main component will causes the children to render in the <Outlet />
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/newproject", element: <NewProjectPage /> }, // Fixed this line?
      { path: "/signup", element: <SignupPage /> },
      { path: "*", element: <NotFoundPage />, },
      { path: "/pledge", element: < MakePledgeForm /> },
      { path: "/profile", element: < UserProfile /> },


    ]

  }]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* Here we wrap our app in the router provider so the pages render */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);