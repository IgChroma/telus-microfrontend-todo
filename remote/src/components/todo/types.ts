export interface Task {
    id: number;
    text: string;
    isCompleted: boolean;
}

export enum TodoFilter {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
  }