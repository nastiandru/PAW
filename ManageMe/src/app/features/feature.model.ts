export interface Feature {
    id: number;
    name: string;
    tasks: Task[];
  }
  
  export interface Task {
    id: number;
    name: string;
    status: string;
    featureId: number;
  }