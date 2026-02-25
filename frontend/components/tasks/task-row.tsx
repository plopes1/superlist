"use client";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Task } from "@/models/task";
import { getTaskStatus, formatTaskDate } from "@/lib/utils/task-helpers";
import { StatusIcon } from "@/components/tasks/status-icon";

interface TaskRowProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskRow({ task, onToggle, onDelete }: TaskRowProps) {
  const status = getTaskStatus(task);
  const dateLabel = formatTaskDate(task.dueDate);

  const titleColor =
    status === "completed"
      ? "text-[#555] line-through"
      : status === "overdue"
      ? "text-[#f87171]"
      : "text-[#d4d4d4]";

  const dateColor =
    status === "overdue"
      ? "text-[#f87171]"
      : status === "completed"
      ? "text-[#444]"
      : "text-[#666]";

  return (
    <div className="group flex items-center gap-3 px-4 h-[38px] border-b border-white/4 hover:bg-white/3 transition-colors">
      <button
        onClick={() => onToggle(task.id)}
        className="shrink-0 hover:scale-110 transition-transform"
        title={task.done ? "Marcar como pendente" : "Marcar como concluída"}
      >
        <StatusIcon status={status} />
      </button>

      <span className={`flex-1 text-[13px] truncate ${titleColor}`}>
        {task.title}
      </span>

      <span className="text-[12px] text-[#555] shrink-0 hidden group-hover:block sm:block">
        @{task.assignee}
      </span>

      <span className={`text-[11px] shrink-0 w-[54px] text-right ${dateColor}`}>
        {dateLabel}
      </span>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10 text-[#555] hover:text-[#f87171]"
            title="Excluir tarefa"
          >
            <Trash2 className="w-[13px] h-[13px]" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir tarefa?</AlertDialogTitle>
            <AlertDialogDescription>
              A tarefa <strong>&ldquo;{task.title}&rdquo;</strong> será excluída
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setTimeout(() => {
                  onDelete(task.id);
                  toast.success("Tarefa excluída com sucesso!");
                }, 0);
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
