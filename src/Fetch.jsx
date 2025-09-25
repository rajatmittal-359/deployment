import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "./features/slice/cartSlice";
import { fetchProducts } from "./features/slice/apislice";
import { useNavigate } from "react-router-dom";
import useViewToggle from "./hooks/UseViewToggle";

const Fetch = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [categorybutton, setCategorybutton] = useState([]);
  const [selectedcategory, setSelectedcategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCard, isTable, toggleToCard, toggleToTable } = useViewToggle("card");

  const user = useSelector((state) => state.auth.user);
  const registeredUser = useSelector((state) => state.auth.registeredUser);
  const cartItems = useSelector((state) => state.cart.cartItems);

  //  Redux API state
  const { products, status, error } = useSelector((state) => state.api);

  // helper function
  const getCartItem = (id) => cartItems.find((i) => i.id === id);

  // Add to cart / navigate
  const xyz = (item) => {
    if (!registeredUser) {
      navigate("/signup");
    } else if (!user) {
      navigate("/login");
    } else {
      dispatch(addToCart(item));
    }
  };

  // Navigate to details page
  const handleDetailClick = (id) => {
    navigate(`/fetch/${id}`);
  };

  //  Fetch products if idle
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  //  Extract categories when products load
  useEffect(() => {
    if (status === "succeeded" && products.length > 0) {
      setCategorybutton([...new Set(products.map((item) => item.category))]);
    }
  }, [status, products]);

  // Searching
  const query = search.toLowerCase();
  const filteredproducts = products.filter((item) => {
    const matchsearch =
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    const selectcategory =
      selectedcategory === "" || selectedcategory === item.category;
    return matchsearch && selectcategory;
  });

  // Sorting
  const sortedproducts = [...filteredproducts].sort((a, b) => {
    if (sortBy === "low-high") return a.price - b.price;
    if (sortBy === "high-low") return b.price - a.price;
    return 0;
  });

  return (
    <div>
      <h1 className="text-center text-4xl font-bold m-4 mb-6">Products</h1>

      {/* 🔍 Search */}
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          placeholder="Search here by title or category"
          className="w-80 rounded-md p-1 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ⬇ Sorting */}
      <div className="flex justify-center items-center">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-35 mb-4 rounded-md px-4 py-1 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Sort by</option>
          <option value="low-high">Low to high</option>
          <option value="high-low">High to low</option>
        </select>
      </div>

      {/*  Toggle Buttons */}
      <div className="my-4 flex gap-4 justify-center">
        <button
          onClick={toggleToCard}
          className={`p-2 border rounded ${
            isCard ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          Card View
        </button>
        <button
          onClick={toggleToTable}
          className={`p-2 border rounded ${
            isTable ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          Table View
        </button>
      </div>

      {/*  Category Filter */}
      <div className="flex justify-center items-center gap-4">
        <button
          className="border border-grey-400 px-4 py-1 rounded-lg"
          onClick={() => setSelectedcategory("")}
        >
          All
        </button>
        {categorybutton.map((button) => (
          <button
            key={button}
            onClick={() => setSelectedcategory(button)}
            className="border border-grey-400 px-4 py-1 rounded-lg"
          >
            {button}
          </button>
        ))}
      </div>

      {/*  Products */}
      {status === "loading" ? (
        <p className="text-center text-4xl font-semibold">Loading...</p>
      ) : status === "failed" ? (
        <p className="text-red-500 text-center text-2xl">{error}</p>
      ) : sortedproducts.length === 0 ? (
        <p style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
          Item Not Found
        </p>
      ) : isTable ? (
        /* -------- TABLE VIEW -------- */
        <table className="w-full border-collapse border border-gray-300 my-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedproducts.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border border-gray-300 p-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 mx-auto"
                  />
                </td>
                <td className="border border-gray-300 p-2">{item.title}</td>
                <td className="border border-gray-300 p-2">${item.price}</td>
                <td className="border border-gray-300 p-2">{item.category}</td>
                <td className="border border-gray-300 p-2 flex justify-center gap-2">
                  {!getCartItem(item.id) ? (
                    <button
                      onClick={() => xyz(item)}
                      className="border rounded p-2 bg-white hover:bg-gray-700 hover:text-white"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        -
                      </button>
                      <span>{getCartItem(item.id).quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="px-2 py-1 bg-green-500 text-white rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="ml-2 px-2 py-1 bg-gray-700 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDetailClick(item.id)}
                    className="border rounded p-1 bg-white hover:bg-gray-700 hover:text-white"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        /* -------- CARD VIEW -------- */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-10">
          {sortedproducts.map((item) => (
            <div key={item.id} className="border rounded-2xl p-6 flex flex-col">
              <LazyLoadImage
                src={item.image}
                alt={item.title}
                effect="blur"
                className="h-50 object-contain mb-8"
              />
              <div className="space-y-1.5">
                <p>
                  <b>Title : </b>
                  {item.title}
                </p>
                <p>
                  <b>Price : $</b>
                  {item.price}
                </p>
                <p>
                  <b>Category : </b>
                  {item.category}
                </p>
                <div className="flex gap-8">
                  {!getCartItem(item.id) ? (
                    <button
                      onClick={() => xyz(item)}
                      className="border rounded p-2 bg-white hover:bg-gray-700 hover:text-white"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        -
                      </button>
                      <span>{getCartItem(item.id).quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="px-2 py-1 bg-green-500 text-white rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="ml-2 px-2 py-1 bg-gray-700 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDetailClick(item.id)}
                    className="border rounded p-2 bg-white hover:bg-gray-700 hover:text-white"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fetch;
