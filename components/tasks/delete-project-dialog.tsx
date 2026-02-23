"use client";

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

interface DeleteProjectDialogProps {
  projectName: string;
  onConfirm: () => void;
}

export function DeleteProjectDialog({
  projectName,
  onConfirm,
}: DeleteProjectDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-[12px] text-[#6366f1] hover:text-[#818cf8] transition-colors">
          Delete project
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
          <AlertDialogDescription>
            O projeto <strong>&ldquo;{projectName}&rdquo;</strong> e todas as
            suas tarefas serão excluídos permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90"
          >
            Excluir projeto
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
