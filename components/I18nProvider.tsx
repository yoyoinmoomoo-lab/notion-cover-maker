"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 i18n 초기화
    if (typeof window === "undefined") {
      return;
    }

    // 이미 초기화되었으면 스킵
    if (i18n.isInitialized) {
      setIsInitialized(true);
      return;
    }

    const initI18n = async () => {
      try {
        const lng = localStorage.getItem("lang") || "en";
        
        // 타임아웃 설정 (5초)
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("i18n initialization timeout")), 5000)
        );

        const fetchPromise = Promise.all([
          fetch("/locales/en/common.json").then(res => res.json()),
          fetch("/locales/ko/common.json").then(res => res.json()),
        ]);

        const [enTranslations, koTranslations] = await Promise.race([
          fetchPromise,
          timeoutPromise,
        ]) as [any, any];

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

        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize i18n:", error);
        // 실패해도 기본 리소스로 초기화
        try {
          await i18n.init({
            resources: {
              en: { translation: {} },
              ko: { translation: {} },
            },
            lng: "en",
            fallbackLng: "en",
            interpolation: { escapeValue: false },
          });
          setIsInitialized(true);
        } catch (fallbackError) {
          console.error("Fallback i18n initialization failed:", fallbackError);
        }
      }
    };

    initI18n();
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

