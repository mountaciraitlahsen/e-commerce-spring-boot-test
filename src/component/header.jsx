import SearchBar from "./searchBar";
import Favorite from "./favorite";
import Cart from "./cart";
export default function Header({
  search,
  setSearch,
  counterFavorite,
  counterCart,
}) {
  return (
    <>
      <h3 className="header font-bold">
        <span>🛒 </span> <span className="text-[#111729]">Shop</span>
        <span className="text-[#0146FD]">Easy</span>
      </h3>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex gap-8 font-semibold">
        <Favorite counterFavorite={counterFavorite} />
        <Cart counterCart={counterCart} />
      </div>
    </>
  );
}
