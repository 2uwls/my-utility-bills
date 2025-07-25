"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Zap, AlertCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupCustomerPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    electricCustomerNumber: "",
    gasCustomerNumber: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // 이전 단계 완료 확인
    const agreements = localStorage.getItem("signupAgreements")
    const info = localStorage.getItem("signupInfo")
    if (!agreements || !info) {
      router.push("/signup")
    }
  }, [router])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    validateField(field, value)
  }

  const validateField = (field, value) => {
    const newErrors = { ...errors }

    switch (field) {
      case "electricCustomerNumber":
        if (value && !/^\d{10,12}$/.test(value)) {
          newErrors.electricCustomerNumber = "10-12자리 숫자를 입력해주세요"
        } else {
          delete newErrors.electricCustomerNumber
        }
        break
      case "gasCustomerNumber":
        if (value && !/^\d{8,12}$/.test(value)) {
          newErrors.gasCustomerNumber = "8-12자리 숫자를 입력해주세요"
        } else {
          delete newErrors.gasCustomerNumber
        }
        break
    }

    setErrors(newErrors)
  }

  const canComplete = () => {
    return (formData.electricCustomerNumber || formData.gasCustomerNumber) && Object.keys(errors).length === 0
  }

  const handleComplete = () => {
    if (canComplete()) {
      // 모든 회원가입 정보 수집
      const agreements = JSON.parse(localStorage.getItem("signupAgreements") || "{}")
      const info = JSON.parse(localStorage.getItem("signupInfo") || "{}")

      const completeData = {
        ...agreements,
        ...info,
        ...formData,
        signupDate: new Date().toISOString(),
      }

      console.log("회원가입 완료 데이터:", completeData)

      // localStorage 정리
      localStorage.removeItem("signupAgreements")
      localStorage.removeItem("signupInfo")

      // 회원가입 완료 페이지로 이동
      router.push("/signup/complete")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/signup/info">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">고객번호 입력</h1>
                <p className="text-xs text-gray-500">3단계 / 3단계</p>
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
                  step <= 3 ? "bg-yellow-400 text-gray-900" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step < 3 ? <Check className="h-4 w-4" /> : step}
              </div>
              {step < 3 && <div className={`w-12 h-1 mx-2 bg-yellow-400`} />}
            </div>
          ))}
        </div>

        {/* 단계 제목 */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">고객번호 입력</h2>
          <p className="text-sm text-gray-600">공과금 분석을 위한 고객번호를 입력해주세요</p>
        </div>

        <Card className="border-0 rounded-2xl bg-white">
          <CardContent className="p-6 space-y-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertCircle className="h-3 w-3 text-white" />
                </div>
                <div>
                  <div className="font-bold text-blue-900 mb-1">고객번호 입력 안내</div>
                  <div className="text-sm text-blue-800">
                    • 전기 또는 가스 고객번호 중 하나만 입력해도 됩니다
                    <br />• 고객번호는 요금고지서에서 확인할 수 있습니다
                    <br />• 나중에 마이페이지에서 추가/수정 가능합니다
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* 전기 고객번호 */}
              <div className="space-y-2">
                <Label htmlFor="electricCustomerNumber" className="text-sm font-medium text-gray-700">
                  전기 고객번호 (한국전력)
                </Label>
                <Input
                  id="electricCustomerNumber"
                  type="text"
                  placeholder="10-12자리 숫자 입력"
                  value={formData.electricCustomerNumber}
                  onChange={(e) => handleInputChange("electricCustomerNumber", e.target.value.replace(/\D/g, ""))}
                  className={`h-12 rounded-xl ${errors.electricCustomerNumber ? "border-red-500" : ""}`}
                  maxLength={12}
                />
                {errors.electricCustomerNumber && (
                  <div className="flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {errors.electricCustomerNumber}
                  </div>
                )}
                <div className="text-xs text-gray-500">예: 123456789012</div>
              </div>

              {/* 가스 고객번호 */}
              <div className="space-y-2">
                <Label htmlFor="gasCustomerNumber" className="text-sm font-medium text-gray-700">
                  가스 고객번호 (도시가스)
                </Label>
                <Input
                  id="gasCustomerNumber"
                  type="text"
                  placeholder="8-12자리 숫자 입력"
                  value={formData.gasCustomerNumber}
                  onChange={(e) => handleInputChange("gasCustomerNumber", e.target.value.replace(/\D/g, ""))}
                  className={`h-12 rounded-xl ${errors.gasCustomerNumber ? "border-red-500" : ""}`}
                  maxLength={12}
                />
                {errors.gasCustomerNumber && (
                  <div className="flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {errors.gasCustomerNumber}
                  </div>
                )}
                <div className="text-xs text-gray-500">예: 12345678</div>
              </div>
            </div>

            {!canComplete() && (
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-orange-800">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">전기 또는 가스 고객번호 중 하나는 필수입니다</span>
                </div>
              </div>
            )}

            <Button
              onClick={handleComplete}
              disabled={!canComplete()}
              className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-bold disabled:bg-gray-200 disabled:text-gray-500"
            >
              회원가입 완료
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
