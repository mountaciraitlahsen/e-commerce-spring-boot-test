import { useEffect, useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
export default function Sorting({ setSorting }) {
  return (
    <>
      <div className="p-5">
        <label className="font-bold text-gray-900 mb-3 block" htmlFor="">
          Sort By
        </label>
        <select
          className="w-full border border-[#e3e3e3] rounded-lg px-3 py-2 text-sm text-gray-700 focus:border-neutral-800 focus:ring-0 focus:outline-none transition-colors duration-200"
          onChange={(e) => setSorting(e.target.value)}
          name=""
          id=""
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>
    </>
  );
}
