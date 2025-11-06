// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { serverUrl } from '../App'
// import { useDispatch, useSelector } from 'react-redux'
// import {  setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from '../redux/userSlice'
// import { setAddress, setLocation } from '../redux/mapSlice'

// function useGetCity() {
//     const dispatch=useDispatch()
//     const {userData}=useSelector(state=>state.user)
//     const apiKey=import.meta.env.VITE_GEOAPIKEY
//     useEffect(()=>{
// navigator.geolocation.getCurrentPosition(async (position)=>{
//     console.log(position)
//     const latitude=position.coords.latitude
//     const longitude=position.coords.longitude
//     dispatch(setLocation({lat:latitude,lon:longitude}))
//     const result=await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
//   console.log(result.data)
//     dispatch(setCurrentCity(result?.data?.results[0].city||result?.data?.results[0].county
// ))
//     dispatch(setCurrentState(result?.data?.results[0].state))
//      dispatch(setCurrentAddress(result?.data?.results[0].address_line2 || result?.data?.results[0].address_line1 ))
//   dispatch(setAddress(result?.data?.results[0].address_line2))
// })
//     },[userData])
// }

// export default useGetCity


import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";
import { setAddress, setLocation } from "../redux/mapSlice";

function useGetCity() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    if (!apiKey) {
      console.error("❌ GeoAPI key missing — check your .env file.");
      return;
    }

    if (!navigator.geolocation) {
      console.error("❌ Geolocation not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log("📍 Location:", latitude, longitude);

          dispatch(setLocation({ lat: latitude, lon: longitude }));

          const res = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );

          console.log("🌍 Geoapify Response:", res.data);

          const result = res.data.results?.[0];
          if (!result) {
            console.error("⚠️ No valid location data received.");
            return;
          }

          const city =
            result.city || result.county || result.state || "Unknown City";
          const state = result.state || "";
          const address =
            result.address_line2 || result.address_line1 || city;

          dispatch(setCurrentCity(city));
          dispatch(setCurrentState(state));
          dispatch(setCurrentAddress(address));
          dispatch(setAddress(address));

          console.log("✅ City set to:", city);
        } catch (error) {
          console.error("❌ Error fetching city:", error);
        }
      },
      (error) => {
        console.error("🚫 Location permission denied or error:", error);
      }
    );
  }, [userData]);
}

export default useGetCity;
