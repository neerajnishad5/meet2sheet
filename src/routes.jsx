import Home from "./pages/Home";
import Meetings from "./pages/Meetings";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import TranscriptActions from "./pages/TranscriptActions";
import SummarizeTranscript from "./pages/SummarizeTranscript";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/summarize-transcript", element: <SummarizeTranscript /> },
  { path: "/view-transcript", element: <TranscriptActions /> },
  { path: "/meetings", element: <Meetings /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/reports", element: <Reports /> },
];

export default routes;
