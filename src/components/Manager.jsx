import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useRef, useEffect } from "react";
import { ToastContainer, toast ,Bounce } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
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
    });
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

      <div className="relative min-h-[91vh] w-full bg-neutral-400  flex-col justify-center">
        <div className="branding flex justify-center items-center bg-neutral-400  w-3/4 py-3 mx-auto">
          <div className="logo">
            <img src={logo} className="h-20 w-20" />
          </div>
          <div className="details">
            <div className="flex">
              <h1 className="text-5xl font-bold">Pass</h1>
              <h1 className="text-5xl font-bold text-green-700">Ward</h1>
            </div>
            <p className="text-xl">Warden of your passwords</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center bg-neutral-400  w-3/4 py-6 mx-auto">
          <input
            value={form.site}
            onChange={handleChange}
            className="bg-neutral-300 px-2 rounded-2xl border w-4/6"
            type="text"
            placeholder="Enter website URL"
            name="site"
          />

          <div className="flex gap-3 w-4/6">
            <input
              value={form.username}
              onChange={handleChange}
              className="px-2 bg-neutral-300 w-3/6 rounded-2xl border flex-1"
              type="text"
              placeholder="Enter username"
              name="username"
            />
            <div className="relative flex-1">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className=" bg-neutral-300 px-2 w-6/6 rounded-2xl border flex-1"
                type="password"
                placeholder="Enter password"
                name="password"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                <img
                  ref={ref}
                  className="p-1 "
                  onClick={showPassword}
                  width={23}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="text-sm font-bold flex justify-center items-center bg-green-600 rounded-full mx-auto px-7 py-1.5 cursor-pointer "
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            Save 
          </button>
          <div className=" bg-neutral-400  w-3/4 py-6 mx-auto">
            <h1 className="font-bold text-2xl py-2">Your passwords</h1>
            {passwordArray.length === 0 && <div>No passwords to show</div>}
            {passwordArray.length != 0 && (
              <div className="rounded-md overflow-hidden">
                <table className="w-full  text-sm text-left rtl:text-right text-black">
                  <thead className="text-xs font-medium text-white uppercase bg-black ">
                    <tr>
                      <th scope="col" className=" py-1 pr-34 text-center -s-lg">
                        Website
                      </th>
                      <th scope="col" className="px-2 py-1 text-center">
                        Username
                      </th>
                      <th scope="col" className="px-2 py-1 text-center ">
                        Password
                      </th>
                      <th scope="col" className="px-2 py-1 text-center ">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full bg-neutral-300">
                    {passwordArray.map((item, index) => {
                      return (
                        <tr key={index} className=" text-black bg-neutral-300">
                          <th
                            scope="row"
                            className=" py-1 pr-34 text-center font-medium  max-w-[120px]  text-black "
                          >
                            <div className="flex items-center justify-center gap-1">
                            <a href={item.site} className="px-3 truncate max-w-[200px] block"  target="_blank">
                              {item.site}
                            </a>
                            <lord-icon
                              onClick={() => {
                                copyText(item.site);
                              }}
                              style={{
                                cursor: "Pointer",
                                width: "23x",
                                height: "23px",
                                paddingTop: "3px",
                                
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon></div>
                          </th>
                          <td className="px-2 py-1 text-center">
                            {item.username}{" "}
                            <lord-icon
                              onClick={() => {
                                copyText(item.username);
                              }}
                              style={{
                                cursor: "Pointer",
                                width: "23px",
                                height: "23px",
                                paddingTop: "9px",
                                paddingLeft: "6px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </td>
                          <td className="px-2 py-1 text-center">
                            {item.password}{" "}
                            <lord-icon
                              onClick={() => {
                                copyText(item.password);
                              }}
                              style={{
                                cursor: "Pointer",
                                width: "23px",
                                height: "23px",
                                paddingTop: "9px",
                                paddingLeft: "6px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </td>
                         <td className=' pt-2 text-center'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"23px", "height":"23px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"23px", "height":"23px"}}>
                                            </lord-icon>
                                        </span>
                                    </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
