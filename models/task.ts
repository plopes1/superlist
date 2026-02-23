export type Status = "pending" | "overdue" | "completed";
export type FilterValue = "all" | Status;

export interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string; // ISO date string "YYYY-MM-DD"
  done: boolean;
}