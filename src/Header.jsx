import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/slice/authslice";
import { clearCart } from "./features/slice/cartSlice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  // ✅ total quantity count
  const cartCount = useSelector((state) =>
    state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart()); // logout ke sath cart empty kar do
    navigate("/login");
  };

  return (
    <div className="bg-purple-600 h-20">
      <ul className="flex justify-center items-center gap-20 list-none text-2xl p-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/fetch">Fetch</Link>
        </li>

        {/* 🛒 Cart with Badge */}
        <li className="relative">
          <Link to="/cart">Cart</Link>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-5 bg-red-500 text-white text-sm font-bold rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </li>

        {user ? (
          <>
            <li>Hello, {user.name}</li>
            <li>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
