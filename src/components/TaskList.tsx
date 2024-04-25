import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import {
  deleteTodo,
  toggleComplete,
  updateTodo,
} from "../features/todo/todoSlice";
import "./TaskList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheckCircle,
  faEdit,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import { Theme } from "../ThemeProvider";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  date: string;
  priority: string;
}

interface StyledTaskItemProps {
  completed: boolean;
  theme: Theme;
}

const StyledTaskListContainer = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin: 0;
  height: calc(100vh - 200px);
  width: calc(100vw - 20px);
  overflow: auto;
`;

const StyledTaskItem = styled.li<StyledTaskItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) =>
    props.completed ? props.theme.completedTaskColor : "inherit"};
`;

const StyledTaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const StyledTaskText = styled.span`
  margin-right: 10px;
`;

const StyledTaskDate = styled.span`
  margin-right: 10px;
  color: #777;
`;

const StyledTaskPriority = styled.span<{ priority: string }>`
  color: ${(props) => {
    switch (props.priority.toLowerCase()) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "inherit";
    }
  }};
`;

const TaskList: React.FC = () => {
  const theme = useTheme() as Theme;
  const tasks = useSelector((state: RootState) => state.todo.tasks);
  const dispatch = useDispatch();

  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [sortCriteria, setSortCriteria] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleComplete = (id: number) => {
    dispatch(toggleComplete(id));
  };

  const handleEdit = (task: Task) => {
    setEditedTask(task);
  };

  const handleSave = () => {
    if (editedTask) {
      dispatch(updateTodo(editedTask));
      setEditedTask(null);
    }
  };

  const handleChangePriority = (priority: string) => {
    if (editedTask) {
      setEditedTask({ ...editedTask, priority });
    }
  };

  const handleChangeDate = (date: string) => {
    if (editedTask) {
      setEditedTask({ ...editedTask, date });
    }
  };

  const sortByName = (order: "asc" | "desc" = "asc") => {
    return tasks.slice().sort((a, b) => {
      if (order === "asc") {
        return a.text.localeCompare(b.text);
      } else {
        return b.text.localeCompare(a.text);
      }
    });
  };

  const sortByDate = (order: "asc" | "desc" = "asc") => {
    return tasks.slice().sort((a, b) => {
      if (order === "asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  };

  const sortByPriority = (order: "asc" | "desc" = "asc") => {
    const priorityOrder: { [key: string]: number } = {
      High: 3,
      Medium: 2,
      Low: 1,
    };
    return tasks.slice().sort((a, b) => {
      if (order === "asc") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    });
  };

  const getSortedTasks = () => {
    switch (sortCriteria) {
      case "name":
        return sortByName(sortOrder);
      case "date":
        return sortByDate(sortOrder);
      case "priority":
        return sortByPriority(sortOrder);
      default:
        return tasks;
    }
  };

  const sortedTasks = getSortedTasks();

  const completedTasks = sortedTasks.filter((task) => task.completed);

  const handleSortChange = (criteria: string) => {
    if (criteria === sortCriteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };

  return (
    <StyledTaskListContainer theme={theme}>
      {sortedTasks.length > 0 ? (
        <>
          <div style={{ marginTop: "80px", fontSize: "20px" }}>
            <label style={{ marginLeft: "500px", padding: "15px" }}>
              Sort by :
            </label>
            <select
              value={sortCriteria}
              onChange={(e) => handleSortChange(e.target.value)}
              style={{ fontSize: "20px", padding: "5px", cursor: "pointer" }}
              title="sort"
            >
              <option value="priority">Priority (Asc)</option>
              <option value="priority_desc">Priority (Desc)</option>
              <option value="date">Date (Asc)</option>
              <option value="date_desc">Date (Desc)</option>
              <option value="name">Name (Asc)</option>
              <option value="name_desc">Name (Desc)</option>
            </select>
          </div>
<div>
            <h3 style={{ marginTop: "100px" }}>Your tasks:</h3>
            <ul className="tasks">
              {sortedTasks.map((task) => (
                <StyledTaskItem
                  className={`task ${task.completed ? "completed-task" : ""}`}
                  key={task.id}
                  completed={task.completed}
                  theme={theme}
                >
                  <StyledTaskInfo>
                    {editedTask && editedTask.id === task.id ? (
                      <>
                        <input
                          type="text"
                          value={editedTask.text}
                          onChange={(e) =>
                            setEditedTask({ ...editedTask, text: e.target.value })
                          }
                          style={{
                            height: "50px",
                            cursor: "pointer",
                          }}
                          title="Enter your task here"
                        />
  
                        <select
                          value={editedTask.priority}
                          onChange={(e) => handleChangePriority(e.target.value)}
                          style={{
                            height: "50px",
                            border: "1px solid black",
                            cursor: "pointer",
                          }}
                          title="Set priority"
                        >
                          <option value="">{task.priority}</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                        <input
                          type="date"
                          value={editedTask.date}
                          onChange={(e) => handleChangeDate(e.target.value)}
                          style={{
                            height: "50px",
                            cursor: "pointer",
                          }}
                          title="Set Due Date"
                        />
                        <button
                          onClick={handleSave}
                          style={{
                            height: "50px",
                            cursor: "pointer",
                          }}
                          title="save"
                        >
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                      </>
                    ) : (
                      <>
                        <StyledTaskText>{task.text}</StyledTaskText>
                        <StyledTaskDate>Date: {task.date}</StyledTaskDate>
                        <StyledTaskPriority priority={task.priority}>
                          {task.priority}
                        </StyledTaskPriority>
                      </>
                    )}
                  </StyledTaskInfo>
  
                  {!editedTask || editedTask.id !== task.id ? (
                    <>
                      {!task.completed && (
                        <button
                          className="complete-btn"
                          onClick={() => handleComplete(task.id)}
                          style={{ marginRight: "10px" }}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </button>
                      )}
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(task)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </>
                  ) : null}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </StyledTaskItem>
              ))}
            </ul>
  
            {completedTasks.length > 0 && (
              <>
                <h3>Completed tasks:</h3>
                <ul className="tasks">
                  {completedTasks.map((task) => (
                    <StyledTaskItem
                      className="task completed-task"
                      key={task.id}
                      completed={task.completed}
                      theme={theme}
                    >
                      <StyledTaskInfo>
                        <StyledTaskText>{task.text}</StyledTaskText>
                        <StyledTaskDate>Date: {task.date}</StyledTaskDate>
                        <StyledTaskPriority priority={task.priority}>
                          {task.priority}
                        </StyledTaskPriority>
                      </StyledTaskInfo>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(task.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </StyledTaskItem>
                  ))}
                </ul>
              </>
            )}
</div>
        </>
      ) : (
        <>
        </>
      )}
    </StyledTaskListContainer>
  );
};

export default TaskList;
