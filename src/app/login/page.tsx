"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Trophy, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get("role") || "siswa"

  const handleLogin = async (role: string) => {
    setIsLoading(true)
    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect based on role
    if (role === "siswa") {
      window.location.href = "/dashboard/siswa"
    } else {
      window.location.href = "/dashboard/pembina"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
              Ekskoola
            </h1>
          </Link>
          <p className="text-gray-600">Masuk ke akun Anda</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Masuk</CardTitle>
            <CardDescription className="text-center">Pilih peran Anda untuk melanjutkan</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultRole} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="siswa" className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Siswa</span>
                </TabsTrigger>
                <TabsTrigger value="pembina" className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>Pembina</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="siswa" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email atau NIS</Label>
                  <Input id="student-email" type="text" placeholder="Masukkan email atau NIS" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="student-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button
                  className="w-full h-11 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900"
                  onClick={() => handleLogin("siswa")}
                  disabled={isLoading}
                >
                  {isLoading ? "Memproses..." : "Masuk sebagai Siswa"}
                </Button>
              </TabsContent>

              <TabsContent value="pembina" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teacher-email">Email atau NIP</Label>
                  <Input id="teacher-email" type="text" placeholder="Masukkan email atau NIP" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="teacher-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  onClick={() => handleLogin("pembina")}
                  disabled={isLoading}
                >
                  {isLoading ? "Memproses..." : "Masuk sebagai Pembina"}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Lupa password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-gray-600 text-center">
              Belum punya akun?{" "}
              <Link href="/register" className="text-blue-600 hover:underline font-medium">
                Daftar sebagai siswa
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
