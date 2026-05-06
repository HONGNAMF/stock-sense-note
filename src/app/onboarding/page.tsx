"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { profileService } from "@/services/profileService";
import type { LocalProfile } from "@/types/investment";

const bigInterests = ["콘텐츠 / 취향", "생활 / 소비", "기술 / 산업", "헬스케어", "금융 / 경제", "인프라", "ETF", "해외주식", "국내주식", "기타"];
const candidates = [
  "삼성전자",
  "삼성전기",
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

const quiz: Array<[string, string[]]> = [
  ["주가가 하루에 -7% 떨어지면?", ["바로 불안해서 팔고 싶다", "조금 더 지켜본다", "왜 떨어졌는지 찾아본다", "오히려 기회인지 고민한다"]],
  ["3개월 동안 주가가 거의 안 움직이면?", ["지루해서 다른 종목을 보고 싶다", "조금 더 기다린다", "실적이나 뉴스가 괜찮으면 유지한다", "장기 관점이면 크게 상관없다"]],
  ["내가 잘 모르는 회사인데 숫자는 좋아 보이면?", ["그래도 어렵다", "조금 공부해본다", "실적이 좋으면 관심 가진다", "숫자가 좋으면 볼 만하다"]],
  ["내가 좋아하는 분야의 회사라면?", ["더 관심이 간다", "그래도 숫자를 봐야 한다", "관심은 가지만 조심한다", "투자와는 별개다"]],
  ["투자할 때 가장 먼저 보고 싶은 것은?", ["회사가 뭘 하는지", "실적이 좋아졌는지", "가격이 비싼지 싼지", "요즘 뉴스나 흐름"]],
  ["손실이 나면 가장 불안한 이유는?", ["더 떨어질까 봐", "내가 잘못 고른 것 같아서", "언제 팔아야 할지 몰라서", "크게 신경 쓰지 않는다"]],
  ["사고 나서 가장 필요한 기능은?", ["계속 들고 가도 되는지", "산 이유가 유지되는지", "뉴스가 좋은지 나쁜지", "나중에 내 판단을 돌아보는 것"]]
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");
  const [watchSymbols, setWatchSymbols] = useState<string[]>([]);
  const [quizOn, setQuizOn] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const canNext = useMemo(() => step !== 0 || (name.trim() && /^\d{4}-\d{2}-\d{2}$/.test(birthDate)), [step, name, birthDate]);
  const investorSummary = quizOn
    ? "관심 있는 분야를 이해하려고 하고, 매수 전 리스크와 가격을 확인하면 더 편한 균형형 투자자입니다."
    : "기본 성향입니다. 나중에 설정에서 더 자세히 분석할 수 있습니다.";

  function handleImage(file?: File) {
    if (!file || !["image/jpeg", "image/png"].includes(file.type)) return;
    const reader = new FileReader();
    reader.onload = () => setProfileImageUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  function toggle(value: string, setter: (next: string[]) => void, current: string[]) {
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  function finish() {
    const now = new Date().toISOString();
    const profile: LocalProfile = {
      localUserId: crypto.randomUUID(),
      name: name.trim(),
      birthDate,
      profileImageUrl,
      interests: customInterest.trim() ? [...interests, customInterest.trim()] : interests,
      watchSymbols,
      investorSummary,
      createdAt: now,
      updatedAt: now
    };
    profileService.saveProfile(profile);
    router.push("/");
  }

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">시작 설정</p>
        <h1 className="mt-1 text-3xl font-black text-ink">투자 해석 노트를 만들어볼게요</h1>
        <p className="mt-2 text-sm font-semibold leading-6 text-black/55">
          현재 버전은 개인용 저장 방식입니다. 입력한 정보와 기록은 이 기기에 저장됩니다.
        </p>
      </header>

      {step === 0 ? (
        <section className="mt-6 space-y-4 rounded-3xl bg-white p-5 shadow-soft">
          <label className="block">
            <span className="text-sm font-black">이름</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 h-12 w-full rounded-2xl bg-paper px-4 font-bold outline-none" />
          </label>
          <label className="block">
            <span className="text-sm font-black">생년월일</span>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="mt-2 h-12 w-full rounded-2xl bg-paper px-4 font-bold outline-none" />
          </label>
          <label className="block">
            <span className="text-sm font-black">프로필 이미지 선택</span>
            <input type="file" accept="image/png,image/jpeg" onChange={(e) => handleImage(e.target.files?.[0])} className="mt-2 w-full rounded-2xl bg-paper px-4 py-3 text-sm font-bold" />
          </label>
        </section>
      ) : null}

      {step === 1 ? (
        <section className="mt-6 rounded-3xl bg-white p-5 shadow-soft">
          <h2 className="text-xl font-black">관심 있는 분야를 골라주세요</h2>
          <p className="mt-1 text-sm font-semibold text-black/55">여러 개 선택해도 괜찮아요. 나중에 설정에서 더 자세히 바꿀 수 있어요.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {bigInterests.map((item) => (
              <button key={item} onClick={() => toggle(item, setInterests, interests)} className={interests.includes(item) ? "rounded-2xl bg-ink p-3 text-sm font-black text-white" : "rounded-2xl bg-paper p-3 text-sm font-black text-black/65"}>
                {item}
              </button>
            ))}
          </div>
          {interests.includes("기타") ? (
            <input value={customInterest} onChange={(e) => setCustomInterest(e.target.value)} placeholder="애니, 반도체, 배당주..." className="mt-3 h-12 w-full rounded-2xl bg-paper px-4 font-bold outline-none" />
          ) : null}
        </section>
      ) : null}

      {step === 2 ? (
        <section className="mt-6 rounded-3xl bg-white p-5 shadow-soft">
          <h2 className="text-xl font-black">요즘 궁금한 종목이 있나요?</h2>
          <p className="mt-1 text-sm font-semibold text-black/55">선택한 종목/ETF는 초기 관심 후보로 저장됩니다. 건너뛰어도 괜찮아요.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {candidates.map((item) => (
              <button key={item} onClick={() => toggle(item, setWatchSymbols, watchSymbols)} className={watchSymbols.includes(item) ? "rounded-full bg-ink px-4 py-2 text-sm font-black text-white" : "rounded-full bg-paper px-4 py-2 text-sm font-black text-black/60"}>
                {item}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {step === 3 ? (
        <section className="mt-6 rounded-3xl bg-white p-5 shadow-soft">
          <h2 className="text-xl font-black">투자 스타일을 간단히 파악해볼까요?</h2>
          <p className="mt-1 text-sm font-semibold text-black/55">더 정확한 해석과 추천에 도움이 돼요.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={() => setQuizOn(true)} className={quizOn ? "rounded-2xl bg-ink p-3 font-black text-white" : "rounded-2xl bg-paper p-3 font-black"}>성향 파악하기</button>
            <button onClick={() => setQuizOn(false)} className={!quizOn ? "rounded-2xl bg-ink p-3 font-black text-white" : "rounded-2xl bg-paper p-3 font-black"}>나중에 할게요</button>
          </div>
          {quizOn ? (
            <div className="mt-5 space-y-4">
              {quiz.map(([q, options], index) => (
                <div key={q}>
                  <p className="text-sm font-black">{q}</p>
                  <div className="mt-2 grid gap-2">
                    {(options as string[]).map((option, optionIndex) => (
                      <button key={option} onClick={() => setAnswers({ ...answers, [index]: optionIndex })} className={answers[index] === optionIndex ? "rounded-2xl bg-lemon p-3 text-left text-sm font-black" : "rounded-2xl bg-paper p-3 text-left text-sm font-bold"}>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {step === 4 ? (
        <section className="mt-6 rounded-3xl bg-white p-5 shadow-soft">
          <h2 className="text-xl font-black">성향 결과</h2>
          <p className="mt-3 text-lg font-black leading-7">{investorSummary}</p>
          <div className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-black/65">
            <p>좋은 점: 관심 분야를 이해하려는 태도가 있습니다.</p>
            <p>주의점: 좋아하는 분야라도 가격과 리스크를 함께 봐야 합니다.</p>
            <p>추천 사용 방식: 회사 해석 카드, 리스크, 하트 기록, 월간 리포트를 순서대로 보세요.</p>
          </div>
        </section>
      ) : null}

      <div className="mt-6 grid grid-cols-2 gap-2">
        <button disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))} className="h-12 rounded-2xl bg-black/[0.06] font-black disabled:opacity-30">
          이전
        </button>
        {step < 4 ? (
          <button disabled={!canNext} onClick={() => setStep((s) => s + 1)} className="h-12 rounded-2xl bg-ink font-black text-white disabled:opacity-30">
            다음
          </button>
        ) : (
          <button onClick={finish} className="h-12 rounded-2xl bg-ink font-black text-white">
            내 투자 화면으로 가기
          </button>
        )}
      </div>
    </AppShell>
  );
}
