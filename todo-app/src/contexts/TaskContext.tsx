import { createContext, useReducer, useEffect, useContext } from "react";
import { Task } from "../types/task";

type TaskState = Task[];

type Action =
  | { type: "ADD"; payload: { title: string; description: string } }
  | { type: "DELETE"; payload: number }
  | { type: "EDIT"; payload: { id: number; title: string; description: string } }
  | { type: "TOGGLE"; payload: number }
  | { type: "LOAD"; payload: TaskState };

const TaskContext = createContext<{
  tasks: TaskState;
  dispatch: React.Dispatch<Action>;
}>({ tasks: [], dispatch: () => null });

const reducer = (state: TaskState, action: Action): TaskState => {
  switch (action.type) {
    case "ADD":
      const newId = state.length > 0 ? Math.max(...state.map(task => task.id)) + 1 : 1;
      const newTask: Task = {
        id: newId,
        title: action.payload.title,
        description: action.payload.description,
        isCompleted: false,
      };
      return [...state, newTask];

    case "DELETE":
      return state.filter(task => task.id !== action.payload);

    case "EDIT":
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.title, description: action.payload.description }
          : task
      );

    case "TOGGLE":
      return state.map(task =>
        task.id === action.payload
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      );

    case "LOAD":
      return action.payload;

    default:
      return state;
  }
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      dispatch({ type: "LOAD", payload: JSON.parse(storedTasks) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
