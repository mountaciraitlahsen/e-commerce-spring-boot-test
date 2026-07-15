import { Link } from "react-router-dom";
import cartIcon from "../assets/shopping-cart.svg";
export default function Cart({ counterCart, setCartModal }) {
  return (
    <>
      <Link to="/cart" className="cart cursor-pointer text-base">
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
