// src/Home.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./features/slice/apislice";

const Home = () => {
  const dispatch = useDispatch();

  // Access products, status, error from store
  const { products, status, error } = useSelector((state) => state.api);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>

      {status === "loading" && <p>Loading products...</p>}
      {status === "failed" && <p className="text-red-500">{error}</p>}

      {status === "succeeded" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-2"
              />
              <h2 className="font-semibold text-lg truncate">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
