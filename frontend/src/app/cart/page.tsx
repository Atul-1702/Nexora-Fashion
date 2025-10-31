"use client";
import { useEffect, useState } from "react";
import "./page.scss";
import ServerPORT from "../utils/port.util";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "../models/product.zod";
import toast from "react-hot-toast";
import { setTotalCartItem } from "../redux/user.slice";
import { useDispatch } from "react-redux";

function Page() {
  const [cartData, setCartData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLogin(true);
      (async function () {
        const res = await fetch(`${ServerPORT}cart/product/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          setCartData(data.data);
          setTotalAmount(data.totalAmount);
          dispatch(setTotalCartItem(data.data.product.length));
        } else {
        }
      })();
    } else {
      setIsLogin(false);
      router.push("/login");
    }
  }, []);
  async function updateQuantity(quan: number, val: number, productId: string) {
    if (!((quan === 1 && val === -1) || (quan === 10 && val === 1))) {
      toast.loading("Updating Cart...");
      const userId = localStorage.getItem("userId");
      const res = await fetch(`${ServerPORT}cart`, {
        method: "PATCH",
        body: JSON.stringify({ userId, productId, quantity: quan + val }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.dismiss();
        const data = await res.json();
        console.log("data", data);
        setCartData(data.data);
        setTotalAmount(data.totalAmount);
        dispatch(setTotalCartItem(data.data.product.length));
        toast.success("Cart updated successfully");
      } else {
        toast.dismiss();
        toast.error("Cart updation failed");
      }
    }
  }

  async function removeItemFromCart(cartId: string, productId: string) {
    toast.loading("Removing item from cart... ");
    const res = await fetch(`${ServerPORT}cart/${cartId}/${productId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      toast.dismiss();
      const data = await res.json();
      setCartData(data.data);
      dispatch(
        setTotalCartItem(data.data.product ? data.data.product.length : 0)
      );
      toast.success("Item removed from cart successfully");
    } else {
      toast.dismiss();
      toast.error("Something went wrong.");
    }
  }
  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      {!cartData?.product ? (
        <Image
          src="/images/cart-empty.gif"
          width={350}
          height={350}
          alt="cart-empty"
          className="empty-cart-image"
        />
      ) : (
        <div className="cart-content">
          {cartData?.product?.map((product: any) => {
            return (
              <div className="cart-items" key={product.id._id}>
                <div className="cart-item">
                  <img src={product.id.image} alt="Korean Pant" />
                  <div className="item-details">
                    <h3>{product.id.name}</h3>
                    <p className="price">{product.id.price}</p>
                    <div className="quantity">
                      <button
                        onClick={() =>
                          updateQuantity(product.quantity, -1, product.id._id)
                        }
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(product.quantity, 1, product.id._id)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove"
                      onClick={() =>
                        removeItemFromCart(cartData._id, product.id._id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹ {totalAmount}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>₹ 0</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹ {totalAmount}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
