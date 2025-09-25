import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const ProductDetails = () => {
  const {id} =useParams();
  const [product,setProduct] =useState('')
   const navigate =useNavigate()
  const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(()=>{
      fetchProduct()
    },[id])
  return (
    <div className="p-6 max-w-[40%]">
      <img src={product.image}  className="size-50" />
                    <p><b>Title : </b>{product.title}</p>
              <p><b>Price : $</b>{product.price}</p>
              <p><b>Description : $</b>{product.description}</p>
              <p><b>Category : </b>{product.category}</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
      >
        Go Back
      </button>
    </div>
  )
}

export default ProductDetails