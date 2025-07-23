"use client"

import { useEffect } from "react"
import { Zap, Check, Gift, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupCompletePage() {
  const router = useRouter()

  useEffect(() => {
    // 회원가입 완료 후 3초 뒤 자동으로 메인 페이지로 이동
    const timer = setTimeout(() => {
      router.push("/")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-12">
        {/* 성공 아이콘 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">회원가입 완료!</h1>
          <p className="text-sm text-gray-600">카카오뱅크 공과금 절약 서비스에 오신 것을 환영합니다</p>
        </div>

        {/* 환영 메시지 */}
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white mb-6">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold mb-2">절약 여정이 시작되었습니다!</h2>
            <p className="text-sm opacity-90">이제 공과금을 스마트하게 절약해보세요</p>
          </CardContent>
        </Card>

        {/* 시작 가이드 */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-bold text-gray-900 text-center">이제 이런 것들을 할 수 있어요!</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">절약 분석</div>
                <div className="text-sm text-gray-600">개인 맞춤 공과금 절약 분석</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Gift className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">절약 숲</div>
                <div className="text-sm text-gray-600">절약할 때마다 나무가 자라는 리워드</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">친구 초대</div>
                <div className="text-sm text-gray-600">친구와 함께 절약 챌린지</div>
              </div>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-2xl font-bold">
              홈으로 가기
            </Button>
          </Link>

          <Link href="/rewards">
            <Button variant="outline" className="w-full h-12 rounded-2xl border-gray-200 bg-white">
              <Gift className="h-4 w-4 mr-2" />
              절약 숲 구경하기
            </Button>
          </Link>
        </div>

        {/* 자동 이동 안내 */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">5초 후 자동으로 홈으로 이동합니다</p>
        </div>
      </div>
    </div>
  )
}
