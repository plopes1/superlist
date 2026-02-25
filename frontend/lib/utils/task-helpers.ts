import { Task, Status } from "@/models/task";

export function parseLocalDate(isoString: string): Date {
  if (!isoString) return new Date();
  
  const [year, month, day] = isoString.split('T')[0].split('-');
  
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export function getTaskStatus(task: Task): Status {
  if (task.done) return "completed";
  if (!task.dueDate) return "pending";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = parseLocalDate(task.dueDate as string);

  return due < today ? "overdue" : "pending";
}

export function formatTaskDate(isoDate?: string | Date | null): string {
  if (!isoDate) return "";

  const d = typeof isoDate === 'string' ? parseLocalDate(isoDate) : isoDate;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffInMs = d.getTime() - today.getTime();
  const diffInDays = Math.round(diffInMs / 86_400_000);

  if (diffInDays === 0) return "hoje";
  if (diffInDays === 1) return "amanhã";
  if (diffInDays === -1) return "ontem";
  
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}