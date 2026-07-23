import CategoryCounter from "./categoryCounter";
import CategorySorting from "./categorySorting";
import ProductsCard from "./productsCard";
import ThirdHeader from "./thirdHeader";
import SideBar from "./sideBar";
import { useMemo } from "react";
export default function ListProducts({
  setCategory,
  setSorting,
  Category,
  Products,
  search,
  setProducts,
  FavoriteIds,
  setFavId,
  CartIds,
  setCartId,
  sorting,
}) {
  return (
    <>
      <SideBar setCategory={setCategory} setSorting={setSorting} />
      <div className="flex flex-col h-[86%] w-[90%] self-start mx-auto mt-2 pt-2 ml-12">
        <ThirdHeader
          Category={Category}
          Products={Products}
          search={search}
          setSorting={setSorting}
        ></ThirdHeader>
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
        ></ProductsCard>
      </div>
    </>
  );
}
