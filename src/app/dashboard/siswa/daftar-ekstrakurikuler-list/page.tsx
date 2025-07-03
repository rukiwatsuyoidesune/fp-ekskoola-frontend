"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, ArrowLeft, Search, Filter, Plus, AlertCircle, Users, Clock, User } from "lucide-react"
import { fetchWithToken } from "@/lib/fetcher"
import { jwtDecode } from "jwt-decode"

// Definisi tipe data untuk payload token JWT
type TokenPayload = {
  sub: string
  email: string
  role: string
  iat: number
  exp: number
}

// Definisi tipe data untuk Ekstrakurikuler dari backend
type Extracurricular = {
  id: number
  name: string
  description: string // **Perbaikan: Mengubah dari number menjadi string**
  maxAnggota: number
  JumlahAnggota: number
  // registrationOpen: boolean // Tidak ada di Postman, asumsi diturunkan dari kondisi lain
  pembina_id: number; // Menambahkan properti pembina_id sesuai Postman
  periode_start: string; // Menambahkan properti periode_start
  periode_end: string; // Menambahkan properti periode_end
  jadwal_id: number; // Menambahkan properti jadwal_id
  jadwal: {
    hari: string
    waktuMulai: string
    waktuSelesai: string
  }
  // **Perbaikan: Mengganti 'users' dengan 'pembina' sesuai output Postman**
  pembina: {
    id: number
    name: string
  } | null // Menambahkan | null karena relasi mungkin kosong
}

// Definisi tipe data untuk Ekstrakurikuler yang diikuti siswa
type MyExtracurricular = {
  id: number
  status: string
  register_at: string;
  ekstra: Extracurricular // Nested object for extracurricular details
}

/* ----------------------- */
/* 1. Wrapper Component */
/* ----------------------- */
export default function DaftarEkstrakurikulerListPageWrapper() {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <DaftarEkstrakurikulerListPageContent />
    </QueryClientProvider>
  )
}

/* ----------------------- */
/* 2. Page UI Content */
/* ----------------------- */
function DaftarEkstrakurikulerListPageContent() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      console.warn("Tidak ada token ditemukan. Mengarahkan ke halaman login.")
      router.push("/login")
      return
    }

    try {
      const decoded: TokenPayload = jwtDecode(token)

      if (decoded.role !== "siswa") {
        console.warn(`Akses ditolak: Anda login sebagai ${decoded.role}, bukan siswa.`)
        router.push("/login?error=unauthorized_role")
        return
      }
      setUserId(Number(decoded.sub))
    } catch (error) {
      console.error("Gagal mendekode token JWT atau token tidak valid:", error)
      localStorage.removeItem("token")
      router.push("/login?error=invalid_token")
    }
  }, [router])

  // Fetch data ekstrakurikuler yang tersedia dan yang sudah diikuti siswa
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ekstrakurikulerList", userId],
    queryFn: () =>
      fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/siswa/dashboard?userId=${userId}`),
    enabled: !!userId, // Hanya jalankan query jika userId sudah ada
  })

  // Destrukturisasi data setelah dimuat
  const availableExtracurriculars: Extracurricular[] = dashboardData?.allExtracurriculars || []
  const myExtracurriculars: MyExtracurricular[] = dashboardData?.myExtracurriculars || []

  // Fungsi untuk mengecek apakah bisa mendaftar
  const canRegister = (extracurricular: Extracurricular) => {
    // Asumsi registrationOpen true jika kuota belum penuh dan tidak bentrok
    // Berdasarkan Postman, tidak ada registrationOpen, jadi kita buat asumsi ini
    const isRegistrationOpen = true; // Asumsi selalu buka, atau tambahkan properti di backend

    if (!isRegistrationOpen) return { can: false, reason: "Pendaftaran ditutup." }; // Sesuaikan pesan
    if (extracurricular.JumlahAnggota >= extracurricular.maxAnggota) return { can: false, reason: "Kuota penuh" };
    if (myExtracurriculars.length >= 2) return { can: false, reason: "Maksimal 2 ekstrakurikuler" };

    // Cek jadwal bentrok
    const hasConflict = myExtracurriculars.some(
      (my) => my.ekstra.jadwal.hari === extracurricular.jadwal.hari
    );
    if (hasConflict) return { can: false, reason: "Jadwal bentrok dengan ekstrakurikuler yang sudah Anda ikuti" };

    return { can: true, reason: "" };
  };

  // Filter ekstrakurikuler berdasarkan pencarian dan status
  const filteredExtracurriculars = availableExtracurriculars.filter((ekskul) => {
    const ekskulName = ekskul.name ? ekskul.name.toLowerCase() : '';
    const ekskulDescription = ekskul.description ? ekskul.description.toLowerCase() : '';
    // **Perbaikan: Menggunakan ekskul.pembina?.name untuk pencarian**
    const ekskulSupervisorName = ekskul.pembina?.name ? ekskul.pembina.name.toLowerCase() : '';

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const matchesSearch =
      ekskulName.includes(lowerCaseSearchTerm) ||
      ekskulDescription.includes(lowerCaseSearchTerm) ||
      ekskulSupervisorName.includes(lowerCaseSearchTerm); // Pencarian sekarang mencakup nama pembina

    const registerStatus = canRegister(ekskul);

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "open" && registerStatus.can) ||
      (filterStatus === "closed" && !registerStatus.can) ||
      (filterStatus === "available" && registerStatus.can) ||
      (filterStatus === "full" && ekskul.JumlahAnggota >= ekskul.maxAnggota);

    return matchesSearch && matchesStatus;
  });

  if (isLoading || userId === null) return <div className="p-8">Memuat daftar ekstrakurikuler...</div>
  if (error)
    return (
      <div className="p-8 text-red-600">
        Error memuat data: {(error as Error).message}. Pastikan Anda sudah login.
      </div>
    )

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
            <div className="grid md:grid-cols-3 gap-4">
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
            const isFull = ekskul.JumlahAnggota >= ekskul.maxAnggota;
            const isRegistered = myExtracurriculars.some(myEkskul => myEkskul.ekstra.id === ekskul.id);

            return (
              <Card key={ekskul.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{ekskul.name}</CardTitle>
                    </div>
                    <Badge
                      className={`text-xs ${
                        registerStatus.can && !isFull && !isRegistered
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {isRegistered ? "Terdaftar" : (registerStatus.can && !isFull ? "Buka" : "Tutup")}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">{ekskul.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Info Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>
                        {ekskul.jadwal.hari}, {ekskul.jadwal.waktuMulai}-{ekskul.jadwal.waktuSelesai}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      {/* **Perbaikan: Menampilkan nama dari ekskul.pembina.name** */}
                      <span>{ekskul.pembina?.name || 'N/A'}</span> 
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span>Anggota</span>
                          <span className="font-medium">
                            {ekskul.JumlahAnggota}/{ekskul.maxAnggota}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(ekskul.JumlahAnggota / ekskul.maxAnggota) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    {registerStatus.can && !isRegistered ? (
                      <Link
                        href={`/dashboard/siswa/daftar-ekstrakurikuler/${ekskul.id}/${userId}`}
                      >
                        <Button className="w-full bg-blue-700 hover:bg-blue-800">
                          <Plus className="w-4 h-4 mr-2" />
                          Daftar Sekarang
                        </Button>
                      </Link>
                    ) : (
                      <Button className="w-full" disabled>
                        {isRegistered ? "Sudah Terdaftar" : "Tidak Tersedia"}
                      </Button>
                    )}
                  </div>

                  {/* Error Message */}
                  {!registerStatus.can && !isRegistered && (
                    <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
                      <AlertCircle className="mr-1 inline h-4 w-4" />
                      {registerStatus.reason}
                    </div>
                  )}
                  {isRegistered && (
                    <div className="rounded border border-blue-200 bg-blue-50 p-2 text-sm text-blue-700">
                      <AlertCircle className="mr-1 inline h-4 w-4" />
                      Anda sudah terdaftar di ekstrakurikuler ini.
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