import React from "react";
import logo from "../assets/logo.png"
const Manager = () => {
  return (
    <>
      <div className="relative h-screen w-full bg-neutral-700  flex-col justify-center">
          <div className="branding flex justify-center items-center bg-neutral-500 w-3/4 py-6 mx-auto">
            <div className="logo">
<img src={logo} className="h-20 w-20"/>
            </div>
            <div className="details">
          <h1 className="text-5xl font-bold">PassWard</h1>
          <p className="text-xl">Warden of your passwords</p>
            </div>
          </div>
 <div className="flex flex-col gap-4 justify-center items-center bg-neutral-500 w-3/4 py-6 mx-auto">
        <input
          className="px-2 rounded-2xl border w-4/6"
          type="text"
          placeholder="Enter website URL"
        />

      
        <div className="flex gap-3 w-4/6">
          <input
            className="px-2 w-3/6 rounded-2xl border flex-1"
            type="text"
            placeholder="Enter username"
          />
          <input
            className="px-2 w-3/6 rounded-2xl border flex-1"
            type="password"
            placeholder="Enter password"
          />
        </div>

        
        <button className="bg-red-300 hover:bg-purple-600 transition text-white font-bold py-2 px-6 rounded-2xl mx-auto">
          Add Password
        </button>
      </div>

          
      </div>
    </>
  )
};

export default Manager;