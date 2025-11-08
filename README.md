# Notion Cover Maker

노션 커버 전용 이미지 편집 웹앱. 모든 처리는 브라우저 로컬에서 실행되어 빠르고 비용이 없습니다.

## 주요 기능

- **배치 모드**: Fill (확대 채우기), Fit (가운데 정렬), Tile (반복)
- **배경 옵션**: 단색, 그라데이션 (자동/수동), 블러 확장
- **사이즈 프리셋**: Wide (3000×1200), Standard (2000×1000), Compact (1500×600) + 커스텀
- **텍스트 오버레이**: 선택적 텍스트 추가 (Google Fonts OFL 계열)
- **광고 게이팅**: 다운로드 전 5-10초 광고 카운트다운
- **100% 로컬 처리**: 서버 업로드 없음, 프라이버시 보호

## 기술 스택

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Zustand (상태 관리)
- Canvas API (이미지 처리)

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm start
```

## 배포

Vercel에 배포하는 것을 권장합니다:

1. Vercel 프로젝트 생성
2. 도메인 DNS CNAME 연결
3. AdSense 신청 및 광고 슬롯 ID 설정

## 라이선스

MIT

