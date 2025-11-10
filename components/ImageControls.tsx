"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useEditorStore } from "@/store/editorStore";

export default function ImageControls() {
  const { t } = useTranslation();
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

  // 로컬 state로 입력 중간 상태 관리
  const [xInput, setXInput] = useState(String(imageOffset.x));
  const [yInput, setYInput] = useState(String(imageOffset.y));
  const [tileXInput, setTileXInput] = useState(String(tileOffset.x));
  const [tileYInput, setTileYInput] = useState(String(tileOffset.y));

  // imageOffset이 외부에서 변경되면 로컬 state 동기화
  useEffect(() => {
    setXInput(String(imageOffset.x));
    setYInput(String(imageOffset.y));
  }, [imageOffset.x, imageOffset.y]);

  useEffect(() => {
    setTileXInput(String(tileOffset.x));
    setTileYInput(String(tileOffset.y));
  }, [tileOffset.x, tileOffset.y]);

  if (mode === "tile") {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">{t("tile_controls_title")}</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t("tile_scale", { scale: tileScale.toFixed(2) })}
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
              <label className="block text-xs text-gray-600 mb-1">{t("tile_offset_x")}</label>
              <input
                type="number"
                value={tileXInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setTileXInput(val);
                  if (val !== "" && val !== "-") {
                    const num = parseInt(val, 10);
                    if (!isNaN(num)) {
                      setTileOffset({ ...tileOffset, x: num });
                    }
                  }
                }}
                onBlur={() => {
                  if (tileXInput === "" || tileXInput === "-") {
                    setTileOffset({ ...tileOffset, x: 0 });
                    setTileXInput("0");
                  } else {
                    const num = parseInt(tileXInput, 10);
                    if (!isNaN(num)) {
                      setTileOffset({ ...tileOffset, x: num });
                      setTileXInput(String(num));
                    }
                  }
                }}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">{t("tile_offset_y")}</label>
              <input
                type="number"
                value={tileYInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setTileYInput(val);
                  if (val !== "" && val !== "-") {
                    const num = parseInt(val, 10);
                    if (!isNaN(num)) {
                      setTileOffset({ ...tileOffset, y: num });
                    }
                  }
                }}
                onBlur={() => {
                  if (tileYInput === "" || tileYInput === "-") {
                    setTileOffset({ ...tileOffset, y: 0 });
                    setTileYInput("0");
                  } else {
                    const num = parseInt(tileYInput, 10);
                    if (!isNaN(num)) {
                      setTileOffset({ ...tileOffset, y: num });
                      setTileYInput(String(num));
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
      <h2 className="text-lg font-semibold mb-3">{t("image_controls_title")}</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            {t("image_scale", { percent: (imageScale * 100).toFixed(0) })}
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
            {t("image_rotation", { degrees: imageRotation })}
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
            <label className="block text-xs text-gray-600 mb-1">{t("image_position_x")}</label>
            <input
              type="number"
              value={xInput}
              onChange={(e) => {
                const val = e.target.value;
                setXInput(val);
                if (val !== "" && val !== "-") {
                  const num = parseInt(val, 10);
                  if (!isNaN(num)) {
                    setImageOffset({ ...imageOffset, x: num });
                  }
                }
              }}
              onBlur={() => {
                if (xInput === "" || xInput === "-") {
                  setImageOffset({ ...imageOffset, x: 0 });
                  setXInput("0");
                } else {
                  const num = parseInt(xInput, 10);
                  if (!isNaN(num)) {
                    setImageOffset({ ...imageOffset, x: num });
                    setXInput(String(num));
                  }
                }
              }}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">{t("image_position_y")}</label>
            <input
              type="number"
              value={yInput}
              onChange={(e) => {
                const val = e.target.value;
                setYInput(val);
                if (val !== "" && val !== "-") {
                  const num = parseInt(val, 10);
                  if (!isNaN(num)) {
                    setImageOffset({ ...imageOffset, y: num });
                  }
                }
              }}
              onBlur={() => {
                if (yInput === "" || yInput === "-") {
                  setImageOffset({ ...imageOffset, y: 0 });
                  setYInput("0");
                } else {
                  const num = parseInt(yInput, 10);
                  if (!isNaN(num)) {
                    setImageOffset({ ...imageOffset, y: num });
                    setYInput(String(num));
                  }
                }
              }}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {t("image_keyboard_hint")}
        </div>
      </div>
    </div>
  );
}

