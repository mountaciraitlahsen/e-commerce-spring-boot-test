// import SearchBar from "./searchBar";
// import Favorite from "./favorite";
// import Cart from "./cart";
import { useMemo } from "react";
export default function ProductsCard({
  search,
  setProducts,
  Category,
  Products,
  FavoriteIds,
  setFavId,
  CartIds,
  setCartId,
}) {
  function handleClickFav(id) {
    setFavId(
      FavoriteIds.includes(id)
        ? FavoriteIds.filter((p) => p !== id)
        : [...FavoriteIds, id],
    );
  }
  function handleClickCart(id) {
    const existing = CartIds.find((item) => item.id === id);
    const product = Products.find((p) => p.id === id);
    if (!product) return;
    if (existing) {
      if (existing.quantity >= product.stock) return;
      setCartId((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCartId((prev) => [...prev, { id, quantity: 1 }]);
    }
  }
  const products = useMemo(() => {
    // const seenNames = new Set();
    if (Category === "All Categories") {
      // const uniqueProducts = Products.filter((p) => {
      // if (seenNames.has(p.name)) return false;
      // seenNames.add(p.name);
      // return true;
      // });
      // return uniqueProducts;
      return Products;
    }
    // const uniqueProducts = Products.filter(
    // (e) => e.category === Category,
    // ).filter((p) => {
    // if (seenNames.has(p.name)) return false;
    // seenNames.add(p.name);
    // return true;
    // });
    // return uniqueProducts;
    return Products.filter((e) => e.category === Category);
  }, [Category, Products]);
  return (
    <>
      {products.map((p) => (
        <div
          data-id={p.id}
          className="relative w-64 h-95 border border-[#e3e3e3] bg-white rounded-xl p-4 flex flex-col gap-2"
        >
          <img
            src={p.pic}
            alt="Product"
            className="w-full h-48 object-cover rounded-md"
          />
          <button
            className="absolute top-4 right-4 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleClickFav(p.id);
            }}
          >
            {FavoriteIds.includes(p.id) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#EF0608"
                className="size-6"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                stroke="#374151"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            )}
          </button>
          <div className="product-info flex flex-col gap-1">
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <div>
              <p className="text-gray-500 text-sm inline">{p.category}</p>
              <span className="text-gray-500 text-sm"> ({p.stock})</span>
            </div>
            <p className="font-bold text-xl my-1">${p.price}</p>
            <button
              className="flex items-center justify-center gap-2 border-2 border-[#1C5CF8] text-[#1C5CF8] font-medium py-2 rounded-lg hover:bg-[#1C5CF8] hover:text-white transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleClickCart(p.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Add to Cart   
              {CartIds.find((item) => item.id === p.id)?.quantity > 0 && (
              <span className="">
                ({CartIds.find((item) => item.id === p.id)?.quantity})
              </span>
            )}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
