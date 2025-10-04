import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import MyResumes from "../pages/MyResumes";
import CreateResumeMultiStep from "../pages/CreateResume";
import Profile from "../pages/Profile";
import AIResumeTips from "../pages/AIResumeTips";
import CareerTools from "../pages/CareerTools";
import ErrorPage from "../pages/ErrorPage";
import EditResume from "../pages/EditResume";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-resumes",
    element: (
      <ProtectedRoute>
        <MyResumes />
      </ProtectedRoute>
    ),
  },
  {
   path: "/edit-resume/:id",
   element: (
     <ProtectedRoute>
       <EditResume/>
     </ProtectedRoute>
   ),
 },
  {
    path: "/create-resumes",
    element: (
      <ProtectedRoute>
        <CreateResumeMultiStep />
      </ProtectedRoute>
    ),
  },
  
  {
    path: "/create-resume",
    element: (
      <ProtectedRoute>
        <CreateResumeMultiStep />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ai-tips",
    element: (
      <ProtectedRoute>
        <AIResumeTips />
      </ProtectedRoute>
    ),
  },
  {
    path: "/career-tools",
    element: (
      <ProtectedRoute>
        <CareerTools />
      </ProtectedRoute>
    ),
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);

export default router;
