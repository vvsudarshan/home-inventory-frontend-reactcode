import { atom, selector } from "recoil";
import axios from "axios";

export const userSettingsState = atom({
  key: "userSettingsState",
  default: {
    id: null,
    username: "",
    email: "",
    phoneNumber: "",
    bio: "",
    profileImage: "",
  },
});


export const userSettingsSelector = selector({
  key: "userSettingsSelector",
  get: async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || !storedUser.id) {
        console.error("User ID not found in local storage.");
        return null;
      }

      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/user/${storedUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user settings:", error);
      return null;
    }
  },
});
