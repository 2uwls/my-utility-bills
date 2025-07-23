"use client"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, Check, AlertCircle, Zap, Shield, User, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
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
    electricCustomerNumber: "",
    gasCustomerNumber: "",
  })
  const [errors, setErrors] = useState({})
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
    allAgree: false,
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // 실시간 유효성 검사
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

  const handlePhoneChange = (value) => {
    // 자동 하이픈 추가
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

  const handleAgreementChange = (field, checked) => {
    if (field === "allAgree") {
      setAgreements({
        terms: checked,
        privacy: checked,
        marketing: checked,
        allAgree: checked,
      })
    } else {
      const newAgreements = { ...agreements, [field]: checked }
      newAgreements.allAgree = newAgreements.terms && newAgreements.privacy && newAgreements.marketing
      setAgreements(newAgreements)
    }
  }

  const canProceedStep1 = () => {
    return agreements.terms && agreements.privacy && Object.keys(errors).length === 0
  }

  const canProceedStep2 = () => {
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

  const canCompleteSignup = () => {
    return formData.electricCustomerNumber || formData.gasCustomerNumber
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // 회원가입 처리 로직
    console.log("회원가입 데이터:", formData)
    alert("회원가입이 완료되었습니다!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">회원가입</h1>
                <p className="text-xs text-gray-500">카카오뱅크 공과금 절약</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Zap className="h-4 w-4 text-gray-900" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* 환영 메시지 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-gray-900" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">절약 여정을 시작해보세요!</h2>
          <p className="text-sm text-gray-600">3단계로 간편하게 가입하고 공과금을 절약해보세요</p>
        </div>

        {/* 회원가입 단계 안내 */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">1단계: 약관 동의</h3>
              <p className="text-sm text-gray-600">서비스 이용약관 및 개인정보 처리방침</p>
            </div>
            <div className="text-2xl">📋</div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">2단계: 기본 정보</h3>
              <p className="text-sm text-gray-600">아이디, 비밀번호, 개인정보 입력</p>
            </div>
            <div className="text-2xl">👤</div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">3단계: 고객번호</h3>
              <p className="text-sm text-gray-600">전기/가스 고객번호로 맞춤 서비스</p>
            </div>
            <div className="text-2xl">🔢</div>
          </div>
        </div>

        {/* 혜택 안내 */}
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-3">회원가입 혜택</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>개인 맞춤 절약 분석</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>절약 숲 리워드 시스템</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>카카오뱅크 특별 혜택</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>실시간 절약 알림</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 단계별 제목 */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {currentStep === 1 && "약관 동의"}
            {currentStep === 2 && "기본 정보 입력"}
            {currentStep === 3 && "고객번호 입력"}
          </h2>
          <p className="text-sm text-gray-600">
            {currentStep === 1 && "서비스 이용을 위한 약관에 동의해주세요"}
            {currentStep === 2 && "회원가입을 위한 기본 정보를 입력해주세요"}
            {currentStep === 3 && "공과금 분석을 위한 고객번호를 입력해주세요"}
          </p>
        </div>

        {/* Step 1: 약관 동의 */}
        {currentStep === 1 && (
          <Card className="border-0 rounded-2xl bg-white">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-xl">
                  <Checkbox
                    id="allAgree"
                    checked={agreements.allAgree}
                    onCheckedChange={(checked) => handleAgreementChange("allAgree", checked)}
                  />
                  <Label htmlFor="allAgree" className="font-bold text-gray-900">
                    전체 동의
                  </Label>
                </div>

                <div className="space-y-3 pl-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="terms"
                        checked={agreements.terms}
                        onCheckedChange={(checked) => handleAgreementChange("terms", checked)}
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-700">
                        서비스 이용약관 동의
                      </Label>
                      <Badge variant="destructive" className="text-xs">
                        필수
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                      보기
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="privacy"
                        checked={agreements.privacy}
                        onCheckedChange={(checked) => handleAgreementChange("privacy", checked)}
                      />
                      <Label htmlFor="privacy" className="text-sm text-gray-700">
                        개인정보 처리방침 동의
                      </Label>
                      <Badge variant="destructive" className="text-xs">
                        필수
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                      보기
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="marketing"
                        checked={agreements.marketing}
                        onCheckedChange={(checked) => handleAgreementChange("marketing", checked)}
                      />
                      <Label htmlFor="marketing" className="text-sm text-gray-700">
                        마케팅 정보 수신 동의
                      </Label>
                      <Badge variant="outline" className="text-xs">
                        선택
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                      보기
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleNextStep}
                disabled={!canProceedStep1()}
                className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-bold disabled:bg-gray-200 disabled:text-gray-500"
              >
                다음
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: 기본 정보 입력 */}
        {currentStep === 2 && (
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

              <div className="flex gap-3">
                <Button
                  onClick={handlePrevStep}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-gray-200 bg-transparent"
                >
                  이전
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!canProceedStep2()}
                  className="flex-1 h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-bold disabled:bg-gray-200 disabled:text-gray-500"
                >
                  다음
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: 고객번호 입력 */}
        {currentStep === 3 && (
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

              {!canCompleteSignup() && (
                <div className="bg-orange-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-orange-800">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">전기 또는 가스 고객번호 중 하나는 필수입니다</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handlePrevStep}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-gray-200 bg-transparent"
                >
                  이전
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!canCompleteSignup()}
                  className="flex-1 h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-bold disabled:bg-gray-200 disabled:text-gray-500"
                >
                  회원가입 완료
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 하단 링크 */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-yellow-600 font-medium hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
