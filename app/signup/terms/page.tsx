"use client"

import { useState } from "react"
import { ArrowLeft, Zap, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupTermsPage() {
  const router = useRouter()
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
    allAgree: false,
  })

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

  const canProceed = () => {
    return agreements.terms && agreements.privacy
  }

  const handleNext = () => {
    if (canProceed()) {
      // 약관 동의 정보를 localStorage에 저장
      localStorage.setItem("signupAgreements", JSON.stringify(agreements))
      router.push("/signup/info")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/signup">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">약관 동의</h1>
                <p className="text-xs text-gray-500">1단계 / 3단계</p>
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
                  step === 1 ? "bg-yellow-400 text-gray-900" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step === 1 ? <Check className="h-4 w-4" /> : step}
              </div>
              {step < 3 && <div className={`w-12 h-1 mx-2 ${step === 1 ? "bg-yellow-400" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* 단계 제목 */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">약관 동의</h2>
          <p className="text-sm text-gray-600">서비스 이용을 위한 약관에 동의해주세요</p>
        </div>

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

            {!canProceed() && (
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-orange-800">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">필수 약관에 동의해주세요</span>
                </div>
              </div>
            )}

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
