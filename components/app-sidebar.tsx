"use client";

import { useState } from "react";
import {
  ChevronDown,
  Search,
  SquarePen,
  Inbox,
  Target,
  FolderKanban,
  Plus,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { id: "inbox", title: "Inbox", icon: Inbox },
];

const workspaceItems = [
  { id: "initiatives", title: "Initiatives", icon: Target },
  { id: "projects", title: "Projects", icon: FolderKanban },
  { id: "add-projects", title: "Adicionar projetos", icon: Plus },
];

function NavItem({
  item,
  active,
  onClick,
  iconColor,
}: {
  item: { id: string; title: string; icon: React.ElementType };
  active: boolean;
  onClick: () => void;
  iconColor?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 h-[30px] px-2 rounded-[6px] text-[13px] font-medium transition-all duration-100 cursor-pointer
        ${active
          ? "bg-white/10 text-[#ececec]"
          : "text-[#888] hover:text-[#ccc] hover:bg-white/5"
        }`}
    >
      <item.icon
        className={`w-[14px] h-[14px] shrink-0 transition-opacity ${active ? "opacity-80" : "opacity-50"}`}
        style={iconColor ? { color: iconColor, opacity: 1 } : undefined}
      />
      {item.title}
    </button>
  );
}

export function AppSidebar() {
  const [active, setActive] = useState("uirefresh");

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
            <NavItem
              key={item.id}
              item={item}
              active={active === item.id}
              onClick={() => setActive(item.id)}
            />
          ))}
        </div>

        <div className="mx-2 my-1 h-px bg-white/5" />

        <div className="py-1 flex flex-col gap-0.5">
          <div className="flex items-center gap-1 h-7 px-2 text-[11px] font-medium text-[#4a4a4a] uppercase tracking-widest cursor-pointer hover:text-[#777] transition-colors select-none">
            Projetos
            <ChevronRight className="w-2.5 h-2.5 mt-px" />
          </div>
          {workspaceItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              active={active === item.id}
              onClick={() => setActive(item.id)}
            />
          ))}
        </div>

        <div className="mx-2 my-1 h-px bg-white/5" />
      </div>
    </div>
  );
}
