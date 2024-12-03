import { useAuthContext } from "./useAuthContext";

export const useLogout = () => { 
    const { dispatch } = useAuthContext();
    const logout = () => {
        dispatch({ type: "LOGOUT" });
        setTimeout(() => {
            localStorage.removeItem("user");
        }, 20);

        window.location.href = "/";

    }

    return { logout };
}