"use client"

import { useState, useEffect } from "react"
import { Package, Plus, Edit, Trash2, Minus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Layout from "@/components/paginas/layout"

interface InventoryItem {
  id: string
  name: string
  quantity: number
  price: number
  description: string
}

export default function EstoquePage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 0,
    price: 0,
    description: "",
  })

  useEffect(() => {
    const savedItems = localStorage.getItem("centro-estoque")
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("centro-estoque", JSON.stringify(items))
  }, [items])

  const handleCreateOrUpdate = () => {
    if (!newItem.name || newItem.price < 0 || newItem.quantity < 0) return

    if (editingItem) {
      setItems((prev) => prev.map((item) => (item.id === editingItem.id ? { ...editingItem, ...newItem } : item)))
    } else {
      const item: InventoryItem = {
        id: Date.now().toString(),
        ...newItem,
      }
      setItems((prev) => [...prev, item])
    }

    setNewItem({ name: "", quantity: 0, price: 0, description: "" })
    setEditingItem(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item)
    setNewItem({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      description: item.description,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, change: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item)),
    )
  }

  const openCreateDialog = () => {
    setEditingItem(null)
    setNewItem({ name: "", quantity: 0, price: 0, description: "" })
    setIsDialogOpen(true)
  }

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalValue = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const lowStockItems = items.filter((item) => item.quantity <= 5)

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Estoque do Centro</h1>
              <p className="text-gray-600 dark:text-gray-400">Gerencie os materiais e suprimentos</p>
            </div>
          </div>
          <Button onClick={openCreateDialog} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Item
          </Button>
        </div>

        {/* Card de Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-zinc-900/70 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Itens</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{items.length}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900/70 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Valor Total</span>
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">R$ {totalValue.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900/70 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Estoque Baixo</span>
            </div>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">{lowStockItems.length}</p>
          </div>
        </div>

        {/* Pesquisa */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar itens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Lista de Item */}
        <div className="bg-white dark:bg-zinc-900/70 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="p-6">
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-gray-500" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            R$ {item.price.toFixed(2)}
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              item.quantity <= 5
                                ? "text-orange-600 dark:text-orange-400"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            Qtd: {item.quantity}
                          </span>
                          <span className="text-sm text-gray-500">
                            Total: R$ {(item.quantity * item.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity === 0}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm ? "Nenhum item encontrado" : "Nenhum item no estoque"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Criar e Editar */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                {editingItem ? "Editar Item" : "Adicionar Item"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Item</Label>
                <Input
                  id="name"
                  placeholder="Ex: Vela Branca"
                  value={newItem.name}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem((prev) => ({ ...prev, quantity: Number.parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Ex: Vela branca para limpeza espiritual"
                  value={newItem.description}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleCreateOrUpdate} className="flex-1" disabled={!newItem.name}>
                  {editingItem ? "Atualizar" : "Adicionar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}
