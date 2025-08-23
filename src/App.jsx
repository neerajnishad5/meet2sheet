import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import routes from "./routes";

export default function App() {
  return (
    <Router>
      <Header />
      <div className="bg-[#fff5f3] flex flex-col items-center justify-center p-6">
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
