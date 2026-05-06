import type { RiskProfile, UserProfile } from "@/types";

export function classifyProfile(input: Omit<UserProfile, "riskProfile">): RiskProfile {
  const hasTasteInterests = input.interests.some((item) => ["음악", "영화", "애니", "게임", "콘텐츠", "커뮤니티"].includes(item));
  const hasThemeInterests = input.interests.some((item) => ["AI", "의료"].includes(item));

  if (input.volatility === "낮음" && input.lossTolerance === "-5%") return "안정형";
  if (input.volatility === "높음" || input.lossTolerance === "상관없음") return hasThemeInterests ? "테마형" : "성장형";
  if (hasTasteInterests && input.newsFrequency !== "자주") return "취향형";
  if (hasThemeInterests) return "테마형";
  return input.horizon === "장기" ? "성장형" : "안정형";
}

export function profileGuide(profile?: RiskProfile) {
  if (!profile) return "이름과 생년월일로 투자노트를 만들면 관심사와 기록에 맞춘 해석을 보여드려요.";
  const guides: Record<RiskProfile, string> = {
    안정형: "가격 변동보다 실적 안정성과 긴 흐름을 우선해 볼 만해요.",
    성장형: "성장률과 장기 시장 크기를 보되, 과열 신호를 함께 체크해요.",
    테마형: "뉴스와 산업 변화에 민감하므로 기대감과 실제 실적을 구분해서 봐요.",
    취향형: "좋아하는 분야를 이해의 입구로 쓰되, 숫자가 따라오는지 확인해요."
  };
  return guides[profile];
}
