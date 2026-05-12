# 센스폴리오 (Sensefolio)

센스폴리오는 주식과 ETF를 쉽게 이해하고, 내 판단과 매수·매도 기록을 쌓으며, 월간/분기 리포트로 투자 감각을 키우는 개인 투자노트 MVP입니다.

## 핵심 방향

- 오늘 급등주를 부추기지 않습니다.
- 최근 30일 흐름을 중심으로 봅니다.
- 회사가 무엇을 팔아서 돈을 버는지 먼저 보여줍니다.
- ETF가 무엇을 담고 있는지 쉽게 보여줍니다.
- 모든 분석은 “참고용 해석” 톤을 유지합니다.

## 기술 스택

- Frontend: Next.js App Router + TypeScript
- Styling: Tailwind CSS
- 저장: Supabase PostgreSQL 우선 저장 + 브라우저 임시 캐시
- DB: Supabase PostgreSQL
- AI 분석: OpenAI API 연결 가능한 서비스 계층, MVP에서는 mock 분석
- 시세: KIS OpenAPI 환경변수가 있으면 국내 주식 실시간 시세, 없으면 Naver Finance/Yahoo Finance 보조 데이터 사용

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 배포

```text
https://sensefolio-note.vercel.app
```

GitHub `main` 브랜치에 push하면 Vercel이 자동으로 다시 배포합니다.

## 주요 기능

- 로그인 / 회원가입 / 둘러보기: 이메일과 비밀번호 없이 닉네임 기반 센스폴리오 사용
- 클라우드 동기화: Supabase 환경변수가 있으면 다른 기기에서도 같은 닉네임으로 기록을 이어볼 수 있음
- 투자습관 분석: 회원가입 직후 또는 로그인 후 7문항과 선호 조건으로 개인화 추천에 반영
- 게스트 모드: 홈, 검색, 종목 상세, ETF 상세, 단어찾기 체험 가능. 저장 기능은 제한
- 홈: 최근 30일 주목 종목, 월간 관심 ETF, 조용히 성장 중인 종목, 실적은 괜찮지만 소외된 종목, 과열 주의 종목
- 검색: 종목명, 종목코드, 업종, 제품 키워드 검색
- 회사 프로필: 사업 요약, 주요 제품, 매출원, 고객군, 산업 태그, 데이터 신뢰도
- 종목 상세: 현재가, 시가총액, PER, PBR, EPS, ROE, 52주 최고/최저, 회사 해석, 좋은 회사 체크
- ETF 상세: 구성 종목 TOP 10, 섹터 비중, 국가 비중, ETF vs 개별주 비교
- 단어찾기: PER, PBR, EPS, ROE, ETF 등 쉬운 설명
- 매수/매도 기록과 월간/분기 리포트 mock 화면
- 관심 변화 기록: 추천 카드 클릭과 기록 저장 흐름을 쌓아 추후 월간/분기 리포트에서 관심 변화 분석 가능

## 확장 구조

- `src/lib/brand.ts`: 앱 이름과 브랜드 문구 상수
- `src/lib/listed-companies.ts`: 상장사 seed 데이터
- `src/services/companyProfileService.ts`: 회사 사업 내용 조회/생성 구조
- `src/services/listedCompanyImportService.ts`: CSV/JSON 상장사 목록 import 구조
- `src/services/priceService.ts`: 시세 API 클라이언트
- `src/services/authService.ts`: 닉네임 로그인, 회원가입, 중복 확인
- `src/services/syncService.ts`: Supabase 테이블별 저장/불러오기, 로컬 캐시 동기화
- `src/services/investmentProfileService.ts`: 투자습관 분석 결과 저장/업데이트
- `src/services/favoriteService.ts`: 관심종목 저장 어댑터
- `src/services/tradeService.ts`: 매수/매도 기록 어댑터
- `src/services/cloudSyncService.ts`: 기존 snapshot 호환 및 동기화 보조 어댑터
- `src/lib/live-price.ts`: KIS/Naver/Yahoo 시세 어댑터

## Supabase 동기화 연결

1. Supabase에서 새 프로젝트를 만듭니다.
2. SQL Editor에서 `supabase/schema.sql` 내용을 실행합니다.
3. Vercel 환경변수에 아래 값을 넣습니다.

```text
NEXT_PUBLIC_SUPABASE_URL=Supabase Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=Supabase anon public key
```

4. 다시 배포하면 닉네임, 프로필, 관심종목, 투자습관 분석, 판단 기록, 매수/매도 기록, 추천 저장 기록이 Supabase 테이블에 저장됩니다.

현재 버전은 개인 사용과 테스트를 위한 닉네임 기반 로그인입니다. 공개 배포 시에는 이메일 로그인, 비밀번호, PIN 또는 소셜 로그인을 추가하는 것을 권장합니다.

Supabase 테이블:

- `profiles`
- `user_settings`
- `user_interests`
- `user_investment_profile`
- `favorites`
- `custom_watch_items`
- `user_stock_reflections`
- `trades`
- `monthly_trade_reviews`
- `quarterly_reports`
- `recommended_items`
- `recent_glossary_searches`

네트워크 오류가 있으면 브라우저 캐시에 임시 저장하고, 다시 연결되면 `syncService.syncLocalToCloud()` 구조로 클라우드에 올릴 수 있게 설계했습니다.

## 시세 API 연결

Vercel 환경변수:

```text
KIS_APP_KEY=한국투자증권 앱 키
KIS_APP_SECRET=한국투자증권 앱 시크릿
KIS_ACCESS_TOKEN=한국투자증권 접근 토큰
KIS_BASE_URL=https://openapi.koreainvestment.com:9443
```

환경변수가 없으면 Naver Finance와 Yahoo Finance 보조 데이터를 사용합니다. 이 경우 거래소 공식 실시간 시세가 아니므로 화면에 출처와 지연 가능성을 표시합니다.

## 법적/저작권 원칙

- 모든 분석은 투자 추천이 아니라 참고용 해석입니다.
- 기사 본문과 유료 리포트 전문을 저장하거나 복제하지 않습니다.
- 외부 뉴스는 제목, 출처, 링크, 자체 작성 요약만 표시합니다.
- 실제 배포 시 사용 권한이 있는 시세/뉴스/공시 API만 연결해야 합니다.
