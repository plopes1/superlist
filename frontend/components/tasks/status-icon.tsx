"use client";

import { Circle, CheckCircle2, Clock } from "lucide-react";
import { Status } from "@/models/task";

export function StatusIcon({ status }: { status: Status }) {
  if (status === "completed")
    return <CheckCircle2 className="w-[15px] h-[15px] shrink-0 text-[#6366f1]" />;
  if (status === "overdue")
    return <Clock className="w-[15px] h-[15px] shrink-0 text-[#f87171]" />;
  return <Circle className="w-[15px] h-[15px] shrink-0 text-[#555]" />;
}
