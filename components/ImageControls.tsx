"use client";

import { useEditorStore } from "@/store/editorStore";

export default function ImageControls() {
  const {
    mode,
    imageOffset,
    imageScale,
    imageRotation,
    tileOffset,
    tileScale,
    setImageOffset,
    setImageScale,
    setImageRotation,
    setTileOffset,
    setTileScale,
  } = useEditorStore();

  if (mode === "tile") {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">타일 조정</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              스케일: {tileScale.toFixed(2)}x
            </label>
            <input
              type="range"
              min="0.1"
              max="4"
              step="0.1"
              value={tileScale}
              onChange={(e) => setTileScale(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">X 오프셋</label>
              <input
                type="number"
                value={tileOffset.x}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setTileOffset({ ...tileOffset, x: 0 });
                  } else {
                    const num = parseInt(val, 10);
                    if (!isNaN(num)) {
                      setTileOffset({ ...tileOffset, x: num });
                    }
                  }
                }}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Y 오프셋</label>
              <input
                type="number"
                value={tileOffset.y}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setTileOffset({ ...tileOffset, y: 0 });
                  } else {
                    const num = parseInt(val, 10);
                    if (!isNaN(num)) {
                      setTileOffset({ ...tileOffset, y: num });
                    }
                  }
                }}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">이미지 조정</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            확대/축소: {(imageScale * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="4"
            step="0.1"
            value={imageScale}
            onChange={(e) => setImageScale(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            회전: {imageRotation}°
          </label>
          <input
            type="range"
            min="-180"
            max="180"
            step="1"
            value={imageRotation}
            onChange={(e) => setImageRotation(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">X 위치</label>
            <input
              type="number"
              value={imageOffset.x}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  setImageOffset({ ...imageOffset, x: 0 });
                } else {
                  const num = parseInt(val, 10);
                  if (!isNaN(num)) {
                    setImageOffset({ ...imageOffset, x: num });
                  }
                }
              }}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Y 위치</label>
            <input
              type="number"
              value={imageOffset.y}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  setImageOffset({ ...imageOffset, y: 0 });
                } else {
                  const num = parseInt(val, 10);
                  if (!isNaN(num)) {
                    setImageOffset({ ...imageOffset, y: num });
                  }
                }
              }}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
        </div>
        <div className="text-xs text-gray-500">
          키보드 화살표 키로 미세 조정 가능 (Shift: 10px)
        </div>
      </div>
    </div>
  );
}

