import React from 'react';
import Navbar from '../Navbar';
import Hero from './hero';
import HorizontalScrollCategories from './scroll';
import Services from './services';

function Home() {
    return ( 
     <>
     <Navbar/>
     <Hero/>
     <HorizontalScrollCategories/>
     <Services/>
     </>
     );
}

export default Home;    