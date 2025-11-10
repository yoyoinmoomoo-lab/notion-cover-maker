import Navigation from "@/components/Navigation";

// 동적 렌더링 강제 (서버 사이드 렌더링 타임아웃 방지)
export const dynamic = 'force-dynamic';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: November 2025</p>

        <div className="prose max-w-none">
          <p className="mb-4">
            This website (&quot;the Service&quot;) does not collect, store, or transmit any
            personal data.
          </p>
          <p className="mb-4">
            All image processing happens entirely within your browser — nothing is
            uploaded to our servers.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Data we do not collect
          </h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>No user accounts</li>
            <li>No cookies for tracking</li>
            <li>No uploaded images are stored</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Third-party services
          </h2>
          <p className="mb-4">
            We use Google AdSense to display ads. AdSense may use cookies to
            personalize ads.
          </p>
          <p className="mb-4">
            For details, please see{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </p>

          <p className="mt-8">
            If you have questions, contact us at: yoyo.in.moomoo@gmail.com
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

