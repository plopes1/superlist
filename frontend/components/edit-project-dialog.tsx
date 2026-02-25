"use client";

import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditProjectDialogProps {
  children: React.ReactNode;
  currentName: string;
  onEdit: (newName: string) => void;
}

export function EditProjectDialog({ children, currentName, onEdit }: EditProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(currentName);

  useEffect(() => {
    if (open) setName(currentName);
  }, [open, currentName]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || trimmed === currentName) {
      setOpen(false);
      return;
    }
    onEdit(trimmed);
    toast.success("Projeto renomeado com sucesso!");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Renomear projeto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-1">
          <Input
            placeholder="Novo nome do projeto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!name.trim() || name === currentName}>
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}