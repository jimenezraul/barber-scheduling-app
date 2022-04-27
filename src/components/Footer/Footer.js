import React from "react";

const Footer = () => (
  <div className="bg-gray-500 dark:bg-gray-800 w-full border-t dark:border-gray-700">
    <div className="container mx-auto">
      <div className="text-sm p-5 flex flex-wrap justify-center w-full text-gray-300">
        <div className="lg:text-left p-5 w-full sm:w-6/12 lg:w-3/12">
          <h1 className="text-lg text-gray-100 font-bold pb-2">Services</h1>
          <p className="text-white-50 footer-p">Regular Haircut</p>
          <p className="text-white-50 footer-p">Skin Fade</p>
          <p className="text-white-50 footer-p">Skin Blowout | Taper</p>
          <p className="text-white-50 footer-p">Kid`s Haircut</p>
          <p className="text-white-50 footer-p">Beard Trim | Shave</p>
          <p className="text-white-50 footer-p">Shape-up | Line-up</p>
          <p className="text-white-50 footer-p">Eyebrows</p>
          <p className="text-white-50 footer-p">We do any type of Haircut.</p>
        </div>
        <div className="lg:text-left p-5 w-full sm:w-6/12 lg:w-3/12">
          <h1 className="text-lg text-gray-100 font-bold pb-2">
            Working Hours
          </h1>
          <p className="text-white-50 footer-p">Sunday -- Day off --</p>
          <p className="text-white-50 footer-p">Monday -- Day off --</p>
          <p className="text-white-50 footer-p">Tuesday -- Day off --</p>
          <p className="text-white-50 footer-p">Wednesday 12pm-7pm</p>
          <p className="text-white-50 footer-p">Thrusday 10am-7pm</p>
          <p className="text-white-50 footer-p">Friday 10am-7pm</p>
          <p className="text-white-50 footer-p">Saturday 10am-7pm</p>
        </div>
        <div className="lg:text-left p-5 w-full lg:w-6/12">
          <h1 className="text-lg text-gray-100 font-bold pb-2">
            Customer Satisfaction
            <span className="pl-5 space-x-1">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </span>
          </h1>
          <p className="text-white-50 footer-p">
            As a Professional Barber, customer satisfaction is my first
            priority. I am committed to provide the best service and quality to
            all my customers.
          </p>
        </div>
        <div>
          <p className="dark:text-gray-500 text-center py-3 text-xs">
            <span>
              <a href="/privacy">Privacy</a>
            </span>{" "}
            | <a href="/term">Terms and Conditions</a>
          </p>

          <p className="mb-5 dark:text-gray-500 font-bold text-xs">
            © 2018-2021 RaulTheBarber. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
