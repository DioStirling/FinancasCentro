"use client"

import { useState, useEffect } from "react"
import { Package, Plus, Minus, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface InventoryItem {
  id: string
  name: string
  quantity: number
  price: number
  description: string
}

export default function List04() {
  const [items, setItems] = useState<InventoryItem[]>([])

  useEffect(() => {
    const savedItems = localStorage.getItem("centro-estoque")
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    } else {
      // Itens
      const defaultItems: InventoryItem[] = [
        {
          id: "1",
          name: "Vela Branca",
          quantity: 25,
          price: 3.5,
          description: "Vela branca para limpeza espiritual",
        },
        {
          id: "2",
          name: "Vela Vermelha",
          quantity: 12,
          price: 18.0,
          description: "Vela vermelha e preta para Exú",
        },
        {
          id: "3",
          name: "Defumador",
          quantity: 8,
          price: 15.0,
          description: "Ervas para defumação",
        },
      ]
      setItems(defaultItems)
      localStorage.setItem("centro-estoque", JSON.stringify(defaultItems))
    }
  }, [])

  const updateQuantity = (id: string, change: number) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item,
      )
      localStorage.setItem("centro-estoque", JSON.stringify(updated))
      return updated
    })
  }

  const lowStockItems = items.filter((item) => item.quantity <= 5)

  return (
    <div className="w-full space-y-4">
      {lowStockItems.length > 0 && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
          <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">
            ⚠️ {lowStockItems.length} item(ns) com estoque baixo
          </p>
        </div>
      )}

      <div className="space-y-3">
        {items.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  R$ {item.price.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`text-sm font-medium ${
                    item.quantity <= 5 ? "text-orange-600 dark:text-orange-400" : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Qtd: {item.quantity}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateQuantity(item.id, -1)}
                disabled={item.quantity === 0}
                className="h-8 w-8 p-0"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)} className="h-8 w-8 p-0">
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Link href="/estoque">
        <Button
          variant="ghost"
          className="w-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <Eye className="w-4 h-4 mr-2" />
          Ver todo o estoque
        </Button>
      </Link>
    </div>
  )
}
