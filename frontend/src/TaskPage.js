import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "./TaskPage.css";
import axios from "axios";
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
import { Link } from "react-router-dom";
function TaskPage() {
  const handleDateChange = (date) => {
    change({ ...PostData, dueDate: date });
    console.log(PostData.dueDate);
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
    description: "Sample",
    priority: "LOW",
    dueDate: new Date(),
    dueTime: null,
  });
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

    try {
      const response = await axios.post(
        "http://localhost:8080/task/post",
        PostData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="TaskPage-total">
      <Form onSubmit={handleSubmit}>
        <div>
          <Label for="TaskName">
            Task Name
            <Input
              type="text"
              value={PostData.taskName}
              onChange={(e) =>
                change({ ...PostData, taskName: e.target.value })
              }></Input>{" "}
          </Label>
          <Label for="TaskDesc">
            Task Description
            <Input
              type="textarea"
              className="TaskDesc"
              value={PostData.description}
              onChange={(e) =>
                change({ ...PostData, description: e.target.value })
              }></Input>{" "}
          </Label>
          <Label for="Date">
            Date:
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
            Time:
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
          {PostData.dueTime}
          <Link to="/viewtask">
            <Button type="submit">SUBMIT</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
export default TaskPage;
