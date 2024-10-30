import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute dengan MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
