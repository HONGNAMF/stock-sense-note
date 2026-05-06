# stock-sense-note

개인화 투자 해석 노트 앱 MVP입니다. 화면상 서비스명은 “해석노트”이며, 실제 API 키 없이 mock data로 동작합니다. 하트 저장·메모 저장·온보딩 정보는 우선 `localStorage`에 저장됩니다.

## 기술 스택

- Frontend: Next.js App Router + TypeScript
- Styling: Tailwind CSS
- Backend/API: Next.js API routes
- DB 설계 기준: Supabase PostgreSQL로 전환 가능한 저장소 계층
- AI 분석: OpenAI API 연결 전 mock 분석 문장 사용

MVP 단계에서는 Next.js API routes를 선택했습니다. 프론트와 API mock을 한 프로젝트 안에서 관리할 수 있고, 추후 Supabase/OpenAI/주식 API를 붙일 때 `src/lib`와 `src/app/api` 내부만 교체하면 됩니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 배포 방법

### Vercel 권장

Next.js 앱이라 Vercel 배포가 가장 단순합니다.

1. GitHub 저장소에 코드를 올립니다. 저장소 이름 추천: `stock-sense-note`
2. Vercel에서 `New Project`를 누르고 저장소를 선택합니다.
3. Framework Preset은 `Next.js`로 둡니다.
4. Build Command는 기본값 `npm run build`를 사용합니다.
5. Output Directory는 비워둡니다.
6. 현재 MVP는 mock/localStorage 기반이라 필수 환경변수가 없습니다.
7. 배포 후 `/legal`, `/privacy` 페이지 링크가 정상적으로 열리는지 확인합니다.

예상 배포 URL:

```text
https://stock-sense-note.vercel.app
```

### 일반 Node 서버

```bash
npm install
npm run build
npm run start
```

기본 포트는 `3000`입니다.

### 배포 전 확인

```bash
npm run build
```

현재 MVP는 실제 주식/뉴스/OpenAI API를 호출하지 않습니다. 배포해도 외부 API 비용은 발생하지 않습니다.

### 주의

- localStorage 저장 방식이라 기기 간 데이터 동기화는 되지 않습니다.
- 생년월일을 입력받으므로 배포 화면에는 `/privacy` 안내를 유지하세요.
- 실제 투자 추천처럼 보이지 않도록 “참고용 해석” 문구를 유지하세요.
- 뉴스 본문, 유료 리포트, 로고, 차트 이미지를 무단 복제하지 마세요.

## 주요 기능

- 온보딩: 이름, 생년월일, 프로필 이미지, 관심사, 관심 주식/ETF, 투자 성향 7문항
- 홈: 시장 한 줄 요약, 핫한 주식, 꾸준히 성장하는 주식, 소외주, 과열 주의, 관심종목, 관심사 기반 추천
- 종목 상세: 기본 지표, 용어 설명, AI 분석 mock, 뉴스 3줄 요약, 메모
- ETF 목록/상세: 국내 ETF 8개, 해외 ETF 8개, 구성 종목/섹터/국가 비중
- 단어찾기: PER, PBR, EPS, ROE, ETF 등 쉬운 설명
- 매수/매도 기록: 거래일, 가격, 수량, 이유, 감정 저장
- 월간/분기 리포트: mock 복기 리포트
- 관심종목: 하트 저장 종목과 태그
- 내 페이지: 프로필, 관심종목 수, 최근 메모

## 현재 시장 피드 mock 종목

초기 버전의 고정 샘플 종목 대신, 현재 시장에서 자주 언급되는 신호를 기준으로 구성한 mock 피드를 사용합니다. 각 종목에는 `왜 지금 보이는지`, `주의할 점`, `업데이트 규칙`, `신호 태그`가 포함됩니다.

예시 후보:

- 삼성전자
- SK하이닉스
- 삼천당제약
- 한미반도체
- ISC
- HD현대일렉트릭
- 로보티즈
- 인바디

실서비스에서는 이 목록을 고정하지 않고 KRX 시세, 거래대금, DART 공시, 뉴스 빈도, 섹터 랭킹, 사용자 관심사로 매일 교체합니다.

## 폴더 구조

```text
src/
  app/
    api/stocks/          # mock API route
    onboarding/          # 온보딩
    stocks/[ticker]/     # 종목 상세
    watchlist/           # 관심종목
    news/                # 뉴스 모음
    profile/             # 내 페이지
    search/              # 검색
    page.tsx             # 홈
  components/            # 공통 UI 컴포넌트
  lib/
    analysis.ts          # 투자 성향 분류 로직
    constants.ts         # 선택지와 용어 설명
    mock-data.ts         # mock 종목/뉴스/분석 데이터
    storage.ts           # localStorage 저장소 어댑터
  types/                 # 도메인 타입
```

## 나중에 API 붙이는 방법

### Supabase PostgreSQL

권장 테이블 예시:

```sql
profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  volatility text not null,
  horizon text not null,
  news_frequency text not null,
  interests text[] not null,
  loss_tolerance text not null,
  risk_profile text not null,
  created_at timestamptz default now()
);

watchlist_items (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  ticker text not null,
  tag text,
  created_at timestamptz default now()
);

stock_notes (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  ticker text not null,
  reason text,
  target_buy_price text,
  stop_loss text,
  feeling text,
  updated_at timestamptz default now()
);
```

현재 `src/lib/storage.ts`가 localStorage 어댑터 역할을 합니다. Supabase 전환 시 같은 메서드 이름으로 `getProfile`, `setProfile`, `getFavorites`, `toggleFavorite`, `saveNote`, `setTag`를 Supabase client 호출로 바꾸면 화면 변경을 최소화할 수 있습니다.

### 주식/뉴스 API

현재 종목 데이터는 `src/lib/mock-data.ts`에 있습니다. 실제 연동 시에는 `src/app/api/stocks/route.ts`, `src/app/api/stocks/[ticker]/route.ts`에서 외부 주식 API를 호출하고, 반환 타입을 `src/types/index.ts`의 `Stock` 형태로 정규화하면 됩니다.

뉴스 API도 같은 방식으로 기사 제목, 출처, 링크, 본문 일부를 받아 `NewsItem`으로 정규화합니다.

## 저작권과 법적 리스크 줄이는 원칙

- 기사 전문, 유료 리포트, 이미지, 로고, 차트 화면을 무단 복제하지 않습니다.
- 뉴스는 제목, 출처, 원문 링크, 자체 작성한 짧은 요약만 표시합니다.
- API 약관상 저장·재배포가 허용된 데이터만 DB에 저장합니다.
- AI 요약은 원문 대체물이 아니라 참고용 설명으로 표시합니다.
- 모든 화면에 “참고용 분석” 문구를 유지하고, 매수·매도 확정 표현을 피합니다.
- 앱에는 `/legal` 페이지가 있으며, 배포 전 이 고지를 푸터나 회원가입 약관에 연결하는 것을 권장합니다.

### OpenAI API

AI 분석은 현재 mock 문장입니다. 실제 연결 시 추천 구조:

1. `src/app/api/analysis/route.ts` 생성
2. 주식 기본 지표, 최근 뉴스, 사용자 성향을 입력으로 전달
3. OpenAI 응답을 다음 필드로 구조화
   - 이 회사가 하는 일
   - 어떻게 돈을 버는지
   - 최근 실적 흐름
   - 현재 주가가 비싼지 싼지
   - 주가 흐름
   - 지금 사도 되는지
   - 장기 보유 가능성
   - 리스크 요소
   - 비슷한 기업 비교

모든 화면에는 투자 판단을 확정하지 않고 “참고용 분석” 문구를 표시합니다.
