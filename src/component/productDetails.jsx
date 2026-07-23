import { useEffect, useMemo } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";

export default function ProductDetails({
  Products,
  FavoriteIds,
  setFavId,
  CartIds,
  setCartId,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const ProductCard = useMemo(
    () => Products.find((p) => p.id === Number(id)),
    [Products, id],
  );
  const cartItem = useMemo(
    () => CartIds.find((item) => item.id === Number(id)),
    [CartIds, id],
  );

  useEffect(() => {
    if (!ProductCard) {
      navigate(location.state?.backgroundLocation?.pathname || "/", {
        replace: true,
      });
    }
  }, [ProductCard, navigate, location]);

  function increaseQuantity(productId) {
    const item = CartIds.find((c) => c.id === productId);
    const product = Products.find((p) => p.id === productId);
    if (!product) return;
    if (item && item.quantity >= product.stock) return;
    setCartId((prev) =>
      prev.find((c) => c.id === productId)
        ? prev.map((c) =>
            c.id === productId ? { ...c, quantity: c.quantity + 1 } : c,
          )
        : [...prev, { id: productId, quantity: 1 }],
    );
  }

  function decreaseQuantity(productId) {
    setCartId((prev) =>
      prev
        .map((c) =>
          c.id === productId ? { ...c, quantity: c.quantity - 1 } : c,
        )
        .filter((c) => c.quantity > 0),
    );
  }

  function toggleFavorite(productId) {
    setFavId((prev) =>
      prev.includes(productId)
        ? prev.filter((p) => p !== productId)
        : [...prev, productId],
    );
  }

  if (!ProductCard) return null;

  const isFavorited = FavoriteIds.includes(ProductCard.id);
  const inCartQty = cartItem?.quantity ?? 0;
  const isOutOfStock = ProductCard.stock === 0;
  const isMaxedOut = inCartQty >= ProductCard.stock;

  return (
    <div className="col-span-4 w-full max-w-6xl mx-auto px-6 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[#1C5CF8] font-medium mb-8 hover:underline transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="relative bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden aspect-square">
          <img
            src={ProductCard.pic}
            alt={ProductCard.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => toggleFavorite(ProductCard.id)}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-md hover:scale-110 transition-transform cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFavorited ? "#EF0608" : "none"}
              stroke={isFavorited ? "#EF0608" : "#374151"}
              strokeWidth={1.8}
              className="size-6"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </button>

          {isOutOfStock && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Out of Stock
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm uppercase tracking-wider text-[#1C5CF8] font-semibold mb-2">
              {ProductCard.category}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {ProductCard.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  isOutOfStock
                    ? "bg-red-500"
                    : ProductCard.stock <= 3
                      ? "bg-orange-500"
                      : "bg-green-500"
                }`}
              />
              <span>
                {isOutOfStock
                  ? "Unavailable"
                  : `${ProductCard.stock} in stock`}
              </span>
            </div>
          </div>

          <div className="border-t border-b border-[#e5e7eb] py-6">
            <p className="text-sm text-gray-500 mb-1">Price</p>
            <p className="text-4xl font-bold text-gray-900">
              ${ProductCard.price}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {inCartQty === 0 ? (
              <button
                onClick={() => increaseQuantity(ProductCard.id)}
                disabled={isOutOfStock}
                className="w-full flex items-center justify-center gap-2 bg-[#1C5CF8] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1849d1] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            ) : (
              <div className="flex items-stretch border-2 border-[#1C5CF8] rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => decreaseQuantity(ProductCard.id)}
                  className="w-14 text-2xl font-semibold text-[#1C5CF8] hover:bg-blue-50 transition-colors"
                >
                  −
                </button>
                <div className="flex-1 flex items-center justify-center font-semibold text-lg text-gray-900 border-x-2 border-[#1C5CF8]">
                  {inCartQty} in cart
                </div>
                <button
                  type="button"
                  onClick={() => increaseQuantity(ProductCard.id)}
                  disabled={isMaxedOut}
                  className="w-14 text-2xl font-semibold text-[#1C5CF8] hover:bg-blue-50 transition-colors disabled:text-gray-300 disabled:hover:bg-transparent"
                >
                  +
                </button>
              </div>
            )}
            {isMaxedOut && (
              <p className="text-sm text-orange-600 text-center">
                Maximum stock reached
              </p>
            )}
          </div>

          <div className="bg-[#F9FAFB] rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 text-[#1C5CF8]"
              >
                <path d="M5 12V6a1 1 0 0 1 1-1h10" />
                <path d="m19 9-3 3 3 3" />
                <path d="M8 12h11" />
              </svg>
              <span>Free returns within 30 days</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 text-[#1C5CF8]"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
