import React from "react";
import "./header.css";
import logo from "../../assets/img/Logo-face.png";
import Settings from "./Settings";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      logo: logo,
      menu: "hidden",
    };
  }
  setIsOpen() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
    if (!this.state.isOpen) {
      setTimeout(
        () =>
          this.setState({
            menu: "z-0 p-5",
          }),
        200
      );
    } else {
      this.setState({
        menu: "hidden",
      });
    }
  }

  render() {
    let h_path = window.location.pathname;
    return (
      <div>
      <div className="fixed w-full text-gray-500 bg-gray-200 dark:bg-gray-800 dark:text-gray-300 shadow z-10 rounded-b-lg">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex h-16">
              <a href="/">
                <img
                  src={this.state.logo}
                  className="h-16 p-2 ml-2"
                  alt=""
                ></img>
              </a>
            </div>
            <div className="hidden md:flex p-1 bg-gray-400 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-inner rounded-full">
      <div className="hidden md:flex items-center">
        <a
          href="/"
          className={`py-2 px-8 ${
            h_path === "/"
              ? "dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-full shadow"
              : "text-gray-50 dark:hover:text-gray-100 hover:text-gray-200 transition duration-300"
          } border-green-500 font-semibold`}
        >
          Home
        </a>
        <a
          href="/appointments"
          className={`py-2 px-8 ${
            h_path === "/appointments"
              ? "dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-full shadow"
              : "text-gray-50 dark:hover:text-gray-100 hover:text-gray-200 transition duration-300"
          } border-green-500 font-semibold`}
        >
          BookNow
        </a>
        <a
          href="/gallery"
          className={`py-2 px-8 ${
            h_path === "/gallery"
              ? "dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-full shadow"
              : "text-gray-50 dark:hover:text-gray-100 hover:text-gray-200 transition duration-300"
          } border-green-500 font-semibold`}
        >
          Gallery
        </a>
        <a
          href="/prices"
          className={`py-2 px-8 ${
            h_path === "/prices"
              ? "dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-full shadow"
              : "text-gray-50 dark:hover:text-gray-100 hover:text-gray-200 transition duration-300"
          } border-green-500 font-semibold`}
        >
          Prices
        </a>
      </div>
    </div>

            {/* settings Gear to login and theme mode */}

            <div className="flex mr-5">
              <Settings />
              <div onClick={() => this.setIsOpen()} className="flex item-center">
                <div className="md:hidden flex items-center">
                  <button className="p-1 outline-none mobile-menu-button border rounded border-gray-300 dark:border-gray-600">
                    <svg
                      className=" w-6 h-6 text-gray-500 hover:text-gray-400 "
                      x-show="!showMenu"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              transition: "all .2s ease-in",
              height: this.state.isOpen ? "300px" : "0",
            }}
            className="relative transition transform mobile-menu text-1xl"
          >
            <ul className={this.state.menu}>
              <li>
                <a
                  href="/"
                  className={`${
                    h_path === "/" ? "border-l-4 border-blue-500" : ""
                  } rounded pl-5 text-lg block px-2 py-4 text-white font-semibold`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/appointments"
                  className={`${
                    h_path === "/appointments"
                      ? "border-l-4 border-blue-500"
                      : ""
                  } rounded pl-5 text-lg block px-2 py-4 text-white font-semibold`}
                >
                  BookNow
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className={`${
                    h_path === "/gallery" ? "border-l-4 border-blue-500" : ""
                  } rounded pl-5 text-lg block px-2 py-4 text-white font-semibold`}
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="/prices"
                  className={`${
                    h_path === "/prices" ? "border-l-4 border-blue-500" : ""
                  } rounded pl-5 text-lg block px-2 py-4 text-white font-semibold`}
                >
                  Prices
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div> 
    );
  }
}

export default Header;
