import Categories from "./categories";
import Sorting from "./sorting";
export default function SideBar({ setCategory, setSorting }) {
  return (
    <>
      <div className="flex mt-9 justify-center items-start" id="">
        <div
          className="rounded-xl border shadow-[0_2px_4px_0px_rgba(0,0,0,0.05)] border-[#e3e3e3] w-[85%] ml-8 h-[80%] bg-white"
          id="sidebar__container"
        >
          <Categories setCategory={setCategory} />
          <Sorting setSorting={setSorting} />
        </div>
      </div>
    </>
  );
}
