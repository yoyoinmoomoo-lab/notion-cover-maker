/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ❗ ESLint 오류가 있어도 빌드를 멈추지 않음
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 타입 오류도 배포 시 무시 (선택)
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

