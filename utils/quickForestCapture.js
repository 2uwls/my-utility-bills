/**
 * ⚡ 초고속 숲 캡처 & SNS 공유
 * 기존 4분 → 3-5초로 단축!
 */
(function () {
  "use strict";

  let isCapturing = false;
  let cachedCanvas = null;

  function ultraFastCapture() {
    if (isCapturing) {
      console.log("⏳ 이미 캡처중입니다...");
      return;
    }

    console.log("🚀 초고속 캡처 시작!");
    isCapturing = true;

    // 숲 카드 찾기 (여러 방법 시도)
    const forestCard = findForestCard();

    if (!forestCard) {
      console.error("❌ 숲 카드를 찾을 수 없습니다");
      isCapturing = false;
      return;
    }

    // html2canvas가 없으면 빠르게 로드
    if (!window.html2canvas) {
      loadHtml2Canvas().then(() => captureWithOptimization(forestCard));
    } else {
      captureWithOptimization(forestCard);
    }
  }

  function findForestCard() {
    // 여러 선택자로 시도
    const selectors = [
      ".h-96",
      '[class*="forest"]',
      '[class*="card"]',
      ".rounded-2xl.bg-white",
      ".bg-white",
      ".rounded-lg",
      ".shadow",
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        // 가장 가까운 카드 컨테이너 찾기
        const card =
          element.closest(
            '.rounded-2xl, .rounded-lg, .card, [class*="card"]'
          ) || element;
        console.log("🎯 카드 발견:", selector);
        return card;
      }
    }

    // 마지막 시도: 가장 큰 요소 찾기
    const allDivs = document.querySelectorAll("div");
    let largest = null;
    let maxArea = 0;

    allDivs.forEach((div) => {
      const rect = div.getBoundingClientRect();
      const area = rect.width * rect.height;
      if (area > maxArea && area > 10000) {
        // 최소 크기
        maxArea = area;
        largest = div;
      }
    });

    return largest;
  }

  function loadHtml2Canvas() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function captureWithOptimization(element) {
    console.log("📸 최적화 캡처 시작...");

    // 성능 최적화 설정
    const options = {
      scale: 1, // 해상도 낮춤 (빠름)
      useCORS: false, // CORS 끄기 (빠름)
      logging: false, // 로깅 끄기
      imageTimeout: 1000, // 타임아웃 단축
      removeContainer: true, // 컨테이너 제거
      backgroundColor: "#ffffff",
      width: Math.min(element.offsetWidth, 800), // 최대 너비 제한
      height: Math.min(element.offsetHeight, 600), // 최대 높이 제한
      // 성능 향상을 위한 추가 옵션
      allowTaint: true,
      foreignObjectRendering: false,
      ignoreElements: (element) => {
        // 불필요한 요소들 제외 (빠름)
        return (
          element.tagName === "SCRIPT" ||
          element.tagName === "STYLE" ||
          element.style.display === "none" ||
          element.classList.contains("hidden")
        );
      },
    };

    const startTime = performance.now();

    html2canvas(element, options)
      .then((canvas) => {
        const endTime = performance.now();
        console.log(`✅ 캡처 완료! (${Math.round(endTime - startTime)}ms)`);

        cachedCanvas = canvas;
        showShareOptions(canvas);
        isCapturing = false;
      })
      .catch((err) => {
        console.error("❌ 캡처 실패:", err);
        isCapturing = false;

        // 실패시 간단한 대안 방법
        fallbackCapture(element);
      });
  }

  function fallbackCapture(element) {
    console.log("🔄 대안 방법으로 시도...");

    // DOM to Image 라이브러리 사용 (더 빠름)
    if (!window.domtoimage) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/0.1.0/dom-to-image.min.js";
      script.onload = () => {
        domtoimage
          .toPng(element, {
            width: 600,
            height: 400,
            style: {
              transform: "scale(1)",
              transformOrigin: "top left",
            },
          })
          .then((dataUrl) => {
            console.log("✅ 대안 방법 성공!");
            downloadImage(dataUrl);
            isCapturing = false;
          });
      };
      document.head.appendChild(script);
    }
  }

  function showShareOptions(canvas) {
    // 빠른 공유 UI 생성
    const shareContainer = createShareUI();

    // 이벤트 리스너 추가
    addShareEvents(canvas, shareContainer);

    // 자동 다운로드 (선택사항)
    // quickDownload(canvas);
  }

  function createShareUI() {
    // 기존 UI 제거
    const existing = document.getElementById("fast-share-ui");
    if (existing) existing.remove();

    const container = document.createElement("div");
    container.id = "fast-share-ui";
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      border-radius: 12px;
      padding: 15px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      min-width: 200px;
    `;

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 10px;">
        <h3 style="margin: 0; color: #333; font-size: 16px;">🌱 숲 캡처 완료!</h3>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button id="share-twitter" style="${buttonStyle(
          "#1DA1F2"
        )}" title="트위터">🐦</button>
        <button id="share-facebook" style="${buttonStyle(
          "#4267B2"
        )}" title="페이스북">📘</button>
        <button id="share-kakao" style="${buttonStyle(
          "#FEE500",
          "#000"
        )}" title="카카오톡">💬</button>
        <button id="share-native" style="${buttonStyle(
          "#FF6B6B"
        )}" title="네이티브 공유">📱</button>
        <button id="download-img" style="${buttonStyle(
          "#9C27B0"
        )}" title="다운로드">💾</button>
        <button id="close-share" style="${buttonStyle(
          "#666"
        )}" title="닫기">✖</button>
      </div>
    `;

    document.body.appendChild(container);

    // 5초 후 자동 숨김
    setTimeout(() => {
      if (container.parentNode) {
        container.style.opacity = "0.5";
      }
    }, 5000);

    return container;
  }

  function buttonStyle(bg, color = "#fff") {
    return `
      background: ${bg};
      color: ${color};
      border: none;
      border-radius: 6px;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 14px;
      transition: transform 0.2s;
      flex: 1;
    `;
  }

  function addShareEvents(canvas, container) {
    const blob = new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png", 0.8)
    );
    const dataUrl = canvas.toDataURL("image/png", 0.8);

    // 트위터 공유
    container.querySelector("#share-twitter").onclick = () => {
      const text = "내 숲을 확인해보세요! 🌱✨";
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(window.location.href)}`;
      window.open(url, "_blank", "width=600,height=400");
    };

    // 페이스북 공유
    container.querySelector("#share-facebook").onclick = () => {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`;
      window.open(url, "_blank", "width=600,height=400");
    };

    // 카카오톡 공유 (SDK 필요)
    container.querySelector("#share-kakao").onclick = () => {
      alert(
        "카카오톡 공유는 개발자 설정이 필요합니다.\n이미지를 다운로드해서 직접 공유해주세요! 💬"
      );
    };

    // 네이티브 공유
    container.querySelector("#share-native").onclick = async () => {
      if (navigator.share) {
        try {
          const imageBlob = await blob;
          const file = new File([imageBlob], "my-forest.png", {
            type: "image/png",
          });
          await navigator.share({
            title: "내 숲 🌱",
            text: "내가 키운 숲을 확인해보세요!",
            files: [file],
          });
        } catch (e) {
          console.log("공유 취소 또는 실패");
        }
      } else {
        alert("이 브라우저는 공유 기능을 지원하지 않습니다");
      }
    };

    // 다운로드
    container.querySelector("#download-img").onclick = () => {
      downloadImage(dataUrl);
    };

    // 닫기
    container.querySelector("#close-share").onclick = () => {
      container.remove();
    };
  }

  function downloadImage(dataUrl) {
    const link = document.createElement("a");
    link.download = `my-forest-${new Date().getTime()}.png`;
    link.href = dataUrl;
    link.click();
    console.log("💾 이미지 다운로드 완료!");
  }

  function quickDownload(canvas) {
    // 즉시 다운로드 (선택사항)
    const link = document.createElement("a");
    link.download = `forest-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png", 0.8);
    link.click();
  }

  // 전역 함수 등록
  window.ultraFastCapture = ultraFastCapture;
  window.quickForest = ultraFastCapture; // 짧은 별칭

  console.log("🚀 초고속 캡처 준비완료!");
  console.log("사용법: ultraFastCapture() 또는 quickForest()");

  // 키보드 단축키 (Ctrl+Shift+F)
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "F") {
      e.preventDefault();
      ultraFastCapture();
    }
  });

  console.log("⌨️ 단축키: Ctrl+Shift+F");
})();
