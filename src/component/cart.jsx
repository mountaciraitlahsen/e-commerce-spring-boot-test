import { useEffect, useState } from "react";
import { products } from "../products";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import cartIcon from "../assets/shopping-cart.svg";
export default function Cart({ counterCart, setCartModal }) {
  return (
    <>
      <button className="cart cursor-pointer text-base" onClick={() => setCartModal(true)}>
        <img
          src={cartIcon}
          alt=""
          className="inline-block w-5 h-5 align-middle mr-1"
        />
        <span className="pl-1">
          cart (<span>{counterCart}</span>)
        </span>
      </button>
    </>
  );
}
