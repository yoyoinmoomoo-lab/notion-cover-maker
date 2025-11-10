"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 클라이언트 사이드에서만 i18n 초기화
    if (typeof window !== "undefined" && !i18n.isInitialized) {
      const initI18n = async () => {
        const lng = localStorage.getItem("lang") || "en";
        
        try {
          const enRes = await fetch("/locales/en/common.json");
          const koRes = await fetch("/locales/ko/common.json");
          const enTranslations = await enRes.json();
          const koTranslations = await koRes.json();

          await i18n.init({
            resources: {
              en: { translation: enTranslations },
              ko: { translation: koTranslations },
            },
            lng,
            fallbackLng: "en",
            interpolation: { escapeValue: false },
          });

          i18n.on("languageChanged", (lng) => {
            localStorage.setItem("lang", lng);
          });
        } catch (error) {
          console.error("Failed to initialize i18n:", error);
        }
      };

      initI18n();
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

