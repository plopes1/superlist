"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AddProjectDialog } from "@/components/add-project-dialog";
import { EditProjectDialog } from "@/components/edit-project-dialog";
import { DeleteProjectDialog } from "@/components/tasks/delete-project-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Search,
  SquarePen,
  Inbox,
  FolderKanban,
  Plus,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import { Project } from "@/models/project";
import { projectService } from "@/services/projectService";

type NavItemDef = {
  id: string;
  title: string;
  icon: React.ElementType;
  url: string;
};

const navItems: NavItemDef[] = [
  { id: "inbox", title: "Inbox", icon: Inbox, url: "/inbox" },
];

function NavItem({ item, iconColor }: { item: NavItemDef; iconColor?: string }) {
  const pathname = usePathname();
  const isActive = pathname === item.url;

  return (
    <Link
      href={item.url}
      className={`w-full flex items-center gap-2.5 h-[30px] px-2 rounded-[6px] text-[13px] font-medium transition-all duration-100
        ${
          isActive
            ? "bg-white/10 text-[#ececec]"
            : "text-[#888] hover:text-[#ccc] hover:bg-white/5"
        }`}
    >
      <item.icon
        className={`w-[14px] h-[14px] shrink-0 transition-opacity ${isActive ? "opacity-80" : "opacity-50"}`}
        style={iconColor ? { color: iconColor, opacity: 1 } : undefined}
      />
      {item.title}
    </Link>
  );
}

function ProjectNavItem({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === `/projects/${project.id}`;

  return (
    <div className="group relative flex items-center w-full">
      <Link
        href={`/projects/${project.id}`}
        className={`w-full flex items-center gap-2.5 h-[30px] px-2 rounded-[6px] text-[13px] font-medium transition-all duration-100 pr-10
          ${
            isActive
              ? "bg-white/10 text-[#ececec]"
              : "text-[#888] hover:text-[#ccc] hover:bg-white/5"
          }`}
      >
        <FolderKanban
          className={`w-[14px] h-[14px] shrink-0 transition-opacity ${isActive ? "opacity-80" : "opacity-50"}`}
        />
        <span className="truncate">{project.name}</span>
      </Link>

      <div className="absolute right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded-md text-[#888] outline-none">
              <MoreHorizontal className="w-[14px] h-[14px]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-25 border-white/10 bg-[#1c1c1f] text-[#d4d4d4]">
            
            <EditProjectDialog currentName={project.name} onEdit={(newName) => onEdit(project.id, newName)}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-white/5">
                <Pencil className="w-[10px] h-[10px] mr-2 text-[#aaa]" />
                Editar
              </DropdownMenuItem>
            </EditProjectDialog>
            
            <DeleteProjectDialog projectName={project.name} onConfirm={() => onDelete(project.id)}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer text-[#ef4444] hover:bg-[#ef4444]/10 hover:text-[#ef4444]">
                <Trash className="w-[10px] h-[10px] mr-2" />
                Excluir
              </DropdownMenuItem>
            </DeleteProjectDialog>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function AppSidebar({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [projects, setProjects] = useState(initialProjects);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  useEffect(() => {
    const handleProjectDeleted = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      setProjects((prev) => prev.filter((p) => p.id !== customEvent.detail.id));
    };
    window.addEventListener("projectDeleted", handleProjectDeleted);
    return () => window.removeEventListener("projectDeleted", handleProjectDeleted);
  }, []);

  async function handleAddProject(name: string) {
    try {
      const newProject = await projectService.create(name);
      setProjects((prev) => [...prev, newProject]);
      router.refresh();
      router.push(`/projects/${newProject.id}`);
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    }
  }

  async function handleEditProject(id: string, newName: string) {
    try {
      const updatedProject = await projectService.update(id, newName);
      setProjects((prev) => prev.map((p) => (p.id === id ? updatedProject : p)));
      router.refresh(); 
    } catch (error) {
      console.error("Erro ao editar projeto:", error);
    }
  }

  async function handleDeleteProject(id: string) {
    try {
      await projectService.delete(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (pathname === `/projects/${id}`) {
        router.push("/");
      }
      router.refresh();
    } catch (error) {
      console.error("Erro ao apagar projeto:", error);
    }
  }

  return (
    <div style={{ width: "16rem", flexShrink: 0 }} className="flex flex-col h-full overflow-hidden">
      <div className="px-3 pt-3 pb-2 shrink-0">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/6 transition-colors group">
            <div className="w-[18px] h-[18px] rounded-[4px] bg-white flex items-center justify-center shrink-0" />
            <span className="text-[13px] font-semibold text-[#e5e5e5] tracking-tight">SuperList</span>
            <ChevronDown className="w-3 h-3 text-[#666] group-hover:text-[#999] transition-colors ml-0.5" />
          </button>
          <div className="flex items-center gap-0.5">
            <button className="p-1.5 rounded-md hover:bg-white/6 text-[#666] hover:text-[#bbb] transition-colors">
              <Search className="w-[15px] h-[15px]" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-white/6 text-[#666] hover:text-[#bbb] transition-colors">
              <SquarePen className="w-[15px] h-[15px]" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2">
        <div className="py-1 flex flex-col gap-0.5">
          {navItems.map((item) => <NavItem key={item.id} item={item} />)}
        </div>

        <div className="mx-2 my-1 h-px bg-white/5" />

        <div className="py-1 flex flex-col gap-0.5">
          <div className="flex items-center gap-1 h-7 px-2 text-[11px] font-medium text-[#4a4a4a] uppercase tracking-widest cursor-pointer hover:text-[#777] transition-colors select-none">
            Projetos
            <ChevronRight className="w-2.5 h-2.5 mt-px" />
          </div>

          {projects.map((project) => (
            <ProjectNavItem
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          ))}

          <AddProjectDialog onAdd={handleAddProject}>
            <button className="w-full flex items-center gap-2.5 h-[30px] px-2 rounded-[6px] text-[13px] font-medium transition-all duration-100 cursor-pointer text-[#555] hover:text-[#999] hover:bg-white/5">
              <Plus className="w-[14px] h-[14px] shrink-0 opacity-50" />
              Adicionar projeto
            </button>
          </AddProjectDialog>
        </div>

        <div className="mx-2 my-1 h-px bg-white/5" />
      </div>
    </div>
  );
}