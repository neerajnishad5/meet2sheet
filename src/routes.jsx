import Home from "./pages/Home";
import ViewTranscript from "./pages/ViewTranscript";
import ProcessTranscript from "./pages/ProcessTranscript";
import Meetings from "./pages/Meetings";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import TranscriptActions from "./pages/TranscriptActions";

const routes = [
  { path: "/", element: <Home /> },
  // { path: "/view-transcript", element: <ViewTranscript /> },
  { path: "/process-transcript", element: <ProcessTranscript /> },
  { path: "/view-transcript", element: <TranscriptActions /> },
  { path: "/meetings", element: <Meetings /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/reports", element: <Reports /> },
];

export default routes;
