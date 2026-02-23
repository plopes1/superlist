"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { Task, FilterValue } from "@/models/task";
import { getTaskStatus } from "@/lib/utils/task-helpers";
import { Section } from "@/components/tasks/section";
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all",       label: "Todas"      },
  { value: "pending",   label: "Pendentes"  },
  { value: "overdue",   label: "Vencidas"   },
  { value: "completed", label: "Concluídas" },
];

// Mock

const today = new Date();
const fmt = (offset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

const INITIAL: Task[] = [
  { id: "1", title: "Criar estrutura do projeto",  assignee: "robson", dueDate: fmt(-2), done: true  },
  { id: "2", title: "Configurar banco de dados",    assignee: "robson", dueDate: fmt(-1), done: false },
  { id: "3", title: "Implementar autenticação",     assignee: "thiago", dueDate: fmt(0),  done: false },
  { id: "4", title: "Criar endpoints da API REST",  assignee: "thiago", dueDate: fmt(1),  done: false },
  { id: "5", title: "Escrever testes unitários",    assignee: "thiago", dueDate: fmt(3),  done: false },
];

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const name = decodeURIComponent(id)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const [tasks, setTasks] = useState<Task[]>(INITIAL);
  const [filter, setFilter] = useState<FilterValue>("all");

  function addTask(data: Omit<Task, "id" | "done">) {
    setTasks((prev) => [
      ...prev,
      { ...data, id: crypto.randomUUID(), done: false },
    ]);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const filtered = useMemo(
    () =>
      filter === "all"
        ? tasks
        : tasks.filter((t) => getTaskStatus(t) === filter),
    [tasks, filter]
  );

  const overdue   = filtered.filter((t) => getTaskStatus(t) === "overdue");
  const pending   = filtered.filter((t) => getTaskStatus(t) === "pending");
  const completed = filtered.filter((t) => getTaskStatus(t) === "completed");

  return (
    <div className="flex flex-col h-full text-[#d4d4d4]">
      <div className="flex items-center gap-2 px-5 h-[42px] border-b border-white/6 shrink-0">
        <span className="text-[11px] text-[#555]">Projetos</span>
        <span className="text-[11px] text-[#333]">›</span>
        <span className="text-[11px] font-medium text-[#aaa]">{name}</span>
        <div className="flex-1" />
        <span className="text-[12px] text-[#444]">
          {completed.length}/{tasks.length} concluídas
        </span>
      </div>

      <div className="flex items-center gap-1 px-4 h-[38px] border-b border-white/6 shrink-0 bg-white/1">
        <Filter className="w-[12px] h-[12px] text-[#555] mr-1" />
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              filter === f.value
                ? "bg-white/10 text-[#ccc]"
                : "text-[#555] hover:text-[#999] hover:bg-white/5"
            }`}
          >
            {f.label}
          </button>
        ))}
        {filter !== "all" && (
          <button
            onClick={() => setFilter("all")}
            className="ml-1 p-0.5 rounded text-[#555] hover:text-[#999] transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {(filter === "all" || filter === "overdue") && (
          <Section label="Vencidas"   status="overdue"   tasks={overdue}   onToggle={toggleTask} onDelete={deleteTask} />
        )}
        {(filter === "all" || filter === "pending") && (
          <Section label="Pendentes"  status="pending"   tasks={pending}   onToggle={toggleTask} onDelete={deleteTask} />
        )}
        {(filter === "all" || filter === "completed") && (
          <Section label="Concluídas" status="completed" tasks={completed} onToggle={toggleTask} onDelete={deleteTask} />
        )}

        <div className="px-3 py-2">
          <AddTaskDialog onAdd={addTask} />
        </div>
      </div>
    </div>
  );
}