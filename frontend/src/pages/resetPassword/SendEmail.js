import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { useEffect } from 'react';

export default function SendEmail({ setPage, userInfos, error, setError, setLoading }) {
    const sendEmail = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
                { email: userInfos.email }
            );
            setError("");
            setPage(2);
            setLoading(false);
            console.log(data);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };

    
    // Add event listener for keydown event
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                sendEmail(); // Call sendEmail function when Enter key is pressed
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        
        // Clean up event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Empty dependency array means this effect runs only once on component mount

    return (
        <div className="reset_form">
            {console.log(userInfos)}
            <div className="reset_form_header">Find Your Account</div>
            <div className="reset_right">
                <img src={userInfos.picture} alt="user_profile_picture" />
                <span>{userInfos.email}</span>
                <span style={{ color: "gray", fontSize: "0.85rem", marginBottom: "10px" }}>Facebook user</span>
                {error && <div className="input_error">{error}</div>}
            </div>
            <div className="reset_form_btns">
                <div style={{ whiteSpace: 'nowrap' }}>
                    <Button variant="contained" style={{ color: 'var(--logo-color)', backgroundColor: '#fff' }} onClick={() => setPage(0)}>
                        Not You?
                    </Button>
                </div>

                <Button variant="contained" type='submit' style={{ backgroundColor: "var(--logo-color)" }} onClick={() => sendEmail()}  >
                    Continue
                </Button>
            </div>

        </div>
    )
}
