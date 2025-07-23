"use client"

import { useState } from "react"
import { ArrowLeft, Share2, Gift, Sun, Droplets, Users, Calendar, Trophy, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

export default function RewardsPage() {
  const [currentStreak, setCurrentStreak] = useState(2) // 현재 연속 절약 개월
  const [invitedFriends, setInvitedFriends] = useState(7) // 초대한 친구 수
  const [totalTrees, setTotalTrees] = useState(8) // 총 심은 나무 수
  const [selectedTree, setSelectedTree] = useState(null)

  // 나무 데이터 (절약 달마다 하나씩 추가)
  const trees = [
    { id: 1, month: "2024.01", savings: 12000, type: "oak", unlocked: true, position: { x: 20, y: 30 } },
    { id: 2, month: "2024.02", savings: 15000, type: "pine", unlocked: true, position: { x: 60, y: 20 } },
    { id: 3, month: "2024.03", savings: 11000, type: "birch", unlocked: true, position: { x: 40, y: 50 } },
    { id: 4, month: "2024.04", savings: 14000, type: "maple", unlocked: true, position: { x: 80, y: 40 } },
    { id: 5, month: "2024.05", savings: 16000, type: "cherry", unlocked: true, position: { x: 25, y: 70 } },
    { id: 6, month: "2024.06", savings: 18000, type: "willow", unlocked: true, position: { x: 70, y: 65 } },
    { id: 7, month: "2024.07", savings: 22000, type: "cedar", unlocked: true, position: { x: 50, y: 25 } },
    { id: 8, month: "2024.08", savings: 20000, type: "bamboo", unlocked: true, position: { x: 85, y: 70 } },
    { id: 9, month: "2024.09", savings: 0, type: "mystery", unlocked: false, position: { x: 30, y: 80 } },
    { id: 10, month: "2024.10", savings: 0, type: "mystery", unlocked: false, position: { x: 75, y: 25 } },
  ]

  const TreeComponent = ({ tree, onClick }) => {
    const getTreeStyle = (type) => {
      switch (type) {
        case "oak":
          return {
            trunk: "#8B4513",
            leaves: "#228B22",
            size: "large",
          }
        case "pine":
          return {
            trunk: "#654321",
            leaves: "#006400",
            size: "tall",
          }
        case "birch":
          return {
            trunk: "#F5F5DC",
            leaves: "#90EE90",
            size: "medium",
          }
        case "maple":
          return {
            trunk: "#8B4513",
            leaves: "#FF6347",
            size: "large",
          }
        case "cherry":
          return {
            trunk: "#8B4513",
            leaves: "#FFB6C1",
            size: "medium",
          }
        case "willow":
          return {
            trunk: "#8B4513",
            leaves: "#9ACD32",
            size: "droopy",
          }
        case "cedar":
          return {
            trunk: "#654321",
            leaves: "#228B22",
            size: "tall",
          }
        case "bamboo":
          return {
            trunk: "#32CD32",
            leaves: "#90EE90",
            size: "thin",
          }
        default:
          return {
            trunk: "#8B4513",
            leaves: "#90EE90",
            size: "small",
          }
      }
    }

    const style = getTreeStyle(tree.type)
    const isUnlocked = tree.unlocked

    return (
      <div
        className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${
          isUnlocked ? "opacity-100" : "opacity-40"
        }`}
        style={{
          left: `${tree.position.x}%`,
          top: `${tree.position.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        onClick={() => onClick(tree)}
      >
        {/* 나무 그림자 */}
        <div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black opacity-20 rounded-full"
          style={{
            width: style.size === "large" ? "40px" : style.size === "tall" ? "30px" : "25px",
            height: "8px",
          }}
        />

        {/* 나무 몸통 */}
        <div
          className="relative mx-auto rounded-sm"
          style={{
            width: style.size === "thin" ? "6px" : "12px",
            height: style.size === "tall" ? "35px" : "25px",
            backgroundColor: style.trunk,
            transform: "perspective(100px) rotateX(5deg)",
          }}
        />

        {/* 나무 잎사귀 */}
        {style.size === "droopy" ? (
          // 버드나무 스타일
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div
              className="rounded-full"
              style={{
                width: "35px",
                height: "30px",
                backgroundColor: style.leaves,
                transform: "perspective(100px) rotateX(-10deg)",
              }}
            />
            <div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 rounded-full"
              style={{
                width: "25px",
                height: "20px",
                backgroundColor: style.leaves,
                opacity: 0.8,
              }}
            />
          </div>
        ) : style.size === "tall" ? (
          // 소나무/삼나무 스타일
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div
              className="triangle-up"
              style={{
                width: 0,
                height: 0,
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                borderBottom: `20px solid ${style.leaves}`,
                transform: "perspective(100px) rotateX(-10deg)",
              }}
            />
            <div
              className="absolute top-3 left-1/2 transform -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderBottom: `18px solid ${style.leaves}`,
                opacity: 0.9,
              }}
            />
          </div>
        ) : (
          // 일반 나무 스타일
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div
              className="rounded-full"
              style={{
                width: style.size === "large" ? "40px" : "30px",
                height: style.size === "large" ? "35px" : "25px",
                backgroundColor: style.leaves,
                transform: "perspective(100px) rotateX(-10deg)",
              }}
            />
          </div>
        )}

        {/* 절약 금액 표시 */}
        {isUnlocked && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 text-xs font-bold text-green-600 shadow-md whitespace-nowrap">
            ₩{tree.savings.toLocaleString()}
          </div>
        )}

        {/* 반짝이 효과 */}
        {isUnlocked && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="h-2 w-2 text-white" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-green-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">나의 절약 숲</h1>
                <p className="text-xs text-gray-500">절약할 때마다 나무가 자라요</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              친구 초대
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 3D 아이소메트릭 숲 */}
        <Card className="border-0 rounded-2xl bg-white overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-96 overflow-hidden">
              {/* 하늘 배경 */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-green-200" />

              {/* 구름들 */}
              <div className="absolute top-4 left-10 w-16 h-8 bg-white rounded-full opacity-80 animate-pulse" />
              <div
                className="absolute top-8 right-20 w-12 h-6 bg-white rounded-full opacity-60 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute top-12 left-1/3 w-20 h-10 bg-white rounded-full opacity-70 animate-pulse"
                style={{ animationDelay: "2s" }}
              />

              {/* 3D 언덕 */}
              <div className="absolute bottom-0 left-0 right-0">
                {/* 메인 언덕 */}
                <div
                  className="relative mx-auto bg-gradient-to-b from-green-400 to-green-600 rounded-t-full"
                  style={{
                    width: "90%",
                    height: "200px",
                    transform: "perspective(500px) rotateX(60deg) rotateY(-5deg)",
                    transformOrigin: "bottom center",
                  }}
                >
                  {/* 언덕 위 잔디 텍스처 */}
                  <div className="absolute inset-0 opacity-30">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-green-300 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* 사이드 언덕들 */}
                <div
                  className="absolute bottom-0 left-0 bg-gradient-to-b from-green-300 to-green-500 rounded-t-full"
                  style={{
                    width: "40%",
                    height: "120px",
                    transform: "perspective(300px) rotateX(50deg) rotateY(10deg)",
                    transformOrigin: "bottom center",
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 bg-gradient-to-b from-green-300 to-green-500 rounded-t-full"
                  style={{
                    width: "35%",
                    height: "100px",
                    transform: "perspective(300px) rotateX(50deg) rotateY(-10deg)",
                    transformOrigin: "bottom center",
                  }}
                />
              </div>

              {/* 나무들 */}
              <div className="absolute inset-0">
                {trees.map((tree) => (
                  <TreeComponent key={tree.id} tree={tree} onClick={setSelectedTree} />
                ))}
              </div>

              {/* 햇빛 효과 */}
              {currentStreak >= 3 && (
                <div className="absolute top-4 right-4">
                  <div className="w-16 h-16 bg-yellow-300 rounded-full opacity-80 animate-pulse">
                    <div className="absolute inset-2 bg-yellow-400 rounded-full">
                      <Sun className="w-full h-full text-yellow-600 p-3" />
                    </div>
                  </div>
                  {/* 햇빛 광선 */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1 bg-yellow-300 opacity-60 animate-pulse"
                      style={{
                        height: "30px",
                        transformOrigin: "bottom center",
                        transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* 물뿌리개 효과 */}
              {invitedFriends >= 10 && (
                <div className="absolute top-1/2 left-4">
                  <div className="relative">
                    <Droplets className="w-8 h-8 text-blue-500 animate-bounce" />
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                        style={{
                          left: `${10 + i * 5}px`,
                          top: `${20 + i * 3}px`,
                          animationDelay: `${i * 0.3}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 숲 통계 오버레이 */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{totalTrees}</div>
                      <div className="text-xs text-gray-600">심은 나무</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{currentStreak}</div>
                      <div className="text-xs text-gray-600">연속 절약</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">₩148k</div>
                      <div className="text-xs text-gray-600">총 절약액</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 보상 현황 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 햇빛 보상 (3개월 연속) */}
          <Card className="border-0 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Sun className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">햇빛 보상</div>
                    <div className="text-sm text-gray-600">3개월 연속 절약</div>
                  </div>
                </div>
                {currentStreak >= 3 ? (
                  <Badge className="bg-yellow-400 text-gray-900 border-0">획득!</Badge>
                ) : (
                  <Badge variant="outline" className="border-yellow-400 text-yellow-600">
                    {3 - currentStreak}개월 남음
                  </Badge>
                )}
              </div>
              <Progress value={(currentStreak / 3) * 100} className="h-3 bg-yellow-100" />
              <div className="text-xs text-gray-600 mt-2">
                {currentStreak >= 3 ? "모든 나무가 더 빨리 자라요!" : `${currentStreak}/3개월 달성`}
              </div>
            </CardContent>
          </Card>

          {/* 물뿌리개 보상 (친구 10명 초대) */}
          <Card className="border-0 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                    <Droplets className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">물뿌리개 보상</div>
                    <div className="text-sm text-gray-600">친구 10명 초대</div>
                  </div>
                </div>
                {invitedFriends >= 10 ? (
                  <Badge className="bg-blue-400 text-white border-0">획득!</Badge>
                ) : (
                  <Badge variant="outline" className="border-blue-400 text-blue-600">
                    {10 - invitedFriends}명 남음
                  </Badge>
                )}
              </div>
              <Progress value={(invitedFriends / 10) * 100} className="h-3 bg-blue-100" />
              <div className="text-xs text-gray-600 mt-2">
                {invitedFriends >= 10 ? "특별한 나무를 심을 수 있어요!" : `${invitedFriends}/10명 초대 완료`}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 월별 나무 현황 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Calendar className="h-3 w-3 text-white" />
              </div>
              월별 절약 나무
            </CardTitle>
            <CardDescription>절약할 때마다 새로운 나무가 자라요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {trees.map((tree) => (
                <div
                  key={tree.id}
                  className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    tree.unlocked ? "bg-green-50 border-green-200 hover:border-green-300" : "bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => setSelectedTree(tree)}
                >
                  <div className="text-center">
                    {/* 미니 나무 아이콘 */}
                    <div className="w-12 h-12 mx-auto mb-2 relative">
                      {tree.unlocked ? (
                        <div className="relative">
                          <div className="w-2 h-6 bg-amber-700 mx-auto rounded-sm" />
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-green-500 rounded-full" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                          <span className="text-gray-500 text-xs">?</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs font-medium text-gray-900 mb-1">{tree.month}</div>
                    {tree.unlocked ? (
                      <div className="text-xs text-green-600 font-medium">₩{tree.savings.toLocaleString()}</div>
                    ) : (
                      <div className="text-xs text-gray-400">절약하면 해제</div>
                    )}
                  </div>

                  {tree.unlocked && (
                    <div className="absolute -top-1 -right-1">
                      <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 친구 초대 현황 */}
        <Card className="border-0 rounded-2xl bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Users className="h-3 w-3 text-white" />
              </div>
              함께하는 친구들
            </CardTitle>
            <CardDescription>친구를 초대해서 함께 절약해요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 초대 현황 */}
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-bold text-purple-900">초대 현황</div>
                    <div className="text-sm text-purple-700">{invitedFriends}명이 함께하고 있어요</div>
                  </div>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl">친구 초대하기</Button>
                </div>
                <Progress value={(invitedFriends / 10) * 100} className="h-2 bg-purple-100" />
                <div className="text-xs text-purple-600 mt-2">10명 달성 시 특별 보상 획득!</div>
              </div>

              {/* 친구 목록 */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-900 mb-3">최근 가입한 친구들</div>
                {[
                  { name: "김민수", savings: 25000, avatar: "김" },
                  { name: "이지영", savings: 18000, avatar: "이" },
                  { name: "박준호", savings: 32000, avatar: "박" },
                ].map((friend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-yellow-400 text-gray-900 text-xs">{friend.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{friend.name}</div>
                        <div className="text-xs text-gray-500">이번 달 ₩{friend.savings.toLocaleString()} 절약</div>
                      </div>
                    </div>
                    <div className="w-6 h-6 relative">
                      <div className="w-1 h-4 bg-amber-700 mx-auto rounded-sm" />
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-green-500 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 특별 이벤트 */}
        <Card className="border-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">9월 특별 이벤트</div>
                  <div className="text-sm opacity-90">추석 기념 더블 리워드!</div>
                </div>
              </div>
              <Button className="bg-white text-orange-500 hover:bg-gray-100 rounded-xl">참여하기</Button>
            </div>
            <div className="mt-4 text-sm opacity-90">9월 한 달간 절약 시 나무 2그루씩 심어져요 🌳🌳</div>
          </CardContent>
        </Card>

        {/* 하단 액션 버튼 */}
        <div className="grid grid-cols-2 gap-3 pb-6">
          <Button className="h-12 bg-green-500 hover:bg-green-600 text-white rounded-2xl">
            <Trophy className="h-4 w-4 mr-2" />
            랭킹 보기
          </Button>
          <Button variant="outline" className="h-12 rounded-2xl border-gray-200 bg-white">
            <Share2 className="h-4 w-4 mr-2" />숲 공유하기
          </Button>
        </div>
      </div>

      {/* 나무 상세 모달 */}
      {selectedTree && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <div className="w-3 h-10 bg-amber-700 mx-auto rounded-sm" />
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-green-500 rounded-full" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{selectedTree.month} 절약 나무</h3>
              {selectedTree.unlocked ? (
                <>
                  <div className="text-2xl font-bold text-green-600 mb-2">₩{selectedTree.savings.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 mb-4">이번 달 절약한 금액이에요!</div>
                </>
              ) : (
                <div className="text-sm text-gray-600 mb-4">절약하면 나무가 자라요</div>
              )}
              <Button
                onClick={() => setSelectedTree(null)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl"
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
