"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Trophy, AlertCircle, Plus, Bell, Settings, LogOut } from "lucide-react"
import Link from "next/link"

/* ----------------------- */
/* 1.  Wrapper Component   */
/* ----------------------- */
export default function StudentDashboard() {
  // Create ONE QueryClient instance that lives for the lifetime of this page
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <StudentDashboardContent />
    </QueryClientProvider>
  )
}

/* ----------------------- */
/* 2.  Page UI Content     */
/* ----------------------- */
function StudentDashboardContent() {
  const [notifications] = useState(3)

  const studentData = {
    name: "Ahmad Rizki",
    nis: "2024001",
    class: "XI IPA 2",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const myExtracurriculars = [
    {
      id: 1,
      name: "Basket",
      schedule: "Senin, Rabu 15:30-17:00",
      attendance: 85,
      status: "active",
      nextActivity: "Latihan Rutin • Senin 15:30",
    },
    {
      id: 2,
      name: "English Club",
      schedule: "Selasa, Kamis 14:00-15:30",
      attendance: 92,
      status: "active",
      nextActivity: "Speaking Practice • Selasa 14:00",
    },
  ]

  const availableExtracurriculars = [
    {
      id: 3,
      name: "Robotika",
      description: "Belajar pemrograman dan robotika",
      schedule: "Jumat 15:30-17:30",
      maxMembers: 20,
      currentMembers: 15,
      registrationOpen: true,
      category: "Teknologi",
    },
    {
      id: 4,
      name: "Teater",
      description: "Seni peran dan drama",
      schedule: "Sabtu 09:00-11:00",
      maxMembers: 25,
      currentMembers: 22,
      registrationOpen: true,
      category: "Seni",
    },
    {
      id: 5,
      name: "Futsal",
      description: "Olahraga futsal",
      schedule: "Senin 15:30-17:00", // Bentrok dengan basket
      maxMembers: 16,
      currentMembers: 16,
      registrationOpen: false,
      category: "Olahraga",
    },
  ]

  const canRegister = (extracurricular: any) => {
    if (!extracurricular.registrationOpen) return { can: false, reason: "Pendaftaran ditutup" }
    if (extracurricular.currentMembers >= extracurricular.maxMembers) return { can: false, reason: "Kuota penuh" }
    if (myExtracurriculars.length >= 2) return { can: false, reason: "Maksimal 2 ekstrakurikuler" }

    // Jadwal bentrok?
    const hasConflict = myExtracurriculars.some((my) => my.schedule.includes(extracurricular.schedule.split(" ")[0]))
    if (hasConflict) return { can: false, reason: "Jadwal bentrok" }

    return { can: true, reason: "" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-700 to-blue-900">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Dashboard Siswa</h1>
              <p className="text-sm text-gray-600">Selamat datang, {studentData.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto px-4 py-8">
        {/* PROFILE */}
        <Card className="mb-8 border-0 bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src={studentData.avatar || "/placeholder.svg"} alt="avatar siswa" />
                <AvatarFallback className="bg-white text-lg font-bold text-blue-600">
                  {studentData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{studentData.name}</h2>
                <p className="opacity-90">
                  NIS: {studentData.nis} • Kelas: {studentData.class}
                </p>
                <p className="opacity-90">Ekstrakurikuler: {myExtracurriculars.length}/2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* MAIN COLUMN */}
          <div className="space-y-8 lg:col-span-2">
            {/* My Ekskul */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-blue-700" />
                  <span>Ekstrakurikuler Saya</span>
                </CardTitle>
                <CardDescription>Ekstrakurikuler yang sedang Anda ikuti</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {myExtracurriculars.map((ekskul) => (
                  <div key={ekskul.id} className="rounded-lg border bg-gradient-to-r from-blue-50 to-blue-100 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{ekskul.name}</h3>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-1 text-sm text-gray-600">Jadwal</p>
                        <p className="font-medium">{ekskul.schedule}</p>
                      </div>

                      
                    </div>

                    <div className="mt-3 rounded border-l-4 border-blue-500 bg-white p-3">
                      <p className="text-sm font-medium text-blue-700">Kegiatan Selanjutnya:</p>
                      <p className="text-sm">{ekskul.nextActivity}</p>
                    </div>
                  </div>
                ))}

                {myExtracurriculars.length === 0 && (
                  <div className="py-8 text-center text-gray-500">
                    <Trophy className="mx-auto mb-4 h-12 w-12 opacity-50" />
                    <p>Anda belum mengikuti ekstrakurikuler apa pun</p>
                    <p className="text-sm">Daftar ekstrakurikuler untuk memulai!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Available Ekskul */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-blue-700" />
                  <span>Ekstrakurikuler Tersedia</span>
                </CardTitle>
                <CardDescription>Daftar ekstrakurikuler yang dapat Anda ikuti</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableExtracurriculars.map((ekskul) => {
                  const registerStatus = canRegister(ekskul)
                  return (
                    <div key={ekskul.id} className="rounded-lg border p-4 transition-shadow hover:shadow-md">
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{ekskul.name}</h3>
                          <p className="text-sm text-gray-600">{ekskul.description}</p>
                          <Badge variant="outline" className="mt-1">
                            {ekskul.category}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          disabled={!registerStatus.can}
                          className={registerStatus.can ? "bg-blue-700 hover:bg-blue-800" : ""}
                        >
                          {registerStatus.can ? "Daftar" : "Tidak Tersedia"}
                        </Button>
                      </div>

                      <div className="grid gap-4 text-sm md:grid-cols-2">
                        <div>
                          <p className="text-gray-600">Jadwal</p>
                          <p className="font-medium">{ekskul.schedule}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Anggota</p>
                          <p className="font-medium">
                            {ekskul.currentMembers}/{ekskul.maxMembers}
                          </p>
                        </div>
                      </div>

                      {!registerStatus.can && (
                        <div className="mt-3 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
                          <AlertCircle className="mr-1 inline h-4 w-4" />
                          {registerStatus.reason}
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* SIDEBAR */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Riwayat Kehadiran</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/siswa/riwayat-kehadiran">
                  <Button className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900">
                    <Clock className="mr-2 h-4 w-4" />
                    Lihat Riwayat Kehadiran
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
