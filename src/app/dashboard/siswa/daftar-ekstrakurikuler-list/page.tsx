"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, ArrowLeft, Search, Filter, Plus, AlertCircle, Users, Clock, MapPin, User } from "lucide-react"

export default function DaftarEkstrakurikulerListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Data siswa saat ini
  const myExtracurriculars = [
    {
      id: 1,
      name: "Basket",
      schedule: "Senin, Rabu 15:30-17:00",
    },
  ]

  const availableExtracurriculars = [
    {
      id: 2,
      name: "English Club",
      description: "Meningkatkan kemampuan bahasa Inggris melalui speaking, writing, dan presentation",
      schedule: "Selasa, Kamis 14:00-15:30",
      maxMembers: 25,
      currentMembers: 18,
      registrationOpen: true,
      category: "Bahasa",
      supervisor: "Mrs. Sarah Johnson",
      location: "Ruang Bahasa",
    },
    {
      id: 3,
      name: "Robotika",
      description: "Belajar pemrograman, elektronik, dan membuat robot untuk kompetisi",
      schedule: "Jumat 15:30-17:30",
      maxMembers: 20,
      currentMembers: 15,
      registrationOpen: true,
      category: "Teknologi",
      supervisor: "Pak Budi Santoso",
      location: "Lab Komputer",
    },
    {
      id: 4,
      name: "Teater",
      description: "Seni peran, drama, dan pengembangan kepercayaan diri melalui pertunjukan",
      schedule: "Sabtu 09:00-11:00",
      maxMembers: 25,
      currentMembers: 22,
      registrationOpen: true,
      category: "Seni",
      supervisor: "Bu Sari Dewi",
      location: "Aula Sekolah",
    },
    {
      id: 5,
      name: "Futsal",
      description: "Olahraga futsal untuk meningkatkan kebugaran dan kerjasama tim",
      schedule: "Senin 15:30-17:00",
      maxMembers: 16,
      currentMembers: 16,
      registrationOpen: false,
      category: "Olahraga",
      supervisor: "Pak Ahmad Fauzi",
      location: "Lapangan Futsal",
    },
    {
      id: 6,
      name: "Pramuka",
      description: "Kegiatan kepanduan untuk membentuk karakter dan leadership",
      schedule: "Sabtu 14:00-16:00",
      maxMembers: 30,
      currentMembers: 25,
      registrationOpen: true,
      category: "Karakter",
      supervisor: "Pak Dedi Kurniawan",
      location: "Lapangan Upacara",
    },
    {
      id: 7,
      name: "Musik",
      description: "Band sekolah untuk mengembangkan bakat musik dan tampil di acara sekolah",
      schedule: "Rabu 15:30-17:00",
      maxMembers: 15,
      currentMembers: 12,
      registrationOpen: true,
      category: "Seni",
      supervisor: "Bu Rina Melati",
      location: "Studio Musik",
    },
    {
      id: 8,
      name: "Jurnalistik",
      description: "Menulis artikel, fotografi, dan mengelola media sekolah",
      schedule: "Kamis 15:30-17:00",
      maxMembers: 20,
      currentMembers: 14,
      registrationOpen: true,
      category: "Media",
      supervisor: "Pak Eko Prasetyo",
      location: "Ruang Redaksi",
    },
    {
      id: 9,
      name: "Sains Club",
      description: "Eksperimen sains, penelitian, dan persiapan olimpiade sains",
      schedule: "Selasa 15:30-17:00",
      maxMembers: 18,
      currentMembers: 11,
      registrationOpen: true,
      category: "Sains",
      supervisor: "Bu Dr. Maya Sari",
      location: "Lab IPA",
    },
    {
      id: 10,
      name: "Debat",
      description: "Melatih kemampuan argumentasi, public speaking, dan berpikir kritis",
      schedule: "Jumat 14:00-15:30",
      maxMembers: 16,
      currentMembers: 13,
      registrationOpen: true,
      category: "Bahasa",
      supervisor: "Pak Rudi Hartono",
      location: "Ruang Diskusi",
    },
  ]

  const categories = ["Bahasa", "Teknologi", "Seni", "Olahraga", "Karakter", "Media", "Sains"]

  const canRegister = (extracurricular: any) => {
    if (!extracurricular.registrationOpen) return { can: false, reason: "Pendaftaran ditutup" }
    if (extracurricular.currentMembers >= extracurricular.maxMembers) return { can: false, reason: "Kuota penuh" }
    if (myExtracurriculars.length >= 2) return { can: false, reason: "Maksimal 2 ekstrakurikuler" }

    // Jadwal bentrok?
    const hasConflict = myExtracurriculars.some((my) => my.schedule.includes(extracurricular.schedule.split(" ")[0]))
    if (hasConflict) return { can: false, reason: "Jadwal bentrok" }

    return { can: true, reason: "" }
  }

  const filteredExtracurriculars = availableExtracurriculars.filter((ekskul) => {
    const matchesSearch =
      ekskul.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ekskul.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ekskul.supervisor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "all" || ekskul.category === filterCategory

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "open" && ekskul.registrationOpen) ||
      (filterStatus === "closed" && !ekskul.registrationOpen) ||
      (filterStatus === "available" && canRegister(ekskul).can) ||
      (filterStatus === "full" && ekskul.currentMembers >= ekskul.maxMembers)

    return matchesSearch && matchesCategory && matchesStatus
  })

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
              <h1 className="text-xl font-bold">Daftar Ekstrakurikuler</h1>
              <p className="text-sm text-gray-600">Pilih ekstrakurikuler yang ingin Anda ikuti</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Cari Ekstrakurikuler</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Cari nama, deskripsi, atau pembina..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
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
                    <SelectItem value="available">Bisa Daftar</SelectItem>
                    <SelectItem value="open">Pendaftaran Buka</SelectItem>
                    <SelectItem value="closed">Pendaftaran Tutup</SelectItem>
                    <SelectItem value="full">Kuota Penuh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Total Ditemukan</Label>
                <div className="h-10 flex items-center">
                  <Badge className="bg-blue-100 text-blue-700 text-sm">
                    {filteredExtracurriculars.length} ekstrakurikuler
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ekstrakurikuler List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredExtracurriculars.map((ekskul) => {
            const registerStatus = canRegister(ekskul)
            return (
              <Card key={ekskul.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{ekskul.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mb-2">
                        {ekskul.category}
                      </Badge>
                    </div>
                    <Badge
                      className={`text-xs ${
                        ekskul.registrationOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {ekskul.registrationOpen ? "Buka" : "Tutup"}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">{ekskul.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Info Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{ekskul.schedule}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{ekskul.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{ekskul.supervisor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span>Anggota</span>
                          <span className="font-medium">
                            {ekskul.currentMembers}/{ekskul.maxMembers}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(ekskul.currentMembers / ekskul.maxMembers) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    {registerStatus.can ? (
                      <Link
                        href={`/dashboard/siswa/daftar-ekstrakurikuler?id=${ekskul.id}&name=${encodeURIComponent(ekskul.name)}`}
                      >
                        <Button className="w-full bg-blue-700 hover:bg-blue-800">
                          <Plus className="w-4 h-4 mr-2" />
                          Daftar Sekarang
                        </Button>
                      </Link>
                    ) : (
                      <Button className="w-full" disabled>
                        Tidak Tersedia
                      </Button>
                    )}
                  </div>

                  {/* Error Message */}
                  {!registerStatus.can && (
                    <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
                      <AlertCircle className="mr-1 inline h-4 w-4" />
                      {registerStatus.reason}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* No Results */}
        {filteredExtracurriculars.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Tidak ada ekstrakurikuler ditemukan</h3>
              <p className="text-gray-500 mb-4">Coba ubah filter atau kata kunci pencarian Anda</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setFilterCategory("all")
                  setFilterStatus("all")
                }}
              >
                Reset Filter
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
