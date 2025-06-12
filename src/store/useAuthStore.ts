import { create } from "zustand"
import { persist } from "zustand/middleware"
interface UserData {
    id:number;
    accessToken: string;
    email: string;
    gender: string;
    image: string;
    lastName: string;
    firstName: string;
    refreshToken: string;
    username: string;
}

interface DataLogin extends UserData {
    isLogin: boolean;
    login: (userData: UserData) => void;
    logout: () => void;
}

const useAuthStore = create<DataLogin>()(
  persist(
    (set) => ({
      id: 0,
      isLogin: false,
      accessToken: "",
      email: "",
      gender: "",
      image: "",
      lastName: "",
      refreshToken: "",
      username: "",
      firstName: "",
      login: (userData) =>
        set({
          ...userData,
          isLogin: true,
        }),
      logout: () =>
        set({
          id: 0,
          isLogin: false,
          accessToken: "",
          email: "",
          gender: "",
          image: "",
          lastName: "",
          refreshToken: "",
          username: "",
          firstName: "",
        }),
    }),
    {
      name: "data_login",
    }
  )
)

export default useAuthStore