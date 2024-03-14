import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const accessToken = sessionStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]);

    return
};