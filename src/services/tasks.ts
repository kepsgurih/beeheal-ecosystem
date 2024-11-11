// services/task.ts
import { ITask } from "@/types/types";
import axios from "axios";

export const editTask = async (taskId: number, updatedTask: ITask) => {
  try {
    const response = await axios.put(`/api/v1/tasks/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
};
