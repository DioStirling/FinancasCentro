"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, ChevronLeft, ChevronRight, Plus, Sun, Sunset, Moon, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Layout from "@/components/paginas/layout"

interface Event {
  id: string
  title: string
  date: string
  time: string
  period: "manha" | "tarde" | "noite"
  notes: string
}

const periodIcons = {
  manha: Sun,
  tarde: Sunset,
  noite: Moon,
}

const periodLabels = {
  manha: "Manhã",
  tarde: "Tarde",
  noite: "Noite",
}

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isYearOpen, setIsYearOpen] = useState(false)
  const [isMonthOpen, setIsMonthOpen] = useState(false)
  const yearContainerRef = useRef<HTMLDivElement>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "",
    period: "",
    notes: "",
  })

  useEffect(() => {
    const savedEvents = localStorage.getItem("centro-eventos")
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("centro-eventos", JSON.stringify(events))
  }, [events])

  useEffect(() => {
  if (isYearOpen && yearContainerRef.current) {
    const currentYear = currentDate.getFullYear()
    const yearElement = yearContainerRef.current.querySelector(
      `[data-year="${currentYear}"]`
    )
    if (yearElement) {
      // Scroll direto
      yearElement.scrollIntoView({ behavior: "auto", block: "center" })
    }
  }
}, [isYearOpen, currentDate])

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  const getYearOptions = () => {
    const years = []
    // 100 anos
    for (let i = 1900; i <= 2100; i++) {
      years.push(i)
    }
    return years
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Esvaziar dias anteriores
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Dias do Mês
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleYearSelect = (year: number) => {
    setCurrentDate((prev) => new Date(year, prev.getMonth(), 1))
    setIsYearOpen(false)
  }

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), monthIndex, 1))
    setIsMonthOpen(false)
  }

  const handleDateClick = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selectedDateOnly = new Date(date)
    selectedDateOnly.setHours(0, 0, 0, 0)

    if (selectedDateOnly < today) {
      return // Don't open dialog for past dates
    }

    setSelectedDate(date)
    setIsDialogOpen(true)
  }

  const handleCreateEvent = () => {
    if (!selectedDate || !newEvent.title || !newEvent.time || !newEvent.period) return

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate.toISOString().split("T")[0],
      time: newEvent.time,
      period: newEvent.period as "manha" | "tarde" | "noite",
      notes: newEvent.notes,
    }

    setEvents((prev) => [...prev, event])
    setNewEvent({ title: "", time: "", period: "", notes: "" })
    setIsDialogOpen(false)
    setSelectedDate(null)
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return events.filter((event) => event.date === dateStr)
  }

  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
  }

  const days = getDaysInMonth(currentDate)

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendário de Giras e Eventos</h1>
              <p className="text-gray-600 dark:text-gray-400">Gerencie as atividades do centro</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/70 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          {/* Calendario */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Popover open={isMonthOpen} onOpenChange={setIsMonthOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-xl font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {monthNames[currentDate.getMonth()]}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2">
                  <div className="grid grid-cols-1 gap-1">
                    {monthNames.map((month, index) => (
                      <Button
                        key={month}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMonthSelect(index)}
                        className={`justify-start ${index === currentDate.getMonth() ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : ""}`}
                      >
                        {month}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Popover open={isYearOpen} onOpenChange={setIsYearOpen}>
                <PopoverTrigger asChild>
                    <Button
                    variant="ghost"
                    className="text-xl font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                    {currentDate.getFullYear()}
                    <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-32 p-2">
                    <div
                    ref={yearContainerRef}
                    className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto"
                    >
                    {getYearOptions().map((year) => (
                        <Button
                        key={year}
                        data-year={year}  
                        variant="ghost"
                        size="sm"
                        onClick={() => handleYearSelect(year)}
                        className={`justify-center ${
                            year === currentDate.getFullYear()
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : ""
                        }`}
                        >
                        {year}
                        </Button>
                    ))}
                    </div>
                </PopoverContent>
                </Popover>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")} className="p-2">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")} className="p-2">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Calendario Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Dias de semana */}
            {weekDays.map((day) => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                {day}
              </div>
            ))}

            {/* Dias Calendario */}
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="p-3 h-24" />
              }

              const dayEvents = getEventsForDate(day)
              const isToday = day.toDateString() === new Date().toDateString()
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              const dayOnly = new Date(day)
              dayOnly.setHours(0, 0, 0, 0)
              const isPast = dayOnly < today

              return (
                <div
                  key={day.toISOString()}
                  className={`
                    p-2 h-24 border border-gray-100 dark:border-gray-800 transition-colors
                    ${
                      isPast
                        ? "bg-gray-50 dark:bg-gray-900/50 cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }
                    ${isToday ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" : ""}
                  `}
                  onClick={() => handleDateClick(day)}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isToday
                        ? "text-blue-600 dark:text-blue-400"
                        : isPast
                          ? "text-gray-400 dark:text-gray-600"
                          : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => {
                      const PeriodIcon = periodIcons[event.period]
                      return (
                        <div
                          key={event.id}
                          className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-1 py-0.5 rounded flex items-center gap-1"
                        >
                          <PeriodIcon className="w-3 h-3" />
                          <span className="truncate">{event.title}</span>
                        </div>
                      )
                    })}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">+{dayEvents.length - 2} mais</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Criar Evento */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Criar Evento
              </DialogTitle>
              {selectedDate && <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(selectedDate)}</p>}
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título do Evento</Label>
                <Input
                  id="title"
                  placeholder="Ex: Gira de Caboclo"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, time: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="period">Período</Label>
                  <Select
                    value={newEvent.period}
                    onValueChange={(value) => setNewEvent((prev) => ({ ...prev, period: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manha">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4" />
                          Manhã
                        </div>
                      </SelectItem>
                      <SelectItem value="tarde">
                        <div className="flex items-center gap-2">
                          <Sunset className="w-4 h-4" />
                          Tarde
                        </div>
                      </SelectItem>
                      <SelectItem value="noite">
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          Noite
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Anotações</Label>
                <Textarea
                  id="notes"
                  placeholder="Observações sobre o evento..."
                  value={newEvent.notes}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateEvent}
                  className="flex-1"
                  disabled={!newEvent.title || !newEvent.time || !newEvent.period}
                >
                  Criar Evento
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}
