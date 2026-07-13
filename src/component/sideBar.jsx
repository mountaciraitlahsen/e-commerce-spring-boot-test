import Categories from "./categories";
import Sorting from "./sorting";
export default function SideBar({setCategory, setSorting}) {
  return (
    <>
      <Categories setCategory={setCategory} />
      <Sorting setSorting={setSorting} />
    </>
  );
}
