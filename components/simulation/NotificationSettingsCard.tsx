'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';

interface NotificationSettingsCardProps {
  calculateBill: () => number;
  storageKeyEnabled: string;
  storageKeyThreshold: string;
  notificationTitle: string;
  notificationBody: (threshold: number) => string;
  buttonClassName: string;
  defaultThreshold: number;
}

export default function NotificationSettingsCard({ 
  calculateBill,
  storageKeyEnabled,
  storageKeyThreshold,
  notificationTitle,
  notificationBody,
  buttonClassName,
  defaultThreshold
}: NotificationSettingsCardProps) {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [thresholdAmount, setThresholdAmount] = useState<number>(defaultThreshold);
  const [tempThresholdAmount, setTempThresholdAmount] = useState<number>(defaultThreshold);

  useEffect(() => {
    const savedEnabled = localStorage.getItem(storageKeyEnabled);
    const savedThreshold = localStorage.getItem(storageKeyThreshold);
    if (savedEnabled) setNotificationsEnabled(JSON.parse(savedEnabled));
    if (savedThreshold) {
      const parsed = JSON.parse(savedThreshold);
      setThresholdAmount(parsed);
      setTempThresholdAmount(parsed);
    }
  }, [storageKeyEnabled, storageKeyThreshold]);

  useEffect(() => {
    if (notificationsEnabled) {
      const currentBill = calculateBill();
      if (currentBill > thresholdAmount) {
        const newNotification = {
          id: new Date().toISOString(),
          title: notificationTitle,
          body: notificationBody(thresholdAmount),
          read: false,
          createdAt: new Date(),
        };
        const existingNotifications = JSON.parse(localStorage.getItem('appNotifications') || '[]');
        if (!existingNotifications.some((n: any) => n.body === newNotification.body)) {
          const updatedNotifications = [newNotification, ...existingNotifications];
          localStorage.setItem('appNotifications', JSON.stringify(updatedNotifications));
          window.dispatchEvent(new Event('storage'));
        }
      }
    }
  }, [notificationsEnabled, thresholdAmount, calculateBill, notificationTitle, notificationBody]);

  const handleToggleNotifications = (checked: boolean) => {
    setNotificationsEnabled(checked);
    localStorage.setItem(storageKeyEnabled, JSON.stringify(checked));
    toast({
      title: `알림 ${checked ? '설정' : '해제'} 완료`,
      description: `요금 경고 알림이 ${checked ? '활성화' : '비활성화'}되었습니다.`,
    });
  };

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setTempThresholdAmount(value);
    }
  };

  const handleConfirmThreshold = () => {
    setThresholdAmount(tempThresholdAmount);
    localStorage.setItem(storageKeyThreshold, JSON.stringify(tempThresholdAmount));
    toast({
      title: "설정 저장 완료",
      description: `알림 임계 금액이 ${tempThresholdAmount.toLocaleString()}원으로 변경되었습니다.`,
    });
  };

  return (
    <Card className="border-0 rounded-2xl bg-white text-gray-800 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notification-toggle" className="text-sm font-medium">
              요금 경고 알림 받기
            </Label>
            <Switch
              id="notification-toggle"
              checked={notificationsEnabled}
              onCheckedChange={handleToggleNotifications}
            />
          </div>
          {notificationsEnabled && (
            <div className="grid gap-2">
              <Label htmlFor="threshold-amount" className="text-sm font-medium">
                알림 임계 금액 (원)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="threshold-amount"
                  type="number"
                  value={tempThresholdAmount}
                  onChange={handleThresholdChange}
                  placeholder={`예: ${defaultThreshold}`}
                  className="bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-400"
                />
                <Button
                  onClick={handleConfirmThreshold}
                  className={buttonClassName}
                >
                  확인
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
