import React from "react";
import Hero from "./hero";
import Footer from "../../utils/footer";
import Items from "./items";
import axios from "axios";


function Essentials() {

  let [essentialsData,setEssentialsData] = React.useState([]);
  
  React.useEffect(() => {
    const fetchEssentials = async () => {
      try {
        const response = await axios("/api/essentials");
        const data = response.data;
        setEssentialsData(data);
      } catch (error) {
        console.error("Error fetching essentials:", error);
      }
    };



    fetchEssentials();
  }, []);
  return (
    <>
      <Hero />
      <div className="container my-5">
        <div className="row justify-content-start">
          {essentialsData.map((item, index) => (
            <Items
              key={index}
              title={item.title}
              image={item.image}
              price={item.price}
              type={item.type}
            />
          ))}
        </div>
      </div>
    
      <Footer />
    </>
  );
}

export default Essentials;
