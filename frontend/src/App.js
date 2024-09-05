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
import ProductsAdmin from './pages/Admin/ProductsAdmin';
import OrdersAdmin from './pages/Admin/OrdersAdmin';
import OrderDetailAdmin from './pages/Admin/OrderDetailAdmin';
import ProductDetailAdmin from './pages/Admin/ProductDetailAdmin';
import NewProduct from './pages/Admin/ProductsAdmin/newProduct';

function App() {
  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:product_id" element={<ProductsDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route  element={<ProtectedRoute />}> 
          <Route element={<Profile/>} path="/profile"/>
          </Route>
          <Route path="/admin" element={<ProtectedRouteAdmin />}> 
              {/* <Route path="home" index element={<HomeAdmin />} /> */}
              <Route path="products" element={<ProductsAdmin />} />
              <Route path="products/:product_id" element={<ProductDetailAdmin />} />
              <Route path="products/new" element={<NewProduct />} />
              <Route path="orders" element={<OrdersAdmin />} />
              <Route path="orders/:id" element={<OrderDetailAdmin />} />
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
