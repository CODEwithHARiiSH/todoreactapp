// todoSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  date: string; 
  priority: string; 
}

interface TodoState {
  tasks: Task[];
}

const initialState: TodoState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string; date: string; priority: string }>) => {
      const { text, date, priority } = action.payload;
      const newTask: Task = {
        id: state.tasks.length + 1,
        text,
        completed: false,
        date, 
        priority, 
      };
      state.tasks.push(newTask);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      const taskToUpdate = state.tasks.find(task => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.completed = !taskToUpdate.completed;
      }
    },
    updateTodo: (state, action: PayloadAction<Task>) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleComplete, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
