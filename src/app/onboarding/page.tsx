"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { resizeImageFile } from "@/lib/image-utils";
import { profileService } from "@/services/profileService";
import type { LocalProfile } from "@/types/investment";

const bigInterests = [
  "콘텐츠 / 취향",
  "생활 / 소비",
  "기술 / 산업",
  "헬스케어",
  "금융 / 경제",
  "인프라",
  "ETF",
  "해외주식",
  "국내주식",
  "기타"
];

const candidates = [
  "삼성전자",
  "SK하이닉스",
  "삼천당제약",
  "인바디",
  "아이디스",
  "애니플러스",
  "KODEX 200",
  "TIGER 미국S&P500",
  "TIGER 미국나스닥100",
  "VOO",
  "QQQ",
  "SCHD",
  "Spotify",
  "Pinterest",
  "Roblox",
  "Duolingo",
  "Reddit"
];

const summaries = [
  "신중하게 매수하지만, 관심 있는 분야에는 감정이 조금 반영되는 편입니다.",
  "취향 기반 + 회사 이해형 투자자에 가깝습니다.",
  "가격과 리스크를 함께 확인하면 더 편안한 균형형 투자자입니다."
];

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
  const [investorSummary, setInvestorSummary] = useState(summaries[1]);

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

  async function selectImage(file?: File) {
    if (!file) return;
    try {
      setProfileImageUrl(await resizeImageFile(file));
    } catch (error) {
      alert(error instanceof Error ? error.message : "이미지를 저장하지 못했어요.");
    }
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

    try {
      profileService.createProfile(profile);
      router.push("/");
    } catch (error) {
      alert(error instanceof Error ? error.message : "투자노트를 저장하지 못했어요.");
    }
  }

  return (
    <AppShell>
      <header className="rounded-3xl bg-ink p-6 text-white shadow-soft">
        <p className="text-sm font-bold text-white/55">센스폴리오 회원가입</p>
        <h1 className="mt-2 text-3xl font-black">닉네임으로 내 투자노트를 만들어요.</h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-white/72">
          이메일과 비밀번호 없이 이 기기에 기록을 저장합니다.
        </p>
      </header>

      {step === 0 ? (
        <section className="mt-5 space-y-4 rounded-3xl bg-white p-5 shadow-soft">
          <label className="block">
            <span className="text-sm font-black text-black/55">닉네임</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 h-12 w-full rounded-2xl bg-paper px-4 font-bold outline-none"
              placeholder="예: 지영"
            />
          </label>

          <div>
            <p className="text-sm font-black text-black/55">프로필 사진 선택</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-ink text-xl font-black text-white">
                {profileImageUrl ? <img src={profileImageUrl} alt="" className="size-16 object-cover" /> : name.slice(0, 1) || "S"}
              </div>
              <label className="flex h-12 cursor-pointer items-center rounded-2xl bg-paper px-4 text-sm font-black text-black/65">
                JPG / PNG 선택
                <input type="file" accept="image/png,image/jpeg" onChange={(event) => selectImage(event.target.files?.[0])} className="sr-only" />
              </label>
              {profileImageUrl ? (
                <button type="button" onClick={() => setProfileImageUrl("")} className="h-12 rounded-2xl bg-black/[0.05] px-4 text-sm font-black text-black/55">
                  제거
                </button>
              ) : null}
            </div>
          </div>

          {duplicateFound ? (
            <div className="rounded-2xl bg-lemon/80 p-4">
              <p className="font-black text-yellow-950">이미 같은 닉네임의 투자노트가 있어요.</p>
              <p className="mt-1 text-sm font-semibold text-yellow-950/75">로그인해서 이어서 볼까요?</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button onClick={() => router.push("/")} className="h-11 rounded-2xl bg-ink text-xs font-black text-white">
                  로그인하기
                </button>
                <button
                  onClick={() => {
                    setAllowDuplicate(true);
                    setDuplicateFound(false);
                  }}
                  className="h-11 rounded-2xl bg-white text-xs font-black text-black/65"
                >
                  다른 닉네임으로 만들기
                </button>
              </div>
            </div>
          ) : null}

          <button onClick={nextFromProfile} className="h-12 w-full rounded-2xl bg-ink text-sm font-black text-white">
            내 투자노트 만들기
          </button>
        </section>
      ) : null}

      {step === 1 ? (
        <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
          <h2 className="text-2xl font-black">관심 있는 분야를 골라주세요</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">
            여러 개 선택해도 괜찮아요. 나중에 내 페이지에서 더 자세히 바꿀 수 있어요.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {bigInterests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggle(interests, interest, setInterests)}
                className={interests.includes(interest) ? "rounded-2xl bg-ink p-4 text-sm font-black text-white" : "rounded-2xl bg-paper p-4 text-sm font-black text-black/65"}
              >
                {interest}
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              value={customInterest}
              onChange={(event) => setCustomInterest(event.target.value)}
              placeholder="기타 관심사 직접 입력"
              className="h-12 min-w-0 flex-1 rounded-2xl bg-paper px-4 font-bold outline-none"
            />
            <button onClick={addCustomInterest} className="rounded-2xl bg-black/[0.06] px-4 text-sm font-black">
              추가
            </button>
          </div>
          <button onClick={() => setStep(2)} className="mt-5 h-12 w-full rounded-2xl bg-ink text-sm font-black text-white">
            다음
          </button>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
          <h2 className="text-2xl font-black">요즘 궁금한 종목이 있나요?</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">
            선택한 종목과 ETF는 초기 관심 후보로만 저장됩니다. 하트를 누른 종목만 관심종목에 모입니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {candidates.map((item) => (
              <button
                key={item}
                onClick={() => toggle(watchSymbols, item, setWatchSymbols)}
                className={watchSymbols.includes(item) ? "rounded-full bg-ink px-4 py-2 text-xs font-black text-white" : "rounded-full bg-paper px-4 py-2 text-xs font-black text-black/60"}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button onClick={() => setStep(3)} className="h-12 rounded-2xl bg-ink text-sm font-black text-white">
              선택 완료
            </button>
            <button onClick={() => setStep(3)} className="h-12 rounded-2xl bg-black/[0.06] text-sm font-black text-black/65">
              나중에 할게요
            </button>
          </div>
        </section>
      ) : null}

      {step === 3 ? (
        <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
          <h2 className="text-2xl font-black">투자 스타일을 간단히 파악해볼까요?</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">
            더 정확한 참고용 해석에 도움이 돼요. MVP에서는 짧은 결과 문장만 저장합니다.
          </p>
          <div className="mt-4 grid gap-2">
            {summaries.map((summary) => (
              <button
                key={summary}
                onClick={() => setInvestorSummary(summary)}
                className={summary === investorSummary ? "rounded-2xl bg-ink p-4 text-left text-sm font-black text-white" : "rounded-2xl bg-paper p-4 text-left text-sm font-black text-black/65"}
              >
                {summary}
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button onClick={finish} className="h-12 rounded-2xl bg-ink text-sm font-black text-white">
              내 투자 화면으로 가기
            </button>
            <button onClick={finish} className="h-12 rounded-2xl bg-black/[0.06] text-sm font-black text-black/65">
              나중에 할게요
            </button>
          </div>
        </section>
      ) : null}
    </AppShell>
  );
}
