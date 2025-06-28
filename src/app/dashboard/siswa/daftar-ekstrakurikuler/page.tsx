"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, BookOpen, Clock, MapPin, CheckCircle } from "lucide-react"
import Link from "next/link"

function DaftarEkstrakurikulerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({})

  const ekstrakurikulerId = searchParams.get("id")
  const ekstrakurikulerName = searchParams.get("name")

  // Mock data siswa
  const studentData = {
    name: "Ahmad Rizki",
    nis: "2024001",
    class: "XI IPA 2",
    email: "ahmad.rizki@student.school.id",
  }

  // Mock data ekstrakurikuler berdasarkan ID
  const ekstrakurikulerData = {
    "3": {
      name: "Robotika",
      description: "Belajar pemrograman dan robotika",
      schedule: "Jumat 15:30-17:30",
      location: "Lab Komputer",
      supervisor: "Pak Budi Santoso",
      category: "Teknologi",
      requirements: ["Minat terhadap teknologi", "Kemampuan dasar komputer", "Komitmen waktu"],
    },
    "4": {
      name: "Teater",
      description: "Seni peran dan drama",
      schedule: "Sabtu 09:00-11:00",
      location: "Aula Sekolah",
      supervisor: "Bu Sari Dewi",
      category: "Seni",
      requirements: ["Percaya diri", "Kemampuan komunikasi", "Kreativitas"],
    },
  }

  const currentEkskul = ekstrakurikulerData[ekstrakurikulerId as keyof typeof ekstrakurikulerData]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSuccess(true)

    // Redirect setelah 3 detik
    setTimeout(() => {
      router.push("/dashboard/siswa")
    }, 3000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">Pendaftaran Berhasil!</h2>
            <p className="text-gray-600 mb-4">
              Anda telah berhasil mendaftar ekstrakurikuler <strong>{currentEkskul?.name}</strong>
            </p>
            <p className="text-sm text-gray-500">Mengarahkan kembali ke dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentEkskul) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">Ekstrakurikuler Tidak Ditemukan</h2>
            <Link href="/dashboard/siswa">
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
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/siswa">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Daftar Ekstrakurikuler</h1>
              <p className="text-sm text-gray-600">{currentEkskul.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form Pendaftaran */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-700" />
                  <span>Form Pendaftaran</span>
                </CardTitle>
                <CardDescription>Lengkapi data berikut untuk mendaftar ekstrakurikuler</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Data Siswa (Read-only) */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Data Siswa</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" value={studentData.name} readOnly className="bg-gray-50" />
                      </div>
                      <div>
                        <Label htmlFor="nis">NIS</Label>
                        <Input id="nis" value={studentData.nis} readOnly className="bg-gray-50" />
                      </div>
                      <div>
                        <Label htmlFor="class">Kelas</Label>
                        <Input id="class" value={studentData.class} readOnly className="bg-gray-50" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={studentData.email} readOnly className="bg-gray-50" />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800" disabled={isLoading}>
                    {isLoading ? "Memproses..." : "Daftar Sekarang"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Info Ekstrakurikuler */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{currentEkskul.name}</span>
                  <Badge variant="outline">{currentEkskul.category}</Badge>
                </CardTitle>
                <CardDescription>{currentEkskul.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Jadwal</p>
                    <p className="text-sm text-gray-600">{currentEkskul.schedule}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Lokasi</p>
                    <p className="text-sm text-gray-600">{currentEkskul.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Pembina</p>
                    <p className="text-sm text-gray-600">{currentEkskul.supervisor}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Persyaratan</p>
                  <ul className="space-y-1">
                    {currentEkskul.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DaftarEkstrakurikuler() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DaftarEkstrakurikulerContent />
    </Suspense>
  )
}
