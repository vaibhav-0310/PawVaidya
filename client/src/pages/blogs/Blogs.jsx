import React from 'react';
import Navbar from "../Navbar.jsx";
import Footer from "../footer.jsx";
import Container from './container.jsx';
import Card from './card.jsx';
import { useState,useEffect } from 'react';
import axios from 'axios';

function Blogs() {
    let [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        const response=axios.get("/api/blog")
        response.then((res)=>{
            setBlogs(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    return ( 
        <>
        <Navbar />
        <Container />
         <div className="container my-5">
        <div className="row justify-content-start">
          {blogs.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              image={item.image}
              description={item.description}
            />
          ))}
        </div>
      </div>
        <Footer />
        </>
     );
}

export default Blogs;