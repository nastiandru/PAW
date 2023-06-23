import { Task } from "./task.model";
export interface Feature {
    id: number;
    name: string;
    newName?: string;
    status: string;
    tasks: Task[];
    editMode?: boolean;
  }
  