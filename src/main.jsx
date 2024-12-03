import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Here we import out pages
import HomePage from "/src/pages/homepage/HomePage.jsx";
import ProjectPage from "/src/pages/projectpage/ProjectPage.jsx";
import LoginPage from "/src/pages/userpage/LoginPage.jsx";
import NavBar from "/src/components/NavBar.jsx";
import { AuthProvider } from "/src/components/AuthProvider.jsx";
import SignUpForm from "/src/components/SignUpForm.jsx"; // Import the Sign-Up component


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
      { path: "*", element: <h1>404: Page Not Found</h1> },
      { path: "/signup", element: <SignUpForm /> }, // Sign-Up route


    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* Here we wrap our app in the router provider so the pages render */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);