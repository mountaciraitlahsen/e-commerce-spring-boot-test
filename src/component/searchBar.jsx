import { useNavigate} from "react-router-dom";
export default function SearchBar({ search, setSearch }) {
  const navigate = useNavigate();
  function handleSubmit() {
    navigate("/", { replace: true });
  }
  return (
    <>
    <form action="" onSubmit={(e) => {
      e.preventDefault();
      handleSubmit()}}>
      <input
        type="text"
        className="search__bar h-10 border-[#e3e3e3] rounded-xl w-160 border pl-3 text-[16px] focus:border-neutral-800 focus:ring-0 focus:outline-none transition-colors duration-200"
        placeholder="🔍    Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="hidden"  ></button>
    </form>
    </>
  );
}
