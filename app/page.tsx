import Editor from "@/components/Editor";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";

// 동적 렌더링 강제 (서버 사이드 렌더링 타임아웃 방지)
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <Editor />
      </div>
    </main>
  );
}

