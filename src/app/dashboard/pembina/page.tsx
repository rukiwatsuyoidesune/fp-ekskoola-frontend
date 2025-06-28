"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Calendar,
  Clock,
  Trophy,
  CheckCircle,
  AlertCircle,
  Plus,
  Bell,
  Settings,
  LogOut,
  Edit,
  Trash2,
  UserCheck,
} from "lucide-react"
import Link from "next/link"

export default function PembinaDashboard() {
  const [notifications] = useState(2)

  const pembinaData = {
    name: "Dr. Sarah Wijaya",
    nip: "196801012000032001",
    subject: "Matematika",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const myExtracurriculars = [
    {
      id: 1,
      name: "Olimpiade Matematika",
      description: "Persiapan olimpiade matematika tingkat nasional",
      schedule: "Selasa, Kamis 15:30-17:00",
      maxMembers: 15,
      currentMembers: 12,
      registrationOpen: true,
      registrationPeriod: "1 Jan - 15 Jan 2024",
      nextActivity: "Latihan Soal Geometri - Selasa, 15:30",
      averageAttendance: 89,
    },
    {
      id: 2,
      name: "Robotika",
      description: "Pembelajaran robotika dan pemrograman",
      schedule: "Jumat 15:30-17:30",
      maxMembers: 20,
      currentMembers: 18,
      registrationOpen: false,
      registrationPeriod: "Ditutup",
      nextActivity: "Workshop Arduino - Jumat, 15:30",
      averageAttendance: 94,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      activity: "Presensi Olimpiade Matematika",
      date: "2024-01-15",
      attendees: "10/12 hadir",
      time: "15:30-17:00",
    },
    {
      id: 2,
      activity: "Workshop Robotika",
      date: "2024-01-12",
      attendees: "16/18 hadir",
      time: "15:30-17:30",
    },
    {
      id: 3,
      activity: "Evaluasi Bulanan",
      date: "2024-01-10",
      attendees: "Semua ekstrakurikuler",
      time: "14:00-16:00",
    },
  ]

  const pendingTasks = [
    {
      id: 1,
      task: "Presensi Olimpiade Matematika",
      dueDate: "Hari ini, 15:30",
      priority: "high",
    },
    {
      id: 2,
      task: "Evaluasi Anggota Robotika",
      dueDate: "Besok",
      priority: "medium",
    },
    {
      id: 3,
      task: "Laporan Bulanan",
      dueDate: "3 hari lagi",
      priority: "low",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Dashboard Pembina</h1>
              <p className="text-sm text-gray-600">Selamat datang, {pembinaData.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Card */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-700 to-blue-900 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 border-2 border-white">
                  <AvatarImage src={pembinaData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-white text-purple-600 text-lg font-bold">
                    {pembinaData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{pembinaData.name}</h2>
                  <p className="opacity-90">NIP: {pembinaData.nip}</p>
                  <p className="opacity-90">Mata Pelajaran: {pembinaData.subject}</p>
                </div>
              </div>
              <Link href="/dashboard/pembina/buat-ekstrakurikuler">
                <Button className="bg-white/20 hover:bg-white/30 border-white/30">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Ekstrakurikuler
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Extracurriculars */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-blue-700" />
                  <span>Ekstrakurikuler yang Saya Bina</span>
                </CardTitle>
                <CardDescription>Kelola dan pantau ekstrakurikuler Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {myExtracurriculars.map((ekskul) => (
                  <div key={ekskul.id} className="p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-xl mb-2">{ekskul.name}</h3>
                        <p className="text-gray-600 mb-3">{ekskul.description}</p>
                        <div className="flex items-center space-x-4">
                          <Badge
                            className={
                              ekskul.registrationOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }
                          >
                            {ekskul.registrationOpen ? "Pendaftaran Buka" : "Pendaftaran Tutup"}
                          </Badge>
                          <span className="text-sm text-gray-600">Periode: {ekskul.registrationPeriod}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Jadwal</p>
                        <p className="font-medium">{ekskul.schedule}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Anggota</p>
                        <p className="font-medium">
                          {ekskul.currentMembers}/{ekskul.maxMembers}
                        </p>
                        <Progress value={(ekskul.currentMembers / ekskul.maxMembers) * 100} className="mt-1" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Rata-rata Kehadiran</p>
                        <p className="font-medium text-green-600">{ekskul.averageAttendance}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded border-l-4 border-purple-500">
                      <div>
                        <p className="text-sm font-medium text-purple-700">Kegiatan Selanjutnya:</p>
                        <p className="text-sm">{ekskul.nextActivity}</p>
                      </div>
                      <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
                        <UserCheck className="w-4 h-4 mr-2" />
                        Presensi
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>Tindakan yang sering dilakukan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link href="/dashboard/pembina/buat-ekstrakurikuler">
                    <Button className="h-20 flex-col space-y-2 bg-gradient-to-r from-blue-700 to-blue-800 w-full">
                      <Plus className="w-6 h-6" />
                      <span>Buat Ekstrakurikuler</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/pembina/presensi">
                    <Button className="h-20 flex-col space-y-2 bg-gradient-to-r from-blue-600 to-blue-700 w-full">
                      <UserCheck className="w-6 h-6" />
                      <span>Presensi</span>
                    </Button>
                  </Link>
                  <Button className="h-20 flex-col space-y-2 bg-gradient-to-r from-blue-800 to-blue-900">
                    <Calendar className="w-6 h-6" />
                    <span>Atur Jadwal</span>
                  </Button>
                  <Button className="h-20 flex-col space-y-2 bg-gradient-to-r from-blue-500 to-blue-600">
                    <Trophy className="w-6 h-6" />
                    <span>Laporan</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Tasks */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-700" />
                  <span>Tugas Pending</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="p-3 rounded-lg border-l-4 border-orange-500 bg-orange-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{task.task}</p>
                        <p className="text-xs text-gray-600">{task.dueDate}</p>
                      </div>
                      <Badge
                        className={`text-xs ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.priority === "high" ? "Tinggi" : task.priority === "medium" ? "Sedang" : "Rendah"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-700" />
                  <span>Aktivitas Terbaru</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.activity}</p>
                      <p className="text-xs text-gray-600">
                        {activity.date} • {activity.time}
                      </p>
                      <p className="text-xs text-blue-600">{activity.attendees}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Statistik</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Anggota</span>
                  <span className="font-bold text-blue-600">30</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rata-rata Kehadiran</span>
                  <span className="font-bold text-green-600">91%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Kegiatan Bulan Ini</span>
                  <span className="font-bold">16</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Prestasi</span>
                  <span className="font-bold text-yellow-600">5</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
