"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, ArrowLeft, Plus, X, Calendar, Users, Save } from "lucide-react"
import Link from "next/link"

export default function BuatEkstrakurikuler() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxMembers: "",
    registrationStart: "",
    registrationEnd: "",
    isActive: true,
  })

  const [schedules, setSchedules] = useState([{ day: "", startTime: "", endTime: "" }])

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]

  const addSchedule = () => {
    setSchedules([...schedules, { day: "", startTime: "", endTime: "" }])
  }

  const removeSchedule = (index) => {
    setSchedules(schedules.filter((_, i) => i !== index))
  }

  const updateSchedule = (index, field, value) => {
    const updated = schedules.map((schedule, i) => (i === index ? { ...schedule, [field]: value } : schedule))
    setSchedules(updated)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form Data:", formData)
    console.log("Schedules:", schedules)
    // Add success notification and redirect
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
              <h1 className="text-xl font-bold">Buat Ekstrakurikuler Baru</h1>
              <p className="text-sm text-gray-600">Tambahkan ekstrakurikuler untuk siswa</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={handleSubmit} className="bg-blue-700 hover:bg-blue-800">
              <Save className="w-4 h-4 mr-2" />
              Simpan
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Informasi Dasar</span>
                  </CardTitle>
                  <CardDescription>Informasi umum tentang ekstrakurikuler</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Ekstrakurikuler *</Label>
                      <Input
                        id="name"
                        placeholder="Contoh: Olimpiade Matematika"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Deskripsi *</Label>
                      <Textarea
                        id="description"
                        placeholder="Jelaskan tentang ekstrakurikuler ini..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxMembers">Maksimal Anggota *</Label>
                      <Input
                        id="maxMembers"
                        type="number"
                        placeholder="20"
                        value={formData.maxMembers}
                        onChange={(e) => setFormData({ ...formData, maxMembers: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-700" />
                    <span>Jadwal Kegiatan</span>
                  </CardTitle>
                  <CardDescription>Atur jadwal rutin ekstrakurikuler</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {schedules.map((schedule, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-blue-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Jadwal {index + 1}</h4>
                        {schedules.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSchedule(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <Label>Hari</Label>
                          <Select value={schedule.day} onValueChange={(value) => updateSchedule(index, "day", value)}>
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
                        <div className="space-y-2">
                          <Label>Waktu Mulai</Label>
                          <Input
                            type="time"
                            value={schedule.startTime}
                            onChange={(e) => updateSchedule(index, "startTime", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Waktu Selesai</Label>
                          <Input
                            type="time"
                            value={schedule.endTime}
                            onChange={(e) => updateSchedule(index, "endTime", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addSchedule} className="w-full bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Jadwal
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Period */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-700" />
                    <span>Periode Pendaftaran</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="registrationStart">Tanggal Mulai</Label>
                    <Input
                      id="registrationStart"
                      type="date"
                      value={formData.registrationStart}
                      onChange={(e) => setFormData({ ...formData, registrationStart: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationEnd">Tanggal Berakhir</Label>
                    <Input
                      id="registrationEnd"
                      type="date"
                      value={formData.registrationEnd}
                      onChange={(e) => setFormData({ ...formData, registrationEnd: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label htmlFor="isActive">Aktifkan pendaftaran</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-800">Tips Membuat Ekstrakurikuler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-blue-700">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Buat nama yang menarik dan mudah diingat</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Jelaskan manfaat yang akan didapat siswa</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Tentukan jadwal yang tidak bentrok dengan pelajaran</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Sesuaikan kuota dengan kapasitas pembinaan</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
