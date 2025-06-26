import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import "./style.css";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useState } from 'react';
import SearchAccount from './SearchAccount';
import SendEmail from './SendEmail';
import CodeVerification from './CodeVerification';
import ChangePassword from './ChangePassword';

export default function ResetPassword() {
    //Logout function
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        Cookies.set("user", "");
        dispatch({
            type: "LOGOUT",
        });
        navigate("/login");
    };

    //Show backend error message
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState("");

    //Change the page of the reset password
    const [page, setPage] = useState(0);

    const [userInfos, setUserInfos] = useState("");

    return (
        <div className="reset">
            <div className="reset_header">
                <div className="reset_header_icon" style={{ display: 'flex', alignItems: 'center' }}>
                    <svg width="0" height="0">
                        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop stopColor="rgb(43, 192, 228)" offset="0%" />
                            <stop stopColor="rgb(234, 236, 198)" offset="100%" />
                        </linearGradient>
                    </svg>
                    <PhotoCameraIcon style={{ fontSize: "larger", marginRight: "6px", fill: "url(#blue-gradient)" }} className="logo_icon icon_size_28" ></PhotoCameraIcon>
                    <h4 className="fw-bold text-uppercase logo_color logo_name mt-2">FoodSnap</h4>
                </div>
                {user ? (
                    <div className="right_reset">
                        <Link to="/profile">
                            <img src={user.picture} alt="" />
                        </Link>
                        <Button variant="contained" style={{ backgroundColor: "var(--logo-color)" }} endIcon={<LogoutOutlinedIcon />} onClick={() => { logout(); }}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Link to="/login" className="right_reset">
                        <Button variant="contained" style={{ backgroundColor: "var(--logo-color)" }} endIcon={<LoginOutlinedIcon />} >
                            Login
                        </Button>
                    </Link>
                )}
            </div>

            <div className="reset_wrap">
                {page === 0 &&
                <SearchAccount error={error} setError={setError} loading={loading} setLoading={setLoading} setUserInfos={setUserInfos} setPage={setPage} />
                }
                 {page === 1 &&
                <SendEmail setPage={setPage} userInfos={userInfos} error={error} setError={setError} loading={loading} setLoading={setLoading}/>
                }
                 {page === 2 &&
                <CodeVerification setPage={setPage} error={error} setError={setError} code={code} setCode={setCode} loading={loading} setLoading={setLoading} userInfos={userInfos} />
                }
                 {page === 3 &&
                <ChangePassword setPage={setPage} error={error} setError={setError} userInfos={userInfos} loading={loading} setLoading={setLoading} />
                }
            </div>
        </div>
    )
}
