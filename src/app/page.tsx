"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { EconomyTermSearch } from "@/components/EconomyTermSearch";
import { Section } from "@/components/Section";
import { StockCard } from "@/components/StockCard";
import { APP_DISPLAY_NAME, APP_NAME_KO, APP_SUBCOPY, APP_TAGLINE, GUEST_ID } from "@/lib/brand";
import { marketContext, marketSummary, stocks } from "@/lib/mock-data";
import { profileGuide } from "@/lib/analysis";
import { storage } from "@/lib/storage";
import { authService } from "@/services/authService";
import { cloudSyncService } from "@/services/cloudSyncService";
import { profileService } from "@/services/profileService";
import { recommendationService, type RecommendationCandidate, type RecommendationSectionId } from "@/services/recommendationService";
import type { LocalProfile } from "@/types/investment";

type LoginState = "idle" | "not-found";

export default function HomePage() {
  const [localProfile, setLocalProfile] = useState<LocalProfile | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loginName, setLoginName] = useState("");
  const [loginState, setLoginState] = useState<LoginState>("idle");
  const [loginLoading, setLoginLoading] = useState(false);
  const [booted, setBooted] = useState(false);
  const [expandedRecommendations, setExpandedRecommendations] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLocalProfile(profileService.getProfile());
    setFavorites(storage.getFavorites());
    setBooted(true);
  }, []);

  const recommendationSections = useMemo(() => recommendationService.buildSections(localProfile), [localProfile]);
  const monthlyEtfCopy = "ETF는 개별 회사보다 넓게 담는 도구예요. 월간 흐름은 ETF 상세에서 구성 종목과 섹터를 함께 봅니다.";

  async function login() {
    const nickname = loginName.trim();
    if (!nickname) return;
    setLoginLoading(true);
    const found = await authService.nicknameLogin(nickname).catch(() => null);
    if (!found) {
      setLoginState("not-found");
      setLoginLoading(false);
      return;
    }
    profileService.setCurrentProfileId(found.localUserId);
    setLocalProfile(found);
    setFavorites(storage.getFavorites());
    setLoginState("idle");
    setLoginLoading(false);
  }

  function browseOnly() {
    const now = new Date().toISOString();
    profileService.setCurrentProfileId(GUEST_ID);
    setLocalProfile({
      localUserId: GUEST_ID,
      nickname: "둘러보기",
      name: "둘러보기",
      interests: [],
      watchSymbols: [],
      investorSummary: "로그인 없이 둘러보는 중입니다.",
      viewMode: "standard",
      onboardingCompleted: false,
      isGuest: true,
      createdAt: now,
      updatedAt: now
    });
    setFavorites([]);
  }

  if (!booted) return null;

  if (!localProfile) {
    return (
      <AppShell>
        <section className="rounded-3xl bg-ink p-6 text-white shadow-soft">
          <p className="text-sm font-bold text-white/55">{APP_DISPLAY_NAME}</p>
          <h1 className="mt-2 text-4xl font-black">{APP_TAGLINE}</h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-white/72">{APP_SUBCOPY}</p>
        </section>

        <section className="mt-5 space-y-4 rounded-3xl bg-white p-5 shadow-soft">
          <div className="grid grid-cols-3 gap-2">
            <button onClick={login} disabled={loginLoading} className="h-12 rounded-2xl bg-black/[0.08] text-sm font-black text-black/70 disabled:opacity-55">
              {loginLoading ? "불러오는 중" : "로그인"}
            </button>
            <Link href="/onboarding" className="h-12 rounded-2xl bg-ink pt-3 text-center text-sm font-black text-white">
              회원가입
            </Link>
            <button onClick={browseOnly} className="h-12 rounded-2xl bg-black/[0.06] text-sm font-black text-black/70">
              둘러보기
            </button>
          </div>

          <div className="h-px bg-black/[0.06]" />

          <h2 className="text-lg font-black">센스폴리오 로그인</h2>
          <label className="block">
            <span className="text-sm font-black text-black/55">닉네임</span>
            <input
              value={loginName}
              onChange={(event) => setLoginName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") login();
              }}
              className="mt-2 h-12 w-full rounded-2xl bg-paper px-4 font-bold outline-none"
              placeholder="회원가입 때 쓴 닉네임"
            />
          </label>
          <p className="text-xs font-bold leading-5 text-black/45">
            {cloudSyncService.enabled()
              ? "닉네임으로 저장된 센스폴리오를 불러옵니다. 다른 기기에서도 같은 닉네임으로 이어서 볼 수 있어요."
              : "현재는 이 브라우저의 임시 저장소를 사용합니다. 클라우드 연결 후 다른 기기에서도 이어서 볼 수 있어요."}
          </p>
          <p className="rounded-2xl bg-paper p-3 text-xs font-black text-black/55">
            저장 상태: {cloudSyncService.enabled() ? "클라우드 저장 연결됨" : "임시 저장소 사용 중"}
          </p>
        </section>

        {loginState === "not-found" ? (
          <section className="mt-4 rounded-3xl bg-lemon/80 p-5 shadow-soft">
            <h2 className="text-lg font-black text-yellow-950">저장된 센스폴리오를 찾을 수 없어요.</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-yellow-950/75">처음 사용하신다면 회원가입을 진행해주세요.</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Link href={`/onboarding?nickname=${encodeURIComponent(loginName)}`} className="h-11 rounded-2xl bg-ink pt-3 text-center text-xs font-black text-white">
                회원가입하기
              </Link>
              <button onClick={() => setLoginState("idle")} className="h-11 rounded-2xl bg-white text-xs font-black text-black/65">
                다시 입력
              </button>
              <button onClick={browseOnly} className="h-11 rounded-2xl bg-white text-xs font-black text-black/65">
                둘러보기
              </button>
            </div>
          </section>
        ) : null}
      </AppShell>
    );
  }

  const isGuest = localProfile.localUserId === GUEST_ID || localProfile.isGuest;
  const avatarInitial = (localProfile.nickname || localProfile.name || APP_NAME_KO).slice(0, 1);

  return (
    <AppShell>
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-black/50">{APP_DISPLAY_NAME}</p>
          <h1 className="mt-1 text-3xl font-black tracking-normal text-ink">{APP_TAGLINE}</h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">{APP_SUBCOPY}</p>
        </div>
        <div className="grid size-12 place-items-center overflow-hidden rounded-full bg-ink text-lg font-black text-white">
          {localProfile.profileImageUrl ? <img src={localProfile.profileImageUrl} alt="" className="size-12 object-cover" /> : avatarInitial}
        </div>
      </header>

      {isGuest ? (
        <section className="mt-5 rounded-3xl bg-lemon/80 p-5 shadow-soft">
          <Badge tone="lemon">둘러보기 중</Badge>
          <h2 className="mt-3 text-lg font-black text-yellow-950">기록을 저장하려면 내 센스폴리오를 만들어주세요.</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-yellow-950/75">둘러보기 모드입니다. 관심종목, 하트, 매수·매도 기록은 저장되지 않아요.</p>
          <Link href="/onboarding" className="mt-4 block h-11 rounded-2xl bg-ink pt-3 text-center text-xs font-black text-white">
            회원가입하기
          </Link>
        </section>
      ) : null}

      {!isGuest && !localProfile.investmentProfile ? (
        <section className="mt-5 rounded-3xl bg-lemon/80 p-5 shadow-soft">
          <Badge tone="lemon">투자습관 분석 필요</Badge>
          <h2 className="mt-3 text-lg font-black text-yellow-950">아직 투자습관 분석을 하지 않았어요.</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-yellow-950/75">몇 가지 질문에 답하면 더 잘 맞는 설명을 볼 수 있어요.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link href="/onboarding?mode=habit" className="h-11 rounded-2xl bg-ink pt-3 text-center text-xs font-black text-white">
              투자습관 분석하기
            </Link>
            <button className="h-11 rounded-2xl bg-white text-xs font-black text-black/65">
              나중에 할게요
            </button>
          </div>
        </section>
      ) : null}

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Link href="/reports" className="rounded-2xl bg-ink p-4 text-center text-xs font-black text-white shadow-soft">
          📅 월간 요약
        </Link>
        <Link href="/reports" className="rounded-2xl bg-white p-4 text-center text-xs font-black text-black/65 shadow-sm">
          📊 주간 흐름
        </Link>
        <Link href="/news" className="rounded-2xl bg-white p-4 text-center text-xs font-black text-black/65 shadow-sm">
          🌍 오늘 시장
        </Link>
      </div>

      <Link href="/search" className="mt-5 flex h-14 items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 text-black/45 shadow-soft">
        <Search size={20} />
        <span className="font-bold">종목명, 종목코드, 업종, 제품 키워드 검색</span>
      </Link>

      <EconomyTermSearch compact />

      <section className="mt-5 rounded-3xl bg-ink p-5 text-white shadow-soft">
        <div className="flex flex-wrap gap-2">
          <Badge tone="lemon">참고용 해석</Badge>
          <Badge tone="blue">최근 30일 중심</Badge>
        </div>
        <h2 className="mt-4 text-xl font-black">월간 시장 흐름</h2>
        <p className="mt-2 text-base font-semibold leading-7 text-white/82">{marketSummary}</p>
        <p className="mt-3 text-sm font-semibold text-white/62">{profileGuide(undefined)}</p>
        <p className="mt-3 text-xs font-bold text-white/45">업데이트 기준: {marketContext.lastUpdated}</p>
      </section>

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">전체 상장사 기반 구조</Badge>
          <Badge tone="gray">태그 점수 계산</Badge>
        </div>
        <h2 className="mt-3 text-lg font-black">추천은 고정 예시가 아니라 후보군에서 계산합니다.</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-black/60">
          KOSPI, KOSDAQ, 국내 ETF, 해외 주요 주식·ETF 후보에 관심사, 사업 내용, 투자습관, 최근 30일 흐름, 리스크 점수를 더해 보여줍니다. MVP에서는 seed/import 데이터와 mock 흐름을 사용하고, 실제 서비스에서는 KRX·DART·뉴스·시세 API로 교체합니다.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Link href="/search" className="rounded-2xl bg-paper p-3 text-center text-xs font-black">직접 검색하기</Link>
          <Link href="/market" className="rounded-2xl bg-paper p-3 text-center text-xs font-black">비슷한 회사 더 보기</Link>
          <Link href="/etfs" className="rounded-2xl bg-paper p-3 text-center text-xs font-black">ETF로 보기</Link>
          <button
            onClick={() => setExpandedRecommendations((current) => ({ ...current, etf: true }))}
            className="rounded-2xl bg-paper p-3 text-center text-xs font-black"
          >
            리스크 낮은 후보만 보기
          </button>
        </div>
      </section>

      {recommendationSections.map((section) => (
        <Section key={section.id} title={section.title} sub={section.description}>
          <RecommendationGrid
            sectionId={section.id}
            candidates={section.candidates}
            expanded={Boolean(expandedRecommendations[section.id])}
            emptyMessage={section.emptyMessage}
            onToggle={() => setExpandedRecommendations((current) => ({ ...current, [section.id]: !current[section.id] }))}
          />
        </Section>
      ))}

      <Section title="월간 관심 ETF" sub={monthlyEtfCopy}>
        <Link href="/etfs" className="block rounded-3xl bg-white p-5 shadow-soft">
          <p className="text-lg font-black">ETF 구성 종목과 섹터 비중 보러가기</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">국내 ETF 8개와 해외 ETF 8개 mock 상세를 볼 수 있어요.</p>
        </Link>
      </Section>

      <Section title={`${localProfile.nickname || localProfile.name}님이 매수한 종목`} sub="매수/매도 기록을 남기면 월간 리포트에 반영됩니다.">
        <Link href="/trades" className="block rounded-3xl bg-white p-5 shadow-soft">
          <p className="text-lg font-black">매수/매도 기록하러 가기</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">종목명, 가격, 수량, 이유와 감정을 간단히 남겨보세요.</p>
        </Link>
      </Section>

      <Section title="관심종목" sub={isGuest ? "둘러보기 중에는 관심종목이 저장되지 않아요." : favorites.length ? "하트로 저장한 종목이에요." : "아직 관심종목이 없어요. 종목 상세에서 하트를 누르면 여기에 모입니다."}>
        {favorites.length ? (
          <StockGrid title="fav" list={stocks.filter((stock) => favorites.includes(stock.ticker))} />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Link href="/market" className="rounded-2xl bg-white p-4 text-center text-sm font-black shadow-sm">
              종목 둘러보기
            </Link>
            <Link href="/etfs" className="rounded-2xl bg-white p-4 text-center text-sm font-black shadow-sm">
              ETF 둘러보기
            </Link>
          </div>
        )}
      </Section>

      <Section title="단어찾기 바로가기">
        <Link href="/glossary" className="block rounded-3xl bg-white p-5 shadow-soft">
          <p className="text-lg font-black">기준금리, CPI, 코스피, PER 쉽게 보기</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">모르는 경제·투자 용어를 쉬운 설명, 시장 영향, 포트폴리오 힌트로 확인합니다.</p>
        </Link>
      </Section>

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-lg font-black">오늘 급등주는 앱 안에서 추천하지 않아요.</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-black/60">단기 급등주는 변동성이 크므로 참고용으로만 확인하세요.</p>
        <a href="https://finance.naver.com/sise/sise_rise.naver" target="_blank" rel="noreferrer" className="mt-4 block h-11 rounded-2xl bg-black/[0.06] pt-3 text-center text-xs font-black text-black/70">
          오늘 급등주 보러가기
        </a>
      </section>
    </AppShell>
  );
}

function StockGrid({ title, list }: { title: string; list: typeof stocks }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {list.map((stock) => (
        <StockCard key={`${title}-${stock.ticker}`} stock={stock} />
      ))}
    </div>
  );
}

function RecommendationGrid({
  sectionId,
  candidates,
  expanded,
  emptyMessage,
  onToggle
}: {
  sectionId: RecommendationSectionId;
  candidates: RecommendationCandidate[];
  expanded: boolean;
  emptyMessage?: string;
  onToggle: () => void;
}) {
  const visible = expanded ? candidates.slice(0, 10) : candidates.slice(0, 3);

  if (!candidates.length) {
    return (
      <div className="rounded-3xl bg-white p-5 shadow-soft">
        <p className="text-sm font-bold leading-6 text-black/60">{emptyMessage ?? "조건에 맞는 후보를 더 모으는 중입니다."}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Link href="/search" className="rounded-2xl bg-paper p-3 text-center text-xs font-black">직접 검색</Link>
          <Link href="/market" className="rounded-2xl bg-paper p-3 text-center text-xs font-black">비슷한 회사</Link>
          <Link href="/etfs" className="rounded-2xl bg-paper p-3 text-center text-xs font-black">ETF 보기</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {visible.map((candidate) => (
          <RecommendationCard key={`${sectionId}-${candidate.id}`} candidate={candidate} />
        ))}
      </div>
      {candidates.length > 3 ? (
        <button onClick={onToggle} className="mt-3 h-11 w-full rounded-2xl bg-black/[0.06] text-sm font-black text-black/70">
          {expanded ? "접기" : `더 보기 ${Math.min(candidates.length - 3, 7)}개`}
        </button>
      ) : null}
    </div>
  );
}

function RecommendationCard({ candidate }: { candidate: RecommendationCandidate }) {
  const riskTone = candidate.risk === "높음" ? "coral" : candidate.risk === "중간" ? "yellow" : "green";
  const confidenceTone = candidate.dataConfidence === "높음" ? "green" : candidate.dataConfidence === "보통" ? "blue" : "gray";

  return (
    <Link
      href={candidate.href}
      onClick={() =>
        cloudSyncService.recordInterestEvent({
          kind: "recommendation_click",
          assetKey: candidate.symbol,
          assetName: candidate.name,
          assetKind: candidate.assetKind,
          sector: candidate.sector,
          tags: candidate.tags
        })
      }
      className="block h-full"
    >
      <article className="h-full rounded-2xl border border-black/5 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black text-black/45">
              {candidate.assetKind === "etf" ? "ETF" : "주식"} · {candidate.region} · {candidate.market}
            </p>
            <h3 className="mt-1 text-lg font-black text-ink">{candidate.name}</h3>
            <p className="mt-1 text-xs font-bold text-black/45">{candidate.symbol}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge tone={riskTone}>리스크 {candidate.risk}</Badge>
            <Badge tone={confidenceTone}>신뢰도 {candidate.dataConfidence}</Badge>
          </div>
        </div>

        <p className="mt-3 text-sm font-semibold leading-6 text-black/68">{candidate.oneLine}</p>

        <div className="mt-3 rounded-2xl bg-paper p-3">
          <p className="text-xs font-black text-black/45">왜 추천됐나요?</p>
          <ul className="mt-2 space-y-1 text-sm font-semibold leading-5 text-black/62">
            <li>{candidate.interestReason}</li>
            <li>{candidate.habitReason}</li>
            <li>{candidate.recent30DayFlow}</li>
          </ul>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {candidate.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-skysoft px-2 py-1 text-[11px] font-black text-sky-950">
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
