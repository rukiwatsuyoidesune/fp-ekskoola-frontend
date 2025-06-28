"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, BookOpen, Trash2, Lightbulb, Save } from "lucide-react"
import Link from "next/link"

interface Schedule {
  id: string
  day: string
  startTime: string
  endTime: string
}

interface ExtracurricularData {
  id: string
  name: string
  description: string
  maxMembers: string
  registrationStart: string
  registrationEnd: string
  registrationActive: boolean
  schedules: Schedule[]
}

export default function EditExtracurricularPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<ExtracurricularData>({
    id: "",
    name: "",
    description: "",
    maxMembers: "",
    registrationStart: "",
    registrationEnd: "",
    registrationActive: true,
    schedules: [{ id: "1", day: "", startTime: "", endTime: "" }],
  })

  const [schedules, setSchedules] = useState<Schedule[]>([{ id: "1", day: "", startTime: "", endTime: "" }])

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]

  // Mock data ekstrakurikuler
  const mockExtracurriculars: Record<string, ExtracurricularData> = {
    "1": {
      id: "1",
      name: "Basket",
      description: "Olahraga basket untuk meningkatkan kebugaran dan kerjasama tim",
      maxMembers: "20",
      registrationStart: "2024-01-01",
      registrationEnd: "2024-01-31",
      registrationActive: true,
      schedules: [
        { id: "1", day: "Senin", startTime: "15:30", endTime: "17:00" },],
    },
    "2": {
      id: "2",
      name: "Robotika",
      description: "Belajar pemrograman dan robotika untuk kompetisi",
      maxMembers: "20",
      registrationStart: "2024-01-01",
      registrationEnd: "2024-01-31",
      registrationActive: true,
      schedules: [{ id: "1", day: "Jumat", startTime: "15:30", endTime: "17:30" }],
    },
  }

  useEffect(() => {
    // Simulasi loading data
    const loadData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const ekstrakurikulerId = params.id as string
      const data = mockExtracurriculars[ekstrakurikulerId]

      if (data) {
        setFormData(data)
        setSchedules(data.schedules)
      }

      setIsLoading(false)
    }

    loadData()
  }, [params.id])

  const updateSchedule = (id: string, field: keyof Schedule, value: string) => {
    setSchedules(schedules.map((schedule) => (schedule.id === id ? { ...schedule, [field]: value } : schedule)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Simulasi API call untuk update
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Updated data:", { ...formData, schedules })
      alert("Ekstrakurikuler berhasil diperbarui!")
      router.push("/dashboard/pembina")
    } catch (error) {
      alert("Gagal memperbarui ekstrakurikuler. Silakan coba lagi.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Memuat data ekstrakurikuler...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!formData.id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">Ekstrakurikuler Tidak Ditemukan</h2>
            <Link href="/dashboard/pembina">
              <Button className="bg-blue-700 hover:bg-blue-800">Kembali ke Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
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
              <h1 className="text-xl font-bold">Edit Ekstrakurikuler</h1>
              <p className="text-sm text-gray-600">Dashboard Pembina / Edit Ekstrakurikuler / {formData.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleSubmit}
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900"
            >
              {isSaving ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menyimpan...</span>
                </div>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Perubahan
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informasi Dasar */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Informasi Dasar</CardTitle>
                  <CardDescription>Edit informasi dasar ekstrakurikuler</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Ekstrakurikuler *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: Basket, Robotika, English Club"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Jelaskan tentang ekstrakurikuler ini..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxMembers">Maksimal Anggota</Label>
                    <Input
                      id="maxMembers"
                      type="number"
                      value={formData.maxMembers}
                      onChange={(e) => setFormData({ ...formData, maxMembers: e.target.value })}
                      placeholder="20"
                      min="1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Jadwal Kegiatan */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Jadwal Kegiatan</CardTitle>
                  <CardDescription>Atur jadwal kegiatan ekstrakurikuler</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Jadwal</h4>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label>Hari</Label>
                          <Select
                            value={schedule.day}
                            onValueChange={(value) => updateSchedule(schedule.id, "day", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih hari" />
                            </SelectTrigger>
                            <SelectContent>
                              {days.map((day) => (
                                <SelectItem key={day} value={day}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Waktu Mulai</Label>
                          <Input
                            type="time"
                            value={schedule.startTime}
                            onChange={(e) => updateSchedule(schedule.id, "startTime", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Waktu Selesai</Label>
                          <Input
                            type="time"
                            value={schedule.endTime}
                            onChange={(e) => updateSchedule(schedule.id, "endTime", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Periode Pendaftaran */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Periode Pendaftaran</CardTitle>
                  <CardDescription>Atur periode pendaftaran anggota baru</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="registrationStart">Tanggal Mulai</Label>
                      <Input
                        id="registrationStart"
                        type="date"
                        value={formData.registrationStart}
                        onChange={(e) => setFormData({ ...formData, registrationStart: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="registrationEnd">Tanggal Berakhir</Label>
                      <Input
                        id="registrationEnd"
                        type="date"
                        value={formData.registrationEnd}
                        onChange={(e) => setFormData({ ...formData, registrationEnd: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="registrationActive"
                      checked={formData.registrationActive}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, registrationActive: checked as boolean })
                      }
                    />
                    <Label htmlFor="registrationActive">Aktifkan pendaftaran sekarang</Label>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <span>Tips Edit</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-800">Perhatikan Anggota Aktif</p>
                  <p className="text-blue-600">Pastikan perubahan tidak mengganggu anggota yang sudah terdaftar</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-800">Jadwal Bentrok</p>
                  <p className="text-green-600">Cek kembali jadwal untuk menghindari bentrok dengan kegiatan lain</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="font-medium text-purple-800">Notifikasi Otomatis</p>
                  <p className="text-purple-600">Anggota akan mendapat notifikasi jika ada perubahan penting</p>
                </div>
              </CardContent>
            </Card>

            {/* Info Ekstrakurikuler */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Info Ekstrakurikuler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID Ekstrakurikuler</span>
                  <span className="font-medium">{formData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Anggota Saat Ini</span>
                  <span className="font-medium">18 orang</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-green-600">Aktif</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dibuat</span>
                  <span className="font-medium">1 Jan 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
