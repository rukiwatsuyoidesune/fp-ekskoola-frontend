"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  ArrowLeft,
  Search,
  Filter,
  UserCheck,
  Clock,
  Calendar,
  Users,
  Save,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

interface Member {
  id: number
  name: string
  nis: string
  class: string
  avatar?: string
  attendance: "hadir" | "tidak_hadir" | "izin" | "sakit" | null
  note?: string
}

export default function PresensiPage() {
  const [selectedExtracurricular, setSelectedExtracurricular] = useState("1")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split("T")[0])
  const [sessionTime, setSessionTime] = useState("15:30")
  const [sessionTopic, setSessionTopic] = useState("")
  const [sessionNotes, setSessionNotes] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const extracurriculars = [
    { id: "1", name: "Olimpiade Matematika", schedule: "Selasa, Kamis 15:30-17:00" },
    { id: "2", name: "Robotika", schedule: "Jumat 15:30-17:30" },
  ]

  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "Ahmad Rizki Pratama",
      nis: "2024001",
      class: "XI IPA 2",
      avatar: "/placeholder.svg?height=40&width=40",
      attendance: null,
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      nis: "2024002",
      class: "XI IPA 1",
      avatar: "/placeholder.svg?height=40&width=40",
      attendance: null,
    },
    {
      id: 3,
      name: "Budi Santoso",
      nis: "2024003",
      class: "XI IPA 2",
      avatar: "/placeholder.svg?height=40&width=40",
      attendance: null,
    },
    {
      id: 4,
      name: "Dewi Sartika",
      nis: "2024004",
      class: "XI IPA 3",
      avatar: "/placeholder.svg?height=40&width=40",
      attendance: null,
    },
    {
      id: 5,
      name: "Andi Wijaya",
      nis: "2024005",
      class: "XI IPA 1",
      avatar: "/placeholder.svg?height=40&width=40",
      attendance: null,
    },
    {
      id: 6,
      name: "Maya Putri",
      nis: "2024006",
      class: "XI IPA 3",
      avatar: "/placeholder.svg?height=40&width=40",
      attendance: null,
    },
  ])

  const updateAttendance = (memberId: number, status: "hadir" | "tidak_hadir" | "izin" | "sakit") => {
    setMembers((prev) => prev.map((member) => (member.id === memberId ? { ...member, attendance: status } : member)))
  }

  const updateNote = (memberId: number, note: string) => {
    setMembers((prev) => prev.map((member) => (member.id === memberId ? { ...member, note } : member)))
  }

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.nis.includes(searchTerm) ||
      member.class.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || member.attendance === filterStatus

    return matchesSearch && matchesFilter
  })

  const attendanceStats = {
    total: members.length,
    hadir: members.filter((m) => m.attendance === "hadir").length,
    tidak_hadir: members.filter((m) => m.attendance === "tidak_hadir").length,
    izin: members.filter((m) => m.attendance === "izin").length,
    sakit: members.filter((m) => m.attendance === "sakit").length,
    belum_diisi: members.filter((m) => m.attendance === null).length,
  }

  const handleSaveAttendance = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert("Presensi berhasil disimpan!")
    } catch (error) {
      alert("Gagal menyimpan presensi. Silakan coba lagi.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleMarkAllPresent = () => {
    setMembers((prev) => prev.map((member) => ({ ...member, attendance: "hadir" })))
  }

  const getAttendanceIcon = (status: string | null) => {
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
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getAttendanceColor = (status: string | null) => {
    switch (status) {
      case "hadir":
        return "bg-green-100 text-green-700 border-green-200"
      case "tidak_hadir":
        return "bg-red-100 text-red-700 border-red-200"
      case "izin":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "sakit":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/pembina">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Presensi Anggota</h1>
              <p className="text-sm text-gray-600">Kelola kehadiran anggota ekstrakurikuler</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Session Info Card */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-700" />
              <span>Informasi Sesi</span>
            </CardTitle>
            <CardDescription>Atur informasi sesi kegiatan ekstrakurikuler</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="extracurricular">Ekstrakurikuler</Label>
                <Select value={selectedExtracurricular} onValueChange={setSelectedExtracurricular}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih ekstrakurikuler" />
                  </SelectTrigger>
                  <SelectContent>
                    {extracurriculars.map((ekskul) => (
                      <SelectItem key={ekskul.id} value={ekskul.id}>
                        {ekskul.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal</Label>
                <Input id="date" type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Waktu</Label>
                <Input id="time" type="time" value={sessionTime} onChange={(e) => setSessionTime(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Topik Kegiatan</Label>
                <Input
                  id="topic"
                  placeholder="Masukkan topik kegiatan"
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Catatan Sesi</Label>
              <Textarea
                id="notes"
                placeholder="Tambahkan catatan untuk sesi ini..."
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">{attendanceStats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{attendanceStats.hadir}</div>
              <div className="text-sm text-gray-600">Hadir</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{attendanceStats.tidak_hadir}</div>
              <div className="text-sm text-gray-600">Tidak Hadir</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{attendanceStats.izin}</div>
              <div className="text-sm text-gray-600">Izin</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{attendanceStats.sakit}</div>
              <div className="text-sm text-gray-600">Sakit</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{attendanceStats.belum_diisi}</div>
              <div className="text-sm text-gray-600">Belum Diisi</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Cari nama, NIS, atau kelas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="hadir">Hadir</SelectItem>
                    <SelectItem value="tidak_hadir">Tidak Hadir</SelectItem>
                    <SelectItem value="izin">Izin</SelectItem>
                    <SelectItem value="sakit">Sakit</SelectItem>
                    <SelectItem value={null as any}>Belum Diisi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleMarkAllPresent}>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Tandai Semua Hadir
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-700" />
              <span>Daftar Anggota</span>
              <Badge className="bg-blue-100 text-blue-700">{filteredMembers.length} anggota</Badge>
            </CardTitle>
            <CardDescription>Tandai kehadiran setiap anggota ekstrakurikuler</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">Anggota</th>
                    <th className="text-left p-4 font-medium text-gray-700">NIS</th>
                    <th className="text-left p-4 font-medium text-gray-700">Kelas</th>
                    <th className="text-center p-4 font-medium text-gray-700">Status Kehadiran</th>
                    <th className="text-left p-4 font-medium text-gray-700">Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member, index) => (
                    <tr
                      key={member.id}
                      className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-600">{member.nis}</span>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{member.class}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center space-x-2">
                          <Button
                            size="sm"
                            variant={member.attendance === "hadir" ? "default" : "outline"}
                            className={`${
                              member.attendance === "hadir"
                                ? "bg-green-600 hover:bg-green-700"
                                : "hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                            }`}
                            onClick={() => updateAttendance(member.id, "hadir")}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Hadir
                          </Button>
                          <Button
                            size="sm"
                            variant={member.attendance === "tidak_hadir" ? "default" : "outline"}
                            className={`${
                              member.attendance === "tidak_hadir"
                                ? "bg-red-600 hover:bg-red-700"
                                : "hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                            }`}
                            onClick={() => updateAttendance(member.id, "tidak_hadir")}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Tidak Hadir
                          </Button>
                          <Button
                            size="sm"
                            variant={member.attendance === "izin" ? "default" : "outline"}
                            className={`${
                              member.attendance === "izin"
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : "hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-300"
                            }`}
                            onClick={() => updateAttendance(member.id, "izin")}
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Izin
                          </Button>
                          <Button
                            size="sm"
                            variant={member.attendance === "sakit" ? "default" : "outline"}
                            className={`${
                              member.attendance === "sakit"
                                ? "bg-orange-600 hover:bg-orange-700"
                                : "hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300"
                            }`}
                            onClick={() => updateAttendance(member.id, "sakit")}
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Sakit
                          </Button>
                        </div>
                      </td>
                      <td className="p-4">
                        <Input
                          placeholder="Tambahkan catatan..."
                          value={member.note || ""}
                          onChange={(e) => updateNote(member.id, e.target.value)}
                          className="w-full max-w-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Tidak ada anggota yang ditemukan</p>
                <p className="text-sm text-gray-400">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button
            size="lg"
            onClick={handleSaveAttendance}
            disabled={isSaving}
            className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 px-8"
          >
            {isSaving ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Menyimpan...</span>
              </div>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Simpan Presensi
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
