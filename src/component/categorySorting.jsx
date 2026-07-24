export default function Sorting({setSorting}) {
  return (
    <>
      <div className="p-5 items-baseline gap-3 ">
        <label className="font-bold text-gray-900 mr-3 mb-3" htmlFor="">
          Sort by :
        </label>
        <select
          className="border border-[#e3e3e3] w-40 h-11 rounded-lg px-3 py-2 text-sm text-gray-700 focus:border-neutral-800 focus:ring-0 focus:outline-none transition-colors duration-200"
          onChange={(e) => setSorting(e.target.value)}
          name=""
          id=""
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>
    </>
  );
}
