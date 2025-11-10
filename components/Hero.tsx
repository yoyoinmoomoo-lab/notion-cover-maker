"use client";

import { useTranslation } from "react-i18next";

// Fallback translations for SSR
const fallbackTranslations = {
  en: {
    title: "Notion Cover Maker",
    subtitle: "Make your Notion cover perfectly fit — no Photoshop, no hassle.",
    subtitle2: "Upload, adjust, and download in seconds. Free, local, and ad-supported.",
    feature1: "Smart Fill — Fit, Crop, or Tile",
    feature2: "Custom Backgrounds",
    feature3: "Perfect Sizes",
    feature4: "Privacy-safe",
  },
  ko: {
    title: "노션 커버 메이커",
    subtitle: "노션 커버를 완벽하게 맞추세요 — 포토샵 필요 없음, 번거로움 없음.",
    subtitle2: "몇 초 만에 업로드, 조정, 다운로드. 무료, 로컬 처리, 광고 지원.",
    feature1: "스마트 배치 — 확대, 맞춤, 반복",
    feature2: "커스텀 배경",
    feature3: "완벽한 사이즈",
    feature4: "프라이버시 보호",
  },
};

export default function Hero() {
  const { t, i18n, ready } = useTranslation();
  
  // i18n이 준비되지 않았거나 서버 사이드에서는 fallback 사용
  const getTranslation = (key: string) => {
    if (typeof window === "undefined" || !ready || !i18n.isInitialized) {
      const lang = (typeof window !== "undefined" && localStorage.getItem("lang")) || "en";
      return fallbackTranslations[lang as "en" | "ko"]?.[key as keyof typeof fallbackTranslations.en] || key;
    }
    return t(key);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          {getTranslation("title")}
        </h1>
        <p className="text-xl text-gray-700 mb-2">
          {getTranslation("subtitle")}
        </p>
        <p className="text-lg text-gray-600 mb-8">
          {getTranslation("subtitle2")}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>🎨</span>
            <span>{getTranslation("feature1")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🌈</span>
            <span>{getTranslation("feature2")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🧭</span>
            <span>{getTranslation("feature3")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚡</span>
            <span>{getTranslation("feature4")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

