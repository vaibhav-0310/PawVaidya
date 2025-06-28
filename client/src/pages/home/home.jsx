import React,{useState} from 'react';
import Hero from './hero';
import HorizontalScrollCategories from './scroll';
import Services from './services';
import Footer from "../../utils/footer";
import Gallery from '../../utils/gallery';
import Chatbot from '../../utils/Chatbot';

function Home() {
     const [showChatbot, setShowChatbot] = useState(false);

    // Function to toggle chatbot visibility
    const toggleChatbot = () => {
        setShowChatbot(prev => !prev);
    };
    return ( 
     <>
     <Hero/>
     <HorizontalScrollCategories/>
     <Services/>
     <Gallery/>
      <button className="chatbot-toggle-button" onClick={toggleChatbot}>
                {showChatbot ? '✕' : '💬'}
            </button>

            <div className={`chatbot-popup-container ${showChatbot ? 'show' : ''}`}>
                <Chatbot />
            </div>
     <Footer/>
     </>
     );
}

export default Home;    