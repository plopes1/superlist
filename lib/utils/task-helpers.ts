import { Task, Status } from "@/models/task";

export function getTaskStatus(task: Task): Status {
  if (task.done) return "completed";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(task.dueDate + "T00:00:00");

  return due < today ? "overdue" : "pending";
}

export function formatTaskDate(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffInMs = d.getTime() - today.getTime();
  const diffInDays = Math.round(diffInMs / 86_400_000);

  if (diffInDays === 0) return "hoje";
  if (diffInDays === 1) return "amanhã";
  if (diffInDays === -1) return "ontem";
  
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}