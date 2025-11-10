"use client";

import { useTranslation } from "react-i18next";
import { useEditorStore } from "@/store/editorStore";

const FONTS = [
  "Inter",
  "Noto Sans KR",
  "IBM Plex Sans",
  "JetBrains Mono",
  "system-ui",
];

export default function TextOverlayPanel() {
  const { t } = useTranslation();
  const { text, setText } = useEditorStore();

  if (!text.enabled) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={false}
            onChange={(e) => setText({ enabled: e.target.checked })}
          />
          <span className="text-sm font-medium">{t("text_enable")}</span>
        </label>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">{t("text_title")}</h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={text.enabled}
            onChange={(e) => setText({ enabled: e.target.checked })}
          />
          <span className="text-sm">{t("text_use")}</span>
        </label>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-600 mb-1">{t("text_content")}</label>
          <input
            type="text"
            value={text.content}
            onChange={(e) => setText({ content: e.target.value })}
            className="w-full px-2 py-1 border rounded"
            placeholder={t("text_content_placeholder")}
          />
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">{t("text_font")}</label>
          <select
            value={text.font}
            onChange={(e) => setText({ font: e.target.value })}
            className="w-full px-2 py-1 border rounded"
          >
            {FONTS.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">{t("text_size")}</label>
            <input
              type="number"
              value={text.size}
              onChange={(e) =>
                setText({ size: parseInt(e.target.value) || 48 })
              }
              className="w-full px-2 py-1 border rounded"
              min="12"
              max="200"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">{t("text_weight")}</label>
            <select
              value={text.weight}
              onChange={(e) =>
                setText({ weight: parseInt(e.target.value) })
              }
              className="w-full px-2 py-1 border rounded"
            >
              <option value="300">{t("text_weight_light")}</option>
              <option value="400">{t("text_weight_regular")}</option>
              <option value="500">{t("text_weight_medium")}</option>
              <option value="600">{t("text_weight_semibold")}</option>
              <option value="700">{t("text_weight_bold")}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">
            {t("text_tracking", { tracking: text.tracking })}
          </label>
          <input
            type="range"
            min="-5"
            max="20"
            value={text.tracking}
            onChange={(e) =>
              setText({ tracking: parseInt(e.target.value) })
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">{t("text_color")}</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={text.color}
              onChange={(e) => setText({ color: e.target.value })}
              className="w-12 h-12 rounded border cursor-pointer"
            />
            <input
              type="text"
              value={text.color}
              onChange={(e) => setText({ color: e.target.value })}
              className="flex-1 px-2 py-1 border rounded"
              placeholder="#ffffff"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={text.shadow}
              onChange={(e) => setText({ shadow: e.target.checked })}
            />
            <span className="text-sm">{t("text_shadow")}</span>
          </label>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">{t("text_align")}</label>
          <div className="flex gap-2">
            {(["left", "center", "right"] as const).map((align) => (
              <button
                key={align}
                onClick={() => setText({ align })}
                className={`flex-1 px-2 py-1 rounded border ${
                  text.align === align
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {align === "left" ? t("text_align_left") : align === "center" ? t("text_align_center") : t("text_align_right")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

