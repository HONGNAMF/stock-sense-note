"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { profileService } from "@/services/profileService";
import type { LocalProfile } from "@/types/investment";

const bigInterests = ["콘텐츠 / 취향", "생활 / 소비", "기술 / 산업", "헬스케어", "금융 / 경제", "인프라", "ETF", "해외주식", "국내주식", "기타"];
const candidates = ["삼성전자", "SK하이닉스", "삼천당제약", "인바디", "아이디스", "애니플러스", "KODEX 200", "TIGER 미국S&P500", "TIGER 미국나스닥100", "VOO", "QQQ", "SCHD", "Spotify", "Pinterest", "Roblox", "Duolingo", "Reddit"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");
  const [watchSymbols, setWatchSymbols] = useState<string[]>([]);
  const [duplicateFound, setDuplicateFound] = useState(false);
  const [allowDuplicate, setAllowDuplicate] = useState(false);
  const [investorSummary, setInvestorSummary] = useState("관심 있는 분야를 중심으로 회사를 이해하고 투자하고 싶은 타입입니다.");

  function toggle(list: string[], value: string, setter: (next: string[]) => void) {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  function nextFromProfile() {
    if (!name.trim()) return;
    const existing = profileService.findProfile(name);
    if (existing && !allowDuplicate) {
      setDuplicateFound(true);
      return;
    }
    setStep(1);
  }

  function addCustomInterest() {
    const value = customInterest.trim();
    if (!value) return;
    if (!interests.includes(value)) setInterests([...interests, value]);
    setCustomInterest("");
  }

  function finish() {
    const now = new Date().toISOString();
    const profile: LocalProfile = {
      localUserId: crypto.randomUUID(),
      name: name.trim(),
      profileImageUrl,
      interests,
      watchSymbols,
      investorSummary,
      viewMode: "standard",
      onboardingCompleted: true,
      createdAt: now,
      updatedAt: now
    };
    profileService.createProfile(profile);
    router.push("/");
  }

  return (
    <AppShell>
      <header className="rounded-3xl bg-ink p-6 text-white shadow-soft">
        <p className="text-sm font-bold text-white/55">내 투자노트 만들기</p>
        <h1 className="mt-2 text-3xl font-black">이 기기에 저장되는 개인 투자노트예요.</h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-white/72">이메일과 비밀번호 없이 닉네임으로 다시 불러옵니다.</p>
      </header>

      {step === 0 ? (
        <section className="mt-5 space-y-4 rounded-3xl bg-white p-5 shadow-soft">
          <label className="block">
            <span className="text-sm font-black text-black/55">닉네임</span>
            <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-12 w-full rounded-2xl bg-paper px-4 font-bold outline-none" />
          </label>
          <label className="block">
            <span className="text-sm font-black text-black/55">프로필 이미지 URL 선택 입력</span>
            <input value={profileImageUrl} onChange={(event) => setProfileImageUrl(event.target.value)} placeholder="JPG / PNG 주소를 나중에 넣어도 돼요" className="mt-2 h-12 w-full rounded-2xl bg-paper px-4 font-bold outline-none" />
          </label>
          {duplicateFound ? (
            <div className="rounded-2xl bg-lemon/80 p-4">
              <p className="font-black text-yellow-950">이미 같은 닉네임의 투자노트가 있어요.</p>
              <p className="mt-1 text-sm font-semibold text-yellow-950/75">로그인해서 이어서 볼까요?</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button onClick={() => router.push("/")} className="h-11 rounded-2xl bg-ink text-xs font-black text-white">로그인하기</button>
                <button onClick={() => { setAllowDuplicate(true); setDuplicateFound(false); }} className="h-11 rounded-2xl bg-white text-xs font-black text-black/65">다른 닉네임으로 만들기</button>
              </div>
            </div>
          ) : null}
          <button onClick={nextFromProfile} className="h-12 w-full rounded-2xl bg-ink text-sm font-black text-white">내 투자노트 만들기</button>
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
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">선택한 종목/ETF는 초기 관심 후보로 저장됩니다. 건너뛰어도 괜찮아요.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {candidates.map((item) => (
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
          <h2 className="text-2xl font-black">투자 스타일을 간단히 파악해볼까요?</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">더 정확한 해석과 추천에 도움이 돼요. MVP에서는 짧은 결과 문장만 저장합니다.</p>
          <div className="mt-4 grid gap-2">
            {[
              "신중하게 매수하지만, 관심 있는 분야에는 감정이 반영되는 편입니다.",
              "취향 기반 + 회사 이해형 투자자입니다.",
              "가격과 리스크를 함께 확인하면 더 편안한 균형형 투자자입니다."
            ].map((summary) => (
              <button key={summary} onClick={() => setInvestorSummary(summary)} className={summary === investorSummary ? "rounded-2xl bg-ink p-4 text-left text-sm font-black text-white" : "rounded-2xl bg-paper p-4 text-left text-sm font-black text-black/65"}>
                {summary}
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button onClick={finish} className="h-12 rounded-2xl bg-ink text-sm font-black text-white">내 투자 화면으로 가기</button>
            <button onClick={finish} className="h-12 rounded-2xl bg-black/[0.06] text-sm font-black text-black/65">나중에 할게요</button>
          </div>
        </section>
      ) : null}
    </AppShell>
  );
}
