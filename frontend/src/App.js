import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from './pages/Products';
import ProductsDetail from './pages/ProductDetail';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/:product_id" element={<ProductsDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route  element={<ProtectedRoute />}> 
          <Route element={<Profile/>} path="/profile"/>
          </Route>
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
