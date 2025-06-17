import "./App.css";
import Signup from "./pages/user/signup";
import Login from "./pages/user/login";
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/home/home";
import Phr from "./pages/phr/phr";
import Essentials from "./pages/essentials/essentials";
import Error from "./pages/error";
import Cart from "./pages/essentials/cart";
import Blogs from "./pages/blogs/Blogs";
import Vet from "./pages/vet/Vet";
import CreateBlog from "./pages/blogs/create";
import Navbar from "./utils/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/phr" element={<Phr/>}/>
       <Route path="/blog" element={<Blogs/>}/>
       <Route path="/essentials" element={<Essentials/>}/>
       <Route path="/cart" element={<Cart/>}/>
       <Route path="/vet" element={<Vet/>}/>
       <Route path="/create/blog" element={<CreateBlog/>}/>
      <Route path="*" element={<Error/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
