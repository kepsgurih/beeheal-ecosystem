import { ITask } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const taskSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        position: { type: Number, required: true },
        assigned: [
            {
                userid: {
                    type: String
                },
                name: {
                    type: String
                },
                avatar: {
                    type: String
                },
                email: {
                    type: String
                }
            }
        ],
        sprint: { type: Number, required: true },
    },
    { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default Task;
