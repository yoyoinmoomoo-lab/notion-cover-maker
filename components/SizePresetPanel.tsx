"use client";

import { useTranslation } from "react-i18next";
import { useEditorStore } from "@/store/editorStore";

export default function SizePresetPanel() {
  const { t } = useTranslation();
  const { output, setOutput, showSafeZone, setShowSafeZone } = useEditorStore();

  const PRESETS = [
    { name: t("size_desktop"), width: 1500, height: 600 },
    { name: t("size_tablet"), width: 1170, height: 290 },
    { name: t("size_mobile"), width: 1170, height: 445 },
  ];

  const handlePreset = (width: number, height: number) => {
    setOutput({ width, height });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">{t("size_title")}</h2>

      <div className="space-y-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handlePreset(preset.width, preset.height)}
            className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
              output.width === preset.width && output.height === preset.height
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-medium">{preset.name}</div>
            <div className="text-sm text-gray-600">
              {preset.width} × {preset.height}
            </div>
          </button>
        ))}

        <div className="pt-2 border-t">
          <div className="text-sm font-medium mb-2">{t("size_custom")}</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-600">{t("size_width")}</label>
              <input
                type="number"
                value={output.width}
                onChange={(e) => {
                  const width = parseInt(e.target.value) || 1500;
                  // 5:2 비율 자동 유도 (선택사항 - 높이가 기본값일 때만)
                  if (output.height === 600 || output.height === 1200) {
                    const height = Math.round(width * (2 / 5));
                    setOutput({ width, height });
                  } else {
                    setOutput({ width });
                  }
                }}
                className="w-full px-2 py-1 border rounded"
                placeholder="1500"
                min="100"
                max="10000"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">{t("size_height")}</label>
              <input
                type="number"
                value={output.height}
                onChange={(e) => {
                  const height = parseInt(e.target.value) || 600;
                  // 5:2 비율 자동 유도 (선택사항 - 폭이 기본값일 때만)
                  if (output.width === 1500 || output.width === 3000) {
                    const width = Math.round(height * (5 / 2));
                    setOutput({ width, height });
                  } else {
                    setOutput({ height });
                  }
                }}
                className="w-full px-2 py-1 border rounded"
                placeholder="600"
                min="100"
                max="10000"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showSafeZone}
              onChange={(e) => setShowSafeZone(e.target.checked)}
            />
            <span className="text-sm">{t("size_safe_zone")}</span>
          </label>
        </div>

        <div className="pt-4 border-t">
          <div className="text-xs text-gray-500 space-y-1">
            <div>{t("size_ratio_hint")}</div>
            <div>{t("size_dpi_hint")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

