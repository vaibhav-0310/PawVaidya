import "./App.css";
import Signup from "./pages/user/signup";
import Login from "./pages/user/login";
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/home/home";
import Phr from "./pages/phr/phr";
import Essentials from "./pages/essentials/essentials";
import Error from "./pages/error";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/phr" element={<Phr/>}/>
       <Route path="/essentials" element={<Essentials/>}/>
      <Route path="*" element={<Error/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
