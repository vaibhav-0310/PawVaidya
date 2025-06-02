import "./App.css";
import Signup from "./pages/user/signup";
import Login from "./pages/user/login";
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/home/home";
import Phr from "./pages/phr/phr";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/phr" element={<Phr/>}/>
      <Route path="*" element={<h1>404 Not Found</h1>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
