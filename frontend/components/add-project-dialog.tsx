"use client";

import { toast } from "sonner";
import { useState } from "react";
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

const formSchema = z.object({
  name: z.string().min(3, "O nome do projeto precisa ter pelo menos 1 carácter"),
});

type FormData = z.infer<typeof formSchema>;

interface AddProjectDialogProps {
  children: React.ReactNode;
  onAdd: (name: string) => void;
}

export function AddProjectDialog({ children, onAdd }: AddProjectDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: FormData) {
    onAdd(data.name.trim());
    toast.success("Projeto criado com sucesso!");
    reset();
    setOpen(false);
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) reset();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm border-white/10 bg-[#1c1c1f]">
        <DialogHeader>
          <DialogTitle className="text-white">Novo projeto</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Input
              id="project-name"
              placeholder="Nome do projeto"
              autoFocus
              className="bg-white/5 border-white/10 text-white"
              {...register("name")}
            />
            {errors.name && <span className="text-[10px] text-red-400">{errors.name.message}</span>}
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
              Criar projeto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
