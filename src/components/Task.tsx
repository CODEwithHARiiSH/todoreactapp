import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "../ThemeProvider";

const StyledTaskForm = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  width: calc(100vw - 20px);
  text-align: center;
  margin: 0;
  overflow: hidden;
`;

const Task: React.FC = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const theme = useTheme() as Theme;

  const addNewTask = () => {
    if (inputRef.current) {
      const task = inputRef.current.value.trim();
      if (task !== "") {
        dispatch(
          addTodo({
            text: task,
            date,
            priority,
          })
        );
        inputRef.current.value = "";
        setDate("");
        setPriority("");
      }
    }
  };

  return (
    <StyledTaskForm theme={theme}>
      <h1 style={{ fontSize: 50 }}>ToDo</h1>
      <div
        style={{
          boxShadow: `0px 0px 10px ${theme.textColor}`,
          width: "850px",
          position: "relative",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto",  
        }}
      >
        <input
          type="text"
          placeholder="What will you do today?"
          ref={inputRef}
          style={{
            height: "50px",
            width: "500px",
            margin: "10px",
            border: "none",
            cursor: "pointer",
            outline: "none",
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
          }}
          title="Enter your task here"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            height: "50px",
            border: "none",
            cursor: "pointer",
            outline: "none",
            margin: "10px",
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
          }}
          title="Set due date"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            height: "50px",
            border: "none",
            cursor: "pointer",
            outline: "none",
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
          }}
          title="Select priority"
        >
          <option value="">Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button
          onClick={addNewTask}
          style={{
            backgroundColor: theme.buttonColor,
            color: theme.textColor,
            height: "54px",
            border: "none",
            marginLeft: "10px",
            outline: "none",
            borderRadius: "15px",
            borderBottomRightRadius: "15px",
            cursor: "pointer",
          }}
          title="Add task"
        >
          Add Task
        </button>
        <hr/>
      </div>
    </StyledTaskForm>
  );
};

export default Task;
