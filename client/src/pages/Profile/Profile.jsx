import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../../Components/LeftSideBar";
import RightSideBar from "../../Components/RightSideBar";
import EditProfile from "../../Components/EditProfile";
import Tweet from "../../Components/Tweet";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { following } from "../../redux/userReducer";

const Profile = () => {
  const { currentUser } = useSelector((s) => s.user);
  const { id } = useParams();
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setuserProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios
          .get(`https://twitter-clone-dtwq.onrender.com/api/user/find/${id}`)
          .catch(() => navigate(-1));
        const res2 = await axios.get(
          `https://twitter-clone-dtwq.onrender.com/api/tweet/user/all/${id}`
        );
        setUserTweets(res2.data);
        setuserProfile(res.data);
      } catch (error) {
        //
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, id]);

  const handleFollow = async () => {
    if (!currentUser.following.includes(id)) {
      await axios.put(
        `https://twitter-clone-dtwq.onrender.com/api/user/follow/${id}`,
        {
          id: currentUser._id,
        }
      );
      dispatch(following(id));
    } else {
      await axios.put(
        `https://twitter-clone-dtwq.onrender.com/api/user/unfollow/${id}`,
        {
          id: currentUser._id,
        }
      );
      dispatch(following(id));
    }
  };

  return (
    <>
      <div className="grid grid-col-1 md:grid-cols-4">
        <div>
          <LeftSideBar />
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            <img
              src={userProfile?.profilePicture}
              alt="user selected profile picture"
              className="w-12 h-12 rounded-full"
            />
            {currentUser._id === id ? (
              <button
                onClick={() => setOpen(true)}
                className="px-4 y-2 bg-blue-500 rounded-full text-white"
              >
                Edit Profile
              </button>
            ) : currentUser.following.includes(id) ? (
              <button
                className="px-4 y-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="px-4 y-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
          </div>
          <div className="mt-6">
            {userTweets
              ? userTweets.map((tweet) => {
                  return (
                    <div className="p-2" key={tweet._id}>
                      <Tweet tweet={tweet} setData={setUserTweets} />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className="px-6">
          <RightSideBar />
        </div>
      </div>
      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Profile;
