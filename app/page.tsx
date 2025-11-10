import Editor from "@/components/Editor";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";

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

