"use client"

import { useState } from "react"
import { ArrowLeft, Check, CreditCard, Zap, Flame, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AutoPaymentPage() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "electric",
      name: "전기료 자동이체",
      account: "카카오뱅크 ****1234",
      connected: true,
      discount: "1% 적립",
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      color: "blue",
    },
    {
      id: "gas",
      name: "가스료 자동이체",
      account: "설정하고 1% 적립받기",
      connected: false,
      discount: "1% 적립",
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      color: "orange",
    },
    {
      id: "water",
      name: "수도료 자동이체",
      account: "설정하고 1% 적립받기",
      connected: false,
      discount: "1% 적립",
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      color: "blue",
    },
  ])

  const handleConnect = (id) => {
    setPaymentMethods((prev) =>
      prev.map((method) =>
        method.id === id ? { ...method, connected: true, account: "카카오뱅크 ****1234" } : method,
      ),
    )
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
                <h1 className="text-lg font-bold text-gray-900">자동이체 관리</h1>
                <p className="text-xs text-gray-500">카카오뱅크 계좌 연동</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* 자동이체 목록 */}
        {paymentMethods.map((method) => (
          <Card key={method.id} className="border-0 rounded-2xl bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      method.connected ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    {method.connected ? (
                      <Check className="h-6 w-6 text-green-600" />
                    ) : (
                      <div className="w-6 h-6 bg-gray-300 rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-600">{method.account}</div>
                  </div>
                </div>
                <div className="text-right">
                  {method.connected ? (
                    <Badge className="bg-green-100 text-green-800 border-0">연결됨</Badge>
                  ) : (
                    <Button
                      onClick={() => handleConnect(method.id)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl px-4 py-2 text-sm"
                    >
                      설정하기
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* 혜택 안내 */}
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="h-6 w-6" />
              <h3 className="text-lg font-bold">자동이체 혜택</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>매월 1% 적립 (최대 월 5,000원)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>자동이체 수수료 면제</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>연체료 걱정 없는 자동 납부</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 하단 버튼 */}
        <div className="pt-4">
          <Link href="/">
            <Button className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-2xl font-bold">
              완료
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
