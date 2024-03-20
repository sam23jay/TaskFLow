import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import AuthContext from "./AuthContext";
import axios from "axios";
import "./ViewTaskPage.css";
import RightPanelComponent from "./components/RightPanelComponent";
import NavBar from "./components/NavBar";
import PopUpWindow from "./components/PopUpWindow";
import { useNavigate } from "react-router";
import { FormSelect } from "react-bootstrap";

function ViewTaskPage() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [expandedItem, setExpandedItem] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [sortPriority, setSortPriority] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn && !localStorage.getItem("userId")) {
      navigate("/login");
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, setIsLoggedIn, navigate]);

  useEffect(() => {
    fetchData(userId);
  }, [userId]);

  const fetchData = async (userId) => {
    try {
      let url = `http://localhost:8080/task/get/foreign/${userId}`;
      const response = await axios.get(url);
      setItemList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemClick = (itemId) => {
    setExpandedItem(itemId);
  };

  const openPopUp = () => {
    setShowPopUp(true);
  };

  const closePopUp = () => {
    window.location.reload();
    setIsLoggedIn(true);
    setShowPopUp(false);
  };

  const handleAddItem = (newItem) => {
    setItemList([...itemList, newItem]);
  };

  const handleDropDownChange = (e) => {
    const selectedValue = e.target.value;
    setSortPriority(selectedValue);
    handleDropDownClick(selectedValue);
  };

  const handleDropDownClick = async (priority) => {
    if (priority === "NOTHING") {
      fetchData(userId);
    } else {
      let url = `http://localhost:8080/task/get/foreign/${userId}/${priority}`;
      const response = await axios.get(url);
      setItemList(response.data);
    }
  };

  const getFormSelectStyle = () => {
    switch (sortPriority) {
      default:
        return { marginTop: "1rem", fontWeight: "500" };
    }
  };

  return (
    <div>
      <NavBar />
      <div className="chat-page">
        <div className="left-panel">
          <Button onClick={openPopUp} className="AddTaskbucket">
            Add Task
          </Button>
          <FormSelect
            style={getFormSelectStyle()}
            value={sortPriority}
            onChange={handleDropDownChange}>
            <option value="NOTHING">Sort by Priority</option>
            <option value="HIGH">High Priority</option>
            <option value="MID">Medium Priority</option>
            <option value="LOW">Low Priority</option>
            <option value="NOTHING">Default</option>
          </FormSelect>
          {showPopUp && (
            <PopUpWindow onClose={closePopUp} onAddItem={handleAddItem} />
          )}

          <ul className="task-list12"></ul>
          <ul className="item-list12">
            {itemList.map((item, index) => (
              <li
                key={index}
                className={`item ${expandedItem === index ? "active" : ""}`}
                onClick={() => handleItemClick(index)}>
                {item.taskName}
              </li>
            ))}
          </ul>
        </div>
        <div className="right-panel">
          <RightPanelComponent
            id={expandedItem !== null ? itemList[expandedItem]?.id : null}
            expandedItem={expandedItem}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewTaskPage;
