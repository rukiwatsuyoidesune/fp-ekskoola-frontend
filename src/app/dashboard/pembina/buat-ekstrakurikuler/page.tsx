"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, BookOpen, Plus, Trash2, Lightbulb } from "lucide-react"
import Link from "next/link"

interface Schedule {
  id: string
  day: string
  startTime: string
  endTime: string
}

export default function CreateExtracurricularPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxMembers: "",
    registrationStart: "",
    registrationEnd: "",
    registrationActive: true,
  })

  const [schedules, setSchedules] = useState<Schedule[]>([{ id: "1", day: "", startTime: "", endTime: "" }])

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]

  const addSchedule = () => {
    const newSchedule: Schedule = {
      id: Date.now().toString(),
      day: "",
      startTime: "",
      endTime: "",
    }
    setSchedules([...schedules, newSchedule])
  }

  const removeSchedule = (id: string) => {
    if (schedules.length > 1) {
      setSchedules(schedules.filter((schedule) => schedule.id !== id))
    }
  }

  const updateSchedule = (id: string, field: keyof Schedule, value: string) => {
    setSchedules(schedules.map((schedule) => (schedule.id === id ? { ...schedule, [field]: value } : schedule)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form data:", formData)
    console.log("Schedules:", schedules)
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
              <h1 className="text-xl font-bold">Buat Ekstrakurikuler</h1>
              <p className="text-sm text-gray-600">Dashboard Pembina / Buat Ekstrakurikuler</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900">
              Simpan Ekstrakurikuler
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
                  <CardDescription>Masukkan informasi dasar ekstrakurikuler</CardDescription>
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
                  {schedules.map((schedule, index) => (
                    <div key={schedule.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Jadwal {index + 1}</h4>
                        {schedules.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSchedule(schedule.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
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
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSchedule}
                    className="w-full border-dashed bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Jadwal
                  </Button>
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
                  <span>Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-800">Nama yang Menarik</p>
                  <p className="text-blue-600">Gunakan nama yang mudah diingat dan mencerminkan kegiatan</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-800">Deskripsi Jelas</p>
                  <p className="text-green-600">Jelaskan manfaat dan kegiatan yang akan dilakukan</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="font-medium text-purple-800">Jadwal Realistis</p>
                  <p className="text-purple-600">Pastikan jadwal tidak bentrok dengan kegiatan lain</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
