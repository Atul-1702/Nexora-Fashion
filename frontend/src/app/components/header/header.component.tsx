"use client";
import Image from "next/image";
import "./header.component.scss";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedField } from "@/app/redux/user.slice";
function Header() {
  const category = useSearchParams().get("category");
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { searchedValue, totalCartItem } = useSelector(
    (store: any) => store.userSlice
  );
  const [loginState, setLoginState] = useState(false);
  const router = useRouter();

  useEffect(() => {
    ref.current.value = searchedValue;
  }, [searchedValue]);

  function getSearchValue() {
    dispatch(setSearchedField(ref.current.value));
  }

  useEffect(() => {
    const user = localStorage.getItem("userId");
    if (!user) {
      setLoginState(false);
    } else {
      setLoginState(true);
    }
  }, []);

  function onLogout() {
    setLoginState(false);
    localStorage.removeItem("userId");
    window.location.reload();
  }
  return (
    <header id="header-component-desktop-container">
      <section className="top-header-section">
        <figure className="quick-top-details">
          <Image
            src="/images/eye-icon-red-color-bold.svg"
            width={16}
            height={16}
            alt="eye-icon"
          />

          <figcaption>Transparency</figcaption>
        </figure>
        <figure className="quick-top-details">
          <Image
            src="/images/mobile-icon.svg"
            width={16}
            height={16}
            alt="eye-icon"
          />

          <figcaption>
            <a href="tel:+919876543210">Customer Care</a>
          </figcaption>
        </figure>
      </section>

      <section className="middle-header-section">
        <h1 className="nexora-logo">
          <Link href="/">
            <Image
              src="/images/nexora-fashion-logo.png"
              width={172}
              height={44}
              alt="nexora-fashion-logo"
            />
          </Link>
        </h1>
        <div className="search-container">
          <input ref={ref} type="text" placeholder="Search for products..." />
          <Image
            src="/images/magnifying-glass-icon.svg"
            width={16}
            height={16}
            alt="magnifying class"
            onClick={getSearchValue}
          />
        </div>
        <div className="cart-and-user-container">
          <figure className="cart-container-header">
            <Link href="/cart">
              <Image
                src="/images/cart-icon.svg"
                width={25}
                height={25}
                alt="cart-icon"
              />
              <figcaption>{totalCartItem}</figcaption>
            </Link>
          </figure>

          <figure className="user-container">
            <Image src="/images/user.png" width={25} height={25} alt="user" />
            <figcaption style={loginState ? { bottom: "-62px" } : {}}>
              {!loginState ? (
                <ul>
                  <Link style={{ textDecoration: "none" }} href="/signup">
                    <li>Signup</li>
                  </Link>
                  <Link style={{ textDecoration: "none" }} href="/login">
                    <li>Login</li>
                  </Link>
                </ul>
              ) : (
                <ul>
                  <Link style={{ textDecoration: "none" }} href="/">
                    <li onClick={() => onLogout()}>Logout</li>
                  </Link>
                </ul>
              )}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="botton-header-section">
        <ul>
          <Link
            href="/products?category=men"
            style={{ textDecoration: "none" }}
          >
            <li className={category === "men" ? "active-link" : ""}>MEN</li>
          </Link>
          <Link
            href="/products?category=women"
            style={{ textDecoration: "none" }}
          >
            <li className={category === "women" ? "active-link" : ""}>WOMEN</li>
          </Link>
          <Link
            href="/products?category=accessories"
            style={{ textDecoration: "none" }}
          >
            <li className={category === "accessories" ? "active-link" : ""}>
              ACCESSORIES
            </li>
          </Link>
        </ul>
      </section>
    </header>
  );
}

export default Header;
