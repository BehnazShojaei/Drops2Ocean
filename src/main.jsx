import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Here we import out pages
import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import SignUpForm from "./components/SignUpForm.jsx"; // Import the Sign-Up component


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