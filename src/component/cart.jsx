import { Link } from "react-router-dom";
import cartIcon from "../assets/shopping-cart.svg";
import { useLocation } from "react-router-dom";
export default function Cart({ counterCart, setCartModal }) {
  const location = useLocation();
  return (
    <>
      <Link
        to="/cart"
        state={{ backgroundLocation: location }}
        className="cart cursor-pointer text-base"
      >
        <img
          src={cartIcon}
          alt=""
          className="inline-block w-5 h-5 align-middle mr-1"
        />
        <span className="pl-1">
          cart (<span>{counterCart}</span>)
        </span>
      </Link>
    </>
  );
}
