import CategoryCounter from "./categoryCounter";
import CategorySorting from "./categorySorting";
export default function ThirdHeader({Category, Products}) {
  return (
    // <div className="bg-white rounded-xl shadow-sm border border-[#e3e3e3] p-4 flex items-center justify-between gap-4 m-4">
    <>
      <CategoryCounter Category={Category} Products={Products} />
      <CategorySorting />
    </>
    // </div>
  );
}
