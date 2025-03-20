import React from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";


const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
           
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
         
         <NavLink to="/" > <li>Home</li> </NavLink>
         <NavLink to="/about" > <li>About us</li> </NavLink>
         <NavLink to="#" > <li>Delivery</li> </NavLink>
         <NavLink to="#" >  <li>Privacy policy</li>
         </NavLink>
           
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 35655 13015</li>
            <li>info@thriftkart.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024 @ thriftkart.com - All Right Reserved Design by JAY PRAJAPATI</p>
      </div>
    </div>
  );
};

export default Footer;