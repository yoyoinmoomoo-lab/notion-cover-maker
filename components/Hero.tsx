"use client";

import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          {t("title")}
        </h1>
        <p className="text-xl text-gray-700 mb-2">
          {t("subtitle")}
        </p>
        <p className="text-lg text-gray-600 mb-8">
          {t("subtitle2")}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>🎨</span>
            <span>{t("feature1")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🌈</span>
            <span>{t("feature2")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🧭</span>
            <span>{t("feature3")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚡</span>
            <span>{t("feature4")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

