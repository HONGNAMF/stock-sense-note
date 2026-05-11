"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { APP_NAME_KO } from "@/lib/brand";
import { resizeImageFile } from "@/lib/image-utils";
import { cloudSyncService } from "@/services/cloudSyncService";
import { profileService, validateNickname } from "@/services/profileService";
import type { LocalProfile } from "@/types/investment";

const bigInterests = ["콘텐츠 / 취향", "생활 / 소비", "기술 / 산업", "헬스케어", "금융 / 경제", "인프라", "ETF", "해외주식", "국내주식", "기타"];
const candidates = [
  "삼성전자",
  "삼성전기",
  "인바디",
  "아이디스",
  "애니플러스",
  "대원미디어",
  "디아이씨",
  "상신브레이크",
  "로보티즈",
  "화신",
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
  "취향 기반 + 회사 이해형 투자자에 가깝습니다.",
  "신중하게 매수하지만 관심 있는 분야에는 감정이 조금 반영되는 편입니다.",
  "가격과 리스크를 함께 확인하면 더 편안한 균형형 투자자입니다."
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");
  const [watchSymbols, setWatchSymbols] = useState<string[]>([]);
  const [investorSummary, setInvestorSummary] = useState(summaries[0]);
  const [error, setError] = useState("");

  useEffect(() => {
    setNickname(new URLSearchParams(window.location.search).get("nickname") ?? "");
  }, []);

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

  async function finish() {
    const now = new Date().toISOString();
    const profile: LocalProfile = {
      localUserId: crypto.randomUUID(),
      nickname: nickname.trim(),
      name: nickname.trim(),
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
      await cloudSyncService.upsertProfileSnapshot(profile).catch(() => undefined);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "센스폴리오를 저장하지 못했어요.");
      setStep(0);
    }
  }

  return (
    <AppShell>
      <header className="rounded-3xl bg-ink p-6 text-white shadow-soft">
        <p className="text-sm font-bold text-white/55">{APP_NAME_KO} 시작하기</p>
        <h1 className="mt-2 text-3xl font-black">닉네임으로 내 센스폴리오를 만들어요.</h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-white/72">생년월일, 이메일, 비밀번호 없이 닉네임으로 내 기록을 불러옵니다. Supabase 연결 시 다른 기기에서도 이어집니다.</p>
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

          <button onClick={nextFromProfile} className="h-12 w-full rounded-2xl bg-ink text-sm font-black text-white">
            내 센스폴리오 만들기
          </button>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/" className="h-11 rounded-2xl bg-black/[0.06] pt-3 text-center text-xs font-black text-black/65">
              이미 있다면 로그인
            </Link>
            <Link href="/?guest=1" className="h-11 rounded-2xl bg-black/[0.06] pt-3 text-center text-xs font-black text-black/65">
              둘러보기
            </Link>
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
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">선택한 종목과 ETF는 초기 관심 후보로 저장됩니다. 이 단계는 건너뛰어도 괜찮아요.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {candidates.map((item) => (
              <button key={item} onClick={() => toggle(watchSymbols, item, setWatchSymbols)} className={watchSymbols.includes(item) ? "rounded-full bg-ink px-4 py-2 text-xs font-black text-white" : "rounded-full bg-paper px-4 py-2 text-xs font-black text-black/60"}>
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
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">더 정확한 해석과 추천에 도움이 돼요. 지금은 짧은 결과 문장만 저장합니다.</p>
          <div className="mt-4 grid gap-2">
            {summaries.map((summary) => (
              <button key={summary} onClick={() => setInvestorSummary(summary)} className={summary === investorSummary ? "rounded-2xl bg-ink p-4 text-left text-sm font-black text-white" : "rounded-2xl bg-paper p-4 text-left text-sm font-black text-black/65"}>
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
