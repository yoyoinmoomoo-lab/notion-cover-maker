"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

// Fallback translations for SSR
const fallbackTranslations = {
  en: {
    title: "Notion Cover Maker",
    nav_about: "About",
    nav_privacy: "Privacy",
    nav_terms: "Terms",
  },
  ko: {
    title: "노션 커버 메이커",
    nav_about: "소개",
    nav_privacy: "개인정보처리방침",
    nav_terms: "이용약관",
  },
};

export default function Navigation() {
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
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            {getTranslation("title")}
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {getTranslation("nav_about")}
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {getTranslation("nav_privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {getTranslation("nav_terms")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}

