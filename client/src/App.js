import { BrowserRouter as Router,Navigate, Routes,Route } from 'react-router-dom';
import { useSelector } from "react-redux"
import ErrorPage from './Error';
import Home from './Home';
import LoginPage from './Login';
import Signup from './SignUp';
import Sidebar from './Navigation/header';
import Footer from './Navigation/footer';

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <>
      <Router>
        { (isAuth) ? <Sidebar/> : false }
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
        { (isAuth) ? <Footer/> : false }
      </Router>
    </>
  );
}

export default App;