import React, { useState } from "react";
import "./ResetPassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Label, Input, Button, Form, FormGroup } from "reactstrap";
import axios from "axios";
function ResetPassword() {
 
  const [show, togglePassword] = useState(false);
  const [PostData, change] = useState({ userName: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/reset/post",
        PostData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="total">
        <div className="ResetBig">Login</div>
        <FormGroup>
          <Label for="inputField" style={{ color: "black" }}>
            Username:
          </Label>
          <Input
            type="text"
            name="inputField"
            id="inputField"
            className="UserNamestyle1"
            value={PostData.userName}
            style={{ color: "white" }}
            placeholder="Enter Username"
            onChange={(e) => change({ ...PostData, userName: e.target.value })}
          />
          <FormGroup>
            <Label for="inputField2" style={{ color: "black" }}>
              Password
            </Label>
            <Input
              type={show ? "text" : "password"}
              value={PostData.password}
              name="inputField2"
              id="inputField2"
              placeholder="Enter Password"
              className="Passwordstyle1"
              style={{ color: "white" }}
              onChange={(e) =>
                change({ ...PostData, password: e.target.value })
              }
            />
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <Input
            type="checkbox"
            name="showPassword"
            id="showPassword"
            className="custom-checkbox1"
            onClick={() => togglePassword(!show)}
          />
          <Label for="showPassword" className="checkbox-label1">
            Show Password
          </Label>
        </FormGroup>
        <FormGroup>
          <Button type="submit" className="ResetButton">
            Login
          </Button>
        </FormGroup>
      </div>
    </Form>
  );
}

export default ResetPassword;
