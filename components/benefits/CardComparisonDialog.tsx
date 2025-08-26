'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CardData {
  name: string;
  discounts: string[];
  annualFee: string;
  logoText: string;
  logoBgColor: string;
}

interface CardComparisonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  card1: CardData; // Green Plan Card
  card2: CardData; // The card being compared
}

export default function CardComparisonDialog({ isOpen, onClose, card1, card2 }: CardComparisonDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>카드 비교</DialogTitle>
          <DialogDescription>두 카드의 혜택을 비교해보세요.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {/* Card 1 (Green Plan Card) */}
          <Card>
            <CardHeader>
              <div className={`w-12 h-8 ${card1.logoBgColor} rounded-lg flex items-center justify-center`}>
                <span className="text-xs font-bold text-white">{card1.logoText}</span>
              </div>
              <CardTitle className="text-base">{card1.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {card1.discounts.map((discount, index) => (
                <p key={index}>• {discount}</p>
              ))}
              <p>• 연회비: {card1.annualFee}</p>
            </CardContent>
          </Card>

          {/* Card 2 (Compared Card) */}
          <Card>
            <CardHeader>
              <div className={`w-12 h-8 ${card2.logoBgColor} rounded-lg flex items-center justify-center`}>
                <span className="text-xs font-bold text-white">{card2.logoText}</span>
              </div>
              <CardTitle className="text-base">{card2.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {card2.discounts.map((discount, index) => (
                <p key={index}>• {discount}</p>
              ))}
              <p>• 연회비: {card2.annualFee}</p>
            </CardContent>
          </Card>
        </div>
        <Button onClick={onClose}>닫기</Button>
      </DialogContent>
    </Dialog>
  );
}