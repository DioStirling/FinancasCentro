"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"



export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  // Função temporária para login como dev
  const handleDevLogin = () => {
    localStorage.setItem("profile", "Desenvolvedor")  // salva no navegador
    router.push("/dashboard")                         // redireciona
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Central */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4">
               <Image
                src="logocentro.png"
                alt="Logo do Centro"
                width={140}
                height={140}
                className="rounded-full object-contain"
                />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">C.C.P.J.A</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Centro de Caridade Pai João de Angola</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Bem vindo(a), Axé!</CardTitle>
            <CardDescription>Entre na sua conta ou crie uma nova</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Criar Conta</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <Input id="email" type="email" placeholder="seu@email.com" className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <Link href="#" className="text-blue-600 hover:text-blue-500">
                    Esqueceu a senha?
                  </Link>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">Entrar na Conta</Button>
                <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleDevLogin}   // ⬅ aqui chamamos a função
                    >
                    Entrar como Dev
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <Input id="name" type="text" placeholder="Seu nome completo" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <select
                    id="role"
                    className="pl-10 pr-3 py-2 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue=""
                    >
                    <option value="" disabled>
                        Selecione sua função
                    </option>
                    <option value="filho-de-santo">Filho de Santo</option>
                    <option value="gerente">Gerente</option>
                    </select>
                </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <Input id="register-email" type="email" placeholder="seu@email.com" className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">Criar Conta</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          <p>© Centro de Caridade Pai João de Angola</p>
        </div>
      </div>
    </div>
  )
}
