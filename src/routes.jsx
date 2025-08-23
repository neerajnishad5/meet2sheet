import Home from "./pages/Home";
import ViewTranscript from "./pages/ViewTranscript";
import ProcessTranscript from "./pages/ProcessTranscript";
import Meetings from "./pages/Meetings";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/view-transcript", element: <ViewTranscript /> },
  { path: "/process-transcript", element: <ProcessTranscript /> },
  { path: "/meetings", element: <Meetings /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/reports", element: <Reports /> },
];

export default routes;
