/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatDistance from "date-fns/formatDistance";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Tweet = ({ tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [userData, setUserData] = useState();

  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const like = await axios.put(
        `http://localhost:3000/api/tweet/${tweet._id}/like`,
        { id: currentUser._id }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(
          `http://localhost:3000/api/user/find/${tweet.userId}`
        );
        setUserData(findUser.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [tweet.userId, tweet.likes]);

  return (
    <div>
      {userData ? (
        <>
          <div className="flex space-x-2">
            {/* <img src="" alt="" /> */}
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>
            <span className="font-normal">@{userData.username}</span>
            <p> - {dateStr}</p>
          </div>

          <p>{tweet.description}</p>
          <button onClick={handleLike}>
            {tweet.likes.includes(currentUser._id) ? (
              <FavoriteIcon className="mr-2 my-2 cursor-pointer" />
            ) : (
              <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer" />
            )}
          </button>
          {tweet.likes.length}
        </>
      ) : null}
    </div>
  );
};

export default Tweet;
