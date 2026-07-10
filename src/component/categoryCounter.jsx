import { useEffect, useState, useMemo} from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
export default function CategoryCounter({Category, Products}) {
  const productCount = useMemo(() => {
  if (Category === 'All Categories') {
    return Products.length;
  }
  return Products.filter((e) => e.category === Category).length;
}, [Category, Products]);
  return (
    <p className="text-sm text-gray-500">
      <span className="text-base font-semibold text-gray-900 mr-1">{productCount}
      </span>
      Products Found
    </p>
  );
}
