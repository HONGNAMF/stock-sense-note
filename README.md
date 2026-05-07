# 센스폴리오 (Sensefolio)

센스폴리오는 주식과 ETF를 쉽게 이해하고, 내 판단과 매수·매도 기록을 쌓는 개인 투자노트 MVP입니다. 단기 급등주를 부추기는 앱이 아니라 최근 30일 흐름, 회사 해석, ETF 구성, 내 기록을 한곳에서 정리하는 서비스입니다.

## 기술 스택

- Frontend: Next.js App Router + TypeScript
- Styling: Tailwind CSS
- Backend/API: Next.js API routes
- 저장: MVP 단계에서는 localStorage
- DB 확장 기준: Supabase PostgreSQL
- AI 분석: OpenAI API 연결 가능한 서비스 계층, MVP에서는 mock 분석 사용
- 시세: KIS OpenAPI 환경변수가 있으면 국내 주식 실시간 시세, 없으면 Naver Finance/Yahoo Finance 보조 데이터 사용

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 배포

Vercel 배포 URL:

```text
https://sensefolio-note.vercel.app
```

GitHub `main` 브랜치에 push하면 Vercel이 자동으로 다시 배포합니다.

## 핵심 기능

- 로그인 / 회원가입 / 둘러보기: 이메일과 비밀번호 없이 닉네임 기반 로컬 투자노트 사용
- 홈: 최근 30일 주목 종목, 월간 관심 종목, 이번 달 흐름 종목, 과열 주의 종목, 관심종목
- 종목 상세: 현재가, 등락률, 시가총액, PER, PBR, EPS, ROE, 52주 최고/최저, 참고용 AI 해석
- ETF 상세: 구성 종목, 섹터 비중, 국가 비중, ETF vs 개별주 비교
- 단어찾기: PER, PBR, EPS, ROE, ETF 같은 용어를 쉬운 말로 설명
- 내 판단 기록: 호감도, 보는 이유, 아직 안 산 이유, 매수 의향, 매도 기준
- 매수/매도 기록: 가격, 수량, 이유, 감정 기록
- 월간/분기 리포트: mock 복기 화면
- 프로필: 닉네임, 관심 분야, 프로필 사진 변경

## 시세 API 연결

국내 주식을 최대한 실제 시세에 가깝게 보려면 Vercel 환경변수에 아래 값을 추가합니다.

```text
KIS_APP_KEY=한국투자증권 앱 키
KIS_APP_SECRET=한국투자증권 앱 시크릿
KIS_ACCESS_TOKEN=한국투자증권 접근 토큰
KIS_BASE_URL=https://openapi.koreainvestment.com:9443
```

환경변수가 없으면 앱은 Naver Finance와 Yahoo Finance 보조 데이터를 사용합니다. 이 경우 거래소 공식 실시간 시세가 아니므로 화면에 출처와 지연 가능성을 표시합니다.

## 폴더 구조

```text
src/
  app/
    api/price/           # 시세 API 라우트
    api/stocks/          # 종목 검색 API 라우트
    onboarding/          # 투자노트 만들기
    stocks/[ticker]/     # 종목 상세
    etfs/[symbol]/       # ETF 상세
    watchlist/           # 관심종목
    news/                # 뉴스
    profile/             # 내 페이지
    search/              # 검색
    page.tsx             # 홈 / 로그인 / 둘러보기
  components/            # 공통 UI 컴포넌트
  lib/
    live-price.ts        # KIS/Naver/Yahoo 시세 어댑터
    popular-stocks.ts    # KRX 검색 후보 데이터
    mock-data.ts         # MVP mock 종목/뉴스/분석
    storage.ts           # localStorage 저장소
  services/
    priceService.ts
    profileService.ts
    aiAnalysisService.ts
    recommendationService.ts
    etfService.ts
    glossaryService.ts
    reportService.ts
  types/
```

## 법적/저작권 원칙

- 모든 분석은 투자 추천이 아니라 참고용 해석입니다.
- 기사 본문과 유료 리포트 전문을 저장하거나 복제하지 않습니다.
- 외부 뉴스는 제목, 출처, 링크, 자체 작성 요약만 표시합니다.
- 실제 배포 시 사용 권한이 있는 시세/뉴스/공시 API만 연결해야 합니다.
