import { useNavigate } from "react-router-dom";
export default function CartModal({
  counterCart,
  CartIds,
  setCartId,
  Products,
}) {
  const navigate = useNavigate();
  function increaseQuantity(id) {
    const item = CartIds.find((current) => current.id === id);
    const product = Products.find((current) => current.id === id);
    if (!item || !product) return;
    if (item.quantity >= product.stock) return;

    setCartId((prev) =>
      prev.map((current) =>
        current.id === id
          ? { ...current, quantity: current.quantity + 1 }
          : current,
      ),
    );
  }

  function decreaseQuantity(id) {
    setCartId((prev) =>
      prev
        .map((current) =>
          current.id === id
            ? { ...current, quantity: current.quantity - 1 }
            : current,
        )
        .filter((current) => current.quantity > 0),
    );
  }

  function removeItem(id) {
    setCartId((prev) => prev.filter((current) => current.id !== id));
  }

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
            <h2 className="text-xl font-bold">Your Cart</h2>
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
            <span className="text-gray-600">{counterCart} items</span>
            <button
              className="text-red-500 font-medium hover:underline cursor-pointer"
              onClick={() => setCartId([])}
            >
              Clear all
            </button>
          </div>

          <div className="space-y-4 mt-4">
            {Products.map((p) => {
              const exist = CartIds.find((item) => item.id === p.id);
              if (exist) {
                return (
                  <div
                    key={p.id}
                    className="flex items-center gap-5 h-[5.8rem] border-t-2 border-[#F5F6F7] mt-4 pt-3"
                  >
                    <img
                      src={p.pic}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mt-2">{p.name}</p>
                      <div>
                        <p className="text-gray-500 text-xs mt-1 inline">
                          {p.category}
                        </p>
                        <span className="text-gray-500 text-sm">
                          ({p.stock})
                        </span>
                      </div>
                      <p className="font-bold text-sm mt-1">${p.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
                        <button
                          type="button"
                          className="h-10 w-10 border-r border-[#e5e7eb] text-lg font-medium text-gray-700 hover:bg-gray-50"
                          onClick={() => decreaseQuantity(p.id)}
                        >
                          -
                        </button>
                        <input
                          className="h-10 w-12 border-0 bg-transparent text-center text-sm font-semibold text-gray-800 outline-none"
                          type="number"
                          value={exist.quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          className="h-10 w-10 border-l border-[#e5e7eb] text-lg font-medium text-gray-700 hover:bg-gray-50"
                          onClick={() => increaseQuantity(p.id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => removeItem(p.id)}
                        aria-label={`Remove ${p.name} from cart`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4h8v2" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                        </svg>
                      </button>
                    </div>
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
