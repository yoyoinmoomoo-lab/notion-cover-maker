"use client";

import { useState, useRef, useEffect } from "react";
import { useEditorStore } from "@/store/editorStore";

interface DownloadButtonProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const AD_DURATION = 5; // 5초 광고 카운트다운

export default function DownloadButton({ canvasRef }: DownloadButtonProps) {
  const { output, mode, setOutput } = useEditorStore();
  const [showAdGate, setShowAdGate] = useState(false);
  const [countdown, setCountdown] = useState(AD_DURATION);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showAdGate && countdown > 0) {
      countdownRef.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (showAdGate && countdown === 0) {
      handleDownload();
      setShowAdGate(false);
      setCountdown(AD_DURATION);
    }

    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
      }
    };
  }, [showAdGate, countdown]);

  const handleDownloadClick = () => {
    setShowAdGate(true);
    setCountdown(AD_DURATION);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `notion-cover_${mode}_${output.width}x${output.height}.${output.format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      output.format === "png" ? "image/png" : "image/jpeg",
      output.format === "jpeg" ? output.quality : undefined
    );
  };

  const handleSkip = () => {
    if (countdownRef.current) {
      clearTimeout(countdownRef.current);
    }
    setShowAdGate(false);
    setCountdown(AD_DURATION);
    handleDownload();
  };

  if (showAdGate) {
    return (
      <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-yellow-800 mb-2">
            {countdown}초
          </div>
          <p className="text-sm text-gray-700">
            광고를 시청해주세요. 다운로드가 곧 시작됩니다.
          </p>
        </div>

        {/* 광고 슬롯 (실제 AdSense 코드로 교체) */}
        <div className="bg-gray-200 rounded p-8 text-center text-gray-500 mb-4 min-h-[250px] flex items-center justify-center">
          <div>
            <div className="text-sm mb-2">광고 영역</div>
            <div className="text-xs">
              (AdSense 광고 단위가 여기에 표시됩니다)
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            건너뛰기
          </button>
          <button
            onClick={() => {
              setCountdown(0);
            }}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            바로 다운로드
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2">
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setOutput({ format: "png" })}
          className={`flex-1 px-3 py-2 rounded border transition-colors ${
            output.format === "png"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white border-gray-300"
          }`}
        >
          PNG
        </button>
        <button
          onClick={() => setOutput({ format: "jpeg" })}
          className={`flex-1 px-3 py-2 rounded border transition-colors ${
            output.format === "jpeg"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white border-gray-300"
          }`}
        >
          JPEG
        </button>
      </div>
      {output.format === "jpeg" && (
        <div className="mb-2">
          <label className="block text-xs text-gray-600 mb-1">
            품질: {Math.round(output.quality * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={output.quality}
            onChange={(e) =>
              setOutput({ quality: parseFloat(e.target.value) })
            }
            className="w-full"
          />
        </div>
      )}
      <button
        onClick={handleDownloadClick}
        className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
      >
        다운로드 ({output.format.toUpperCase()})
      </button>
      <p className="text-xs text-gray-500 text-center">
        다운로드 전 짧은 광고가 표시됩니다
      </p>
    </div>
  );
}

