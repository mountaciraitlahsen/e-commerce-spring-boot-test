import { useNavigate } from "react-router-dom";
export default function FavoriteModal({
  counterFavorite,
  FavoriteIds,
  setFavId,
  Products,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-end bg-black/30 z-50"
        onClick={() => {
          navigate("/");
        }}
      >
        <div
          className="bg-[#FEFEFE] w-[33.5rem] h-[43rem] mt-4 mr-6 rounded-2xl shadow-xl p-6 "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Favorites</h2>
            <button
              className="text-gray-400 hover:text-black cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              ✕
            </button>
          </div>

          <div className="flex justify-between items-center mb-4 text-sm ">
            <span className="text-gray-600">{counterFavorite} items</span>
            <button
              className="text-red-500 font-medium hover:underline cursor-pointer"
              onClick={() => setFavId([])}
            >
              Clear all
            </button>
          </div>

          <div className="space-y-4 mt-4">
            {Products.map((p) => {
              if (FavoriteIds.includes(p.id)) {
                return (
                  <div className="flex items-center gap-8 h-[5.5rem] border-t-2 border-[#F5F6F7] mt-4 pt-3">
                    <img
                      src={p.pic}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm mt-2">{p.name}</p>
                      <div>
                        <p className="text-gray-500 text-xs mt-1 inline">
                          {p.category}
                        </p>
                        <span className="text-gray-500 text-sm">
                          {" "}
                          ({p.stock})
                        </span>
                      </div>
                      <p className="font-bold text-sm mt-1">${p.price}</p>
                    </div>
                    <button
                      className="self-start mt-1 cursor-pointer"
                      onClick={() =>
                        setFavId(FavoriteIds.filter((id) => id !== p.id))
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#EF0608"
                        className="size-6"
                      >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                    </button>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}
