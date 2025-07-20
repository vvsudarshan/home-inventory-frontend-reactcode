import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { userSettingsState, userSettingsSelector } from "../atoms/userSettingsAtom";
import { useEffect, useState } from "react";
import axios from "axios";

const SettingsPage = () => {
  const userSettings = useRecoilValueLoadable(userSettingsSelector);
  const [user, setUser] = useRecoilState(userSettingsState);
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (userSettings.state === "hasValue" && userSettings.contents) {
      setUser((prev) => ({ ...prev, ...userSettings.contents }));
    }
  }, [userSettings, setUser]);

  if (!user) {
    return <p className="text-center text-white">Loading...</p>;
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImageUpload = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("phoneNumber", user.phoneNumber);
    formData.append("bio", user.bio);
    if (password) formData.append("password", password);
    if (profileImage) formData.append("profileImage", profileImage);

    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/user/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Settings updated!");
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">User Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400">Username</label>
          <input type="text" value={user?.username || ""} disabled className="w-full p-2 bg-gray-700 rounded-md" />
        </div>
        <div>
          <label className="block text-gray-400">Email</label>
          <input type="email" name="email" value={user?.email || ""} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded-md" />
        </div>
        <div>
          <label className="block text-gray-400">Phone Number</label>
          <input type="text" name="phoneNumber" value={user?.phoneNumber || ""} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded-md" />
        </div>
        <div>
          <label className="block text-gray-400">Bio</label>
          <textarea name="bio" value={user?.bio || ""} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded-md"></textarea>
        </div>
        <div>
          <label className="block text-gray-400">New Password</label>
          <input type="password" value={password} onChange={handlePasswordChange} className="w-full p-2 bg-gray-700 rounded-md" />
        </div>
        <div>
          <label className="block text-gray-400">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 bg-gray-700 rounded-md" />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded-md">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
