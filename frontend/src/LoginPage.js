import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Input } from "reactstrap";
import NavBar from "./components/NavBar1";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "./AuthContext";

import Cookies from "js-cookie";
import { useContext } from "react";
import Footer from "./components/Footer";

function LoginPage() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, togglePassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const rememberMeToken = Cookies.get("rememberMeToken");
    if (rememberMeToken) {
      navigate("/viewtask");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Please enter both username and password");
      return;
    }

    try {
      const loginData = {
        username: username,
        password: password,
        rememberMe: rememberMe,
      };
      const response = await axios.post(
        "http://localhost:8080/login/post/auth",
        loginData
      );
      if (response.data === "Invalid username or password") {
        setErrorMessage("Incorrect username or password");
      } else {
        console.log("Successful");
        const response1 = await axios.get(
          `http://localhost:8080/login/get/id/${username}`,
          {
            withCredentials: true,
          }
        );
        const userId = response1.data;
        localStorage.setItem("userId", userId);
        const cookieId = localStorage.getItem("userId");
        const rememberMeToken = response.data;
        console.log(rememberMeToken);
        if (rememberMe) {
          Cookies.set("rememberMeToken", rememberMeToken, { expires: 7 });

          try {
            const response = await axios.put(
              `http://localhost:8080/login/update/${cookieId}`,
              {
                userName: username,
                password: password,
                cookie: rememberMeToken,
              }
            );
            console.log(response.data);
          } catch (error) {
            console.log(error.data);
          }
        }
        console.log("isLoggedIn:", isLoggedIn);
        setIsLoggedIn(true);
        navigate("/viewtask");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="loginfonts">
      <NavBar />
      <div className="login-page-container">
        <Form onSubmit={handleLogin}>
          <div className="form-container">
            <div className="login-form">
              <div className="login-heading">Log in</div>
              <Input
                type="text"
                className="username-input"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type={showPassword ? "text" : "password"}
                className="password-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <span className="error-message">{errorMessage}</span>
              )}
              <div className="checkbox-container">
                <label>
                  <Input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={showPassword}
                    onChange={() => togglePassword(!showPassword)}
                  />
                  Show Password
                </label>
              </div>
              <div className="checkbox-container">
                <label>
                  <Input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  Remember me
                </label>
              </div>
              <Button className="login-button" onClick={handleLogin}>
                Login
              </Button>
              <a className="signup-link" href="signup">
                Don't have an account?
              </a>
            </div>
          </div>
        </Form>
      </div>
      <div className="ChampPoe">
        <Footer />
      </div>
    </div>
  );
}

export default LoginPage;
