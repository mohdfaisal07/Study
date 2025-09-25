import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useRef , useEffect} from "react";

const Manager = () => {
  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
 const [passwordArray, setpasswordArray] = useState([])

useEffect(() => {
 let passwords = localStorage.getItem("passwords");
 if(passwords){
setpasswordArray(JSON.parse(passwords))
 }
  
}, )



  //Eye icon change
  const showPassword = () => {
    alert("show password");
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
    } else {
      ref.current.src = "icons/eyecross.png";
    }
  };

  //save password
  const savePassword = () => {
    setpasswordArray([...passwordArray, form])
    localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
    console.log([...passwordArray, form])
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="relative h-screen w-full bg-neutral-500  flex-col justify-center">
        <div className="branding flex justify-center items-center bg-neutral-400  w-3/4 py-6 mx-auto">
          <div className="logo">
            <img src={logo} className="h-20 w-20" />
          </div>
          <div className="details">
            <h1 className="text-5xl font-bold">PassWard</h1>
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
            Add Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Manager;
