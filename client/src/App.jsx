import { useState } from "react";
import image from "./assests/image.svg";
import "./App.css";
import Signup from "./pages/signup";
import Login from "./pages/login";
import {BrowserRouter, Route, Routes} from "react-router";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
