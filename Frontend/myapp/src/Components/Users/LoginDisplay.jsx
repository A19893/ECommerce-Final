import React from "react";
import Capture from "../../Assets/Capture1.PNG";
import { MailOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import { LoginOutlined, GoogleOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
const LoginDisplay = (props) => {
  return (
    <div className="logincontainer">
      <div className="signupContainer">
        <div className="signupimgContainer">
          <img src={Capture} alt="missing" />
        </div>
        <div className="loginContent">
          <span className="loginwelcome">Welcome Back</span>
          <span className="loginshipment">Shop Online Today</span>
          <div className="signup-form">
            <div className="username-form">
              <Input
                size="large"
                style={{
                  width: "350px",
                  boxShadow: " 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
                  padding: "15px",
                }}
                maxLength={30}
                placeholder="    Email/Phone Number"
                prefix={<MailOutlined />}
                onChange={(e) => props.setEmail(e.target.value.trim())}
                value={props.email}
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
                type="password"
                placeholder="   Password"
                prefix={<LockOutlined />}
                onChange={(e) => props.setPassword(e.target.value.trim())}
                value={props.password}
              />
              <br />
              <span className="navLogin">
                <Link style={{ color: "rgb(157, 50, 176)" }} to="/">
                  Not a Registered User?
                </Link>
              </span>
            </div>
            <div className="logingoogle">
              <Button
                type="primary"
                icon={<LoginOutlined />}
                style={{
                  paddingLeft: "10px",
                  marginLeft: "140px",
                  height: "40px",
                }}
                onClick={props.onManualLogin}
              >
                Log In
              </Button>
              <Button
                type="primary"
                icon={<GoogleOutlined />}
                style={{
                  paddingRight: "10px",
                  marginRight: "100px",
                  height: "40px",
                }}
                onClick={props.signInGoogle}
              >
                Log In with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDisplay;
