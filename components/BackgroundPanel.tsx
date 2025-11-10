"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useEditorStore } from "@/store/editorStore";
import { extractDominantColors, getBrightestAndDarkest } from "@/utils/colorExtractor";
import type { Background } from "@/types";

export default function BackgroundPanel() {
  const { t } = useTranslation();
  const { background, setBackground, image } = useEditorStore();
  const [suggestedGradient, setSuggestedGradient] = useState<{
    color1: string;
    color2: string;
  } | null>(null);

  useEffect(() => {
    if (image?.bitmap && background.type === "gradient") {
      extractDominantColors(image.bitmap).then((colors) => {
        if (colors.length >= 2) {
          const { brightest, darkest } = getBrightestAndDarkest(colors);
          setSuggestedGradient({ color1: brightest, color2: darkest });
        }
      });
    }
  }, [image, background.type]);

  const handleSolidColor = (color: string) => {
    setBackground({ type: "solid", color });
  };

  const handleGradient = (color1: string, color2: string, angle: number) => {
    setBackground({ type: "gradient", color1, color2, angle });
  };

  const handleAutoGradient = () => {
    if (suggestedGradient) {
      handleGradient(
        suggestedGradient.color1,
        suggestedGradient.color2,
        90
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">{t("background_title")}</h2>

      <div className="space-y-4">
        {/* 단색 */}
        <div>
          <label className="block text-sm font-medium mb-2">{t("background_solid")}</label>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              checked={background.type === "solid"}
              onChange={() => handleSolidColor("#ffffff")}
              className="mr-2"
            />
            <input
              type="color"
              value={background.type === "solid" ? background.color : "#ffffff"}
              onChange={(e) => handleSolidColor(e.target.value)}
              className="w-12 h-12 rounded border"
            />
            <input
              type="text"
              value={background.type === "solid" ? background.color : "#ffffff"}
              onChange={(e) => handleSolidColor(e.target.value)}
              className="flex-1 px-2 py-1 border rounded"
              placeholder="#ffffff"
            />
          </div>
        </div>

        {/* 그라데이션 */}
        <div>
          <label className="block text-sm font-medium mb-2">{t("background_gradient")}</label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                checked={background.type === "gradient"}
                onChange={() => {
                  if (suggestedGradient) {
                    handleGradient(
                      suggestedGradient.color1,
                      suggestedGradient.color2,
                      90
                    );
                  } else {
                    handleGradient("#ffffff", "#000000", 90);
                  }
                }}
                className="mr-2"
              />
              <span className="text-sm">{t("background_gradient_use")}</span>
            </div>

            {background.type === "gradient" && (
              <>
                {suggestedGradient && (
                  <button
                    onClick={handleAutoGradient}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {t("background_gradient_auto")}
                  </button>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-600">{t("background_gradient_start")}</label>
                    <input
                      type="color"
                      value={background.color1}
                      onChange={(e) =>
                        handleGradient(
                          e.target.value,
                          background.color2,
                          background.angle
                        )
                      }
                      className="w-full h-10 rounded border"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">{t("background_gradient_end")}</label>
                    <input
                      type="color"
                      value={background.color2}
                      onChange={(e) =>
                        handleGradient(
                          background.color1,
                          e.target.value,
                          background.angle
                        )
                      }
                      className="w-full h-10 rounded border"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-600">{t("background_gradient_angle")}</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={background.angle}
                    onChange={(e) =>
                      handleGradient(
                        background.color1,
                        background.color2,
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 text-center">
                    {background.angle}°
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 블러 확장 (옵션) */}
        <div>
          <label className="block text-sm font-medium mb-2">{t("background_blur")}</label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                checked={background.type === "blur"}
                onChange={() => {
                  setBackground({ type: "blur", radius: 20, scale: 1.5 });
                }}
                className="mr-2"
              />
              <span className="text-sm">{t("background_blur_use")}</span>
            </div>

            {background.type === "blur" && (
              <>
                <div>
                  <label className="text-xs text-gray-600">
                    {t("background_blur_radius", { radius: background.radius })}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={background.radius}
                    onChange={(e) =>
                      setBackground({
                        ...background,
                        radius: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">
                    {t("background_blur_scale", { scale: background.scale.toFixed(1) })}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={background.scale}
                    onChange={(e) =>
                      setBackground({
                        ...background,
                        scale: parseFloat(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

