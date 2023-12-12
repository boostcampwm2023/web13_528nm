import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/components/Toast/useToast";

const useAuth = () => {
  const navigate = useNavigate();
  const showToast = useToast();

  const checkAuth = useCallback(() => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      showToast({ message: "로그인이 필요해요.", type: "alert" });
      navigate("/userauth");
    } else {
      const username = localStorage.getItem("username");
      const email = localStorage.getItem("email");
      if (!username || !email) {
        axios
          .get(`${import.meta.env.VITE_API_SERVER_URL}/profile`, {
            headers: {
              Authorization: accessToken
            }
          })
          .then((response) => {
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("email", response.data.email);
          })
          .catch((error) => {
            console.log(error.response?.status);
            if (error.response?.status === 401) {
              showToast({ message: "로그인이 만료되었어요.", type: "alert" });
              navigate("/userauth");
            } else showToast({ message: "유저 정보를 불러오는데 문제가 발생했어요", type: "alert" });
          });
      }
    }
  }, [navigate, showToast]);

  return { checkAuth };
};

export default useAuth;
