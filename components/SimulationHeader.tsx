'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Flame, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SimulationHeaderProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
  isElectric: boolean;
}

export default function SimulationHeader({ title, description, link, linkText, isElectric }: SimulationHeaderProps) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [hasUnread, setHasUnread] = useState(false);

  const loadNotifications = () => {
    const storedNotifications = JSON.parse(localStorage.getItem('appNotifications') || '[]');
    const parsedNotifications = storedNotifications.map((n: any) => ({...n, createdAt: new Date(n.createdAt)}));
    setNotifications(parsedNotifications);
    setHasUnread(parsedNotifications.some((n: any) => !n.read));
  };

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
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/simulation">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 whitespace-nowrap">
                {title}
              </h1>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href={link}>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent whitespace-nowrap">
                {isElectric ? <Flame className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                {linkText}
              </Button>
            </Link>
            <div className={`w-8 h-8 ${isElectric ? 'bg-[#FFE300]' : 'bg-orange-500'} rounded-full flex items-center justify-center`}>
              {isElectric ? <Zap className="h-4 w-4 text-gray-800" /> : <Flame className="h-4 w-4 text-white" />}
            </div>
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
                              ? notification.createdAt.toLocaleDateString()
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
          </div>
        </div>
      </div>
    </header>
  );
}
