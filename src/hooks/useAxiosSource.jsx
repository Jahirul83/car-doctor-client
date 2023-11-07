import axios from "axios";
import { useEffect } from "react";
// import { AuthContext } from "../providers/AuthProvider";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSource = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true

})
const useAxiosSource = () => {
    const {logOut}= useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSource.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('error token in interceptor', error.response)
            if (error.response.status === 401 || error.response.status === 403){
                logOut()
                .then(() => {
                    navigate('/login')
                }).then((err) => {
                    console.log(err);
                });
                console.log('logout the user');
            }
        })
    }, [])


    return axiosSource;
};

export default useAxiosSource;