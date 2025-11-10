import Navigation from "@/components/Navigation";

// 동적 렌더링 강제 (서버 사이드 렌더링 타임아웃 방지)
export const dynamic = 'force-dynamic';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: November 2025</p>

        <div className="prose max-w-none">
          <p className="mb-6">
            By using this website, you agree to the following terms:
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Free Use</h2>
          <p className="mb-4">
            The Service is provided &quot;as is&quot; for personal and commercial use of
            generated images.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. No Warranty</h2>
          <p className="mb-4">
            We make no guarantees of availability, reliability, or fitness for any
            purpose.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Advertising</h2>
          <p className="mb-4">
            Downloads may be gated by short ads. Using an ad-blocker may prevent
            downloads.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Copyright</h2>
          <p className="mb-4">
            You are responsible for ensuring you have rights to any uploaded image.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Updates</h2>
          <p className="mb-4">
            These terms may change without prior notice.
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

