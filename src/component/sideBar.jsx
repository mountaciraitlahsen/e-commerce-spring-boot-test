import Categories from "./categories";
import Sorting from "./sorting";
export default function SideBar({setCategory}) {
  return (
    <>
      <Categories setCategory={setCategory} />
      <Sorting />
    </>
  );
}
