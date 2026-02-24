"use client";

import { useState } from "react";
import { Circle, CheckCircle2, Clock, ChevronDown, ChevronRight } from "lucide-react";
import { Task, Status } from "@/models/task";
import { TaskRow } from "@/components/tasks/task-row";

interface SectionProps {
  label: string;
  status: Status;
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function Section({ label, status, tasks, onToggle, onDelete }: SectionProps) {
  const [open, setOpen] = useState(true);

  const iconColor =
    status === "completed"
      ? "text-[#6366f1]"
      : status === "overdue"
      ? "text-[#f87171]"
      : "text-[#666]";

  return (
    <>
      <div
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 h-[36px] border-b border-white/4 hover:bg-white/2 transition-colors cursor-pointer select-none group"
      >
        {open ? (
          <ChevronDown className="w-3 h-3 text-[#555]" />
        ) : (
          <ChevronRight className="w-3 h-3 text-[#555]" />
        )}
        {status === "completed" ? (
          <CheckCircle2 className={`w-[14px] h-[14px] ${iconColor}`} />
        ) : status === "overdue" ? (
          <Clock className={`w-[14px] h-[14px] ${iconColor}`} />
        ) : (
          <Circle className={`w-[14px] h-[14px] ${iconColor}`} />
        )}
        <span className="text-[12px] font-medium text-[#888]">{label}</span>
        <span className="text-[12px] text-[#444] ml-0.5">{tasks.length}</span>
      </div>
      {open &&
        tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
    </>
  );
}
