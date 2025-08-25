'use client';

import MainTabNavigation from '@/components/main-tab-navigation';
import HomeTabContent from './home/page';
import MainSummarySection from '@/components/MainSummarySection';
import KakaoHeader from '@/components/KakaoHeader';

import { useState } from 'react'; // useState import 추가
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'; // Dialog 컴포넌트 import

export default function HomePage() {
  const [ocrResult, setOcrResult] = useState<any>(null); // OCR 결과 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태

  return (
    <div className="min-h-screen bg-gray-50">
      <KakaoHeader />
      <div className="max-w-xl mx-auto px-4 py-4 space-y-4">
        <MainSummarySection />
        <MainTabNavigation active="home" />
        <HomeTabContent />

        {/* OCR 이미지 업로드 섹션 추가 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">계량기 이미지 업로드</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* OCR 결과 모달 */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>OCR 결과</DialogTitle>
            <DialogDescription>
              이미지에서 인식된 텍스트입니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {ocrResult && ocrResult.images && ocrResult.images[0] ? (
              ocrResult.images[0].inferResult === "FAILURE" ? (
                <p className="text-sm text-red-500">OCR 처리 중 오류가 발생했습니다. 다시 시도해주세요.</p>
              ) : ocrResult.images[0].inferText ? (
                <p className="text-sm whitespace-pre-wrap">
                  {ocrResult.images[0].inferText}
                </p>
              ) : (
                <p className="text-sm text-gray-500">인식된 텍스트가 없습니다.</p>
              )
            ) : (
              <p className="text-sm text-gray-500">결과를 불러오는 중...</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64ImageData = reader.result?.toString().split(',')[1];

      if (!base64ImageData) {
        alert('이미지 데이터를 읽는 데 실패했습니다.');
        return;
      }

      try {
        const response = await fetch('/api/clova-ocr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageData: base64ImageData }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(`OCR 에러: ${errorData.error || '알 수 없는 에러'}`);
          return;
        }

        const result = await response.json();
        console.log('Clova OCR 최종 결과:', result);
        setOcrResult(result); // OCR 결과 상태 업데이트
        setIsModalOpen(true); // 모달 열기
      } catch (error) {
        console.error('클라이언트 측 OCR 요청 에러:', error);
        alert('OCR 처리 중 오류가 발생했습니다.');
      }
    };

    reader.onerror = (error) => {
      console.error('파일 읽기 에러:', error);
      alert('파일을 읽는 중 오류가 발생했습니다.');
    };
  }
}
