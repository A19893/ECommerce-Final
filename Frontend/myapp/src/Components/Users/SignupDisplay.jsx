import React, { useState } from "react";
import Capture from "../../Assets/Capture.PNG";
import { UserOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import { LoginOutlined, GoogleOutlined, PhoneFilled } from "@ant-design/icons";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import validator from "validator";
import "react-phone-number-input/style.css";
const SignupDisplay = (props) => {
  // Email Validation
  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      props.setEmailError("Valid Email");
    } else {
      props.setEmailError("Enter valid Email!");
    }
  };
  const handleChange = (e) => {
    props.setEmail(e.target.value.trim());
    validateEmail(e);
  };
  return (
    <div className="container">
      <div className="signupContainer">
        <div className="signupimgContainer">
          <img src={Capture} alt="missing" />
        </div>
        <div className="signupContent">
          <span className="welcome">Welcome to InstaShopin</span>
          <span className="shipment">Shop Online Today</span>
          <div className="signup-form">
            <div className="username-form">
              <Input
                size="large"
                style={{
                  width: "350px",
                  boxShadow: " 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
                  padding: "15px",
                }}
                maxLength={15}
                placeholder="   Username"
                prefix={<UserOutlined />}
                onChange={(e) => props.setName(e.target.value.trim())}
                value={props.name}
              />
              <br />
              <br />
              <Input
                size="large"
                style={{
                  width: "350px",
                  boxShadow: " 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
                  padding: "15px",
                }}
                maxLength={30}
                placeholder="    Email"
                prefix={<MailOutlined />}
                onChange={handleChange}
                value={props.email}
              />
              {props?.emailError === "Valid Email" ? (
                <span style={{ fontWeight: "bold", color: "green" }}>
                  {props?.emailError}
                </span>
              ) : (
                <span style={{ fontWeight: "bold", color: "red" }}>
                  {props?.emailError}
                </span>
              )}
              <br />
              <br />
              <Input
                size="large"
                style={{
                  width: "350px",
                  boxShadow: " 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
                  padding: "15px",
                }}
                type="text"
                placeholder="    Phone Number"
                prefix={<PhoneFilled />}
                onChange={props?.handleInputChange}
                value={props?.number}
                required
              />
              <span style={{ fontWeight: "bold", color: "red" }}>
                {props?.numberError}
              </span>
              <br />
              <br />
              <Input
                size="large"
                style={{
                  width: "350px",
                  boxShadow: " 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
                  padding: "15px",
                }}
                type="password"
                placeholder="   Password"
                prefix={<LockOutlined />}
                onChange={(e) => props.setPassword(e.target.value.trim())}
                value={props.password}
                required
              />
              <br />
              <span className="navLogin">
                <Link style={{ color: "rgb(23, 74, 132)" }} to="/login">
                  Already a Registered User?
                </Link>
              </span>
              <br />
              <br />
              <div style={{ justifyContent: "space-between" }}>
                <Button
                  type="primary"
                  icon={<LoginOutlined />}
                  style={{ width: "100px", height: "40px" }}
                  onClick={props.onManualSignup}
                >
                  Sign Up
                </Button>
                <Button
                  type="primary"
                  icon={<GoogleOutlined />}
                  style={{
                    paddingLeft: "10px",
                    marginLeft: "140px",
                    height: "40px",
                  }}
                  onClick={props?.signInGoogle}
                >
                  Sign In with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupDisplay;
