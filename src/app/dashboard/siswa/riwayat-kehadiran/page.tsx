"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
} from "lucide-react"

interface AttendanceRecord {
  id: number
  extracurricular: string
  date: string
  time: string
  topic: string
  status: "hadir" | "tidak_hadir" | "izin" | "sakit"
  note?: string
}

export default function RiwayatKehadiranPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterExtracurricular, setFilterExtracurricular] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterMonth, setFilterMonth] = useState("all")

  const attendanceRecords: AttendanceRecord[] = [
    {
      id: 1,
      extracurricular: "Basket",
      date: "2024-01-15",
      time: "15:30-17:00",
      topic: "Latihan Shooting",
      status: "hadir",
    },
    {
      id: 2,
      extracurricular: "English Club",
      date: "2024-01-14",
      time: "14:00-15:30",
      topic: "Speaking Practice",
      status: "hadir",
    },
    {
      id: 3,
      extracurricular: "Basket",
      date: "2024-01-13",
      time: "15:30-17:00",
      topic: "Latihan Dribbling",
      status: "tidak_hadir",
      note: "Sakit demam",
    },
    {
      id: 4,
      extracurricular: "English Club",
      date: "2024-01-12",
      time: "14:00-15:30",
      topic: "Grammar Review",
      status: "hadir",
    },
    {
      id: 5,
      extracurricular: "Basket",
      date: "2024-01-10",
      time: "15:30-17:00",
      topic: "Scrimmage Game",
      status: "izin",
      note: "Ada acara keluarga",
    },
    {
      id: 6,
      extracurricular: "English Club",
      date: "2024-01-09",
      time: "14:00-15:30",
      topic: "Vocabulary Building",
      status: "hadir",
    },
    {
      id: 7,
      extracurricular: "Basket",
      date: "2024-01-08",
      time: "15:30-17:00",
      topic: "Defense Training",
      status: "hadir",
    },
    {
      id: 8,
      extracurricular: "English Club",
      date: "2024-01-07",
      time: "14:00-15:30",
      topic: "Presentation Skills",
      status: "sakit",
      note: "Flu",
    },
    {
      id: 9,
      extracurricular: "Basket",
      date: "2024-01-06",
      time: "15:30-17:00",
      topic: "Team Strategy",
      status: "hadir",
    },
    {
      id: 10,
      extracurricular: "English Club",
      date: "2024-01-05",
      time: "14:00-15:30",
      topic: "Reading Comprehension",
      status: "hadir",
    },
  ]

  const extracurriculars = ["Basket", "English Club"]
  const months = [
    { value: "2024-01", label: "Januari 2024" },
    { value: "2023-12", label: "Desember 2023" },
    { value: "2023-11", label: "November 2023" },
  ]

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.extracurricular.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.date.includes(searchTerm)

    const matchesExtracurricular = filterExtracurricular === "all" || record.extracurricular === filterExtracurricular
    const matchesStatus = filterStatus === "all" || record.status === filterStatus
    const matchesMonth = filterMonth === "all" || record.date.startsWith(filterMonth)

    return matchesSearch && matchesExtracurricular && matchesStatus && matchesMonth
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "hadir":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "tidak_hadir":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "izin":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "sakit":
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "hadir":
        return <Badge className="bg-green-100 text-green-700">Hadir</Badge>
      case "tidak_hadir":
        return <Badge className="bg-red-100 text-red-700">Tidak Hadir</Badge>
      case "izin":
        return <Badge className="bg-yellow-100 text-yellow-700">Izin</Badge>
      case "sakit":
        return <Badge className="bg-orange-100 text-orange-700">Sakit</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/siswa">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Riwayat Kehadiran</h1>
              <p className="text-sm text-gray-600">Pantau riwayat kehadiran ekstrakurikuler Anda</p>
            </div>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Cari</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Cari kegiatan, topik, atau tanggal..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="extracurricular">Ekstrakurikuler</Label>
                <Select value={filterExtracurricular} onValueChange={setFilterExtracurricular}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua ekstrakurikuler" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Ekstrakurikuler</SelectItem>
                    {extracurriculars.map((ekskul) => (
                      <SelectItem key={ekskul} value={ekskul}>
                        {ekskul}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Semua status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="hadir">Hadir</SelectItem>
                    <SelectItem value="tidak_hadir">Tidak Hadir</SelectItem>
                    <SelectItem value="izin">Izin</SelectItem>
                    <SelectItem value="sakit">Sakit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="month">Bulan</Label>
                <Select value={filterMonth} onValueChange={setFilterMonth}>
                  <SelectTrigger>
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Semua bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Bulan</SelectItem>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-700" />
              <span>Riwayat Kehadiran</span>
              <Badge className="bg-blue-100 text-blue-700">{filteredRecords.length} kegiatan</Badge>
            </CardTitle>
            <CardDescription>Daftar lengkap kehadiran Anda dalam kegiatan ekstrakurikuler</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">Tanggal</th>
                    <th className="text-left p-4 font-medium text-gray-700">Ekstrakurikuler</th>
                    <th className="text-left p-4 font-medium text-gray-700">Waktu</th>
                    <th className="text-left p-4 font-medium text-gray-700">Topik Kegiatan</th>
                    <th className="text-center p-4 font-medium text-gray-700">Status</th>
                    <th className="text-left p-4 font-medium text-gray-700">Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr
                      key={record.id}
                      className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-sm">{formatDate(record.date)}</p>
                          <p className="text-xs text-gray-500">{record.date}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {record.extracurricular}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{record.time}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium">{record.topic}</p>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(record.status)}
                          {getStatusBadge(record.status)}
                        </div>
                      </td>
                      <td className="p-4">
                        {record.note ? (
                          <p className="text-sm text-gray-600 italic">{record.note}</p>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredRecords.length === 0 && (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Tidak ada riwayat kehadiran yang ditemukan</p>
                <p className="text-sm text-gray-400">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
