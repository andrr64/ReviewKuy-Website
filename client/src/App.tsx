import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/registration";
import Home from "./pages/home";
import Footer from "./components/footer";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App
