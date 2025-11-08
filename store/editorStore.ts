import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  EditorState,
  ImageData,
  Mode,
  Background,
  OutputSettings,
  TextOverlay,
} from "@/types";

interface EditorStore extends EditorState {
  setImage: (image: ImageData | null) => void;
  setMode: (mode: Mode) => void;
  setBackground: (background: Background) => void;
  setOutput: (output: Partial<OutputSettings>) => void;
  setText: (text: Partial<TextOverlay>) => void;
  setTileOffset: (offset: { x: number; y: number }) => void;
  setTileScale: (scale: number) => void;
  setImageOffset: (offset: { x: number; y: number }) => void;
  setImageScale: (scale: number) => void;
  setImageRotation: (rotation: number) => void;
  setShowSafeZone: (show: boolean) => void;
  reset: () => void;
}

const defaultState: EditorState = {
  image: null,
  mode: "fill",
  background: { type: "solid", color: "#ffffff" },
  output: {
    width: 3000,
    height: 1200,
    format: "png",
    quality: 0.9,
  },
  text: {
    enabled: false,
    content: "",
    font: "Inter",
    weight: 400,
    size: 48,
    tracking: 0,
    shadow: false,
    align: "center",
    color: "#ffffff",
  },
  tileOffset: { x: 0, y: 0 },
  tileScale: 1,
  imageOffset: { x: 0, y: 0 },
  imageScale: 1,
  imageRotation: 0,
  showSafeZone: false,
};

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      ...defaultState,
      setImage: (image) => set({ image }),
      setMode: (mode) => set({ mode }),
      setBackground: (background) => set({ background }),
      setOutput: (output) =>
        set((state) => ({
          output: { ...state.output, ...output },
        })),
      setText: (text) =>
        set((state) => ({
          text: { ...state.text, ...text },
        })),
      setTileOffset: (tileOffset) => set({ tileOffset }),
      setTileScale: (tileScale) => set({ tileScale }),
      setImageOffset: (imageOffset) => set({ imageOffset }),
      setImageScale: (imageScale) => set({ imageScale }),
      setImageRotation: (imageRotation) => set({ imageRotation }),
      setShowSafeZone: (showSafeZone) => set({ showSafeZone }),
      reset: () => set(defaultState),
    }),
    {
      name: "notion-cover-editor",
      partialize: (state) => ({
        mode: state.mode,
        background: state.background,
        output: state.output,
        text: state.text,
        showSafeZone: state.showSafeZone,
      }),
    }
  )
);

