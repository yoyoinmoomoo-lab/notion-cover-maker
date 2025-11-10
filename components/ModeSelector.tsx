"use client";

import { useTranslation } from "react-i18next";
import { useEditorStore } from "@/store/editorStore";
import type { Mode } from "@/types";

export default function ModeSelector() {
  const { t } = useTranslation();
  const { mode, setMode } = useEditorStore();

  const modes: { value: Mode; label: string; descKey: string }[] = [
    {
      value: "fill",
      label: t("mode_fill"),
      descKey: "mode_fill_desc",
    },
    {
      value: "fit",
      label: t("mode_fit"),
      descKey: "mode_fit_desc",
    },
    {
      value: "tile",
      label: t("mode_tile"),
      descKey: "mode_tile_desc",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">{t("mode_title")}</h2>
      <div className="space-y-2">
        {modes.map((m) => (
          <button
            key={m.value}
            onClick={() => setMode(m.value)}
            className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
              mode === m.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-medium">{m.label}</div>
            <div className="text-sm text-gray-600">{t(m.descKey)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

