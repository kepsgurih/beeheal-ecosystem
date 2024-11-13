// services/task.ts
import { ITask } from "@/types/types";
import axios from "axios";

export const editTask = async (taskId: number, updatedTask: ITask) => {
  try {
    const response = await axios.put(process.env.PUBLIC_URL + `/api/v1/tasks/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
};

export const saveData = async (newTask: Partial<ITask>) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/tasks', newTask);

    return response.data
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
}