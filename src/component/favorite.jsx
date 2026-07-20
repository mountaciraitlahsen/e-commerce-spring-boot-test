import { Link } from "react-router-dom";
import heartIcon from "../assets/heart.svg";
import { useLocation } from "react-router-dom";
export default function Favorite({ counterFavorite }) {
  const location = useLocation();
  return (
    <>
      <Link
        to="/favorites"
        state={{ backgroundLocation: location }}
        className="favorite cursor-pointer text-base"
      >
        <img
          src={heartIcon}
          alt=""
          className="inline-block w-5 h-5 align-middle mr-1"
        />
        <span className="pl-1">
          Favorites (<span>{counterFavorite}</span>)
        </span>
      </Link>
    </>
  );
}
