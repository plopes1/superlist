"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AddProjectDialog } from "@/components/add-project-dialog";
import {
  ChevronDown,
  Search,
  SquarePen,
  Inbox,
  FolderKanban,
  Plus,
  ChevronRight,
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

const staticWorkspaceItems: NavItemDef[] = [
  { id: "projects", title: "Projects", icon: FolderKanban, url: "/projects" },
];

function NavItem({
  item,
  iconColor,
}: {
  item: NavItemDef;
  iconColor?: string;
}) {
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

export function AppSidebar({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();

  async function handleAddProject(name: string) {
    try {
      await projectService.create(name);
      router.refresh();
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      alert("Não foi possível criar o projeto.");
    }
  }

  return (
    <div
      style={{ width: "16rem", flexShrink: 0 }}
      className="flex flex-col h-full overflow-hidden"
    >
      <div className="px-3 pt-3 pb-2 shrink-0">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/6 transition-colors group">
            <div className="w-[18px] h-[18px] rounded-[4px] bg-white flex items-center justify-center shrink-0" />
            <span className="text-[13px] font-semibold text-[#e5e5e5] tracking-tight">
              SuperList
            </span>
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
          {navItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        <div className="mx-2 my-1 h-px bg-white/5" />

        <div className="py-1 flex flex-col gap-0.5">
          <div className="flex items-center gap-1 h-7 px-2 text-[11px] font-medium text-[#4a4a4a] uppercase tracking-widest cursor-pointer hover:text-[#777] transition-colors select-none">
            Projetos
            <ChevronRight className="w-2.5 h-2.5 mt-px" />
          </div>

          {staticWorkspaceItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}

          {initialProjects.map((project) => (
            <NavItem
              key={project.id}
              item={{
                id: project.id,
                title: project.name,
                icon: FolderKanban,
                url: `/projects/${project.id}`,
              }}
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