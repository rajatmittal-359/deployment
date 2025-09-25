import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./features/slice/cartSlice";
import {
  toggleCheckout,
  updateCheckoutField,
  resetCheckout,
} from "./features/slice/checkoutSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { showCheckout, checkoutData } = useSelector((state) => state.checkout );
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const handleChange = (e) => {
    dispatch(
      updateCheckoutField({ name: e.target.name, value: e.target.value })
    );
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    console.log("Order placed:", checkoutData, cartItems);
    alert("🎉 Order placed successfully!");
    dispatch(resetCheckout());
    dispatch(clearCart());
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-xl text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded-lg"
            >
              <div>
                <p className="font-semibold">{item.title}</p>
                <p>
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between items-center border-t pt-4">
            <h2 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
              >
                Clear Cart
              </button>
              <button
                onClick={() => dispatch(toggleCheckout())}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          {/* Checkout Form */}
          {showCheckout && (
            <form
              onSubmit={handleCheckoutSubmit}
              className="border p-4 mt-4 rounded-lg bg-gray-50"
            >
              <h2 className="text-2xl font-semibold mb-3">
                Checkout Information
              </h2>
              <input
                type="text"
                name="name"
                value={checkoutData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border p-2 mb-3 rounded"
                required
              />
              <input
                type="text"
                name="address"
                value={checkoutData.address}
                onChange={handleChange}
                placeholder="Delivery Address"
                className="w-full border p-2 mb-3 rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                value={checkoutData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border p-2 mb-3 rounded"
                required
              />
              <select
                name="payment"
                value={checkoutData.payment}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Place Order
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
