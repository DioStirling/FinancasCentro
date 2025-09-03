import { cn } from "@/lib/utils"
import { Wallet, Plus, TrendingUp, TrendingDown } from "lucide-react"

interface CentroAccount {
  totalBalance: string
  monthlyIncome: string
  monthlyExpenses: string
  lastUpdated: string
}

interface List01Props {
  className?: string
}

const CENTRO_ACCOUNT: CentroAccount = {
  totalBalance: "R$ 3.247,80",
  monthlyIncome: "R$ 1.850,00",
  monthlyExpenses: "R$ 892,50",
  lastUpdated: "Atualizado hoje às 14:30",
}

export default function List01({ className }: List01Props) {
  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "rounded-xl shadow-sm backdrop-blur-xl",
        className,
      )}
    >
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
        <p className="text-xs text-zinc-600 dark:text-zinc-400">Saldo Total do Centro</p>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{CENTRO_ACCOUNT.totalBalance}</h1>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-1">{CENTRO_ACCOUNT.lastUpdated}</p>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Resumo Mensal</h2>
        </div>

        <div className="space-y-3">
          {/* Income */}
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Entradas</h3>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400">Doações e contribuições</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                +{CENTRO_ACCOUNT.monthlyIncome}
              </span>
            </div>
          </div>

          {/* Expenses */}
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30">
                <TrendingDown className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Saídas</h3>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400">Materiais e despesas</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-red-600 dark:text-red-400">
                -{CENTRO_ACCOUNT.monthlyExpenses}
              </span>
            </div>
          </div>

          {/* Net Balance */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/30">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Wallet className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Saldo Líquido</h3>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400">Este mês</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">+R$ 957,50</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-emerald-600 hover:bg-emerald-700",
              "text-white",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Entrada</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-red-600 hover:bg-red-700",
              "text-white",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Saída</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-600 hover:bg-zinc-700",
              "text-white",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Extrato</span>
          </button>
        </div>
      </div>
    </div>
  )
}
