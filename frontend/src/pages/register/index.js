import "./style.css";
import RegisterForm from "../../components/login/RegisterForm";
import { useState } from "react";

export default function Register() {
  return (
    <div className="register">
      <div className="register_wrapper">
        <RegisterForm />
      </div>
    </div>
    
  );
}
