import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux'; // Assuming you're using Redux for state management
import { toast } from 'react-toastify';

// Create Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, // Your backend URL
});

// Axios Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response, // Handle successful responses
    (error) => {
        const navigate = useNavigate();
        const dispatch = useDispatch();

        if (error.response && error.response.status === 401) {
            // Handle token expiration or invalid token error
            toast.error('Session expired. Please log in again.', {
                position: "top-center",
                autoClose: 5000, // Automatically close after 5 seconds
                onClose: () => {
                    console.log('Token expired or invalid'); // Debugging log
                    Cookies.set("user", "");
                    dispatch({
                        type: "LOGOUT",
                    });
                    navigate("/login");
                }
            });
        }

        return Promise.reject(error); // Reject the error if it's not 401
    }
);

export default axiosInstance;
