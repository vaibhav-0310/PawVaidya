import React from 'react';
import Navbar from '../Navbar';
import Hero from './hero';
import HorizontalScrollCategories from './scroll';
import Services from './services';
import Footer from "../footer";
import Gallery from '../gallery';
import { data } from 'react-router';

function Home() {
    return ( 
     <>
     <Navbar/>
     <Hero/>
     <HorizontalScrollCategories/>
     <Services/>
     <Gallery/>
     <Footer/>
     </>
     );
}

export default Home;    