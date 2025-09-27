import React from "react";


const Footer = () => {
  return (
    <div className="bg-black text-white flex flex-col justify-center bottom-0 items-center  w-full">
      <div className="logo font-bold text-white text-2xl">
        <div className="flex">
          <h1 className="">Pass</h1>
          <h1 className=" text-green-700">Ward</h1>
        </div>
      </div>
      <div className="flex justify-center items-center">
     
       
         <img
          className="w-6 mx-2 "
          src="icons/heart.png"
          alt=""
          />
          Created by Mohammed Faisal
      </div>
    </div>
  );
};

export default Footer;
