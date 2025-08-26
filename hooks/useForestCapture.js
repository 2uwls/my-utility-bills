import { useCallback, useState } from "react";

/**
 * 숲 이미지 빠른 캡처 & SNS 공유 Hook
 */
export const useForestCapture = () => {
  const [isCapturing, setIsCapturing] = useState(false);

  const captureAndShare = useCallback(async () => {
    if (isCapturing) {
      console.log("⏳ 이미 캡처 중입니다...");
      return;
    }

    setIsCapturing(true);
    console.log("🚀 숲 캡처 시작!");

    try {
      // html2canvas 동적 로드
      if (!window.html2canvas) {
        await loadHtml2Canvas();
      }

      // 숲 카드 찾기
      const forestCard = findForestCard();
      if (!forestCard) {
        throw new Error("숲 카드를 찾을 수 없습니다");
      }

      // 빠른 캡처
      const canvas = await captureForestCard(forestCard);

      // 공유 옵션 표시
      showShareModal(canvas);

      console.log("✅ 캡처 완료!");
    } catch (error) {
      console.error("❌ 캡처 실패:", error);
      console.log("에러 상세:", error.message);

      // 에러 타입에 따른 처리
      if (error.message === "숲 카드를 찾을 수 없습니다") {
        alert(
          "숲 영역을 찾을 수 없습니다. 페이지를 새로고침 후 다시 시도해주세요."
        );
      } else if (error.message.includes("html2canvas")) {
        alert(
          "이미지 라이브러리 로드 실패. 인터넷 연결을 확인하고 다시 시도해주세요."
        );
      } else {
        // 에러가 있어도 일단 시도해보기
        console.log("에러 무시하고 계속 진행...");

        // 간단한 방법으로 다시 시도
        try {
          const simpleCard =
            document.querySelector(".rounded-2xl.bg-white") ||
            document.querySelector(".h-96") ||
            document.body;
          console.log("대안 요소로 캡처 시도:", simpleCard);

          if (window.html2canvas) {
            const canvas = await window.html2canvas(simpleCard, {
              scale: 1,
              backgroundColor: "#ffffff",
              logging: true,
            });
            showShareModal(canvas);
            console.log("✅ 대안 방법으로 캡처 성공!");
          } else {
            alert("이미지 캡처 라이브러리를 불러오지 못했습니다.");
          }
        } catch (fallbackError) {
          console.error("대안 방법도 실패:", fallbackError);
          alert(`캡처 실패: ${error.message || "알 수 없는 오류"}`);
        }
      }
    } finally {
      setIsCapturing(false);
    }
  }, [isCapturing]);

  return {
    captureAndShare,
    isCapturing,
  };
};

// html2canvas 라이브러리 로드
const loadHtml2Canvas = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// 숲 카드 찾기
const findForestCard = () => {
  // 3D 숲이 있는 카드 찾기 (h-96 클래스를 가진 요소의 부모 카드)
  const forestContainer = document.querySelector(".h-96.overflow-hidden");
  if (forestContainer) {
    return (
      forestContainer.closest(".rounded-2xl.bg-white.overflow-hidden") ||
      forestContainer.parentElement
    );
  }

  // 대안: 전체 숲 섹션
  const allCards = document.querySelectorAll(".rounded-2xl.bg-white");
  for (let card of allCards) {
    if (card.querySelector(".h-96")) {
      return card;
    }
  }

  return null;
};

// 숲 카드 캡처
const captureForestCard = (element) => {
  return new Promise((resolve, reject) => {
    window
      .html2canvas(element, {
        scale: 2, // SNS용 고해상도
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: false,
        logging: false,
        imageTimeout: 5000,
        removeContainer: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
        ignoreElements: (el) => {
          return (
            el.classList?.contains("fixed") || el.classList?.contains("z-50")
          );
        },
      })
      .then(resolve)
      .catch(reject);
  });
};

// 공유 모달 표시
const showShareModal = (canvas) => {
  // 기존 모달 제거
  const existing = document.getElementById("forest-share-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "forest-share-modal";
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  `;

  modal.innerHTML = `
    <div style="
      background: white;
      border-radius: 20px;
      padding: 30px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    ">
      <h2 style="margin: 0 0 20px 0; color: #2d5a2d; font-size: 24px;">🌱 내 숲 공유하기</h2>
      
      <div style="
        width: 200px;
        height: 120px;
        margin: 0 auto 20px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        background: url(${canvas.toDataURL("image/png")}) center/cover;
      "></div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
        <button id="share-download" style="${shareButtonStyle(
          "#40C79E",
          "#ffffff"
        )}">
          <FileDown /> 다운로드
        </button>
        <button id="share-copy" style="${shareButtonStyle(
          "#eeeeee",
          "#000000"
        )}">
          사진 복사
        </button>
        <button id="share-native" style="${shareButtonStyle(
          "#eeeeee",
          "#000000"
        )}">
          공유하기
        </button>
        <button id="share-twitter" style="${shareButtonStyle(
          "#eeeeee",
          "#000000"
        )}">
          Twitter에 공유하기
        </button>
      </div>
      
      <button id="share-close" style="
        background: #f5f5f5;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        color: #666;
      ">닫기</button>
    </div>
  `;

  document.body.appendChild(modal);

  // 이벤트 리스너 - 안전한 방식으로 추가
  const dataUrl = canvas.toDataURL("image/png", 0.9);

  // 다운로드 버튼
  const downloadBtn = modal.querySelector("#share-download");
  if (downloadBtn) {
    downloadBtn.onclick = () => {
      const link = document.createElement("a");
      link.download = `my-forest-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      modal.remove();
    };
  }

  // 복사 버튼
  const copyBtn = modal.querySelector("#share-copy");
  if (copyBtn) {
    copyBtn.onclick = async () => {
      try {
        canvas.toBlob(async (blob) => {
          if (navigator.clipboard && window.ClipboardItem) {
            const item = new ClipboardItem({ "image/png": blob });
            await navigator.clipboard.write([item]);
            alert(
              "📋 사진이 복사되었어요!\n\nSNS에서 Ctrl+V (또는 ⌘+V)로 붙여넣기 하세요! 🎉"
            );
          } else {
            // 클립보드 API 지원하지 않는 경우 다운로드
            const link = document.createElement("a");
            link.download = `my-forest-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
            alert(
              "📋 클립보드 복사가 지원되지 않아 다운로드했어요!\n이미지를 직접 SNS에 업로드해주세요."
            );
          }
        });
      } catch (err) {
        console.error("클립보드 복사 실패:", err);
        // 실패시 다운로드로 대체
        const link = document.createElement("a");
        link.download = `my-forest-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        alert("📋 클립보드 복사 실패로 다운로드했어요!");
      }
    };
  }

  // 네이티브 공유 버튼
  const nativeBtn = modal.querySelector("#share-native");
  if (nativeBtn) {
    nativeBtn.onclick = async () => {
      if (navigator.share) {
        try {
          canvas.toBlob(async (blob) => {
            const file = new File([blob], "my-forest.png", {
              type: "image/png",
            });
            await navigator.share({
              title: "내 절약 숲 🌱",
              text: "나만의 절약 숲을 확인해보세요!",
              files: [file],
            });
          });
        } catch (e) {
          console.log("공유 취소");
        }
      } else {
        alert("이 브라우저는 공유 기능을 지원하지 않습니다");
      }
    };
  }

  // 트위터 버튼
  const twitterBtn = modal.querySelector("#share-twitter");
  if (twitterBtn) {
    twitterBtn.onclick = () => {
      const text =
        "내 절약 숲을 확인해보세요! 🌱✨ #내공과금 #공과금절약 #절약숲";
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(window.location.href)}`;
      window.open(url, "_blank", "width=600,height=400");
    };
  }

  // 닫기 버튼
  const closeBtn = modal.querySelector("#share-close");
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.remove();
    };
  }

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  };
};

function shareButtonStyle(bgColor, textColor = "#000000") {
  return `
    background-color: ${bgColor};
    color: ${textColor};
    border: none;
    border-radius: 12px;
    padding: 12px;
    font-size: 16px;
    font-weight: light;
    cursor: pointer;
    transition: 0.2s;
  `;
}
