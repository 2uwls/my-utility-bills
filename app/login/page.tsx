"use client"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogin = () => {
    // 로그인 처리 로직
    console.log("로그인 데이터:", formData)
    // 성공 시 메인 페이지로 이동
    window.location.href = "/"
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
                <h1 className="text-lg font-bold text-gray-900">로그인</h1>
                <p className="text-xs text-gray-500">카카오뱅크 공과금 절약</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Zap className="h-4 w-4 text-gray-900" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-12">
        {/* 로고 및 환영 메시지 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-gray-900" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">다시 만나서 반가워요!</h2>
          <p className="text-sm text-gray-600">절약 여정을 계속해보세요</p>
        </div>

        <Card className="border-0 rounded-2xl bg-white">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              {/* 아이디 */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  아이디
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              {/* 비밀번호 */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  비밀번호
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력해주세요"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="h-12 rounded-xl pr-12"
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
              </div>

              {/* 로그인 유지 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked)}
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-700">
                    로그인 유지
                  </Label>
                </div>
                <Button variant="ghost" className="text-sm text-gray-500 hover:text-gray-700 p-0 h-auto">
                  비밀번호 찾기
                </Button>
              </div>
            </div>

            {/* 로그인 버튼 */}
            <Button
              onClick={handleLogin}
              disabled={!formData.username || !formData.password}
              className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-bold disabled:bg-gray-200 disabled:text-gray-500"
            >
              로그인
            </Button>

            {/* 소셜 로그인 */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">또는</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-gray-200 bg-yellow-50 hover:bg-yellow-100"
              >
                <div className="w-5 h-5 bg-yellow-400 rounded mr-3" />
                카카오로 로그인
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 회원가입 링크 */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            아직 계정이 없으신가요?{" "}
            <Link href="/signup" className="text-yellow-600 font-medium hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
