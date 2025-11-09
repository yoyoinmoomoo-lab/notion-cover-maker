import Navigation from "@/components/Navigation";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">About</h1>

        <div className="prose max-w-none">
          <p className="mb-4">
            Notion Cover Maker는 노션 커버 이미지를 빠르고 쉽게 만들 수 있는
            무료 웹 도구입니다.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">주요 기능</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>이미지 Fill/Fit/Tile 배치 모드</li>
            <li>단색 및 그라데이션 배경</li>
            <li>노션 최적화 사이즈 프리셋</li>
            <li>텍스트 오버레이 (선택사항)</li>
            <li>100% 브라우저 로컬 처리 (프라이버시 보호)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">기술</h2>
          <p className="mb-4">
            이 서비스는 Next.js, React, TypeScript, Canvas API를 사용하여
            구축되었습니다. 모든 이미지 처리는 브라우저에서 로컬로 수행되며,
            서버로 업로드되지 않습니다.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">문의</h2>
          <p className="mb-4">
            문의사항이 있으시면 yoyo.in.moomoo@gmail.com으로 연락주세요.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t">
          <a
            href="/"
            className="text-blue-600 hover:underline"
          >
            ← 홈으로 돌아가기
          </a>
        </div>
      </div>
      </div>
    </div>
  );
}

