import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProcessTranscript from "./pages/ProcessTranscript";
import ViewTranscript from "./pages/ViewTranscript";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Header />
      <div className="bg-[#fff5f3] flex flex-col items-center justify-center p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-transcript" element={<ViewTranscript />} />
          <Route path="/process-transcript" element={<ProcessTranscript />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
