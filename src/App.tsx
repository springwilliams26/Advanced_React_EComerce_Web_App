import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BackToTopButton from "./components/BackToTopButton";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>

      <BackToTopButton />
    </BrowserRouter>
  );
}

export default App;
