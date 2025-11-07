// import React from 'react'
// import { useState } from 'react';
// import { FaRegEye } from "react-icons/fa";
// import { FaRegEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios"
// import { serverUrl } from '../App';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../../firebase';
// import { ClipLoader } from "react-spinners"
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';
// function SignUp() {
//     const primaryColor = "#ff4d2d";
//     const hoverColor = "#e64323";
//     const bgColor = "#fff9f6";
//     const borderColor = "#ddd";
//     const [showPassword, setShowPassword] = useState(false)
//     const [role, setRole] = useState("user")
//     const navigate=useNavigate()
//     const [fullName,setFullName]=useState("")
//     const [email,setEmail]=useState("")
//     const [password,setPassword]=useState("")
//     const [mobile,setMobile]=useState("")
//     const [err,setErr]=useState("")
//     const [loading,setLoading]=useState(false)
//     const dispatch=useDispatch()
//      const handleSignUp=async () => {
//         setLoading(true)
//         try {
//             const result=await axios.post(`${serverUrl}/api/auth/signup`,{
//                 fullName,email,password,mobile,role
//             },{withCredentials:true})
//             dispatch(setUserData(result.data))
//             setErr("")
//             setLoading(false)
//         } catch (error) {
//             setErr(error?.response?.data?.message)
//              setLoading(false)
//         }
//      }

//      const handleGoogleAuth=async () => {
//         if(!mobile){
//           return setErr("mobile no is required")
//         }
//         const provider=new GoogleAuthProvider()
//         const result=await signInWithPopup(auth,provider)
//   try {
//     const {data}=await axios.post(`${serverUrl}/api/auth/google-auth`,{
//         fullName:result.user.displayName,
//         email:result.user.email,
//         role,
//         mobile
//     },{withCredentials:true})
//    dispatch(setUserData(data))
//   } catch (error) {
//     console.log(error)
//   }
//      }
//     return (
//         <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
//             <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] `} style={{
//                 border: `1px solid ${borderColor}`
//             }}>
//                 <h1 className={`text-3xl font-bold mb-2 `} style={{ color: primaryColor }}>Vingo</h1>
//                 <p className='text-gray-600 mb-8'> Create your account to get started with delicious food deliveries
//                 </p>

//                 {/* fullName */}

//                 <div className='mb-4'>
//                     <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Full Name</label>
//                     <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter your Full Name' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setFullName(e.target.value)} value={fullName} required/>
//                 </div>
//                 {/* email */}

//                 <div className='mb-4'>
//                     <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
//                     <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter your Email' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setEmail(e.target.value)} value={email} required/>
//                 </div>
//                 {/* mobile*/}

//                 <div className='mb-4'>
//                     <label htmlFor="mobile" className='block text-gray-700 font-medium mb-1'>Mobile</label>
//                     <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter your Mobile Number' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setMobile(e.target.value)} value={mobile} required/>
//                 </div>
//                 {/* password*/}

//                 <div className='mb-4'>
//                     <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
//                     <div className='relative'>
//                         <input type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none pr-10' placeholder='Enter your password' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setPassword(e.target.value)} value={password} required/>

//                         <button className='absolute right-3 cursor-pointer top-[14px] text-gray-500' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
//                     </div>
//                 </div>
//                 {/* role*/}

//                 <div className='mb-4'>
//                     <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
//                     <div className='flex gap-2'>
//                         {["user", "owner", "deliveryBoy"].map((r) => (
//                             <button
//                                 className='flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer'
//                                 onClick={()=>setRole(r)}
//                                 style={
//                                    role==r?
//                                    {backgroundColor:primaryColor,color:"white"}
//                                    :{border:`1px solid ${primaryColor}`,color:primaryColor}
//                                 }>
//                                 {r}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//             <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSignUp} disabled={loading}>
//                 {loading?<ClipLoader size={20} color='white'/>:"Sign Up"}
            
//             </button>
//             {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
            

//             <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition cursor-pointer duration-200 border-gray-400 hover:bg-gray-100' onClick={handleGoogleAuth}>
// <FcGoogle size={20}/>
// <span>Sign up with Google</span>
//             </button>
//             <p className='text-center mt-6 cursor-pointer' onClick={()=>navigate("/signin")}>Already have an account ?  <span className='text-[#ff4d2d]'>Sign In</span></p>
//             </div>
//         </div>
//     )
// }

// export default SignUp


import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const primaryColor = "#ff4d2d";

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, password, mobile, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!mobile) return setErr("Mobile number is required");

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff9f6] to-[#fff1eb] p-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-orange-100 rounded-2xl shadow-lg p-8 relative overflow-hidden"
      >
        {/* Floating logo */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-[#ff4d2d] mb-2 text-center"
        >
          Vingo
        </motion.h1>
        <p className="text-center text-gray-600 mb-8">
          Create your account and start exploring delicious food 🍔
        </p>

        {/* Full Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-5"
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/40"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-5"
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </motion.div>

        {/* Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-5"
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile
          </label>
          <input
            type="text"
            placeholder="Enter your mobile number"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/40"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-5"
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/40 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-[10px] text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Your Role
          </label>
          <div className="flex gap-3">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <motion.button
                key={r}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg font-medium border transition-all duration-200 ${
                  role === r
                    ? "bg-[#ff4d2d] text-white shadow-md"
                    : "border-[#ff4d2d] text-[#ff4d2d] hover:bg-[#ff4d2d]/10"
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Sign Up Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSignUp}
          disabled={loading}
          className="w-full py-2.5 bg-[#ff4d2d] text-white rounded-lg font-semibold shadow-md hover:bg-[#e64323] transition-all duration-200"
        >
          {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
        </motion.button>

        {err && (
          <p className="text-center text-red-500 mt-3 text-sm">⚠️ {err}</p>
        )}

        {/* Google Sign In */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleAuth}
          className="w-full mt-5 flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <FcGoogle size={20} />
          Sign up with Google
        </motion.button>

        {/* Sign In Redirect */}
        <p className="text-center mt-6 text-gray-600 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-[#ff4d2d] font-semibold cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default SignUp;
