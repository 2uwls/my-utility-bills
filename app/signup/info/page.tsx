"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Eye, EyeOff, Zap, AlertCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupInfoPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birthDate: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // 약관 동의 확인
    const agreements = localStorage.getItem("signupAgreements")
    if (!agreements) {
      router.push("/signup/terms")
    }
  }, [router])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    validateField(field, value)
  }

  const validateField = (field, value) => {
    const newErrors = { ...errors }

    switch (field) {
      case "username":
        if (value.length < 4) {
          newErrors.username = "아이디는 4자 이상이어야 합니다"
        } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
          newErrors.username = "영문, 숫자만 사용 가능합니다"
        } else {
          delete newErrors.username
        }
        break
      case "password":
        if (value.length < 8) {
          newErrors.password = "비밀번호는 8자 이상이어야 합니다"
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
          newErrors.password = "영문과 숫자를 포함해야 합니다"
        } else {
          delete newErrors.password
        }
        break
      case "passwordConfirm":
        if (value !== formData.password) {
          newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다"
        } else {
          delete newErrors.passwordConfirm
        }
        break
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "올바른 이메일 형식이 아닙니다"
        } else {
          delete newErrors.email
        }
        break
      case "phone":
        if (!/^010-\d{4}-\d{4}$/.test(value)) {
          newErrors.phone = "010-0000-0000 형식으로 입력해주세요"
        } else {
          delete newErrors.phone
        }
        break
    }

    setErrors(newErrors)
  }

  const handlePhoneChange = (value) => {
    const numbers = value.replace(/[^\d]/g, "")
    let formatted = numbers
    if (numbers.length >= 3) {
      formatted = numbers.slice(0, 3) + "-" + numbers.slice(3)
    }
    if (numbers.length >= 7) {
      formatted = numbers.slice(0, 3) + "-" + numbers.slice(3, 7) + "-" + numbers.slice(7, 11)
    }
    handleInputChange("phone", formatted)
  }

  const canProceed = () => {
    return (
      formData.username &&
      formData.password &&
      formData.passwordConfirm &&
      formData.name &&
      formData.birthDate &&
      formData.email &&
      formData.phone &&
      Object.keys(errors).length === 0
    )
  }

  const handleNext = () => {
    if (canProceed()) {
      localStorage.setItem("signupInfo", JSON.stringify(formData))
      router.push("/signup/customer")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/signup/terms">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">기본 정보 입력</h1>
                <p className="text-xs text-gray-500">2단계 / 3단계</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Zap className="h-4 w-4 text-gray-900" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* 진행 단계 표시 */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step <= 2 ? "bg-yellow-400 text-gray-900" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step < 2 ? <Check className="h-4 w-4" /> : step}
              </div>
              {step < 3 && <div className={`w-12 h-1 mx-2 ${step < 2 ? "bg-yellow-400" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* 단계 제목 */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">기본 정보 입력</h2>
          <p className="text-sm text-gray-600">회원가입을 위한 기본 정보를 입력해주세요</p>
        </div>

        <Card className="border-0 rounded-2xl bg-white">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-4">
              {/* 아이디 */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  아이디 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="영문, 숫자 4자 이상"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className={`h-12 rounded-xl ${errors.username ? "border-red-500" : ""}`}
                />
                {errors.username && (
                  <div className="flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {errors.username}
                  </div>
                )}
              </div>

              {/* 비밀번호 */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  비밀번호 <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="영문, 숫자 포함 8자 이상"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`h-12 rounded-xl pr-12 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div className="space-y-2">
                <Label htmlFor="passwordConfirm" className="text-sm font-medium text-gray-700">
                  비밀번호 확인 <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="passwordConfirm"
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력해주세요"
                    value={formData.passwordConfirm}
                    onChange={(e) => handleInputChange("passwordConfirm", e.target.value)}
                    className={`h-12 rounded-xl pr-12 ${errors.passwordConfirm ? "border-red-500" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  >
                    {showPasswordConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.passwordConfirm && (
                  <div className="flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {errors.passwordConfirm}
                  </div>
                )}
              </div>

              {/* 이름 */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  이름 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="실명을 입력해주세요"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              {/* 생년월일 */}
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
                  생년월일 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              {/* 이메일 */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  이메일 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`h-12 rounded-xl ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <div className="flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* 핸드폰 번호 */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  핸드폰 번호 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={`h-12 rounded-xl ${errors.phone ? "border-red-500" : ""}`}
                  maxLength={13}
                />
                {errors.phone && (
                  <div className="flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {errors.phone}
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-bold disabled:bg-gray-200 disabled:text-gray-500"
            >
              다음 단계
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
