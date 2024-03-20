import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import "./RightPanelComponent.css";
import { RiDeleteBin2Line } from "react-icons/ri";

function RightPanelComponent({ id }) {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/task/get/${id}`
        );
        setTask(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id !== null) {
      fetchData();
    }
  }, [id]);

  const changeStatus = async () => {
    try {
      await axios.put(`http://localhost:8080/task/put/${id}`, {
        id: id,
        taskName: task.taskName,
        description: task.description,
        dueDate: task.dueDate,
        dueTime: task.dueTime,
        status: "COMPLETED",
        priority: task.priority,
        user: {
          id: localStorage.getItem("userId"),
          userName: "Ye",
          password: "password",
        },
      });

      setTask({ ...task, status: "COMPLETED" });
    } catch (error) {
      console.error(error);
    }
  };

  let priorityColor = "";
  switch (task?.priority) {
    case "LOW":
      priorityColor = "green";
      break;
    case "MID":
      priorityColor = "orange";
      break;
    case "HIGH":
      priorityColor = "red";
      break;
    default:
      priorityColor = "black";
  }

  let statusColor = "";
  switch (task?.status) {
    case "PENDING":
      statusColor = "red";
      break;
    case "COMPLETED":
      statusColor = "green";
      break;
    case "IN_PROGRESS":
      statusColor = "orange";
      break;
    default:
      statusColor = "black";
  }
  const remove = async () => {
    try {
      await axios.delete(`http://localhost:8080/task/delete/${id}`);
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    let period = "AM";
    let formattedHours = parseInt(hours, 10);

    if (formattedHours > 12) {
      formattedHours -= 12;
      period = "PM";
    }

    return `${formattedHours}:${minutes} ${period}`;
  };

    return (
      <div>
        {task ? (
          <div className="item-expansion">
            <div className="headpositionrightpanel">
              <p className="Headd">{task.taskName}</p>
            </div>
            <div className="item-details">
              <label>Description:</label>
              <p>{task.description}</p>
              <label>Due on:</label>
              <p className="due-date">{task.dueDate}</p>
              <label>Due before:</label>
              <p className="due-time">{formatTime(task.dueTime)}</p>
              <label>Status:</label>
              <p className="status" style={{ color: statusColor }}>
                {task.status}
              </p>
              <label>Priority:</label>
              <p className="priority" style={{ color: priorityColor }}>
                {task.priority}
              </p>
            </div>
            <Button className="markButton" onClick={changeStatus}>
              Mark as Done
            </Button>
            <div className="binpos">
              <Button className="BinButton" color="danger" onClick={remove}>
                <RiDeleteBin2Line size={20} />
              </Button>
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    );
  }

export default RightPanelComponent;
