"use client";

export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Notion Cover Maker
        </h1>
        <p className="text-xl text-gray-700 mb-2">
          Make your Notion cover perfectly fit — no Photoshop, no hassle.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Upload, adjust, and download in seconds. Free, local, and ad-supported.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>🎨</span>
            <span>Smart Fill — Fit, Crop, or Tile</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🌈</span>
            <span>Custom Backgrounds</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🧭</span>
            <span>Perfect Sizes</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚡</span>
            <span>Privacy-safe</span>
          </div>
        </div>
      </div>
    </div>
  );
}

