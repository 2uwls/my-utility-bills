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

    // 모바일 환경 체크
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    console.log(isMobile ? "📱 모바일 캡처 시작!" : "🚀 데스크톱 캡처 시작!");

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

      // 모바일 최적화 캡처
      const canvas = await captureForestCard(forestCard, isMobile);

      // 모바일/데스크톱에 맞는 공유 옵션 표시
      showShareModal(canvas, isMobile);

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

// 숲 카드 캡처 (모바일 최적화)
const captureForestCard = (element, isMobile = false) => {
  return new Promise((resolve, reject) => {
    const options = {
      scale: isMobile ? 1 : 2, // 모바일에서는 스케일 낮춤
      backgroundColor: "#ffffff",
      useCORS: isMobile ? false : true, // 모바일에서 CORS 문제 회피
      allowTaint: isMobile ? true : false, // 모바일에서 더 관대하게
      logging: isMobile, // 모바일에서만 로깅
      imageTimeout: isMobile ? 3000 : 5000, // 모바일에서 타임아웃 단축
      removeContainer: false,
      width: Math.min(element.offsetWidth, isMobile ? 400 : 800),
      height: Math.min(element.offsetHeight, isMobile ? 600 : 800),
      foreignObjectRendering: false, // 모바일 호환성
      ignoreElements: (el) => {
        return (
          el.classList?.contains("fixed") ||
          el.classList?.contains("z-50") ||
          (isMobile && el.tagName === "CANVAS") || // 모바일에서 3D 캔버스 제외
          el.style.display === "none"
        );
      },
    };

    window
      .html2canvas(element, options)
      .then(resolve)
      .catch((error) => {
        console.error("html2canvas 실패:", error);
        if (isMobile) {
          // 모바일에서 실패시 간단한 대안
          console.log("모바일 대안 방법 시도...");
          createFallbackCanvas(element).then(resolve).catch(reject);
        } else {
          reject(error);
        }
      });
  });
};

// 모바일용 대안 캔버스 생성
const createFallbackCanvas = (element) => {
  return new Promise((resolve) => {
    const rect = element.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = Math.min(rect.width, 400);
    canvas.height = Math.min(rect.height, 300);

    // 배경
    ctx.fillStyle = "#f0f8ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 간단한 숲 그래픽
    ctx.fillStyle = "#2d5a2d";
    ctx.font = "24px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("🌱 내 절약 숲", canvas.width / 2, canvas.height / 2 - 20);

    ctx.font = "16px system-ui";
    ctx.fillStyle = "#666";
    ctx.fillText("모바일에서 캡처됨", canvas.width / 2, canvas.height / 2 + 20);

    resolve(canvas);
  });
};

// 공유 모달 표시 (모바일 최적화)
const showShareModal = (canvas, isMobile = false) => {
  // 기존 모달 제거
  const existing = document.getElementById("forest-share-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "forest-share-modal";
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,${isMobile ? "0.8" : "0.5"});
    display: flex;
    align-items: ${isMobile ? "flex-end" : "center"};
    justify-content: center;
    z-index: 9999;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  `;

  const dataUrl = canvas.toDataURL("image/png", 0.85);

  modal.innerHTML = `
    <div style="
      background: white;
      border-radius: ${isMobile ? "20px 20px 0 0" : "20px"};
      padding: ${isMobile ? "24px" : "30px"};
      max-width: 400px;
      width: ${isMobile ? "100%" : "90%"};
      text-align: center;
      box-shadow: 0 ${isMobile ? "-10px 30px" : "20px 50px"} rgba(0,0,0,0.3);
    ">
      ${
        isMobile
          ? `<div style="width: 40px; height: 4px; background: #ddd; border-radius: 2px; margin: 0 auto 20px;"></div>`
          : ""
      }
      
      <h2 style="margin: 0 0 ${
        isMobile ? "16px" : "20px"
      } 0; color: #2d5a2d; font-size: ${
    isMobile ? "20px" : "24px"
  };">🌱 내 숲 공유하기</h2>
      
      <div style="
        width: ${isMobile ? "160px" : "200px"};
        height: ${isMobile ? "100px" : "120px"};
        margin: 0 auto 20px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        background: url(${dataUrl}) center/cover;
      "></div>
      
      <div style="display: ${isMobile ? "grid" : "grid"}; ${
    isMobile ? "gap: 12px" : "grid-template-columns: 1fr 1fr; gap: 10px"
  }; margin-bottom: 20px;">
        ${
          isMobile
            ? `
        <button id="share-native" style="${mobileButtonStyle("#007AFF")}">
          📱 앱으로 공유하기
        </button>
        `
            : `
        <button id="share-native" style="${shareButtonStyle(
          "#eeeeee",
          "#000000"
        )}">
          공유하기
        </button>
        `
        }
        <button id="share-download" style="${
          isMobile
            ? mobileButtonStyle("#34C759")
            : shareButtonStyle("#40C79E", "#ffffff")
        }">
          ${isMobile ? "사진 저장" : "다운로드"}
        </button>
        <button id="share-copy" style="${
          isMobile
            ? mobileButtonStyle("#FF9500")
            : shareButtonStyle("#eeeeee", "#000000")
        }">
          ${isMobile ? "사진 복사" : "사진 복사"}
        </button>
        ${
          !isMobile
            ? `
        <button id="share-twitter" style="${shareButtonStyle(
          "#eeeeee",
          "#000000"
        )}">
          Twitter에 공유
        </button>
        `
            : ""
        }
      </div>
      
      ${
        isMobile
          ? `
      <p style="font-size: 14px; color: #666; margin: 0 0 16px 0;">
        "내 절약 숲을 확인해보세요! 🌱✨<br>
        #절약챌린지 #친환경 #절약숲"
      </p>
      `
          : ""
      }
      
      <button id="share-close" style="
        background: #f5f5f5;
        border: none;
        padding: ${isMobile ? "12px 24px" : "10px 20px"};
        border-radius: ${isMobile ? "20px" : "25px"};
        cursor: pointer;
        font-size: ${isMobile ? "16px" : "14px"};
        color: #666;
        ${isMobile ? "width: 100%;" : ""}
      ">닫기</button>
    </div>
  `;

  document.body.appendChild(modal);

  // 이벤트 리스너 - 안전한 방식으로 추가

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

  // 네이티브 공유 버튼 (모바일 최적화)
  const nativeBtn = modal.querySelector("#share-native");
  if (nativeBtn) {
    nativeBtn.onclick = async () => {
      const shareText =
        "내 절약 숲을 확인해보세요! 🌱✨ #절약챌린지 #친환경 #절약숲";

      if (navigator.share) {
        try {
          canvas.toBlob(async (blob) => {
            const file = new File([blob], "my-forest.png", {
              type: "image/png",
            });

            // 파일 공유 지원 여부 확인
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              await navigator.share({
                title: "내 절약 숲 🌱",
                text: shareText,
                files: [file],
              });
            } else {
              // 파일 공유 안 되면 텍스트만
              await navigator.share({
                title: "내 절약 숲 🌱",
                text: shareText,
                url: window.location.href,
              });

              // 이미지는 별도 저장
              if (isMobile) {
                saveImageMobile(dataUrl);
                setTimeout(() => {
                  alert(
                    "📱 이미지가 저장되었어요! 갤러리에서 확인하고 함께 공유해보세요!"
                  );
                }, 500);
              }
            }
            modal.remove();
          });
        } catch (e) {
          console.log("공유 취소 또는 실패");
        }
      } else {
        alert(
          isMobile
            ? "공유 기능을 사용할 수 없습니다. 사진 저장을 이용해주세요!"
            : "이 브라우저는 공유 기능을 지원하지 않습니다"
        );
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

// 모바일용 버튼 스타일
function mobileButtonStyle(bgColor) {
  return `
    background-color: ${bgColor};
    color: white;
    border: none;
    border-radius: 12px;
    padding: 16px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  `;
}

// 모바일 이미지 저장
const saveImageMobile = (dataUrl) => {
  try {
    const link = document.createElement("a");
    link.download = `my-forest-${Date.now()}.png`;
    link.href = dataUrl;

    // iOS Safari 대응
    if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
      // iOS에서는 새 창으로 열어서 길게 누르기로 저장하도록 안내
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <body style="margin:0; text-align:center; background:#000;">
              <img src="${dataUrl}" style="max-width:100%; height:auto;">
              <p style="color:white; padding:20px;">이미지를 길게 누르고 '사진에 저장'을 선택하세요</p>
            </body>
          </html>
        `);
      }
    } else {
      // Android나 데스크톱에서는 직접 다운로드
      link.click();
    }

    console.log("💾 모바일 이미지 저장 완료!");
  } catch (e) {
    console.error("모바일 이미지 저장 실패:", e);
  }
};
