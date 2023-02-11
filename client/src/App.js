import { BrowserRouter as Router,Navigate, Routes,Route } from 'react-router-dom';
import { useSelector } from "react-redux"
import ErrorPage from './Error';
import Signup from './Login/signup';
import LoginPage from "./Login/login";
import Home from './Page/home';
import Employee from './Page/employee';
import Sidebar from './Navigation/header';
import Footer from './Navigation/footer';

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
      <div className="wrapper">
        <Router>
          {isAuth ? <Sidebar /> : false}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/employee"
              element={isAuth ? <Employee /> : <Navigate to="/" />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          {isAuth ? <Footer /> : false}
        </Router>
      </div>
  );
}

export default App;