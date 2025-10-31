"use client";

import { Product } from "@/app/models/product.zod";
import "./card-component.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setSearchedField, setTotalCartItem } from "@/app/redux/user.slice";
import ServerPORT from "@/app/utils/port.util";
import toast from "react-hot-toast";

function CardContent({ productData }: { productData: Product[] }) {
  const { searchedValue } = useSelector((store: any) => store.userSlice);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // ✅ Safe here — inside Suspense
  const [searchedData, setSearchedData] = useState<Product[]>([]);
  const [cartData, setCartData] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (searchedValue.trim() === "") {
      setSearchedData(productData);
    } else {
      const filtered = productData.filter((pro) =>
        pro.name.toLowerCase().includes(searchedValue.toLowerCase())
      );
      setSearchedData(filtered);
    }
  }, [searchedValue, productData]);

  useEffect(() => {
    dispatch(setSearchedField(""));
  }, [pathname, searchParams, dispatch]);

  useEffect(() => {
    if (!isClient) return;
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    (async () => {
      try {
        const res = await fetch(`${ServerPORT}cart/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setCartData(data.data);
          dispatch(setTotalCartItem(data.data.product.length));
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    })();
  }, [isClient, pathname, searchParams]);

  async function addToCart(p: Product) {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
      return;
    }
    toast.loading("Adding to cart...");
    const obj = { product: { id: p._id, quantity: 1 }, userId };

    try {
      const res = await fetch(`${ServerPORT}cart`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.dismiss();
        const data = await res.json();
        setCartData(data.data);
        dispatch(setTotalCartItem(data.data.product.length));
        toast.success("Added to cart.");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Add to cart error:", err);
    }
  }

  async function removeFromCart(p: Product) {
    toast.loading("Removing from cart...");
    const res = await fetch(`${ServerPORT}cart/${cartData._id}/${p.id._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      toast.dismiss();
      const data = await res.json();
      setCartData(data.data);
      console.log(data.data);
      dispatch(
        setTotalCartItem(data.data.product ? data.data.product.length : 0)
      );
      toast.success("Removed from cart.");
    } else {
      toast.dismiss();
      toast.error("Add to cart error:");
    }
  }

  if (!isClient) return null;

  return (
    <div className="card-container">
      {searchedData.map((product: Product) => (
        <div className="product-card" key={product._id}>
          <div className="image-section">
            <span className="badge">AVAILABLE</span>
            <Image
              src={product.image}
              alt={product.name}
              width={240}
              height={260}
            />
          </div>
          <div className="details-section">
            <h3>{product.name}</h3>
            <p className="price">₹ {product.price?.toFixed(2)}</p>
            <button
              className="add-btn"
              onClick={(e) =>
                e.currentTarget.innerText === "Add to Cart"
                  ? addToCart(product)
                  : removeFromCart(product)
              }
            >
              {cartData?.product?.some((p) => product._id == p.id._id)
                ? "Remove from Cart"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CardComponent({
  productData,
}: {
  productData: Product[];
}) {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <CardContent productData={productData} />
    </Suspense>
  );
}
