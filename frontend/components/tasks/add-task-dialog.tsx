"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/models/task";
import { toast } from "sonner";

interface AddTaskDialogProps {
  onAdd: (task: Omit<Task, "id" | "done">) => void;
}

export function AddTaskDialog({ onAdd }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !assignee.trim() || !dueDate) return;
    onAdd({ title: title.trim(), assignee: assignee.trim(), dueDate });

    toast.success("Tarefa criada com sucesso!");

    setTitle("");
    setAssignee("");
    setDueDate("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1.5 text-[12px] text-[#4a4a6a] hover:text-[#6366f1] transition-colors py-1 px-2 rounded-md hover:bg-[#6366f1]/8">
          <Plus className="w-[13px] h-[13px]" />
          Add Task
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Nova tarefa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#888] uppercase tracking-wide">
              Nome da tarefa
            </label>
            <Input
              placeholder="Ex: Implementar autenticação"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#888] uppercase tracking-wide">
              Responsável
            </label>
            <Input
              placeholder="@nome"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#888] uppercase tracking-wide">
              Data de conclusão
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-1">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || !assignee.trim() || !dueDate}
            >
              Criar tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
