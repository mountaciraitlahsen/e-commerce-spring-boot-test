import { Link } from "react-router-dom";
import heartIcon from "../assets/heart.svg";
export default function Favorite({ counterFavorite }) {
  return (
    <>
      <Link to="/favorites"
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
