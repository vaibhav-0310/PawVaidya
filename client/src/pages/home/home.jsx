import React, { useState } from "react";
import Hero from "./hero";
import HorizontalScrollCategories from "./scroll";
import Services from "./services";
import Footer from "../../utils/footer";
import Gallery from "../../utils/gallery";


function Home() {
  return (
    <>
      <Hero />
      <HorizontalScrollCategories />
      <Services />
      <Gallery />
      <Footer />
    </>
  );
}

export default Home;
