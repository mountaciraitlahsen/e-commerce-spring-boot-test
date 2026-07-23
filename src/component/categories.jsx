import { useEffect, useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
export default function Categories({setCategory}) {
  function handleClick(category) {
    const buttons = document.querySelectorAll(".cat__btn");
    setCategory(category)
    buttons.forEach((cat) => {
      if (cat.dataset.cat === category) {
        cat.classList.add("text-[#1C5CF8]");
        cat.classList.add("font-bold");
        cat.classList.remove("font-medium");
      } else {
        cat.classList.remove("text-[#1C5CF8]");
        cat.classList.remove("font-bold");
        cat.classList.add("font-medium");
      }
    });
  }
  return (
    <>
      <ul className="p-5 space-y-1 border-b border-b-[#e3e3e3]">
        <li className="text-lg font-bold text-gray-900 mb-3">Categories</li>
        <li
          className="cat__btn px-3 hover:bg-[#ECEFFD] transition-colors duration-250 py-2 rounded-lg font-bold text-sm text-[#1C5CF8]"
          data-cat="All Categories"
        >
          <button
            className="cursor-pointer"
            onClick={(e) => handleClick(e.target.closest("li").dataset.cat)}
          >
            All Categories
          </button>
        </li>
        <li
          className="cat__btn px-3 hover:bg-[#ECEFFD] transition-colors duration-250 py-2 rounded-lg text-sm font-meduim"
          data-cat="Electronics"
        >
          <button
            className="cursor-pointer"
            onClick={(e) => handleClick(e.target.closest("li").dataset.cat)}
          >
            Electronics
          </button>
        </li>
        <li
          className="cat__btn px-3 hover:bg-[#ECEFFD] transition-colors duration-250 py-2 rounded-lg text-sm font-meduim"
          data-cat="Clothing"
        >
          <button
            className="cursor-pointer"
            onClick={(e) => handleClick(e.target.closest("li").dataset.cat)}
          >
            Clothing
          </button>
        </li>
        <li
          className="cat__btn px-3 hover:bg-[#ECEFFD] transition-colors duration-250 py-2 rounded-lg text-sm font-meduim"
          data-cat="Shoes"
        >
          <button
            className="cursor-pointer"
            onClick={(e) => handleClick(e.target.closest("li").dataset.cat)}
          >
            Shoes
          </button>
        </li>
        <li
          className="cat__btn px-3 hover:bg-[#ECEFFD] transition-colors duration-250 py-2 rounded-lg text-sm font-meduim"
          data-cat="Accessories"
        >
          <button
            className="cursor-pointer"
            onClick={(e) => handleClick(e.target.closest("li").dataset.cat)}
          >
            Accessories
          </button>
        </li>
        <li
          className="cat__btn px-3 hover:bg-[#ECEFFD] transition-colors duration-250 py-2 rounded-lg text-sm font-meduim"
          data-cat="Home & Kitchen"
        >
          <button
            className="cursor-pointer"
            onClick={(e) => handleClick(e.target.closest("li").dataset.cat)}
          >
            Home & Kitchen
          </button>
        </li>
      </ul>
    </>
  );
}
