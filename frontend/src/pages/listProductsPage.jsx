import ProductsCard from "../component/productsCard";
import ThirdHeader from "../component/thirdHeader";
import SideBar from "../component/sideBar";
export default function ListProductsPage({
  setCategory,
  setSorting,
  Category,
  Products,
  search,
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
