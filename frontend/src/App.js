import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from './pages/Products';
import ProductsDetail from './pages/ProductDetail';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import Basket from './pages/Basket';
import NoPage from './pages/NoPage';
import Home from './pages/Home';
import Footer from './components/Footer';
import ProtectedRouteAdmin from './pages/Admin/ProtectedRouteAdmin';
import Admin from './pages/Admin';
import HomeAdmin from './pages/Admin/HomeAdmin';
import ProductsAdmin from './pages/Admin/ProductsAdmin';
import OrdersAdmin from './pages/Admin/OrdersAdmin';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/:product_id" element={<ProductsDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route  element={<ProtectedRoute />}> 
          <Route element={<Profile/>} path="/profile"/>
          </Route>
          <Route path="/admin" element={<ProtectedRouteAdmin />}> 
              <Route path="/admin" element={<HomeAdmin />} />
              <Route path="products" element={<ProductsAdmin />} />
              <Route path="orders" element={<OrdersAdmin />} />
          </Route>
          <Route path="/basket" element={<Basket />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
