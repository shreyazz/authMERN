import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SecretPage from "./pages/SecretPage";
const App = () => {
  const user = localStorage.getItem('token');

  return <div>
  <BrowserRouter>
    <Routes>
        {user && <Route path="/" exact element={<HomePage/>}/>}
        {user && <Route path="/secret" exact element={<SecretPage/>}/>}
        <Route path="/login"  element={<LoginPage/>}/>
        <Route path="/register"  element={<RegisterPage/>}/>
        <Route path="/" exact element={<Navigate replace to='/login'/>}/>
    </Routes>
  </BrowserRouter>
  </div>;
};

export default App;
