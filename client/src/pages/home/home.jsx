import React from 'react';
import Hero from './hero';
import HorizontalScrollCategories from './scroll';
import Services from './services';
import Footer from "../../utils/footer";
import Gallery from '../../utils/gallery';
import { data } from 'react-router';

function Home() {
    return ( 
     <>
     <Hero/>
     <HorizontalScrollCategories/>
     <Services/>
     <Gallery/>
     <Footer/>
     </>
     );
}

export default Home;    