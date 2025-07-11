import React from "react";
import hero from "../../assests/hero1.webp";
import dog from "../../assests/dog.webp";

function Hero() {
  return (
    <>
      <div className="container hero">
        <div className="row">
          <div className="col-12 col-lg-6 hero-left">
            &#128308; Vertic pet solutions
            <br />
            <br></br>
            <span style={{ fontSize: "50px", fontWeight: "bold" }}>
              Your reliable
              <br /> partner for pet <br />
              <span className="back">wellness</span>
            </span>
            <br />
            <br />
            At our clinic, we prioritize the health and happiness of your
            <br /> beloved pets. Our expert veterinarians are dedicated to
            <br /> providing love.<br></br>
            <br />
            <div className="button-wrapper" style={{ width: "fit-content" }}>
              <button className="btn btn-dark but-2">Contact us</button>
              <button className="btn btn-info but-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  viewBox="0 0 28 28"
                  fill="none"
                  class="button_icon"
                >
                  <path
                    d="M9.75569 11.3981C9.75569 9.83007 8.48393 8.55859 6.91565 8.55859C5.34737 8.55859 4.07617 9.83007 4.07617 11.3981C4.07617 12.9672 5.34709 14.2381 6.91565 14.2381C8.48421 14.2381 9.75569 12.9672 9.75569 11.3981ZM21.0803 9.11327C19.5123 9.11327 18.2408 10.3848 18.2408 11.9528C18.2408 13.5219 19.5123 14.7922 21.0803 14.7922C22.6486 14.7922 23.9201 13.5219 23.9201 11.9528C23.9201 10.3848 22.6489 9.11327 21.0803 9.11327ZM18.5012 15.1137C18.3038 14.8704 18.0244 14.5887 17.7035 14.2933C16.8473 13.1836 15.508 12.4657 13.9983 12.4657C12.6545 12.4657 11.4466 13.0347 10.5929 13.9413C10.1079 14.3633 9.67673 14.7752 9.40233 15.114L9.21865 15.3382C8.36185 16.3829 7.29533 17.6827 7.30317 19.8882C7.31073 21.9364 8.97869 23.6038 11.021 23.6038C11.5878 23.6051 12.1472 23.4753 12.6555 23.2248C13.1639 22.9742 13.6075 22.6096 13.9518 22.1593C14.2961 22.6097 14.7398 22.9744 15.2484 23.2249C15.7569 23.4755 16.3165 23.6052 16.8834 23.6038C18.9249 23.6038 20.5925 21.9367 20.6004 19.8882C20.6082 17.6827 19.5414 16.3829 18.6849 15.3382L18.5012 15.1137Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M14.1974 10.6545C15.9255 10.6545 17.3264 9.25358 17.3264 7.52548C17.3264 5.79739 15.9255 4.39648 14.1974 4.39648C12.4693 4.39648 11.0684 5.79739 11.0684 7.52548C11.0684 9.25358 12.4693 10.6545 14.1974 10.6545Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="col-12 col-lg-6 d-none d-sm-block hero-right">
            <div className="row">
              <div className="col-2">
                <img src={dog} className="hero-dog"/>
              </div>
              <div className="col-10">
                <img src={hero} className="hero-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
