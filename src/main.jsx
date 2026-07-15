import "./styles.css";
import { createRoot } from "react-dom/client";
import { StrictMode, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Counter from "./component/favoriteCounter";
import Header from "./component/header";
import SideBar from "./component/sideBar";
import ThirdHeader from "./component/thirdHeader";
import ProductsCard from "./component/productsCard";
import FavoriteModal from "./component/favoriteModal";
import CartModal from "./component/cartModal";
import { products } from "./products";
function App() {
  const [search, setSearch] = useState("");
  const [Category, setCategory] = useState("All Categories");
  const [Products, setProducts] = useState(products);
  const [FavoriteIds, setFavId] = useState([]);
  const [CartIds, setCartId] = useState([]);
  const [sorting, setSorting] = useState("Newest");
  const counterFavorite = FavoriteIds.length;
  const counterCart = CartIds.reduce((total, p) => total + p.quantity, 0);
  return (
    <>
      <BrowserRouter>
        <header
          className="flex justify-around items-center gap-x-15 text-[20px] h-19 bg-[#FEFEFE] border-b shadow-[0_2px_4px_0px_rgba(0,0,0,0.05)] border-b-[#f4eded]"
          id="header"
        >
          <Header
            search={search}
            setSearch={setSearch}
            counterFavorite={counterFavorite}
            counterCart={counterCart}
          />
          <Routes>
            <Route
              path="favorites"
              element={
                <FavoriteModal
                  counterFavorite={counterFavorite}
                  FavoriteIds={FavoriteIds}
                  setFavId={setFavId}
                  Products={Products}
                ></FavoriteModal>
              }
            ></Route>
            <Route
              path="cart"
              element={
                <CartModal
                  counterCart={counterCart}
                  CartIds={CartIds}
                  setCartId={setCartId}
                  Products={Products}
                ></CartModal>
              }
            ></Route>
          </Routes>
        </header>
        <main
          className="grid bg-[#FBFBFC] grid-cols-[20%_80%] flex-1 overflow-hidden"
          id="main"
        >
          <div className="flex mt-9 justify-center items-start" id="">
            <div
              className="rounded-xl border shadow-[0_2px_4px_0px_rgba(0,0,0,0.05)] border-[#e3e3e3] w-[85%] ml-8 h-[80%] bg-white"
              id="sidebar__container"
            >
              <SideBar setCategory={setCategory} setSorting={setSorting} />
            </div>
          </div>
          <div className="flex flex-col h-[86%] w-[90%] self-start mx-auto mt-2 pt-2 ml-12">
            <div
              id="main__header"
              className="w-full items-center flex justify-between"
            >
              <ThirdHeader
                Category={Category}
                Products={Products}
                search={search}
                setSorting={setSorting}
              />
            </div>
            <div
              className="grid grid-cols-4 h-[83%] overflow-x-hidden  -ml-7 px-4"
              id="body"
            >
              <ProductsCard
                search={search}
                setProducts={setProducts}
                Category={Category}
                Products={Products}
                FavoriteIds={FavoriteIds}
                setFavId={setFavId}
                CartIds={CartIds}
                setCartId={setCartId}
                sorting={sorting}
              />
            </div>
          </div>
        </main>
      </BrowserRouter>
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
