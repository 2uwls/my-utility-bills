
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { imageData } = await req.json();

    const CLOVA_OCR_API_URL = process.env.CLOVA_OCR_API_URL;
    const CLOVA_OCR_SECRET_KEY = process.env.CLOVA_OCR_SECRET_KEY;

    if (!CLOVA_OCR_API_URL || !CLOVA_OCR_SECRET_KEY) {
      return NextResponse.json(
        { error: '서버 설정 오류: Clova OCR API URL 또는 Secret Key가 없습니다.' },
        { status: 500 }
      );
    }

    const response = await fetch(CLOVA_OCR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OCR-SECRET': CLOVA_OCR_SECRET_KEY,
      },
      body: JSON.stringify({
        images: [
          {
            format: 'png', // 이미지 형식에 맞게 'jpg', 'jpeg' 등으로 변경 가능
            name: 'image',
            data: imageData,
          },
        ],
        lang: 'ko',
        requestId: 'my-unique-request', // 고유한 요청 ID
            timestamp: Date.now(), // 현재 시간을 밀리초 단위로 추가
            resultType: 'text', // 또는 'json' 등 결과 타입 설정
            version: 'V2',
          }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Clova OCR API 에러:', errorData);
      return NextResponse.json(
        { error: 'Clova OCR 처리 실패', details: errorData },
        { status: response.status }
      );
    }

    const ocrResult = await response.json();
    return NextResponse.json(ocrResult);

  } catch (error) {
    console.error('Clova OCR API Route 에러:', error);
    return NextResponse.json({ error: '내부 서버 오류 발생' }, { status: 500 });
  }
}
