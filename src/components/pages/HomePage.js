import React from "react";
import "./Homepage.css";
import Pic1 from "../../assets/img/IMG_3392.png";
import Pic2 from "../../assets/img/IMG_3391.png";
import Pic3 from "../../assets/img/IMG_3393.png";

class HomePage extends React.Component {
  render() {
    return (
      <div className="w-full">
        <div className="relative flex flex-wrap justify-center bg-pic">
          <div className="flex flex-col justify-center items-center w-full card-img bg-gray-300">
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-11/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mt-24">
                <h1 className="mb-2 font-bold text-3xl text-gray-200 my-font2">
                  Welcome
                </h1>
                <h1 className="shadow-lg mb-5 border border-gray-500 rounded bg-gray-800 filter drop-shadow-lg text-center font-bold py-2 text-4xl text-gray-300 my-font">
                  <span className="text-red-600">Raul</span>
                  TheBarber
                </h1>
                <a
                  href="/appointments"
                  className="block text-center text-gray-200 hover:bg-gray-200 hover:text-gray-700 font-bold rounded border py-3 text-2xl my-font2 uppercase"
                >
                  Book Now
                </a>
                <div className="mt-6 w-full text-center">
                  <div
                    className="fb-like"
                    data-href="https://raulthebarber.net"
                    data-width=""
                    data-layout="button_count"
                    data-action="like"
                    data-size="large"
                    data-share="true"
                  ></div>
                  <div className="mt-5 pt-5 flex flex-wrap justify-center divide-y-2 border-t border-gray-500">
                    <div className="w-full text-center flex justify-center items-center">
                      <a href="https://www.facebook.com/raulthebarber81">
                        <i className="mr-3 text-3xl text-gray-100 bi bi-facebook"></i>
                      </a>
                      <a href="https://www.instagram.com/raul.thebarber/">
                        <i className="ml-3 text-3xl text-gray-100 bi bi-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom-0 flex flex-col justify-end h-24 absolute animate-bounce">
              <i className="text-gray-300 text-3xl bi bi-caret-down-fill"></i>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center bg-gray-200 dark:bg-gray-700 py-10">
          <div className="w-10/12 md:w-3/12 p-1">
            <img className="mx-auto rounded-lg" src={Pic1} alt="" />
          </div>
          <div className="w-5/12 md:w-3/12 p-1">
            <img className="mx-auto rounded-lg" src={Pic2} alt="" />
          </div>
          <div className="w-5/12 md:w-3/12 p-1">
            <img className="mx-auto rounded-lg" src={Pic3} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
