'use client';

import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader, Upload, FileUp } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

export default function GasMeterUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'setting' | 'done'>('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ocrResult, setOcrResult] = useState('');
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus('loading');

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64ImageData = reader.result?.toString().split(',')[1];
      if (!base64ImageData) {
        toast({ variant: 'destructive', description: '이미지를 읽는데 실패했습니다.' });
        setStatus('idle');
        return;
      }

      try {
        const response = await fetch('/api/clova-ocr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageData: base64ImageData }),
        });

        if (!response.ok) {
          throw new Error('OCR API 요청에 실패했습니다.');
        }

        const result = await response.json();
        const inferredText = result.images?.[0]?.title?.inferText?.replace(/\s/g, '') || '';

        if (result.images?.[0]?.inferResult === 'FAILURE' || !inferredText) {
          setOcrResult('인식된 텍스트가 없습니다. 선명한 사진으로 다시 시도해주세요.');
        } else {
          setOcrResult(inferredText);
        }
        setIsModalOpen(true);

      } catch (error) {
        console.error('Clova OCR Error:', error);
        toast({ variant: 'destructive', description: 'OCR 처리 중 오류가 발생했습니다.' });
      } finally {
        setStatus('idle');
      }
    };

    reader.onerror = (error) => {
      console.error('File Read Error:', error);
      toast({ variant: 'destructive', description: '파일을 읽는 중 오류가 발생했습니다.' });
      setStatus('idle');
    };
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    setStatus('setting');

    setTimeout(() => {
      setStatus('done');
      setTimeout(() => {
        setFile(null);
        setStatus('idle');
      }, 2000);
    }, 1500);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const getStatusContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center space-y-2 h-28 justify-center">
            <Loader className="animate-spin text-blue-500" />
            <p className="text-sm text-gray-500">이미지 분석 및 계량기 값 인식 중...</p>
          </div>
        );
      case 'setting':
        return (
          <div className="flex flex-col items-center space-y-2 h-28 justify-center">
            <Loader className="animate-spin text-blue-500" />
            <p className="text-sm text-gray-500">사용자의 사용량으로 설정합니다...</p>
          </div>
        );
      case 'done':
        return (
          <div className="flex flex-col items-center space-y-2 h-28 justify-center">
            <CheckCircle2 className="text-green-500 h-6 w-6" />
            <p className="text-sm font-semibold">사용량 설정 완료!</p>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div
              className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <FileUp className="w-8 h-8 text-gray-400 mb-1" />
              <p className="text-sm text-gray-500">파일을 드래그하거나 클릭하여 선택</p>
              {file && <p className="text-sm text-blue-600 mt-2">선택된 파일: {file.name}</p>}
            </div>
            {file && (
              <Button onClick={handleUpload} disabled={!file || status !== 'idle'} className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                계량기 사진으로 사용량 등록
              </Button>
            )}
          </div>
        );
    }
  };

  return (
    <>
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">가스 계량기 자동 인식</CardTitle>
        </CardHeader>
        <CardContent>{getStatusContent()}</CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>계량기 값 확인</DialogTitle>
            <DialogDescription>
              사진에서 다음과 같은 숫자를 인식했습니다. 이 값으로 설정할까요?
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 text-center text-3xl font-bold tracking-wider bg-gray-100 p-4 rounded-lg">
            {ocrResult}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              다시 시도
            </Button>
            <Button onClick={handleConfirm} disabled={ocrResult.includes('인식된 텍스트가 없습니다')}>
              이 값으로 설정
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
