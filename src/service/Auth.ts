import axiosInstance from "../config/axiosInstance";
import useAuthStore from "../store/useAuthStore";

export const fetchLogin = async (username: string, password: string): Promise<boolean> => {
    try {
        const {login} = useAuthStore.getState()
        const res = await axiosInstance.post('/auth/login', { username, password });
        localStorage.setItem('data_login', JSON.stringify(res.data));
        login(res.data)
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
};
