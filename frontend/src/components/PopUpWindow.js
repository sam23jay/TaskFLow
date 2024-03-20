import React, { useState } from "react";
import {
  Label,
  Input,
  DropdownItem,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Form,
  Button,
} from "reactstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PopUpWIndow.css";

function PopUpWindow({ onClose, onAddItem }) {
  const handleDateChange = (date) => {
    change({ ...PostData, dueDate: date });
  };

  const currentDate = new Date();
  const [priority, setPriority] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const [PostData, change] = useState({
    status: "PENDING",
    taskName: "",
    description: "",
    priority: "",
    dueDate: new Date(),
    user: {
      id: localStorage.getItem("userId"),
      userName: "",
      password: "",
    },
    dueTime: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const resetFormData = () => {
    change({
      status: "",
      taskName: "",
      description: "",
      dueDate: new Date(),
      priority: "",
      dueTime: null,
      user: {
        id: localStorage.getItem("userId"),
        userName: "",
        password: "",
      },
    });
  };

  const handlePrioritySelect = (selectedPriority) => {
    setPriority(selectedPriority);
    change({ ...PostData, priority: selectedPriority });
  };

  const getDropdownColor = () => {
    if (priority === "LOW") {
      return "green";
    } else if (priority === "MID") {
      return "orange";
    } else if (priority === "HIGH") {
      return "red";
    }
    return "gray";
  };

  const dropdownColor = getDropdownColor();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !PostData.taskName ||
      !PostData.description ||
      !PostData.dueDate ||
      !PostData.priority
    ) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/task/post",
        PostData
      );
      console.log(response.data);

      const newItem = { ...PostData };
      onAddItem(newItem);

      resetFormData();
    } catch (error) {
      console.error(error);
    }

    onClose();
  };

  const handleClose = () => {
    resetFormData();
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className={`popup-container`}>
        <div className="popup-content">
          <h2>Task Details</h2>
          <Form onSubmit={handleSubmit}>
            <Label for="TaskName">
              Task Name
              <Input
                type="text"
                style={{ width: 550 }}
                value={PostData.taskName}
                onChange={(e) =>
                  change({ ...PostData, taskName: e.target.value })
                }
              />
            </Label>
            <br />
            <Label for="TaskDesc">
              Task Description
              <Input
                type="textarea"
                className="TaskDesc"
                value={PostData.description}
                onChange={(e) =>
                  change({ ...PostData, description: e.target.value })
                }
              />
            </Label>
            <br />
            <Label for="Date">
              Due Date:
              <DatePicker
                name="Date"
                selected={PostData.dueDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                minDate={currentDate}
                placeholderText="Hello"
              />
            </Label>
            <Label for="Time">
              Due Time:
              <Input
                name="Time"
                type="time"
                value={PostData.dueTime}
                onChange={(Time) =>
                  change({ ...PostData, dueTime: Time.target.value })
                }
              />
            </Label>

            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle
                caret
                style={{
                  backgroundColor: dropdownColor,
                  borderColor: dropdownColor,
                  borderRadius: 30,
                }}>
                {priority ? priority : "Priority"}
              </DropdownToggle>
              <DropdownMenu className="fixed-dropdown-menu12">
                <DropdownItem onClick={() => handlePrioritySelect("LOW")}>
                  Low
                </DropdownItem>
                <DropdownItem onClick={() => handlePrioritySelect("MID")}>
                  Mid
                </DropdownItem>
                <DropdownItem onClick={() => handlePrioritySelect("HIGH")}>
                  High
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {errorMessage && (
              <span className="error-message">{errorMessage}</span>
            )}
            <br />
            <Button type="submit" className="TaskAddButton">
              Submit
            </Button>
            <Button onClick={handleClose} className="TaskAddButton1">
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PopUpWindow;
