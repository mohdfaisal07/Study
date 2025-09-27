import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useRef, useEffect } from "react";
import { ToastContainer, toast ,Bounce } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager2 = () => {
  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const passwordRef = useRef();

  useEffect(() => {
    let passwords = localStorage.getItem("password");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  //Eye icon change
  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  //save password
  const savePassword = () => {
    if(form.site.length >3 && form.username.length >3 &&form.password.length >3){
    setpasswordArray([...passwordArray,{...form, id: uuidv4()}]);
    localStorage.setItem("password", JSON.stringify([...passwordArray,{...form, id: uuidv4()}]));
    console.log([...passwordArray,form]);
    setform({ site: "", username: "", password: "" })
     toast("Password saved!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });}
    else{
        toast('Error: password not saved')
    }
  };

  //Delete password
  const deletePassword = (id) => {
let c= confirm("are you sure you want to delete the password ?")
    if(c){
      setpasswordArray(passwordArray.filter(item=>item.id!==id))
      localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    }
    toast("Password deleted!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };


  //Edit password
  const editPassword = (id) => {
  setform(passwordArray.filter(i=>i.id===id)[0])
   setpasswordArray(passwordArray.filter(item=>item.id!==id))
  };



  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
  <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Bounce}
  />

  <div className="relative min-h-[88vh] md:min-h-[93vh] w-full bg-neutral-400 flex-col justify-center">
    {/* Branding */}
    <div className="branding flex flex-col md:flex-row justify-center items-center gap-4 bg-neutral-400 max-w-[90%] md:max-w-4xl py-3 mx-auto">
      <div className="logo">
        <img src={logo} className="h-16 w-16 md:h-20 md:w-20" />
      </div>
      <div className="details text-center md:text-left">
        <div className="flex justify-center md:justify-start">
          <h1 className="text-4xl md:text-5xl font-bold">Pass</h1>
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">Ward</h1>
        </div>
        <p className="text-lg md:text-xl">Warden of your passwords</p>
      </div>
    </div>

    {/* Form */}
    <div className="flex flex-col gap-4 justify-center items-center bg-neutral-400 max-w-[90%] md:max-w-4xl py-6 mx-auto">
      {/* Website */}
      <input
        value={form.site}
        onChange={handleChange}
        className="bg-neutral-300 px-2 rounded-2xl border w-full md:w-4/6"
        type="text"
        placeholder="Enter website URL"
        name="site"
      />

      {/* Username + Password */}
      <div className="flex flex-col md:flex-row gap-3 w-full md:w-4/6">
        <input
          value={form.username}
          onChange={handleChange}
          className="px-2 bg-neutral-300 w-full md:w-1/2 rounded-2xl border"
          type="text"
          placeholder="Enter username"
          name="username"
        />
        <div className="relative w-full md:w-1/2">
          <input
            ref={passwordRef}
            value={form.password}
            onChange={handleChange}
            className=" bg-neutral-300 px-2 w-full rounded-2xl border"
            type="password"
            placeholder="Enter password"
            name="password"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
            <img
              ref={ref}
              className="p-1"
              onClick={showPassword}
              width={23}
              src="icons/eye.png"
              alt="eye"
            />
          </span>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={savePassword}
        className="text-sm font-bold flex justify-center items-center bg-green-600 rounded-full mx-auto px-7 py-2 cursor-pointer"
      >
        <lord-icon
          src="https://cdn.lordicon.com/efxgwrkc.json"
          trigger="hover"
          style={{ width: "25px", height: "25px" }}
        ></lord-icon>
        Save
      </button>

      {/* Passwords Table */}
      <div className="bg-neutral-400 max-w-[91%] md:max-w-4xl py-6 mx-auto w-full">
  <h1 className="font-bold text-xl md:text-2xl py-2">Your passwords</h1>

  {passwordArray.length === 0 && <div>No passwords to show</div>}

  {passwordArray.length !== 0 && (
    <>
      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto rounded-md mb-10">
        <table className="min-w-full text-sm text-left text-black border-collapse">
          <thead className="text-xs font-medium text-white uppercase bg-black">
            <tr>
              <th className="py-2 px-2 text-center">Website</th>
              <th className="py-2 px-2 text-center">Username</th>
              <th className="py-2 px-2 text-center">Password</th>
              <th className="py-2 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {passwordArray.map((item, index) => (
              <tr key={index} className="bg-neutral-300 border-b">
                {/* Website */}
                <td className="py-2 px-2 text-center max-w-[200px] truncate">
                  <div className="flex items-center justify-center gap-1">
                    <a
                      href={item.site}
                      className="truncate block"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.site}
                    </a>
                    <lord-icon
                      onClick={() => copyText(item.site)}
                      style={{ cursor: "pointer", width: "23px", height: "23px" }}
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                    ></lord-icon>
                  </div>
                </td>

                {/* Username */}
                <td className="py-2 px-2 text-center max-w-[150px] truncate">
                  <div className="flex items-center justify-center gap-1">
                    {item.username}
                    <lord-icon
                      onClick={() => copyText(item.username)}
                      style={{ cursor: "pointer", width: "23px", height: "23px" }}
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                    ></lord-icon>
                  </div>
                </td>

                {/* Password */}
                <td className="py-2 px-2 text-center max-w-[150px] truncate">
                  <div className="flex items-center justify-center gap-1">
                    {item.password}
                    <lord-icon
                      onClick={() => copyText(item.password)}
                      style={{ cursor: "pointer", width: "23px", height: "23px" }}
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                    ></lord-icon>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-2 px-2 text-center">
                  <span
                    className="cursor-pointer mx-1"
                    onClick={() => editPassword(item.id)}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/gwlusjdu.json"
                      trigger="hover"
                      style={{ width: "23px", height: "23px" }}
                    ></lord-icon>
                  </span>
                  <span
                    className="cursor-pointer mx-1"
                    onClick={() => deletePassword(item.id)}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/skkahier.json"
                      trigger="hover"
                      style={{ width: "23px", height: "23px" }}
                    ></lord-icon>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="flex flex-col gap-4 md:hidden">
        {passwordArray.map((item, index) => (
          <div key={index} className="bg-neutral-300 rounded-md p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Website:</span>
              <div className="flex items-center gap-1">
                <a
                  href={item.site}
                  className="truncate block max-w-[200px]"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.site}
                </a>
                <lord-icon
                  onClick={() => copyText(item.site)}
                  style={{ cursor: "pointer", width: "23px", height: "23px" }}
                  src="https://cdn.lordicon.com/iykgtsbt.json"
                  trigger="hover"
                ></lord-icon>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Username:</span>
              <div className="flex items-center gap-1">
                {item.username}
                <lord-icon
                  onClick={() => copyText(item.username)}
                  style={{ cursor: "pointer", width: "23px", height: "23px" }}
                  src="https://cdn.lordicon.com/iykgtsbt.json"
                  trigger="hover"
                ></lord-icon>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Password:</span>
              <div className="flex items-center gap-1">
                {item.password}
                <lord-icon
                  onClick={() => copyText(item.password)}
                  style={{ cursor: "pointer", width: "23px", height: "23px" }}
                  src="https://cdn.lordicon.com/iykgtsbt.json"
                  trigger="hover"
                ></lord-icon>
              </div>
            </div>
            <div className="flex justify-between gap-2">
                <span className="font-semibold">Actions:</span>
                <div className="flex gap-1 justify-center">
              <span
                className="cursor-pointer"
                onClick={() => editPassword(item.id)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/gwlusjdu.json"
                  trigger="hover"
                  style={{ width: "23px", height: "23px" }}
                ></lord-icon>
              </span>
              <span
                className="cursor-pointer"
                onClick={() => deletePassword(item.id)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/skkahier.json"
                  trigger="hover"
                  style={{ width: "23px", height: "23px" }}
                ></lord-icon>
              </span></div>
            </div>
          </div>
        ))}
      </div>
    </>
  )}
</div>

    </div>
  </div>
</>
);
};

export default Manager2;
