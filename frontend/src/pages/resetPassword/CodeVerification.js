import React from 'react'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import EnterCode from './EnterCode';
import axios from "axios";


export default function CodeVerification({ error, setError, code, setCode, setPage, loading, setLoading, userInfos }) {
    const { email } = userInfos;
    const verifyCode = async () => {
        try {
            setLoading(true);
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
                { email, code }
            );
            setPage(3);
            setError("");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };
    return (
        <div className="reset_form">
            <div className="reset_form_header">Code Verification</div>
            <div className="reset_form_text">
                Please enter the verification code sent to your email associated with your account to reset your password.
            </div>
            <EnterCode code={code} setCode={setCode} setError={setError} />
            {error && <div className="" style={{display: "flex", justifyContent: "center"}}><div className="input_error" style={{width: "50%"}}>{error}</div></div>}
            <div className="reset_form_btns">
                <Link to="/login" >
                    <Button variant="contained" type='submit' style={{ color: "var(--logo-color)", backgroundColor: "#fff" }} >
                        Cancel
                    </Button>
                </Link>
                <Button variant="contained" type='submit' style={{ backgroundColor: "var(--logo-color)" }} onClick={() => verifyCode()} >
                    Continue
                </Button>
            </div>
        </div>
    )
}
