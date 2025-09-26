// src/Home.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./features/slice/apislice";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
const navigate = useNavigate()
  // Access products, status, error from store
  const { products, status, error } = useSelector((state) => state.api);

  const goto =()=>{
    navigate('fetch')
  }
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div className="flex flex-col justify-center items-center mt-50">
      
      <button className="text-2xl text-purple-600 font-semibold mb-4 " onClick={goto}><u>Shop Now</u></button>
    </div>
  );
};

export default Home;
