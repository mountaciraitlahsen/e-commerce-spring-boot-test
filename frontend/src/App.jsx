import "./styles.css";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./component/header";
import ListProductsPage from "./pages/listProductsPage";
import FavoriteModal from "./component/favoriteModal";
import CartModal from "./component/cartModal";
import ProductDetailsPage from "./pages/productDetailsPage";
import { products } from "./products";
import LoginPage from "./pages/loginPage";
export default function App() {
  const [search, setSearch] = useState("");
  const [Category, setCategory] = useState("All Categories");
  const [Products, setProducts] = useState(products);
  const [FavoriteIds, setFavId] = useState([]);
  const [CartIds, setCartId] = useState([]);
  const [sorting, setSorting] = useState("Newest");
  const counterFavorite = FavoriteIds.length;
  const counterCart = CartIds.reduce((total, p) => total + p.quantity, 0);
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/products"
          element={
            <>
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
                    path="products/favorites"
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
                    path="products/cart"
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
                <Routes location={backgroundLocation || location}>
                  <Route
                    path="/products/:id"
                    element={
                      <ProductDetailsPage
                        search={search}
                        Products={Products}
                        FavoriteIds={FavoriteIds}
                        setFavId={setFavId}
                        CartIds={CartIds}
                        setCartId={setCartId}
                      />
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <ListProductsPage
                        setCategory={setCategory}
                        setSorting={setSorting}
                        Category={Category}
                        Products={Products}
                        search={search}
                        setProducts={setProducts}
                        FavoriteIds={FavoriteIds}
                        setFavId={setFavId}
                        CartIds={CartIds}
                        setCartId={setCartId}
                        sorting={sorting}
                      />
                    }
                  />
                </Routes>
              </main>
            </>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
