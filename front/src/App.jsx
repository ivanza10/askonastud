import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/styles/bootstrap/css/bootstrap.min.css";
import Footer from "./assets/components/Footer";
import Header from "./assets/components/Header";
import MainPage from "./assets/components/MainPage";
import Agreement from "./assets/components/Agreement";
import NotFound from "./assets/components/NotFound";
import "./assets/styles/App.sass";

function App() {
  return (
    <>
      <Router>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/123" element={<Agreement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      </Router>
    </>
  );
}

export default App;
