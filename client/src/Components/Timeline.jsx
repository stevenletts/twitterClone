import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "./Tweet";

const Timeline = () => {
  const [timeline, setTimeline] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`/api/tweet/timeline/${currentUser._id}`);
        setTimeline(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser._id]);

  return (
    <div className="mt-6">
      {timeline
        ? timeline.map((tweet) => {
            return (
              <div key={tweet._id} className="p-2">
                <Tweet tweet={tweet} setData={setTimeline} />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Timeline;
