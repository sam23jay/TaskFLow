import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css";
import NavBar from "./components/NavBar1";
import { useNavigate } from "react-router";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  Form,
  FormGroup,
} from "reactstrap";
import axios from "axios";
import Footer from "./components/Footer";

function SignUp() {
  const [LoginPostData, LoginChange] = useState({
    userName: "",
    password: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [PostData, change] = useState({
    userName: "",
    password: "",
    name: "",
    phoneNumber: "",
    email: "",
    country: "",
    profession: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    userName: "",
    country: "",
    profession: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
  });

  const handleDropdownChange = (profession) => {
    change({ ...PostData, profession: profession });
    setIsOpen(false);
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      name: "",
      userName: "",
      country: "",
      profession: "",
      password: "",
      confirmPassword: "",
      email: "",
      phoneNumber: "",
    };

    if (!PostData.name.trim()) {
      errors.name = "Name is required!";
      valid = false;
    }

    if (!PostData.userName.trim()) {
      errors.userName = "Username is required!";
      valid = false;
    }

    if (!PostData.country.trim()) {
      errors.country = "Country is required!";
      valid = false;
    }

    if (!PostData.profession.trim()) {
      errors.profession = "Profession is required!";
      valid = false;
    }

    if (!PostData.password.trim()) {
      errors.password = "Password is required!";
      valid = false;
    }

    if (PostData.password !== PostData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match!";
      valid = false;
    }

    if (!PostData.email.trim()) {
      errors.email = "Email is required!";
      valid = false;
    } else if (!isValidEmail(PostData.email)) {
      errors.email = "Invalid email address!";
      valid = false;
    }

    if (!PostData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required!";
      valid = false;
    } else if (!isValidPhoneNumber(PostData.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number!";
      valid = false;
    }

    setValidationErrors(errors);
    return valid;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phoneNumber);
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const loginResponse = await axios.post(
          "http://localhost:8080/login/create",
          LoginPostData
        );
        console.log(loginResponse.data);

        const signupResponse = await axios.post(
          "http://localhost:8080/signup/post",
          PostData
        );
        console.log(signupResponse.data);
      } catch (error) {
        console.error(error);
      }
      navigate("/login");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="signup-container">
        <Form onSubmit={handleSubmit}>
          <div className="Signup-total">
            <p className="create_pro">Create a new account</p>
            <FormGroup>
              <Input
                type="text"
                name="Signup-inputField"
                id="inputField1"
                value={PostData.name}
                placeholder="Enter Full Name"
                className="SignUp-Basic-Inputs"
                onChange={(e) => change({ ...PostData, name: e.target.value })}
              />
              {validationErrors.name && (
                <span className="error-message">{validationErrors.name}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="Signup-inputField"
                id="inputField2"
                value={PostData.userName}
                placeholder="Enter Username"
                className="SignUp-Basic-Inputs"
                onChange={(e) => {
                  change({ ...PostData, userName: e.target.value });
                  LoginChange({ ...LoginPostData, userName: e.target.value });
                }}
              />
              {validationErrors.userName && (
                <span className="error-message">
                  {validationErrors.userName}
                </span>
              )}
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="Signup-inputField"
                id="inputField3"
                value={PostData.country}
                placeholder="Enter Country"
                className="SignUp-Basic-Inputs"
                onChange={(e) => {
                  change({ ...PostData, country: e.target.value });
                }}
              />
              {validationErrors.country && (
                <span className="error-message">
                  {validationErrors.country}
                </span>
              )}
            </FormGroup>
            <FormGroup>
              <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
                <DropdownToggle caret className="Dropdowncss">
                  {PostData.profession
                    ? PostData.profession
                    : "Select a Profession"}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() =>
                      handleDropdownChange("Software Development")
                    }>
                    Software Development
                  </DropdownItem>
                  <DropdownItem onClick={() => handleDropdownChange("Student")}>
                    Student
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleDropdownChange("Management")}>
                    Management
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleDropdownChange("Education")}>
                    Education
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleDropdownChange("Accountant")}>
                    Accountant
                  </DropdownItem>
                  <DropdownItem onClick={() => handleDropdownChange("Arts")}>
                    Arts
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleDropdownChange("Marketing")}>
                    Marketing
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleDropdownChange("Healthcare")}>
                    Healthcare
                  </DropdownItem>
                  <DropdownItem onClick={() => handleDropdownChange("Other")}>
                    Other
                  </DropdownItem>{" "}
                </DropdownMenu>
              </Dropdown>
              {validationErrors.profession && (
                <span className="error-message">
                  {validationErrors.profession}
                </span>
              )}
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="Signup-inputField2"
                id="inputField4"
                placeholder="Enter Password"
                className="SignUp-Basic-Inputs"
                value={PostData.password}
                onChange={(e) => {
                  change({ ...PostData, password: e.target.value });
                  LoginChange({ ...LoginPostData, password: e.target.value });
                }}
              />
              {validationErrors.password && (
                <span className="error-message">
                  {validationErrors.password}
                </span>
              )}
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="Signup-inputField2"
                id="inputField5"
                placeholder="Re-enter Password"
                className="SignUp-Basic-Inputs"
                onChange={(e) =>
                  change({ ...PostData, confirmPassword: e.target.value })
                }
              />
              {validationErrors.confirmPassword && (
                <span className="error-message">
                  {validationErrors.confirmPassword}
                </span>
              )}
            </FormGroup>

            <FormGroup>
              <Input
                type="text"
                name="Signup-inputField"
                id="inputFiel6"
                placeholder="Enter valid E-mail ID"
                className="SignUp-Basic-Inputs"
                value={PostData.email}
                onChange={(e) => change({ ...PostData, email: e.target.value })}
              />
              {validationErrors.email && (
                <span className="error-message">{validationErrors.email}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="Signup-inputField"
                id="inputFiel7"
                placeholder="Enter Contact Number"
                className="SignUp-Basic-Inputs"
                value={PostData.phoneNumber}
                onChange={(e) =>
                  change({ ...PostData, phoneNumber: e.target.value })
                }
              />
              {validationErrors.phoneNumber && (
                <span className="error-message">
                  {validationErrors.phoneNumber}
                </span>
              )}
            </FormGroup>
            <FormGroup>
              <Button className="Laker-login" type="submit">
                Sign Up
              </Button>
              <a href="/login" className="hreflogin">
                Already have an account?
              </a>
            </FormGroup>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
