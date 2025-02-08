import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    const getRequests = async () => {
      await fetchRequests();
    };
    getRequests();
  }, [dispatch]);

  if (!requests) return;

  if (requests.length === 0) return <h1>No requests found</h1>;

  return (
    <div className=" text-center my-10 ">
      <h1 className="font-bold text-3xl text-white">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-200 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 mt-2">
              <h1 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h1>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2">Reject</button>
              <button className="btn btn-secondary mx-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
