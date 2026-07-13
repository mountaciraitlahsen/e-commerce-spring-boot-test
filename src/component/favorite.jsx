import heartIcon from "../assets/heart.svg";
export default function Favorite({ counterFavorite, setFavoriteModal }) {
  return (
    <>
      <button
        className="favorite cursor-pointer text-base"
        onClick={() => setFavoriteModal(true)}
      >
        <img
          src={heartIcon}
          alt=""
          className="inline-block w-5 h-5 align-middle mr-1"
        />
        <span className="pl-1">
          Favorites (<span>{counterFavorite}</span>)
        </span>
      </button>
    </>
  );
}
