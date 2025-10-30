"use client";
import { useEffect, useState } from "react";
import "./page.scss";
import ServerPORT from "../utils/port.util";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Page() {
  const [cartData, setCartData] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLogin(true);
      (async function () {
        const res = await fetch(`${ServerPORT}cart/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          setCartData(data.data);
        } else {
        }
      })();
    } else {
      setIsLogin(false);
      router.push("/login");
    }
  }, []);
  function updateQuantity(quan: number, val: number) {
    if (!((quan === 1 && val === -1) || (quan === 10 && val === 1))) {
      localStorage.getItem("userId");
    }
  }
  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-item">
            <img
              src="https://res.cloudinary.com/demo/image/upload/sample.jpg"
              alt="Korean Pant"
            />
            <div className="item-details">
              <h3>Korean Pant</h3>
              <p className="price">₹ 2,799</p>
              <div className="quantity">
                <button onClick={() => updateQuantity(5, -1)}>-</button>
                <span>1</span>
                <button onClick={() => updateQuantity(5, 1)}>+</button>
              </div>
              <button className="remove">Remove</button>
            </div>
          </div>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹ 7,298</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>₹ 99</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹ 7,397</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
      )
    </div>
  );
}

export default Page;
