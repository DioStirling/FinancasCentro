import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, AlertCircle } from "lucide-react"

export function BillingOverview() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="font-heading text-lg font-bold text-slate-900 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Visão Geral de Billing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-blue-900">Plano Atual</p>
            <p className="text-lg font-heading font-bold text-blue-900">Pro Plan</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-600">R$ 99/mês</p>
            <p className="text-xs text-blue-500">Próxima cobrança: 15 Jan</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Usuários ativos</span>
            <span className="text-sm font-medium">2.350 / 5.000</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "47%" }}></div>
          </div>
        </div>

        <div className="flex items-center space-x-2 p-3 bg-amber-50 rounded-lg">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <p className="text-sm text-amber-800">Você está usando 47% do seu limite de usuários</p>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700">Gerenciar Billing</Button>
      </CardContent>
    </Card>
  )
}
