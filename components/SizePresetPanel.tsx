"use client";

import { useEditorStore } from "@/store/editorStore";

const PRESETS = [
  { name: "Wide (권장)", width: 3000, height: 1200 },
  { name: "Standard", width: 2000, height: 1000 },
  { name: "Compact", width: 1500, height: 600 },
];

export default function SizePresetPanel() {
  const { output, setOutput, showSafeZone, setShowSafeZone } = useEditorStore();

  const handlePreset = (width: number, height: number) => {
    setOutput({ width, height });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">사이즈</h2>

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
          <div className="text-sm font-medium mb-2">커스텀</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-600">폭</label>
              <input
                type="number"
                value={output.width}
                onChange={(e) =>
                  setOutput({ width: parseInt(e.target.value) || 1000 })
                }
                className="w-full px-2 py-1 border rounded"
                min="100"
                max="10000"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">높이</label>
              <input
                type="number"
                value={output.height}
                onChange={(e) =>
                  setOutput({ height: parseInt(e.target.value) || 1000 })
                }
                className="w-full px-2 py-1 border rounded"
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
            <span className="text-sm">세이프존 표시 (중앙 40%)</span>
          </label>
        </div>
      </div>
    </div>
  );
}

