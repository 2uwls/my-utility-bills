'use client';
import { Zap, Calculator, Bell, TreeDeciduous } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function KakaoHeader() {
  const [selectedPeriod, setSelectedPeriod] = useState("2025");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [hasUnread, setHasUnread] = useState(false);

  const loadNotifications = () => {
    const storedNotifications = JSON.parse(localStorage.getItem('appNotifications') || '[]');
    // Ensure createdAt is a Date object for correct sorting/display
    const parsedNotifications = storedNotifications.map((n: any) => ({...n, createdAt: new Date(n.createdAt)}));
    setNotifications(parsedNotifications);
    setHasUnread(parsedNotifications.some((n: any) => !n.read));
  };

  // Load notifications on mount and listen for changes
  useEffect(() => {
    loadNotifications();
    window.addEventListener('storage', loadNotifications);
    return () => {
      window.removeEventListener('storage', loadNotifications);
    };
  }, []);

  const handleMarkAsRead = (id: string) => {
    const updatedNotifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('appNotifications', JSON.stringify(updatedNotifications));
    setHasUnread(updatedNotifications.some((n: any) => !n.read));
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFE300] rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-gray-900" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">내공과금</h1>
                <p className="text-xs text-gray-500">카카오뱅크와 함께</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-20 h-8 text-sm border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/simulation">
              <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                <Calculator className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/rewards">
              <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                <TreeDeciduous className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
              </Button>
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                  <Bell className="h-4 w-4" />
                  {hasUnread && (
                    <div className="absolute -top-0 -right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 mr-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">알림</h4>
                    <p className="text-sm text-muted-foreground">
                      최근 알림을 확인하세요.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="mb-2 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                          <span
                            className={`flex h-2 w-2 translate-y-1 rounded-full ${!notification.read ? "bg-sky-500" : "bg-gray-300"}`}/>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                              {notification.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {notification.body}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                            {notification.createdAt && notification.createdAt instanceof Date && !isNaN(notification.createdAt.getTime())
                              ? notification.createdAt.toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                              : ''}
                          </p>
                            {!notification.read && (
                              <Button
                                variant="link"
                                size="sm"
                                className="p-0 h-auto justify-start text-xs"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                읽음으로 표시
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">새로운 알림이 없습니다.</p>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="h-8 px-2 sm:px-3 text-sm">
                로그인
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="h-8 px-2 sm:px-3 text-sm bg-[#FFE300] hover:bg-yellow-500 text-gray-900">
                회원가입
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}