import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import FeedBack from './Components/FeedBack';
import ChangePassword from './Components/ChangePassword';
import Admin from './Components/Admin';
import ForgotPassword from './Components/ForgotPassword';
import UpdateStudent from './Components/UpdateStudent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="*" element={<Home/>}/>
        <Route path='/feedback' element={<FeedBack/>}/>
        <Route path='/cp' element={<ChangePassword/>}/>
        <Route path='/al' element={<Admin/>}/>
        <Route path="/sd" element={<UpdateStudent/>}/>
        <Route path='*' element={<Home/>}/>

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;