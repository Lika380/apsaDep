
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {AdminPanel } from "./admin/AdminPanel";
import { Profile } from "./pages/Profile";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import { CartProvider } from "./components/CartContext";
import { SearchProvider } from "./components/SearchContext";
import { AuthProvider } from "./components/AuthContext";
import AccommodationPolicy from "./components/information/AccomodationPolicy";
import Contacts from "./pages/Contacts";
import Projects from "./pages/Projects";
import InvestorPage from "./pages/InvestorPage";
import MakersPage from "./pages/MakersPage";
import ProductDetails from "./pages/ProductDetails";

function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <div className="app">
            <BrowserRouter>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/cartPage" element={<CartPage />} />
                  <Route path="/catalog" element={<HomePage />} />
                  <Route path="/privacy" element={<AccommodationPolicy />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/investorPage" element={<InvestorPage />} />
                  <Route path="/makersPage" element={<MakersPage />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                </Routes>
              </main>
              <Footer />
            </BrowserRouter>
          </div>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
