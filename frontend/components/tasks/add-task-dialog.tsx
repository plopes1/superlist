"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

const formSchema = z.object({
  title: z.string().min(4, "O título precisa de ter pelo menos 4 caracteres"),
  assignee: z.string().min(2, "O responsável é obrigatório"),
  dueDate: z.string().min(1, "A data é obrigatória"),
});

type FormData = z.infer<typeof formSchema>;

interface AddTaskDialogProps {
  onAdd: (task: Omit<Task, "id" | "done">) => void;
}

export function AddTaskDialog({ onAdd }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      assignee: "",
      dueDate: "",
    },
  });

  function onSubmit(data: FormData) {
    onAdd({
      title: data.title.trim(),
      assignee: data.assignee.trim(),
      dueDate: data.dueDate,
    });

    toast.success("Tarefa criada com sucesso!", {
      description: `Atribuída a ${data.assignee.trim()}`,
    });

    reset();
    setOpen(false); 
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) reset(); 
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1.5 text-[12px] text-[#4a4a6a] hover:text-[#6366f1] transition-colors py-1 px-2 rounded-md hover:bg-[#6366f1]/8">
          <Plus className="w-[13px] h-[13px]" />
          Adicionar Tarefa
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-sm border-white/10 bg-[#1c1c1f]">
        <DialogHeader>
          <DialogTitle className="text-white">Nova tarefa</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-[#888] uppercase tracking-wide">
              Nome da tarefa
            </label>
            <Input
              placeholder="Ex: Implementar autenticação"
              autoFocus
              className="bg-white/5 border-white/10 text-white"
              {...register("title")}
            />
            {errors.title && <span className="text-[10px] text-red-400">{errors.title.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-[#888] uppercase tracking-wide">
              Responsável
            </label>
            <Input
              placeholder="@nome"
              className="bg-white/5 border-white/10 text-white"
              {...register("assignee")}
            />
            {errors.assignee && <span className="text-[10px] text-red-400">{errors.assignee.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-[#888] uppercase tracking-wide">
              Data de conclusão
            </label>
            <Input
              type="date"
              className="bg-white/5 border-white/10 text-white scheme-dark"
              {...register("dueDate")}
            />
            {errors.dueDate && <span className="text-[10px] text-red-400">{errors.dueDate.message}</span>}
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleOpenChange(false)}
              className="border-white/10 text-white hover:bg-white/10 hover:text-white"
            >
              Cancelar
            </Button>
            
            <Button
              type="submit"
              className="bg-[#6366f1] text-white hover:bg-[#4f46e5]"
            >
              Criar tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}