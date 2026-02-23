"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddProjectDialogProps {
  children: React.ReactNode;
  onAdd: (name: string) => void;
}

export function AddProjectDialog({ children, onAdd }: AddProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setOpen(false);
    setName("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Novo projeto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-1">
          <Input
            id="project-name"
            placeholder="Nome do projeto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setName("");
                setOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Criar projeto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
