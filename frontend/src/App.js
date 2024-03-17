import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './pages/Auth/Home';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
