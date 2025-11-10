"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  useEffect(() => {
    // localStorage에서 언어 가져오기
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "ko") {
      if (stored !== currentLang) {
        i18n.changeLanguage(stored);
        setCurrentLang(stored);
      }
    }
  }, []);

  const changeLang = (newLang: "en" | "ko") => {
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        className={currentLang === "en" ? "font-bold underline" : "text-gray-600 hover:text-gray-900"}
        onClick={() => changeLang("en")}
      >
        EN
      </button>
      <span className="text-gray-400">|</span>
      <button
        className={currentLang === "ko" ? "font-bold underline" : "text-gray-600 hover:text-gray-900"}
        onClick={() => changeLang("ko")}
      >
        KR
      </button>
    </div>
  );
}

