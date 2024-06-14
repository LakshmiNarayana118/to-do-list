/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import MyContext from "./MyContext";
import { toast } from "react-toastify";
import axios from "axios";
const MyProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("https://todoback-p6sn.onrender.com");
      console.log(data)
      setTodoList(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodoList([]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleTodoList = async (data) => {
    try {
      const response = await axios.post(
        "https://todoback-p6sn.onrender.com/todo",
        data
      );
      console.log("POST response:", response.data);
      // Append the new todo item to the existing todoList state
      setTodoList((prevTodoList) => [...prevTodoList, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  
  const handleTodoEdit = async (id, title) => {
    try {
      console.log(id, title);
      const response = await axios.patch(
        `https://todoback-p6sn.onrender.com/todo/${id}`,
        { title, updatedAt: new Date() }
      );
      const updatedTodoList = todoList.map((todo) =>
        todo._id === id ? { ...todo, title } : todo
      );
      setTodoList(updatedTodoList);
      toast.info("Updated todo list successfully");
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo");
    }
  };
  

  const handleTodoCompleted = (id) => {
    const newState = [...todoList];
    const todoIndex = newState.findIndex((item) => item._id === id);
    const todoItem = newState[todoIndex];
    const updatedTodo = {
      ...todoItem,
      completed: !todoItem.completed,
      updatedAt: new Date(),
    };
    newState[todoIndex] = updatedTodo;
  
    axios
      .patch(
        `https://todoback-p6sn.onrender.com/todo/status/${id}`,
        { completed: updatedTodo.completed, updatedAt: updatedTodo.updatedAt }
      )
      .then((response) => {
        console.log("Todo status updated successfully:", response.data);
        toast.info("Updated todo list successfully");
        setTodoList(newState); // Update state with modified todo list
      })
      .catch((error) => {
        console.error("Error updating todo status:", error);
        toast.error("Failed to update todo list");
      });
  };
  

  const handleTodoDelete = async (id) => {
    try {
      await axios.delete(`https://todoback-p6sn.onrender.com/todo/${id}`);
      setTodoList((prev) => [...prev.filter((todo) => todo._id !== id)]);
  
      toast.warn("You have deleted a todo");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo");
    }
  };
  
  const myValue = {
    todoList,
    handleTodoList,
    handleTodoEdit,
    handleTodoCompleted,
    handleTodoDelete,
  };
  return <MyContext.Provider value={myValue}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used inside MyProvider");
  }
  return context;
};

export default MyProvider;
