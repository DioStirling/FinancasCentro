import { cn } from "@/lib/utils"
import {
  Calendar,
  type LucideIcon,
  ArrowRight,
  CheckCircle2,
  Timer,
  AlertCircle,
  Moon,
  Users,
  Sparkles,
} from "lucide-react"
import React from "react"

interface ListItem {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  iconStyle: string
  date: string
  time?: string
  status: "pending" | "in-progress" | "completed"
}

interface List03Props {
  items?: ListItem[]
  className?: string
}

const iconStyles = {
  gira: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  evento: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  ritual: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
}

const statusConfig = {
  pending: {
    icon: Timer,
    class: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  "in-progress": {
    icon: AlertCircle,
    class: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  completed: {
    icon: CheckCircle2,
    class: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    title: "Gira de Caboclo",
    subtitle: "Gira especial para caboclos da mata",
    icon: Moon,
    iconStyle: "gira",
    date: "20/10/2025 - 19:00",
    status: "pending",
  },
  {
    id: "2",
    title: "Festa de Iemanjá",
    subtitle: "Celebração anual da Rainha do Mar",
    icon: Sparkles,
    iconStyle: "evento",
    date: "02/02/2025 - 18:00",
    status: "pending",
  },
  {
    id: "3",
    title: "Desenvolvimento Mediúnico",
    subtitle: "Sessão de desenvolvimento dos médiuns",
    icon: Users,
    iconStyle: "ritual",
    date: "Toda Quarta - 20:00",
    status: "in-progress",
  },
]

export default function List03({ items = ITEMS, className }: List03Props) {
  return (
    <div className={cn("w-full overflow-x-auto scrollbar-none", className)}>
      <div className="flex gap-3 min-w-full p-1">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col",
              "w-[280px] shrink-0",
              "bg-white dark:bg-zinc-900/70",
              "rounded-xl",
              "border border-zinc-100 dark:border-zinc-800",
              "hover:border-zinc-200 dark:hover:border-zinc-700",
              "transition-all duration-200",
              "shadow-sm backdrop-blur-xl",
            )}
          >
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className={cn("p-2 rounded-lg", iconStyles[item.iconStyle as keyof typeof iconStyles])}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                    statusConfig[item.status].bg,
                    statusConfig[item.status].class,
                  )}
                >
                  {React.createElement(statusConfig[item.status].icon, { className: "w-3.5 h-3.5" })}
                  {item.status === "pending"
                    ? "Agendado"
                    : item.status === "in-progress"
                      ? "Em Andamento"
                      : "Concluído"}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{item.subtitle}</p>
              </div>

              <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                <span>{item.date}</span>
              </div>
            </div>

            <div className="mt-auto border-t border-zinc-100 dark:border-zinc-800">
              <button
                className={cn(
                  "w-full flex items-center justify-center gap-2",
                  "py-2.5 px-3",
                  "text-xs font-medium",
                  "text-zinc-600 dark:text-zinc-400",
                  "hover:text-zinc-900 dark:hover:text-zinc-100",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                  "transition-colors duration-200",
                )}
              >
                Ver detalhes
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
