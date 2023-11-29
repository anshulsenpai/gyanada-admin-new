import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Layout from "./Layout";
import AgentManager from "./pages/AgentManager";
import StudentManager from "./pages/StudentManager";
import Event from "./pages/Event";
import Profile from "./pages/Profile";
import StudentForm from "./components/StudentForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout>{<App />}</Layout>,
  },
  {
    path: "/agent-manager",
    element: <Layout>{<AgentManager />}</Layout>,
  },
  {
    path: "/student-manager",
    element: <Layout>{<StudentManager />}</Layout>,
  },
  {
    path: "/events",
    element: <Layout>{<Event />}</Layout>,
  },
  {
    path: "/profile",
    element: <Layout>{<Profile />}</Layout>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/student-form",
    element: <StudentForm />,
  },
  {
    path: "*",
    element: <h1>404 Humpe toh hai hi no</h1>,
  },
]);
