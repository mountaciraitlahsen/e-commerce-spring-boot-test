import { useEffect, useState } from "react";
import { products } from "../products";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import heartIcon from "../assets/heart.svg";

export default function Favorite({ counterFavorite }) {
  return (
    <>
      <button
        className="favorite cursor-pointer text-base"
        // onClick={}
      >
        <img
          src={heartIcon}
          alt=""
          className="inline-block w-5 h-5 align-middle mr-1"
        />
        <span className="pl-1">
          Favorites (<span>{counterFavorite}</span>)
        </span>
      </button>
    </>
  );
}
