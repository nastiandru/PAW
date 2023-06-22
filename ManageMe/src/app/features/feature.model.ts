export interface Feature {
    id: number;
    name: string;
    newName?: string;
    status: string;
    tasks: Task[];
    editMode?: boolean;
  }
  
  export interface Task {
    id: number;
    name: string;
    status: string;
    featureId: number;
    editMode?: boolean
  }