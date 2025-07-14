import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const GENDER_OPTIONS = [
  { value: "", label: "Select gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const EditProfile = ({ user, onClose }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    // Basic validation
    if (!firstName.trim() || firstName.trim().length < 4) {
      setError("First name must be at least 4 characters.");
      return;
    }
    if (age && (isNaN(age) || age < 0 || age > 120)) {
      setError("Please enter a valid age.");
      return;
    }
    if (photoUrl && !/^https?:\/\/.+\..+/.test(photoUrl)) {
      setError("Please enter a valid photo URL.");
      return;
    }
    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          photoUrl: photoUrl.trim(),
          age: age ? Number(age) : undefined,
          gender,
          about: about.trim(),
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data ||
        "Profile update failed."
      );
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 my-10 min-h-screen bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100">
        {/* Edit Form */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
            Edit Profile
          </h2>
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                className="input w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setFirstName(e.target.value)}
                required
                minLength={4}
              />
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                className="input w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                value={photoUrl}
                className="input w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                min={0}
                max={120}
                className="input w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                className="input w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setGender(e.target.value)}
              >
                {GENDER_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
            {/* About */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About
              </label>
              <textarea
                value={about}
                className="input w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                rows={3}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {/* Save & Cancel Buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold shadow hover:bg-gray-400 transition"
                onClick={onClose}
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:from-purple-600 hover:to-pink-600 transition"
                onClick={saveProfile}
                type="button"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
        {/* Live Preview */}
        <div>
          <UserCard
            user={{
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              photoUrl: photoUrl.trim(),
              age: age ? Number(age) : undefined,
              gender,
              about: about.trim(),
            }}
            isOwnProfile={true}
          />
        </div>
      </div>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Profile saved successfully.
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
