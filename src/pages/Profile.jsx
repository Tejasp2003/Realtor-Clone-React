import { getAuth, updateProfile } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import {AiOutlineHome} from "react-icons/ai"


function Profile() {

  const [changeDetail, setChangeDetail]= useState(false);
  const auth = getAuth();
  const [formData, setFormDtata] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const  {name, email} = formData;
  
  const navigate = useNavigate();
  function onLogout(){
    auth.signOut();
    navigate("/")
    
  }


  function onChange(e){
      setFormDtata((prevState)=>({
        ...prevState,
        [e.target.id] : e.target.value
      }))
  }

  async function onSubmit(){


    try {
      if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          // name:name;
          name,
        });
        toast.success("Profile Updated")
      }
    } catch (error) {
      toast.error("Could'nt update profile details")
      
    }

  }

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
        <form>
          {/* Name Input */}

          <input
            type="text"
            id="name"
            value={name}
            disabled={!changeDetail}
            onChange={onChange}
            className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
          />

          {/* Email Input */}

          <input
            type="email"
            id="email"
            value={email}
            disabled
           

            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          />
           <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center ">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
              >
                Sign out
              </p>
            </div>
        </form>
        <button type="submit" className="w-full bg-blue-600 text-white uppercase px-7 py-2 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">
          <Link to="/Createlisting" className="flex justify-center items-center">
          <AiOutlineHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2 text-black"/>
          Sell or Rent your home
          </Link>
          
        </button>
   </div>
      </section>
    </>
  );
}

export default Profile;
