"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { APP_NAME_KO } from "@/lib/brand";
import { resizeImageFile } from "@/lib/image-utils";
import { storage } from "@/lib/storage";
import { cloudSyncService } from "@/services/cloudSyncService";
import { profileService, validateNickname } from "@/services/profileService";
import { recommendationService, type RecommendationCandidate, type RecommendationSection } from "@/services/recommendationService";
import type { InvestmentPreferences, InvestmentProfile, LocalProfile } from "@/types/investment";

const bigInterests = ["콘텐츠 / 취향", "생활 / 소비", "기술 / 산업", "헬스케어", "금융 / 경제", "인프라", "ETF", "해외주식", "국내주식", "기타"];
const sampleCandidates = ["애니플러스", "인바디", "아이디스", "삼성전기", "로보티즈", "TIGER 미국S&P500", "TIGER 코리아휴머노이드로봇산업", "VOO", "QQQ", "SCHD"];

const defaultInvestmentProfile = (): InvestmentProfile => ({
  riskLevel: "중간",
  investmentPeriod: "중기",
  informationStyle: "회사 사업 이해 선호",
  interestStyle: "취향 기반",
  buyStyle: "신중형",
  reviewStyle: "기록 보통",
  resultSummary: "취향 기반 + 회사 이해형",
  traits: ["관심 있는 분야에서 시작하면 더 오래 공부하기 쉽습니다.", "숫자보다 회사가 무엇을 하는지 먼저 이해하는 편이 잘 맞습니다.", "매수 전에는 가격과 리스크를 함께 확인하는 것이 편합니다."],
  cautions: ["좋아하는 분야라고 무조건 좋은 투자는 아닐 수 있습니다.", "급등한 테마에는 감정적으로 끌릴 수 있습니다.", "매도 기준을 미리 정하지 않으면 판단이 늦어질 수 있습니다."],
  usageTips: ["회사 해석 카드 먼저 보기", "리스크 낮음/중간/높음 확인하기", "하트 호감도와 매수 이유 기록하기", "월간 복기 리포트 확인하기"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

const defaultPreferences: InvestmentPreferences = {
  preferredMarket: "전부 보기",
  preferredPriceRange: "가격 상관없음",
  preferredSize: "잘 모르겠음",
  preferredRisk: "중간 리스크",
  preferredApproach: "내가 좋아하는 분야 위주로 보기"
};

const questions = [
  {
    q: "주가가 하루에 -7% 떨어지면 어떻게 할 것 같나요?",
    a: ["바로 불안해서 팔고 싶다", "조금 더 지켜본다", "왜 떨어졌는지 찾아본다", "오히려 기회인지 고민한다"]
  },
  {
    q: "3개월 동안 주가가 거의 안 움직이면?",
    a: ["지루해서 다른 종목을 보고 싶다", "조금 더 기다린다", "실적이나 뉴스가 괜찮으면 유지한다", "장기 관점이면 크게 상관없다"]
  },
  {
    q: "내가 잘 모르는 회사인데 숫자는 좋아 보이면?",
    a: ["그래도 잘 몰라서 어렵다", "조금 공부해보고 판단한다", "실적이 좋으면 관심 가진다", "숫자가 좋으면 충분히 볼 만하다"]
  },
  {
    q: "내가 좋아하는 분야의 회사라면?",
    a: ["더 관심이 간다", "그래도 숫자를 봐야 한다", "관심은 가지만 조심해야 한다", "좋아하는 분야라도 투자와는 별개다"]
  },
  {
    q: "투자할 때 가장 먼저 보고 싶은 것은?",
    a: ["이 회사가 뭘 하는지", "실적이 좋아졌는지", "지금 가격이 비싼지 싼지", "요즘 뉴스나 흐름이 있는지"]
  },
  {
    q: "손실이 나면 가장 불안한 이유는?",
    a: ["더 떨어질까 봐", "내가 잘못 고른 것 같아서", "언제 팔아야 할지 몰라서", "크게 신경 쓰지 않는다"]
  },
  {
    q: "주식을 사고 나서 가장 필요한 기능은?",
    a: ["지금 계속 들고 가도 되는지 알려주는 것", "내가 산 이유가 유지되는지 확인하는 것", "뉴스가 좋은 뉴스인지 나쁜 뉴스인지 알려주는 것", "나중에 내 판단을 돌아보는 것"]
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");
  const [watchSymbols, setWatchSymbols] = useState<string[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [investmentProfile, setInvestmentProfile] = useState<InvestmentProfile>(defaultInvestmentProfile());
  const [preferences, setPreferences] = useState<InvestmentPreferences>(defaultPreferences);
  const [savedSymbols, setSavedSymbols] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setNickname(new URLSearchParams(window.location.search).get("nickname") ?? "");
  }, []);

  const draftProfile = useMemo<LocalProfile>(
    () => ({
      localUserId: profileService.getCurrentProfileId() || "draft",
      nickname: nickname.trim() || "나",
      name: nickname.trim() || "나",
      profileImageUrl,
      interests,
      watchSymbols,
      investorSummary: investmentProfile.resultSummary,
      investmentProfile,
      preferences,
      viewMode: "standard",
      onboardingCompleted: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }),
    [nickname, profileImageUrl, interests, watchSymbols, investmentProfile, preferences]
  );

  const recommendationSections = useMemo(() => recommendationService.buildSections(draftProfile), [draftProfile]);

  function toggle(list: string[], value: string, setter: (next: string[]) => void) {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  async function nextFromProfile() {
    const message = validateNickname(nickname, profileService.getProfiles());
    if (message) {
      setError(message);
      return;
    }
    if (await cloudSyncService.hasCloudProfile(nickname).catch(() => false)) {
      setError("이미 사용 중인 닉네임이에요. 로그인해서 이어서 볼까요?");
      return;
    }
    setError("");
    setStep(1);
  }

  function addCustomInterest() {
    const value = customInterest.trim();
    if (!value) return;
    if (!interests.includes(value)) setInterests([...interests, value]);
    setCustomInterest("");
  }

  async function selectImage(file?: File) {
    if (!file) return;
    try {
      setProfileImageUrl(await resizeImageFile(file));
    } catch (err) {
      alert(err instanceof Error ? err.message : "이미지를 저장하지 못했어요.");
    }
  }

  function answerQuestion(answerIndex: number) {
    const nextAnswers = [...answers];
    nextAnswers[questionIndex] = answerIndex;
    setAnswers(nextAnswers);
    if (questionIndex < questions.length - 1) setQuestionIndex(questionIndex + 1);
    else {
      setInvestmentProfile(analyzeInvestmentProfile(nextAnswers));
      setStep(5);
    }
  }

  async function ensureProfile(profileOverride = investmentProfile, preferenceOverride = preferences) {
    const current = profileService.getProfile();
    if (current) return current;
    const now = new Date().toISOString();
    const profile: LocalProfile = {
      localUserId: crypto.randomUUID(),
      nickname: nickname.trim(),
      name: nickname.trim(),
      profileImageUrl,
      interests,
      watchSymbols,
      investorSummary: profileOverride.resultSummary,
      investmentProfile: profileOverride,
      preferences: preferenceOverride,
      viewMode: "standard",
      onboardingCompleted: true,
      createdAt: now,
      updatedAt: now
    };
    profileService.createProfile(profile);
    await cloudSyncService.upsertProfileSnapshot(profile).catch(() => undefined);
    return profile;
  }

  async function finishToHome(profileOverride = investmentProfile, preferenceOverride = preferences) {
    await ensureProfile(profileOverride, preferenceOverride);
    router.push("/");
  }

  async function goRecommendations() {
    await ensureProfile(investmentProfile, preferences);
    setStep(7);
  }

  async function skipHabit() {
    const defaults = defaultInvestmentProfile();
    setInvestmentProfile(defaults);
    await finishToHome(defaults, defaultPreferences);
  }

  function saveRecommendation(candidate: RecommendationCandidate, category: string) {
    if (!storage.getFavorites().includes(candidate.symbol)) storage.toggleFavorite(candidate.symbol);
    cloudSyncService.saveRecommendedItem({
      localUserId: profileService.getCurrentProfileId() ?? "",
      stockId: candidate.symbol,
      reason: candidate.interestReason,
      category,
      riskLevel: candidate.risk,
      wasSaved: true
    });
    setSavedSymbols((current) => (current.includes(candidate.symbol) ? current : [...current, candidate.symbol]));
  }

  return (
    <AppShell>
      <header className="rounded-3xl bg-ink p-6 text-white shadow-soft">
        <p className="text-sm font-bold text-white/55">{APP_NAME_KO} 시작하기</p>
        <h1 className="mt-2 text-3xl font-black">관심사와 투자습관으로 나만의 후보를 골라요.</h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-white/72">추천은 투자 권유가 아니라, 공부하고 이해해볼 후보를 찾는 참고용 해석입니다.</p>
      </header>

      {step === 0 ? (
        <section className="mt-5 space-y-4 rounded-3xl bg-white p-5 shadow-soft">
          <label className="block">
            <span className="text-sm font-black text-black/55">닉네임</span>
            <input value={nickname} onChange={(event) => setNickname(event.target.value)} className="mt-2 h-12 w-full rounded-2xl bg-paper px-4 font-bold outline-none" placeholder="2자 이상 12자 이하" />
          </label>
          {error ? <p className="rounded-2xl bg-coral/70 p-3 text-sm font-black text-red-950">{error}</p> : null}
          <div>
            <p className="text-sm font-black text-black/55">프로필 이미지 선택</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-ink text-xl font-black text-white">
                {profileImageUrl ? <img src={profileImageUrl} alt="" className="size-16 object-cover" /> : nickname.slice(0, 1) || "S"}
              </div>
              <label className="flex h-12 cursor-pointer items-center rounded-2xl bg-paper px-4 text-sm font-black text-black/65">
                JPG / PNG 선택
                <input type="file" accept="image/png,image/jpeg" onChange={(event) => selectImage(event.target.files?.[0])} className="sr-only" />
              </label>
            </div>
          </div>
          <button onClick={nextFromProfile} className="h-12 w-full rounded-2xl bg-ink text-sm font-black text-white">내 센스폴리오 만들기</button>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/" className="h-11 rounded-2xl bg-black/[0.06] pt-3 text-center text-xs font-black text-black/65">이미 있다면 로그인</Link>
            <Link href="/?guest=1" className="h-11 rounded-2xl bg-black/[0.06] pt-3 text-center text-xs font-black text-black/65">둘러보기</Link>
          </div>
        </section>
      ) : null}

      {step === 1 ? (
        <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
          <h2 className="text-2xl font-black">관심 있는 분야를 골라주세요</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">여러 개 선택해도 괜찮아요. 나중에 설정에서 더 자세히 바꿀 수 있어요.</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {bigInterests.map((interest) => (
              <button key={interest} onClick={() => toggle(interests, interest, setInterests)} className={interests.includes(interest) ? "rounded-2xl bg-ink p-4 text-sm font-black text-white" : "rounded-2xl bg-paper p-4 text-sm font-black text-black/65"}>
                {interest}
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input value={customInterest} onChange={(event) => setCustomInterest(event.target.value)} placeholder="기타 관심사 직접 입력" className="h-12 min-w-0 flex-1 rounded-2xl bg-paper px-4 font-bold outline-none" />
            <button onClick={addCustomInterest} className="rounded-2xl bg-black/[0.06] px-4 text-sm font-black">추가</button>
          </div>
          <button onClick={() => setStep(2)} className="mt-5 h-12 w-full rounded-2xl bg-ink text-sm font-black text-white">다음</button>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
          <h2 className="text-2xl font-black">요즘 궁금한 종목이 있나요?</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">아래는 이해를 돕는 예시입니다. 실제 추천은 전체 상장사/ETF 후보에서 계산합니다.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {sampleCandidates.map((item) => (
              <button key={item} onClick={() => toggle(watchSymbols, item, setWatchSymbols)} className={watchSymbols.includes(item) ? "rounded-full bg-ink px-4 py-2 text-xs font-black text-white" : "rounded-full bg-paper px-4 py-2 text-xs font-black text-black/60"}>
                {item}
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button onClick={() => setStep(3)} className="h-12 rounded-2xl bg-ink text-sm font-black text-white">선택 완료</button>
            <button onClick={() => setStep(3)} className="h-12 rounded-2xl bg-black/[0.06] text-sm font-black text-black/65">나중에 할게요</button>
          </div>
        </section>
      ) : null}

      {step === 3 ? (
        <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
          <h2 className="text-2xl font-black">내 투자습관을 가볍게 분석해볼까요?</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">몇 가지 질문에 답하면, 종목을 볼 때 더 잘 맞는 설명과 기록 방식을 보여드릴게요.</p>
          <p className="mt-2 text-xs font-bold text-black/45">나중에 설정에서 다시 할 수 있어요.</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button onClick={() => setStep(4)} className="h-12 rounded-2xl bg-ink text-sm font-black text-white">투자습관 분석하기</button>
            <button onClick={skipHabit} className="h-12 rounded-2xl bg-black/[0.06] text-sm font-black text-black/65">나중에 할게요</button>
          </div>
        </section>
      ) : null}

      {step === 4 ? (
        <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
          <p className="text-sm font-black text-black/45">{questionIndex + 1} / 7</p>
          <h2 className="mt-2 text-2xl font-black">{questions[questionIndex].q}</h2>
          <div className="mt-4 grid gap-2">
            {questions[questionIndex].a.map((answer, index) => (
              <button key={answer} onClick={() => answerQuestion(index)} className="rounded-2xl bg-paper p-4 text-left text-sm font-black leading-6 text-black/70 hover:bg-lemon">
                {answer}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {step === 5 ? (
        <PreferenceStep preferences={preferences} onChange={setPreferences} onNext={() => setStep(6)} />
      ) : null}

      {step === 6 ? (
        <ResultStep nickname={nickname} profile={investmentProfile} preferences={preferences} onRecommend={goRecommendations} onHome={() => finishToHome()} />
      ) : null}

      {step === 7 ? (
        <RecommendationStep sections={recommendationSections} preferences={preferences} interests={interests} profile={investmentProfile} savedSymbols={savedSymbols} onSave={saveRecommendation} onHome={() => router.push("/")} />
      ) : null}
    </AppShell>
  );
}

function analyzeInvestmentProfile(answers: number[]): InvestmentProfile {
  const now = new Date().toISOString();
  const riskScore = (answers[0] ?? 1) + (answers[5] ?? 1);
  const reviewScore = answers[6] ?? 1;
  const informationAnswer = answers[4] ?? 0;
  const tasteAnswer = answers[3] ?? 0;
  const numberAnswer = answers[2] ?? 1;
  const riskLevel = riskScore <= 2 ? "낮음" : riskScore >= 5 ? "높음" : "중간";
  const investmentPeriod = (answers[1] ?? 1) >= 3 ? "장기" : (answers[1] ?? 1) <= 0 ? "단기" : "중기";
  const informationStyle = informationAnswer === 1 || numberAnswer >= 2 ? "숫자 해석 선호" : informationAnswer === 3 ? "뉴스 흐름 선호" : informationAnswer === 0 ? "회사 사업 이해 선호" : "쉬운 설명 선호";
  const interestStyle = informationAnswer === 3 ? "테마/뉴스 기반" : informationAnswer === 2 ? "가격 기반" : tasteAnswer === 0 ? "취향 기반" : numberAnswer >= 2 ? "실적 기반" : "취향 기반";
  const buyStyle = riskLevel === "높음" && (answers[0] ?? 1) >= 3 ? "적극형" : riskLevel === "낮음" ? "신중형" : "균형형";
  const reviewStyle = reviewScore === 3 ? "기록 높음" : reviewScore === 2 ? "기록 보통" : "기록 낮음";
  const resultSummary = `${interestStyle} + ${informationStyle.replace(" 선호", "")}`;
  return {
    riskLevel,
    investmentPeriod,
    informationStyle,
    interestStyle,
    buyStyle,
    reviewStyle,
    resultSummary,
    traits: [
      interestStyle === "취향 기반" ? "내가 아는 분야에 더 관심이 갑니다." : "관심보다 근거를 함께 확인하려는 편입니다.",
      informationStyle === "회사 사업 이해 선호" ? "숫자보다 회사가 무엇을 하는지 이해하는 것이 중요합니다." : `${informationStyle} 방식이 잘 맞습니다.`,
      buyStyle === "신중형" ? "매수 전에는 가격과 리스크 확인이 필요합니다." : "흐름이 강하면 후보를 빠르게 살펴볼 수 있습니다."
    ],
    cautions: ["좋아하는 분야라고 무조건 좋은 투자는 아닐 수 있습니다.", "급등주에는 감정적으로 끌릴 수 있습니다.", "매도 기준을 미리 정하지 않으면 판단이 늦어질 수 있습니다."],
    usageTips: ["회사 해석 카드 먼저 보기", "리스크 낮음/중간/높음 확인하기", "하트 호감도와 매수 이유 기록하기", "월간 복기 리포트 확인하기"],
    createdAt: now,
    updatedAt: now
  };
}

function PreferenceStep({ preferences, onChange, onNext }: { preferences: InvestmentPreferences; onChange: (next: InvestmentPreferences) => void; onNext: () => void }) {
  return (
    <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
      <h2 className="text-2xl font-black">어떤 종목을 더 편하게 볼 수 있나요?</h2>
      <div className="mt-4 space-y-5">
        <OptionGroup title="선호 시장" value={preferences.preferredMarket} values={["국내주식", "해외주식", "ETF", "전부 보기"]} onChange={(value) => onChange({ ...preferences, preferredMarket: value as InvestmentPreferences["preferredMarket"] })} />
        <OptionGroup title="선호 가격대" value={preferences.preferredPriceRange} values={["1만원 이하", "1만원 ~ 5만원", "5만원 ~ 10만원", "10만원 이상도 괜찮음", "가격 상관없음"]} onChange={(value) => onChange({ ...preferences, preferredPriceRange: value as InvestmentPreferences["preferredPriceRange"] })} />
        <OptionGroup title="선호 종목 크기" value={preferences.preferredSize} values={["대형주 위주", "중소형주도 괜찮음", "소외주도 보고 싶음", "잘 모르겠음"]} onChange={(value) => onChange({ ...preferences, preferredSize: value as InvestmentPreferences["preferredSize"] })} />
        <OptionGroup title="선호 리스크" value={preferences.preferredRisk} values={["낮은 리스크", "중간 리스크", "성장 가능성이 있으면 높은 리스크도 가능"]} onChange={(value) => onChange({ ...preferences, preferredRisk: value as InvestmentPreferences["preferredRisk"] })} />
        <OptionGroup title="선호 투자 방식" value={preferences.preferredApproach} values={["안정적으로 오래 보기", "성장 가능성 보기", "내가 좋아하는 분야 위주로 보기", "ETF로 분산해서 보기", "저평가/소외주 찾기"]} onChange={(value) => onChange({ ...preferences, preferredApproach: value as InvestmentPreferences["preferredApproach"] })} />
      </div>
      <button onClick={onNext} className="mt-5 h-12 w-full rounded-2xl bg-ink text-sm font-black text-white">결과 보기</button>
    </section>
  );
}

function ResultStep({ nickname, profile, preferences, onRecommend, onHome }: { nickname: string; profile: InvestmentProfile; preferences: InvestmentPreferences; onRecommend: () => void; onHome: () => void }) {
  return (
    <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
      <Badge tone="lilac">{profile.resultSummary}</Badge>
      <h2 className="mt-3 text-2xl font-black">{nickname}님은 관심사를 바탕으로 회사를 이해하고 싶은 타입입니다.</h2>
      <div className="mt-4 grid gap-3">
        <SummaryBlock title="특징" rows={profile.traits} />
        <SummaryBlock title="주의점" rows={profile.cautions} />
        <SummaryBlock title="추천 사용 방식" rows={profile.usageTips} />
      </div>
      <div className="mt-4 rounded-2xl bg-paper p-4 text-sm font-bold leading-6 text-black/60">
        선호 조건: {preferences.preferredMarket} · {preferences.preferredPriceRange} · {preferences.preferredRisk} · {preferences.preferredApproach}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <button onClick={onRecommend} className="h-12 rounded-2xl bg-ink text-sm font-black text-white">관심 종목 추천 보기</button>
        <button onClick={onHome} className="h-12 rounded-2xl bg-black/[0.06] text-sm font-black text-black/65">홈으로 가기</button>
      </div>
    </section>
  );
}

function RecommendationStep({
  sections,
  preferences,
  interests,
  profile,
  savedSymbols,
  onSave,
  onHome
}: {
  sections: RecommendationSection[];
  preferences: InvestmentPreferences;
  interests: string[];
  profile: InvestmentProfile;
  savedSymbols: string[];
  onSave: (candidate: RecommendationCandidate, category: string) => void;
  onHome: () => void;
}) {
  return (
    <section className="mt-5">
      <div className="rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-2xl font-black">지금 관심 가져볼 만한 종목을 골라봤어요</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-black/58">선택한 관심사와 투자습관을 바탕으로 만든 참고용 리스트예요. 이 추천은 투자 권유가 아니라 공부용 후보입니다.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone="blue">관심사 {interests.length ? interests.join(", ") : "기본값"}</Badge>
          <Badge tone="lilac">{profile.resultSummary}</Badge>
          <Badge tone="green">{preferences.preferredMarket}</Badge>
          <Badge tone="yellow">{preferences.preferredRisk}</Badge>
        </div>
      </div>
      <div className="mt-5 space-y-6">
        {sections.map((section) => (
          <div key={section.id}>
            <h3 className="text-xl font-black">{section.title}</h3>
            <p className="mt-1 text-sm font-semibold leading-6 text-black/55">{section.description}</p>
            <div className="mt-3 grid gap-3">
              {section.candidates.slice(0, 3).map((candidate) => (
                <RecommendCard key={`${section.id}-${candidate.id}`} candidate={candidate} saved={savedSymbols.includes(candidate.symbol)} onSave={() => onSave(candidate, section.title)} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        <button onClick={onHome} className="h-12 rounded-2xl bg-ink text-xs font-black text-white">선택 완료하고 홈으로</button>
        <button onClick={() => window.location.reload()} className="h-12 rounded-2xl bg-black/[0.06] text-xs font-black text-black/65">추천 다시 보기</button>
        <button onClick={onHome} className="h-12 rounded-2xl bg-black/[0.06] text-xs font-black text-black/65">건너뛰기</button>
      </div>
    </section>
  );
}

function RecommendCard({ candidate, saved, onSave }: { candidate: RecommendationCandidate; saved: boolean; onSave: () => void }) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-black/45">{candidate.assetKind === "etf" ? "ETF" : "주식"} · {candidate.region} · {candidate.market}</p>
          <h4 className="mt-1 text-lg font-black">{candidate.name}</h4>
        </div>
        <Badge tone={candidate.risk === "높음" ? "coral" : candidate.risk === "중간" ? "yellow" : "green"}>리스크 {candidate.risk}</Badge>
      </div>
      <p className="mt-3 text-sm font-semibold leading-6 text-black/68">{candidate.oneLine}</p>
      <div className="mt-3 rounded-2xl bg-paper p-3 text-sm font-semibold leading-6 text-black/62">
        <p className="font-black text-black/50">왜 추천됐나요?</p>
        <p>{candidate.interestReason}</p>
        <p>{candidate.habitReason}</p>
        <p>{candidate.recent30DayFlow}</p>
        <p className="mt-2 text-xs font-black text-black/45">데이터 신뢰도: {candidate.dataConfidence}</p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <button onClick={onSave} className={saved ? "h-11 rounded-2xl bg-mint text-xs font-black text-emerald-950" : "h-11 rounded-2xl bg-ink text-xs font-black text-white"}>{saved ? "저장됨" : "관심종목에 추가"}</button>
        <Link href={candidate.href} className="h-11 rounded-2xl bg-black/[0.06] pt-3 text-center text-xs font-black text-black/65">자세히 보기</Link>
        <button className="h-11 rounded-2xl bg-black/[0.04] text-xs font-black text-black/45">나중에 볼게요</button>
      </div>
    </article>
  );
}

function OptionGroup({ title, values, value, onChange }: { title: string; values: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <p className="text-sm font-black text-black/55">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((item) => (
          <button key={item} onClick={() => onChange(item)} className={item === value ? "rounded-full bg-ink px-3 py-2 text-xs font-black text-white" : "rounded-full bg-paper px-3 py-2 text-xs font-black text-black/60"}>{item}</button>
        ))}
      </div>
    </div>
  );
}

function SummaryBlock({ title, rows }: { title: string; rows: string[] }) {
  return (
    <div className="rounded-2xl bg-paper p-4">
      <p className="text-sm font-black text-black/45">{title}</p>
      <ul className="mt-2 space-y-1 text-sm font-semibold leading-6 text-black/65">
        {rows.map((row) => <li key={row}>{row}</li>)}
      </ul>
    </div>
  );
}
